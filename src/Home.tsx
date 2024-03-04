import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import { SearchPage } from "./pages/SearchPage";
import { StatsPage } from "./pages/StatsPage";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Search Word" {...a11yProps(0)} />
          <Tab label="Add Word" {...a11yProps(1)} />
          <Tab label="Check Stats" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {value == 0 && (
        <div>
          <SearchPage />
        </div>
      )}
      {value == 1 && <div>Item 2</div>}
      {value == 2 && (
        <div>
          <StatsPage />
        </div>
      )}
    </>
  );
}
