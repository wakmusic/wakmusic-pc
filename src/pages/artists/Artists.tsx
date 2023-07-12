import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Artist from "@components/artists/Artist";
import PageContainer from "@components/globals/PageContainer";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";

import colors from "@constants/colors";
import { artistList } from "@constants/dummys";
import { artistTabs } from "@constants/tabs";

interface ArtistsProps {}

const Artists = ({}: ArtistsProps) => {
  const [searchParams] = useSearchParams();

  return (
    <PageContainer>
      <Container>
        <TabBar>
          {artistTabs.map((item, index) => (
            <Tab to={item.to} key={index}>
              {item.text}
            </Tab>
          ))}
        </TabBar>

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

const ArtistsContainer = styled.div`
  margin-top: 16px;

  height: 90%;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 124px;
  grid-row-gap: 14px;

  padding-right: 5px;
`;

export default Artists;
