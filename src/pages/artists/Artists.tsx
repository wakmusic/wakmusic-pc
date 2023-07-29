import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import Artist from "@components/artists/Artist";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";

import { artistList } from "@constants/dummys";
import { artistTabs } from "@constants/tabs";

interface ArtistsProps {}

const Artists = ({}: ArtistsProps) => {
  const [searchParams] = useSearchParams();

  return (
    <PageLayout>
      <PageContainer>
        <TabBarWrapper>
          <TabBar>
            {artistTabs.map((item, index) => (
              <Tab to={item.to} key={index}>
                {item.text}
              </Tab>
            ))}
          </TabBar>
        </TabBarWrapper>

        <PageItemContainer>
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
        </PageItemContainer>
      </PageContainer>
    </PageLayout>
  );
};

const TabBarWrapper = styled.div`
  padding: 16px 20px 0 20px;
`;

const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 124px;
  grid-row-gap: 14px;

  padding-left: 20px;
  padding-right: 29px;
  padding-bottom: 20px;
`;

export default Artists;
