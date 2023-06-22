import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";

import { ReactComponent as SearchIconSVG } from "@assets/icons/ic_24_line_search_grey400.svg";

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

  width: 14px;
  height: 14px;
`;

const Input = styled.input`
  width: 160px;
  height: 23px;

  border-radius: 12px;
  background: ${colors.gray700};

  padding-left: 24px;
  padding-right: 8px;
  color: white;

  border: none;

  &:focus {
    outline: none;
  }
`;

export default Search;
