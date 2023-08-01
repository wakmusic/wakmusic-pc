import styled from "styled-components/macro";

export default styled.div`
  display: flex;

  justify-content: space-between;

  & > *:nth-child(2) {
    margin-right: 20px;
  }
`;
