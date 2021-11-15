import React, { useState } from "react";
import { Dialog, DialogTitle, Grid, Slider } from "@material-ui/core";
import { InsertPhoto, Close } from "@material-ui/icons";
import ReactCrop from "react-image-crop";
import { char_set } from "../utils/container";
import { correctFontName, display_image } from "../utils/functions";
import { getCroppedSvg, getCroppedImg } from "../utils/functions";
import { set_svg_operations, display_svg_main } from "../utils/functions";
import { traceCroppedImg, Font } from "../utils/functions";
import TextField from "@material-ui/core/TextField";
import "react-image-crop/dist/ReactCrop.css";
import "../assets/styles/dialog.css";

const TitleDialog = (props) => {
  const text_value = () => {
    return (
      <span>
        Crop character -- <span id="char">{char_set[props.value].char}</span>
      </span>
    );
  };

  return (
    <DialogTitle id="simple-dialog-title">
      {props.title ? "Choose your main image" : text_value()}
      <Close id="close-btn" onClick={props.handleClose} />
    </DialogTitle>
  );
};

const PreviewImage = (props) => {
  const handleChange = (event) => {
    if (event.target.files[0] != null) {
      props.setImageFile({
        file: URL.createObjectURL(event.target.files[0]),
        name: event.target.files[0].name,
      });
    }
  };

  return (
    <Grid id="preview" item xs={12}>
      <input
        accept="image/*"
        id="file-upload"
        onChange={handleChange}
        type="file"
      />
      <label htmlFor="file-upload">
        <div>
          {props.imageFile.file === null ? (
            <InsertPhoto />
          ) : (
            <img src={props.imageFile.file} />
          )}
        </div>
      </label>
    </Grid>
  );
};

const PreviewFont = (props) => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(12);
  const [lspace, setLspace] = useState(2);
  const [wspace, setWspace] = useState(12);

  const handleText = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <TextField
        id="font-text-field"
        value={text}
        onChange={handleText}
        label="Type here"
        variant="outlined"
        multiline
        rows={4}
      />
      <TextField
        id="font-text-field"
        value={text}
        variant="outlined"
        label="Preview Font"
        inputProps={{
          style: {
            fontFamily: props.fontName,
            fontSize: size,
            letterSpacing: lspace,
            wordSpacing: wspace,
          },
        }}
        disabled={true}
        multiline
        rows={4}
      />
      <div style={{ margin: "0 20px" }}>
        <h4>Font-Size:</h4>
        <Slider
          defaultValue={size}
          onChange={(e, v) => setSize(v)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          min={10}
          max={50}
        />
        <h4>Letter-Spacing:</h4>
        <Slider
          defaultValue={lspace}
          onChange={(e, v) => setLspace(v)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          min={-9}
          max={9}
        />
        <h4>Word-Spacing:</h4>
        <Slider
          defaultValue={wspace}
          onChange={(e, v) => setWspace(v)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          min={0}
          max={30}
        />
      </div>
    </>
  );
};

const FileName = (props) => {
  return (
    <p id="controls-text">
      {props.imageFile.file === null
        ? "Make sure you choose the image in the correct format (1500 x 750). Please refer the sample image for the same."
        : props.imageFile.name}
    </p>
  );
};

const FileInput = () => {
  return (
    <>
      <input accept="image/*" id="file-upload" type="file" />
      <label htmlFor="file-upload">
        <span id="btn-upload">Choose File</span>
      </label>
    </>
  );
};

const ButtonSave = (props) => {
  return (
    <button id="btn-save" onClick={props.handleShow}>
      Save
    </button>
  );
};

const ButtonRetake = (props) => {
  return (
    <button id="btn-retake" onClick={props.handleShow}>
      Reset Image
    </button>
  );
};

const ButtonNext = (props) => {
  const btn_next = () => {
    if (props.id == 1) {
      return (
        <button id="btn-next" onClick={props.handleShow}>
          Next
        </button>
      );
    } else if (props.id == 2) {
      return (
        <button
          id="btn-next"
          disabled={props.disabled}
          style={props.opacity}
          onClick={props.handleNext}>
          Next
        </button>
      );
    }
  };
  return <>{btn_next()}</>;
};

const ResponsiveButtons = (props) => {
  const show_Button = () => {
    if (props.id === 1) {
      return (
        <>
          <FileName imageFile={props.imageFile} />
          <FileInput />
          <ButtonNext id={props.id} handleShow={props.handleShow} />
        </>
      );
    } else if (props.id === 2) {
      return (
        <>
          <ButtonSave handleShow={props.handleShow} />
          <ButtonNext
            id={props.id}
            disabled={props.disabled}
            opacity={props.opacity}
            handleNext={props.handleNext}
          />
          <ButtonRetake handleShow={props.handleReset} />
        </>
      );
    }
  };

  return (
    <Grid id="controls-container" item xs={12}>
      <div id="controls">{show_Button()}</div>
    </Grid>
  );
};

const ResultPreview = (props) => {
  return (
    <Grid container>
      {props.result && (
        <div id="croped-image">
          <img src={props.result} alt="cropped image" />
          <hr />
          <hr />
          <hr />
        </div>
      )}
      {props.result && (
        <div id="svg-preview">
          <div id="svg"></div>
          <hr />
          <hr />
          <hr />
        </div>
      )}
    </Grid>
  );
};

const Controls = (props) => {
  const [vector, setVector] = useState(props.result);
  const [view, setView] = useState(true);
  const [opacity, setOpacity] = useState({ opacity: 0.5 });

  const set_svg = () => {
    getCroppedSvg(vector);
  };

  const set_preview = () => {
    traceCroppedImg(props.thresholdValue, props.result, setVector);
    setView(false);
    setOpacity({ opacity: 1 });
  };

  const set_img = () => {
    display_image(props.setShow, props.setDisabled, props.setOpacity);
  };

  const save_svg = () => {
    set_svg_operations(
      props.setDisabled,
      props.setOpacity,
      props.setOpen,
      props.setShow
    );
    display_svg_main(vector, props.value);
  };

  return (
    <>
      <Grid container id="slider">
        <Slider
          defaultValue={props.thresholdValue}
          onChange={(e, v) => props.setThreshold(v)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          min={50}
          max={250}
        />
      </Grid>
      <button id="btn-one" onClick={set_preview}>
        Preview
      </button>
      <button id="btn-two" onClick={set_img}>
        Re-take
      </button>
      <button id="btn-three" style={opacity} disabled={view} onClick={save_svg}>
        Save
      </button>
      <button id="btn-four" onClick={set_svg}>
        Vector
      </button>
    </>
  );
};

const MainImageDialog = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleShow = () => {
    props.imageFile.file != null ? props.setShow(false) : props.setShow(true);
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}>
      <TitleDialog title={true} handleClose={handleClose} />
      <Grid container>
        <PreviewImage
          imageFile={props.imageFile}
          setImageFile={props.setImageFile}
        />
        <ResponsiveButtons
          id={1}
          imageFile={props.imageFile}
          handleShow={handleShow}
        />
      </Grid>
    </Dialog>
  );
};

const CropImageDialog = (props) => {
  const [thresholdValue, setThreshold] = useState(80);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [opacity, setOpacity] = useState({ opacity: 0.5 });
  const [show, setShow] = useState(true);

  const handleClose = () => {
    props.setOpen(false);
    display_image(setShow, setDisabled, setOpacity);
  };

  const handleShow = () => {
    getCroppedImg(image, crop, setResult);
    if (result != null) {
      setDisabled(false);
      setOpacity({ opacity: 1 });
    }
  };

  const handleImage = (event) => {
    if (event.target.files[0] != null) {
      props.setImageFile({
        file: URL.createObjectURL(event.target.files[0]),
        name: event.target.files[0].name,
      });
    }
  };

  const handleReset = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = handleImage;
  };

  const handleNext = () => {
    if (!disabled) {
      setShow(false);
    }
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={props.open}>
      <TitleDialog
        title={false}
        handleClose={handleClose}
        value={props.value}
      />
      {show ? (
        <>
          <ReactCrop
            src={props.imageFile.file}
            crop={crop}
            onImageLoaded={setImage}
            onChange={(newCrop) => setCrop(newCrop)}
          />
          <ResponsiveButtons
            id={2}
            disabled={disabled}
            handleReset={handleReset}
            handleNext={handleNext}
            handleShow={handleShow}
            opacity={opacity}
            setOpacity={setOpacity}
          />
        </>
      ) : (
        <>
          <ResultPreview result={result} />
          <p id="controls-text">
            <strong>Note</strong>: Align all the characters properly to get the
            best result.
          </p>
          <Controls
            image={image}
            value={props.value}
            crop={crop}
            setShow={setShow}
            setOpen={props.setOpen}
            result={result}
            setDisabled={setDisabled}
            setResult={setResult}
            setOpacity={setOpacity}
            thresholdValue={thresholdValue}
            setThreshold={setThreshold}
          />
        </>
      )}
    </Dialog>
  );
};

const CreateFontDialog = (props) => {
  const [fontName, setFontName] = useState("");
  const [value, setValue] = useState(true);
  const [link, setLink] = useState(null);
  const [style, setStyle] = useState({
    wspace: 12,
    lspace: 2,
  });

  const handleClose = () => {
    props.setShowFont(false);
  };

  const handleChange = (event) => {
    setFontName(event.target.value);
  };

  const handleClick = () => {
    setFontName(correctFontName(fontName));
    setValue(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.showFont}>
      <DialogTitle id="simple-dialog-title">
        <span id="font-title">Create Your Font File</span>
        <Close id="close-btn" onClick={handleClose} />
      </DialogTitle>
      <div id="font-name-container">
        {value ? (
          <TextField
            id="font-name-field"
            onChange={handleChange}
            label="Font Name"
            variant="outlined"
          />
        ) : (
          <>
            <Font
              name={fontName}
              icon={char_set}
              setLink={setLink}
              style={style}
            />
            <PreviewFont fontName={fontName} style={style} />
          </>
        )}
      </div>
      {value ? (
        <div id="font-next-container" onClick={handleClick}>
          <button id="btn-next">Next</button>
        </div>
      ) : (
        <>
          <button id="btn-download">
            <a id="download-link" href={`${link}`} download={`${fontName}.ttf`}>
              Download
            </a>
          </button>
        </>
      )}
    </Dialog>
  );
};

export { MainImageDialog, CropImageDialog, CreateFontDialog };
