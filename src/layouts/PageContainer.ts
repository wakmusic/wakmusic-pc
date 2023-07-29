import styled from "styled-components/macro";

import colors from "@constants/colors";

export default styled.div`
  width: 754px;
  height: calc(100% - 38px);
  margin: 20px 0;

  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66; // 40%
  backdrop-filter: blur(62.5px);

  overflow: hidden;
`;
