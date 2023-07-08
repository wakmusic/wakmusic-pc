import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import PageContainer from "@components/PageContainer";
import Artist from "@components/artists/Artist";
import Tab from "@components/artists/Tab";

import colors from "@constants/colors";
import { artistList } from "@constants/dummys";

interface ArtistsProps {}

const Artists = ({}: ArtistsProps) => {
  const [searchParams] = useSearchParams();

  return (
    <PageContainer>
      <Container>
        <Header>
          <Tab to={null}>전체</Tab>
          <Tab to="woowakgood">우왁굳</Tab>
          <Tab to="isedol">이세돌</Tab>
          <Tab to="gomem">고멤</Tab>
          <Tab to="academy">아카데미</Tab>
        </Header>

        <ArtistsContainer>
          {artistList
            .filter((artist) => {
              if (searchParams.get("type") === null) return true;
              else return artist.group.en === searchParams.get("type");
            })
            .map((artist, index) => (
              <Artist key={index} artist={artist} />
            ))}
        </ArtistsContainer>
      </Container>
    </PageContainer>
  );
};

const Container = styled.div`
  width: 754px;
  height: calc(100% - 40px);
  margin: 20px 0;
  padding: 16px 20px;

  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66; // 40%
  backdrop-filter: blur(62.5px);
`;

const Header = styled.div`
  display: flex;
  gap: 4px;
`;

const ArtistsContainer = styled.div`
  margin-top: 16px;

  height: 90%;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 124px;
  grid-row-gap: 14px;

  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.blueGray300};
    border-radius: 10px;
  }
`;

export default Artists;
