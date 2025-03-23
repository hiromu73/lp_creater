"use client";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import * as React from "react";
import { useCountUp } from "use-count-up";
import { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { value: value1 } = useCountUp({
    isCounting: isLoading,
    duration: 1,
    start: 0,
    end: 25,
    onComplete: () => {
      setIsLoading(false);
    },
  });

  return (
    <CssVarsProvider>
      <Stack direction="row" spacing={8} sx={{ alignItems: "center", flexWrap: "wrap", position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignContent: "center", zIndex: 1000 }}>
        <Stack>
          <CircularProgress size="lg" determinate value={value1 as number}>
            <Typography>{value1}%</Typography>
          </CircularProgress>
        </Stack>
      </Stack>
    </CssVarsProvider>
  );
};

export default Loading;
