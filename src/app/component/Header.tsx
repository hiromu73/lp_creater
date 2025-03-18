"use client";
import { Box } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";

const Header = () => {
  return (
      <Box sx={{ display: "flex" ,p:4}}>
        <Typography>LP Creater</Typography>
        <Box sx={{ display: "flex", gap: 4, ml: "auto", justifyContent: "center" }}>
          <a href="">Login</a>
          <a href="">Sign Up</a>
        </Box>
      </Box>
  );
};

export default Header;
