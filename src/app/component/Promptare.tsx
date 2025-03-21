"use client";
// import { useState } from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import React from "react";
import PropmtTextfield from "./PropmtTextfield";
import Urlfield from "./Urlfield";
import FileUpload from "./FileUpload";
import { useLpContext } from "./LpProvider";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Promptare = () => {
  // const [prompt, setPrompt] = useState("");

  // const filedAre = {
  //   palette: {
  //     mode: "dark",
  //     background: {
  //       paper: "#212121",
  //     },
  //     // primary: {
  //     //   main: "#2F2F2F",
  //     // },
  //     // secondary: {
  //     //   main: "#2E2E2E",
  //     // },
  //     // text: {
  //     //   primary: "#fff",
  //     //   secondary: "#46505A",
  //     // },
  //   },
  //   shape: { borderRadius: 40 },
  // };

  const { urls, setUrls, files, setFiles } = useLpContext();

  return (
    <Box sx={{ justifyItems: "center", height: "100%" }}>
      <Box sx={{ mt: 3, width: "50%" }}>
        <Paper elevation={3} sx={{ m: 2, p: 2, bgcolor: "#333333" }}>
          <PropmtTextfield />
          {/* <TextField label="Please elaborate." multiline rows={6} fullWidth value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="For example, an LP that presents a portfolio" /> */}
        </Paper>

        {/* <Button variant="contained" color="primary" fullWidth size="large" onClick={generateLP} disabled={loading || !prompt} sx={{ mt: 3 }}>
            {loading ? "生成中..." : "Create"}
          </Button> */}
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
                <Box key={index}>
                  <Paper elevation={3} sx={{ m: 2, p: 2, bgcolor: "#333333" }}>
                    <IconButton onClick={() => setUrls(urls.filter((_, i) => i !== index))}>
                      <RemoveCircleOutlineIcon color="error" />
                    </IconButton>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url} + testUrl
                    </a>
                  </Paper>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Typography variant="subtitle1">Reference File</Typography>
      <Box sx={{ width: "48%" }}>
        <FileUpload files={files} setFiles={setFiles} />
      </Box>
    </Box>
  );
};

export default Promptare;
