"use client";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import * as React from "react";
import { useCountUp } from "use-count-up";
import { CssVarsProvider } from "@mui/joy/styles";
import { useLpContext } from "./LpProvider";

const Loading = () => {
  const { loading, setLoading } = useLpContext();
  const { value: value1 } = useCountUp({
    isCounting: loading,
    duration: 3,
    start: 0,
    end: 100,
    easing: "linear",
    onComplete: () => {
      setLoading(false);
    },
  });

  return (
    <CssVarsProvider>
      <Stack direction="row" spacing={8} sx={{ alignItems: "center", flexWrap: "wrap", position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignContent: "center", zIndex: 1000 }}>
        <Stack>
          <CircularProgress
            size="lg"
            determinate
            value={value1 as number}
            sx={{
              "--CircularProgress-size": "70px",
              "--CircularProgress-trackThickness": "5px",
              "--CircularProgress-progressThickness": "5px",
              color: "primary.500",
            }}
          >
            <Typography level="body-md" fontWeight="bold" sx={{ color: "primary.500" }}>
              {value1}%
            </Typography>
          </CircularProgress>
        </Stack>
      </Stack>
    </CssVarsProvider>
  );
};

export default Loading;
