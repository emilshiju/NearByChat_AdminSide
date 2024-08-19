import React, { useState } from "react";
import { TextField, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        paddingLeft: "300px",
        paddingTop: "20px",
      }}
    >
      <Paper elevation={3} style={{ padding: "16px" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            label="Search users"
            variant="outlined"
            value={query}
            onChange={handleChange}
            style={{ marginRight: "8px", flex: 1 }}
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </form>
      </Paper>
    </div>
  );
};

export default SearchBox;
