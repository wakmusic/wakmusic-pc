import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";

import { ReactComponent as SearchIconSVG } from "@assets/icons/ic_16_line_search.svg";

import colors from "@constants/colors";

interface SearchProps {}

const Search = ({}: SearchProps) => {
  const { register, handleSubmit } = useForm();

  // TODO: 검색 시스템 구현
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <Container>
      <SearchIcon />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("query")} />
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(SearchIconSVG)`
  position: absolute;
  margin-left: 6px;
`;

const Input = styled.input`
  width: 150px;
  height: 22px;

  color: ${colors.gray400};
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;

  border-radius: 12px;
  background: ${colors.gray700};

  padding-left: 24px;
  padding-right: 8px;

  border: none;

  &:focus {
    outline: none;
  }
`;

export default Search;
