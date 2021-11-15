import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import { IconButton, Drawer } from "@material-ui/core";
import { ListItem, Divider, List } from "@material-ui/core";
import { Menu, ChevronRight } from "@material-ui/icons";
import ReactDOM from "react-dom";
import App from "../App";

const LinksNav = (props) => {
  const handleChange = (e) => {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    e.target.className += " active";

    if (e.target.id === "l1") {
      ReactDOM.render(<App show={true} />, document.getElementById("root"));
    } else if (e.target.id === "l2") {
      ReactDOM.render(<App show={false} />, document.getElementById("root"));
    } else if (e.target.id === "l3") {
      let a = document.createElement("a");
      a.href = "https://www.instagram.com/nik5257/";
      a.click();
    }
  };

  return (
    <Toolbar>
      <Typography id="logo" variant="h6">
        FontMaker
      </Typography>
      <IconButton
        edge="end"
        id="nav-menu"
        onClick={props.handleDrawerOpen}
        aria-label="menu">
        <Menu />
      </IconButton>
      <ul id="nav-bar">
        <li onClick={handleChange} id="l1" className="list active">
          Home
        </li>
        <li onClick={handleChange} id="l2" className="list">
          Guide
        </li>
        <li onClick={handleChange} id="l3" className="list">
          Support Me
        </li>
      </ul>
    </Toolbar>
  );
};

const TabsNav = (props) => {
  const handleToggle = (e) => {
    if (e.target.id === "t1") {
      props.setClassName({
        class1: "item toggle",
        class2: "item",
        class3: "item",
      });
      ReactDOM.render(<App show={true} />, document.getElementById("root"));
    } else if (e.target.id === "t2") {
      props.setClassName({
        class1: "item",
        class2: "item toggle",
        class3: "item",
      });
      ReactDOM.render(<App show={false} />, document.getElementById("root"));
    } else if (e.target.id === "t3") {
      let a = document.createElement("a");
      a.href = "https://www.instagram.com/nik5257/";
      a.click();
      props.setClassName({
        class1: "item",
        class2: "item",
        class3: "item toggle",
      });
    }
    props.handleDrawerClose();
  };

  return (
    <Drawer
      id="drawer"
      anchor="right"
      onClose={props.handleDrawerClose}
      open={props.open}>
      <div id="drawer-header">
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronRight />
        </IconButton>
      </div>
      <Divider />
      <List id="drawer-list">
        <ListItem button>
          <h6 onClick={handleToggle} id="t1" className={props.className.class1}>
            Home
          </h6>
        </ListItem>
        <ListItem button>
          <h6 onClick={handleToggle} id="t2" className={props.className.class2}>
            Guide
          </h6>
        </ListItem>
        <ListItem button>
          <h6 onClick={handleToggle} id="t3" className={props.className.class3}>
            Support Me
          </h6>
        </ListItem>
      </List>
    </Drawer>
  );
};

export { LinksNav, TabsNav };
