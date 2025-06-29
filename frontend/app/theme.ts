"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#013220",
    },
    secondary: {
      main: "#d9ead3",
    },
  },
});

export default theme;
