import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Artist from "@components/artists/Artist";
import PageContainer from "@components/globals/PageContainer";
import DefaultScroll from "@components/globals/Scroll/DefaultScroll";
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
        <TabBarWrapper>
          <TabBar>
            {artistTabs.map((item, index) => (
              <Tab to={item.to} key={index}>
                {item.text}
              </Tab>
            ))}
          </TabBar>
        </TabBarWrapper>

        <ArtistsContainer>
          <DefaultScroll>
            <ArtistsWrapper>
              {artistList
                .filter((artist) => {
                  if (searchParams.get("type") === null) return true;
                  else return artist.group.en === searchParams.get("type");
                })
                .map((artist, index) => (
                  <Artist key={index} artist={artist} />
                ))}
            </ArtistsWrapper>
          </DefaultScroll>
        </ArtistsContainer>
      </Container>
    </PageContainer>
  );
};

const Container = styled.div`
  width: 754px;
  height: calc(100% - 40px);
  margin: 20px 0;

  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66; // 40%
  backdrop-filter: blur(62.5px);
`;

const TabBarWrapper = styled.div`
  padding: 16px 20px 0 20px;
`;

const ArtistsContainer = styled.div`
  margin-top: 16px;
`;

const ArtistsWrapper = styled.div`
  height: 561px;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 124px;
  grid-row-gap: 14px;

  padding-left: 20px;
  padding-right: 29px;
  padding-bottom: 20px;
`;

export default Artists;
