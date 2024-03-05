import { Button } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Stats, StatsComponent } from "../components/StatsComponent";
import { BASE_URL } from "../components/consts";

export function StatsPage() {
  const [fromDate, setFromDate] = useState<string | null | any>("");
  const [toDate, setToDate] = useState<string | null>("");
  const [url, setUrl] = useState("");

  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      return res.json();
    });
  const { data, error, isLoading } = useSWR<Stats>(url, fetcher);

  function getStats() {
    var fromDateIso = "";
    var toDateIso = "";

    if (fromDate) {
      fromDateIso = dayjs(fromDate).toISOString();
    }
    if (toDate) {
      fromDateIso = dayjs(toDate).toISOString();
    }

    setUrl(`${BASE_URL}/stats?from=${fromDateIso}&to=${toDateIso}`);
  }

  return (
    <>
      <StatsDateContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField
            style={{ marginRight: "2rem" }}
            label="from date"
            value={fromDate}
            onChange={setFromDate}
          />
          <DateTimeField
            style={{ marginRight: "2rem" }}
            label="to date"
            value={toDate}
            onChange={setToDate}
          />
        </LocalizationProvider>
        <Button onClick={getStats} variant="contained">
          Get Stats
        </Button>
      </StatsDateContainer>

      <div>
        {isLoading && <div>Loading data...</div>}
        {error && <div>Error fetching data: {error}</div>}
        {data && (
          <StatsComponent
            avgProcessingTime={data.avgProcessingTime}
            totalRequest={data.totalRequest}
            totalWords={data.totalWords}
          />
        )}
      </div>
    </>
  );
}

const StatsDateContainer = styled.div`
  display: flex;
  justify-content: space-center;
  margin: 2rem;
`;
