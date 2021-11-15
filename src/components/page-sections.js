import React from "react";
import { Grid } from "@material-ui/core";
import bg_image from "../assets/images/background-image.png";
import sample_image from "../assets/images/sample-image.png";
import "../assets/styles/page-section.css";

const BackgroundImage = () => {
  return (
    <Grid id="background-img" item xs={6}>
      <img src={bg_image} />
    </Grid>
  );
};

const MainHeading = () => {
  return (
    <Grid id="title" item xs={9}>
      <h2>Make your own font here!!</h2>
    </Grid>
  );
};

const SubHeading = () => {
  return (
    <Grid id="tagline" item xs={8}>
      <p>
        Choose the scanned image <br /> containing all the characters
        <br /> with the pure white background.
      </p>
    </Grid>
  );
};

const VerticalLine = () => {
  return (
    <Grid item xs={4}>
      <div id="vertical-line"></div>
    </Grid>
  );
};

const ButtonStarted = (props) => {
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  return (
    <Grid item id="btn-started" xs={12}>
      <button onClick={handleClickOpen}>Let's Started</button>
    </Grid>
  );
};

const ButtonSampleImage = () => {
  return (
    <Grid item id="btn-sample-img" xs={12}>
      <a href={sample_image} download>
        <button>See Sample Image</button>
      </a>
    </Grid>
  );
};

const ButtonCreateFont = (props) => {
  const handleFont = () => {
    props.setShowFont(true);
  };

  return (
    <Grid item id="btn-create-font" xs={12}>
      <button onClick={handleFont}>Create Font</button>
    </Grid>
  );
};

export { BackgroundImage, MainHeading, SubHeading, ButtonCreateFont };
export { VerticalLine, ButtonStarted, ButtonSampleImage };
