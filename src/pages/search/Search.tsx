import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { T4Bold } from "@components/Typography";
import PageContainer from "@components/globals/PageContainer";

import colors from "@constants/colors";

interface SearchProps {}

const Search = ({}: SearchProps) => {
  const [searchParams] = useSearchParams();

  return (
    <PageContainer>
      <Container>
        <T4Bold>Query: {searchParams.get("query")}</T4Bold>
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

export default Search;
