"use client";
// import { useState } from "react";
import { Box, Paper, Tabs, Tab, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useLpContext } from "./LpProvider";
import PageviewTwoToneIcon from "@mui/icons-material/PageviewTwoTone";
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone";

const Responseare = () => {
  const { result, activeTab, setActiveTab, setResult } = useLpContext();
  const scrollmRef = useRef<HTMLDivElement>(null);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (result) {
      setResult({
        ...result,
        html: e.target.value,
      });
    }
  };

  const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (result) {
      setResult({
        ...result,
        css: e.target.value,
      });
    }
  };
  useEffect(() => {
    scrollmRef?.current?.scrollIntoView();
  }, []);

  return (
    <>
      <Box ref={scrollmRef}>
        <Paper sx={{ mt: 4, p: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab icon={<PageviewTwoToneIcon />} label="Preview" />
            <Tab icon={<CodeTwoToneIcon />} label="Code" disabled={!result} />
            <Tab label="Export" disabled={!result} />
          </Tabs>
        </Paper>
      </Box>
      <Box>
        {activeTab === 0 && (
          <Box sx={{ mt: 3 }}>
            <Paper sx={{ mt: 4, p: 3, width: "90vw", height: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <iframe
                  srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <style>${result!.css}</style>
                        </head>
                        <body>
                          ${result!.html}
                        </body>
                      </html>
                    `}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title="LP Preview"
                />
              </Box>
            </Paper>
          </Box>
        )}
        {activeTab === 1 && (
          <Box sx={{ mt: 3 }}>
            <Paper sx={{ mt: 4, p: 3, width: "80vw" }}>
              <TextField multiline rows={10} fullWidth variant="outlined" value={result!.html} onChange={handleHtmlChange} />
              <TextField multiline rows={10} fullWidth variant="outlined" value={result!.css} onChange={handleCssChange} />
            </Paper>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Responseare;
