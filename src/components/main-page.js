import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { char_set } from "../utils/container";
import { CropImageDialog } from "./dialog";
import "../assets/styles/main-page.css";
import { isSvgFull } from "../utils/functions";

const MainPage = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (ind) => {
    setOpen(true);
    setValue(ind);
  };

  useEffect(() => {
    props.setFull(isSvgFull(char_set));
  });

  return (
    <Grid id="character-box" container spacing={3}>
      {char_set.map((val, ind) => {
        return (
          <div className="box" onClick={() => handleChange(ind)} item xs={1}>
            <div>
              <p>{val.char}</p>
              <hr />
              <hr />
              <h1 id={`char${ind}`}>{val.char}</h1>
              <div className="svg-container" id={String(ind)}></div>
              <hr />
            </div>
          </div>
        );
      })}
      <CropImageDialog
        open={open}
        setOpen={setOpen}
        value={value}
        imageFile={props.imageFile}
        setImageFile={props.setImageFile}
      />
    </Grid>
  );
};

export default MainPage;
