import styled from "styled-components";

import IconButton from "@components/globals/IconButton";

import { playButtonData } from "@constants/IconButton";

import iconButtonType from "../../types/iconButtonType";

interface FunctionSectionProps {}

const FunctionSection = ({}: FunctionSectionProps) => {
  return (
    <Wrapper>
      <TimeLineLayout>
        <TestCategory />
        <TestCategory />
        <TestCategory />
        <TestCategory />
      </TimeLineLayout>
      <ButtonLayout>
        {playButtonData.map((item: iconButtonType, index: number) => {
          return (
            <IconButton key={index} icon={item.icon}>
              {item.text}
            </IconButton>
          );
        })}
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

const TestCategory = styled.div`
  width: 50px;
  height: 40px;
  background-color: gray;
`;

const ButtonLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TestButton = styled.div`
  width: 108px;
  height: 40px;
  background-color: gray;
`;

export default FunctionSection;
