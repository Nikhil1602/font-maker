import React, { useState } from "react";
import { AppBar, CssBaseline } from "@material-ui/core";
import { LinksNav, TabsNav } from "./navigation";
import "../assets/styles/header.css";

const Header = () => {
  const [className, setClassName] = useState({
    class1: "item toggle",
    class2: "item",
    class3: "item",
  });

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar id="header">
        <LinksNav handleDrawerOpen={handleDrawerOpen} />
        <TabsNav
          handleDrawerClose={handleDrawerClose}
          open={open}
          className={className}
          setClassName={setClassName}
        />
      </AppBar>
    </>
  );
};

export default Header;
