import styled from "styled-components/macro";

import * as Typography from "@components/Typography";

import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";

interface PlaygroundProps {}

const Playground = ({}: PlaygroundProps) => {
  return (
    <PageLayout>
      <Typography.T4Bold>This is T4Bold</Typography.T4Bold>
      <Typography.T4Medium>This is T4Medium</Typography.T4Medium>
      <Typography.T4Light>This is T4Light</Typography.T4Light>

      <br />

      <Typography.T5Bold>This is T5Bold</Typography.T5Bold>
      <Typography.T5Medium>This is T5Medium</Typography.T5Medium>
      <Typography.T5Light>This is T5Light</Typography.T5Light>

      <br />

      <Typography.T6Bold>This is T6Bold</Typography.T6Bold>
      <Typography.T6Medium>This is T6Medium</Typography.T6Medium>
      <Typography.T6Light>This is T6Light</Typography.T6Light>

      <br />

      <Typography.T7Bold>This is T7Bold</Typography.T7Bold>
      <Typography.T7Medium>This is T7Medium</Typography.T7Medium>
      <Typography.T7Light>This is T7Light</Typography.T7Light>
      <Typography.T7_1Light>This is T7_1Light</Typography.T7_1Light>

      <br />

      <Typography.T8Bold>This is T8Bold</Typography.T8Bold>
      <Typography.T8Medium>This is T8Medium</Typography.T8Medium>
      <Typography.T8Light>This is T8Light</Typography.T8Light>

      <br />

      <Typography.T9Bold>This is T9Bold</Typography.T9Bold>
      <Typography.T9Medium>This is T9Medium</Typography.T9Medium>
      <Typography.T9Light>This is T9Light</Typography.T9Light>

      <ColorContainer>
        {Object.keys(colors).map((color) => (
          <ColorItem key={color}>
            <Color color={colors[color]} />
            <Typography.T5Light>
              {color} ({colors[color]})
            </Typography.T5Light>
          </ColorItem>
        ))}
      </ColorContainer>
    </PageLayout>
  );
};

const ColorContainer = styled.div`
  margin-top: 20px;
`;

const ColorItem = styled.div`
  display: flex;

  gap: 5px;
`;

const Color = styled.div<{ color: string }>`
  width: 100px;
  height: 22px;

  background-color: ${({ color }) => color};
`;

export default Playground;
