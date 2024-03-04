import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { WordList } from "../components/WordsList";
import styled from "styled-components";

export function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [url, setUrl] = useState("");

  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      return res.json();
    });
  const { data, error, isLoading } = useSWR(url, fetcher);

  function search() {
    setUrl(`http://localhost:8080/api/v1/similar?word=${searchValue}`);
  }

  return (
    <>
      <SearchContainer>
        <TextField
          style={{ marginRight: "2rem" }}
          id="outlined-basic"
          label="Search word"
          variant="outlined"
          value={searchValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value);
          }}
        />
        <Button onClick={search} variant="contained">
          Search
        </Button>
      </SearchContainer>

      <div>
        {isLoading && <div>Loading data...</div>}
        {error && <div>Error fetching data: {data}</div>}
        {data && <WordList similarWords={data.similar} />}
      </div>
    </>
  );
}

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-center;
  margin: 2rem;
`;
