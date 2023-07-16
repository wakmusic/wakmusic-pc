import { useCallback, useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as DeleteSVG } from "@assets/icons/ic_16_close.svg";
import { ReactComponent as SearchIconSVG } from "@assets/icons/ic_16_line_search.svg";

import colors from "@constants/colors";

import SearchDropdown from "./SearchDropdown";

interface SearchProps {}

const Search = ({}: SearchProps) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { onChange, onBlur, ref, name } = register("query");
  const [focus, setFocus] = useState<number | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isFocusing, setIsFocusing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<string[]>(
    localStorage.getItem("searchHistory") === ""
      ? []
      : localStorage.getItem("searchHistory")?.split(",") || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    const sub = watch((value, { type }) => {
      setIsEmpty(value.query === "");
      if (type === "change") {
        setFocus(null);
      }
    });

    return () => sub.unsubscribe();
  }, [watch]);

  const onSubmit = (data: FieldValues) => {
    if (data.query === "") return;

    if (items.includes(data.query)) {
      setItems((prev) => prev.filter((item) => item !== data.query));
      localStorage.setItem(
        "searchHistory",
        items.filter((item) => item !== data.query).join(",")
      );
    }

    setItems((prev) => [data.query, ...prev.slice(0, 9)]);
    localStorage.setItem(
      "searchHistory",
      [data.query, ...items.slice(0, 9)].join(",")
    );

    navigate(`/search?query=${data.query}&tab=all`);

    inputRef.current?.blur();
  };

  const arrowKeyHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowUp":
          setFocus((prev) => {
            const next =
              prev === null || prev == 0
                ? items.length - 1
                : (prev - 1) % items.length;

            setValue("query", items[next]);

            return next;
          });
          break;
        case "ArrowDown":
          setFocus((prev) => {
            const next = prev === null ? 0 : (prev + 1) % items.length;

            setValue("query", items[next]);

            return next;
          });
          break;
      }
    },
    [items, setValue]
  );

  const focusHandler = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.type) {
      case "focus":
        setIsFocusing(true);
        break;
      case "blur":
        if (e.relatedTarget === null) {
          setIsFocusing(false);
        }
    }
  }, []);

  const onBlurCallback = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur(e);
      focusHandler(e);
    },
    [onBlur, focusHandler]
  );

  return (
    <Container>
      <SearchIcon />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          onKeyDown={arrowKeyHandler}
          onFocus={focusHandler}
          onChange={onChange}
          onBlur={onBlurCallback}
          ref={(e) => {
            ref(e);

            // ref 할당을 위한 편법
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            inputRef.current = e;
          }}
          name={name}
        />
      </form>

      {isFocusing && !isEmpty && (
        <DeleteButton
          tabIndex={0}
          color={colors.gray400}
          onClick={() => {
            setValue("query", "");
            setFocus(null);
            inputRef.current?.focus();
          }}
        />
      )}

      {isFocusing && items.length > 0 && (
        <SearchDropdown
          items={items}
          focus={focus}
          onClick={(text) => {
            setValue("query", text);
            setFocus(null);
            inputRef.current?.focus();
            onSubmit({ query: text });
          }}
          onDelete={(text) => {
            setItems((prev) => prev.filter((item) => item !== text));
            localStorage.setItem(
              "searchHistory",
              items.filter((item) => item !== text).join(",")
            );
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;

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
  padding-right: 24px;

  border: none;

  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled(DeleteSVG)`
  position: absolute;

  right: 8px;

  outline: none;
  cursor: pointer;
`;

export default Search;
