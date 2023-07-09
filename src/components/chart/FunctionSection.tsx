import styled from "styled-components";

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
        <TestButton></TestButton>
        <TestButton></TestButton>
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
