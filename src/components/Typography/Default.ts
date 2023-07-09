import styled from "styled-components";

export const Text = styled.p`
  letter-spacing: -0.5px;
`;

export const Pretendard = styled(Text)`
  font-family: "Pretendard", sans-serif;
  letter-spacing: -0.5px;
`;

export const SCDream = styled(Text)`
  font-family: "SCDream", sans-serif;
`;

export const PretendardBold = styled(Pretendard)`
  font-weight: 700;
`;

export const PretendardMedium = styled(Pretendard)`
  font-weight: 500;
`;

export const PretendardLight = styled(Pretendard)`
  font-weight: 300;
`;

export const SCDreamLight = styled(SCDream)`
  font-weight: 300;
`;