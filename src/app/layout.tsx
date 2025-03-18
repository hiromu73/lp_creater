"use client";
// import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import Header from "./component/Header";
import { LpProvider } from "./component/LpProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkTheme = useMemo(
    () =>
      createTheme({
        components: {
          // MuiCssBaseline: {
          //   styleOverrides: `
          //       ::-webkit-scrollbar{
          //           width: 5px;
          //           display: none;
          //       },
          //       /* Firefox */
          //       html {
          //           scrollbar-width: none;
          //       }
          //       /* IE, Edge */
          //       body {
          //           -ms-overflow-style: none;
          //       }
          //       :hover::-webkit-scrollbar {
          //       display: block;
          //       }
          //       ::-webkit-scrollbar-thumb {
          //           background-color: #676767;
          //           border-radius: 20px;
          //       }
          //       `,
          // },
        },
        palette: {
          mode: "dark",
          background: {
            paper: "#212121",
          },
          primary: {
            main: "#2F2F2F",
          },
          secondary: {
            main: "#2E2E2E",
          },
          text: {
            primary: "#fff",
            secondary: "#46505A",
          },
        },
        shape: { borderRadius: 40 },
      }),
    []
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable}`}>
        <ThemeProvider theme={darkTheme}>
          <LpProvider>
          <Box sx={{ height: "100vh", width: "100%" }}>
            <CssBaseline />
            <Header />
            {children}
            </Box>
            </LpProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
