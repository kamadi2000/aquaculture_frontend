import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode : "light",
      primary: {
        main: '#071952',
        light : '#97FEED'
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        contrastText: '#47008F',
      },
    },
  });