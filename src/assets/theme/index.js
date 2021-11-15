import { createTheme } from "@material-ui/core/styles";

const DEFAULT = "#AEAEAE";
const PRIMARY = "#FFDE38";
const SECONDARY = "#36276F";

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
  },
});

export default theme;
export { DEFAULT, PRIMARY, SECONDARY };
