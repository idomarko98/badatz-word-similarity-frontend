import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import axios, { HttpStatusCode } from "axios";
import { BASE_URL } from "../components/consts";

export function AddWordPage() {
  const [wordToAdd, setWordToAdd] = useState("");
  const [message, setMessage] = useState("");

  function addWord() {
    setMessage("");

    axios
      .post(`${BASE_URL}/add-word`, {
        word: `${wordToAdd}`,
      })
      .then(function (response) {
        if (response.status === HttpStatusCode.Ok) {
          setMessage(`Added word successfuly!`);
        } else {
          setMessage(response.data.toString());
        }
      })
      .catch(function (error) {
        setMessage(`Something went wrong - ${error.message}`);
      });
  }

  return (
    <>
      <AddAreaContainer>
        <TextField
          style={{ marginRight: "2rem" }}
          id="outlined-basic"
          label="Add word"
          variant="outlined"
          value={wordToAdd}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setWordToAdd(event.target.value);
          }}
        />
        <Button onClick={addWord} variant="contained">
          Add
        </Button>
      </AddAreaContainer>

      <div>{message}</div>
    </>
  );
}

const AddAreaContainer = styled.div`
  display: flex;
  justify-content: space-center;
  margin: 2rem;
`;
