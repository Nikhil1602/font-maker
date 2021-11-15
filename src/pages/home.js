import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { CreateFontDialog, MainImageDialog } from "../components/dialog";
import { BackgroundImage, ButtonCreateFont } from "../components/page-sections";
import { ButtonSampleImage } from "../components/page-sections";
import { VerticalLine, ButtonStarted } from "../components/page-sections";
import { MainHeading, SubHeading } from "../components/page-sections";
import MainPage from "../components/main-page";
import "../assets/styles/home.css";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [isFull, setFull] = useState(false);
  const [imageFile, setImageFile] = useState({ file: null, name: null });
  const [showFont, setShowFont] = useState(false);

  return (
    <div id="background">
      {show ? (
        <Grid id="bg-container" container spacing={3}>
          <BackgroundImage />
          <Grid id="content-container" item xs={6}>
            <MainHeading />
            <Grid id="second-container" container>
              <SubHeading />
              <VerticalLine />
            </Grid>
            <ButtonStarted setOpen={setOpen} />
            <ButtonSampleImage />
          </Grid>
        </Grid>
      ) : (
        <>
          <MainPage
            imageFile={imageFile}
            isFull={isFull}
            setFull={setFull}
            setImageFile={setImageFile}
          />
          {isFull && <ButtonCreateFont setShowFont={setShowFont} />}
        </>
      )}
      <MainImageDialog
        open={open}
        setOpen={setOpen}
        setShow={setShow}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
      <CreateFontDialog setShowFont={setShowFont} showFont={showFont} />
    </div>
  );
};

export default Home;
