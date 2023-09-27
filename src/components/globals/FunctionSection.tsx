import styled from "styled-components/macro";

import { ReactComponent as PlayAllSVG } from "@assets/icons/ic_24_play_all.svg";
import { ReactComponent as RandomSVG } from "@assets/icons/ic_24_random_900.svg";

import IconButton from "@components/globals/IconButton";
import Tab from "@components/globals/tab/Tab";
import TabBar from "@components/globals/tab/TabBar";

import tabType from "@templates/tabType";

interface FunctionSectionProps {
  tabs: tabType[];
  play: (shuffle?: boolean) => void;
}

const FunctionSection = ({ tabs, play }: FunctionSectionProps) => {
  return (
    <Wrapper>
      <TimeLineLayout>
        <TabBar>
          {tabs.map((item: tabType, index: number) => {
            return (
              <Tab key={index} to={item.to}>
                {item.text}
              </Tab>
            );
          })}
        </TabBar>
      </TimeLineLayout>

      <ButtonLayout>
        <IconButton icon={PlayAllSVG} onClick={() => play()}>
          전체재생
        </IconButton>
        <IconButton icon={RandomSVG} onClick={() => play(true)}>
          랜덤재생
        </IconButton>
      </ButtonLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0px 20px;
  margin-top: 16px;
`;

const TimeLineLayout = styled.div`
  display: flex;
  gap: 4px;
`;

const ButtonLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default FunctionSection;
