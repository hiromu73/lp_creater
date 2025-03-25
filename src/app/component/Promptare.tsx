"use client";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import React from "react";
import PropmtTextfield from "./PropmtTextfield";
import Urlfield from "./Urlfield";
import FileUpload from "./FileUpload";
import { useLpContext } from "./LpProvider";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Responseare from "./Responseare";
import Loading from "../loading";

const Promptare = () => {
  const { urls, setUrls, files, setFiles, result, loading } = useLpContext();

  return (
    <>
      {loading && <Loading />}
      <Box sx={{ justifyItems: "center", height: "100%" }}>
        <Box sx={{ mt: 3, width: "50%" }}>
          <Paper elevation={3} sx={{ m: 2, p: 2, bgcolor: "#333333" }}>
            <PropmtTextfield />
          </Paper>
        </Box>
        <Typography variant="subtitle1">Reference URL</Typography>
        <Box sx={{ width: "50%" }}>
          <Paper elevation={3} sx={{ m: 2, p: 2, bgcolor: "#333333" }}>
            <Urlfield urls={urls} setUrls={setUrls} />
          </Paper>
        </Box>
        <Box sx={{ width: "50%" }}>
          {urls.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {urls.map((url, index) => (
                <Box key={index}>
                  <Paper elevation={3} sx={{ m: 2, p: 2, bgcolor: "#333333", display: "flex", overflow: "auto" }}>
                    <IconButton onClick={() => setUrls(urls.filter((_, i) => i !== index))}>
                      <RemoveCircleOutlineIcon color="error" />
                    </IconButton>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </Paper>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Typography variant="subtitle1">Reference File</Typography>
        <Box sx={{ width: "48%" }}>
          <FileUpload files={files} setFiles={setFiles} />
        </Box>
        {result != null && <Responseare />}
      </Box>
    </>
  );
};

export default Promptare;
