"use client";
import React from "react";
import { Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { Button, Box } from "@mui/material";
const Header = () => {
  const { data: session } = useSession();
  return (
    <Box sx={{ display: "flex", p: 4 }}>
      <Typography>LP Creater</Typography>
      {session && (
        <Box sx={{ display: "flex", gap: 4, ml: "auto", justifyContent: "center" }}>
          <Button variant="outlined" onClick={() => signOut({ callbackUrl: "/auth/signin" })} sx={{ textTransform: "none", color: "text.primary" }}>
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
