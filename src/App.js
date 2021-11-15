import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import Header from "./components/header";
import theme from "./assets/theme";
import Home from "./pages/home";
import Guide from "./pages/guide";

const App = ({ show }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {show ? <Home /> : <Guide />}
    </ThemeProvider>
  );
};

export default App;
