import React from "react";
import "../assets/styles/guide.css";
import sample_image from "../assets/images/sample-image.png";
import result_font from "../assets/images/resulted-font.png";
import traced_image from "../assets/images/traced-image.png";

const Guide = () => {
  return (
    <div id="guide-container">
      <h3>Step: 1</h3>
      <p>
        If you are working on PC you should choose an image that contains all
        the characters. For same you can refer{" "}
        <a href={sample_image} download>
          {" "}
          sample image
        </a>{" "}
        or else you can choose single character per image on small screens like
        mobile phones.
      </p>
      <h3>Step: 2</h3>
      <p>
        Once, you select an image click on next and you will render to the main
        screen where you need to set all the characters one by one. By just
        clicking on the letter-box it will open a dialog for you.
      </p>
      <h3>Step: 3</h3>
      <p>
        Once the dialog opens you need to crop your image properly or if you'r
        using smart phone you can reset to one character image at a time by
        clicking on reset image button. Save your cropped image and click on
        next.
      </p>
      <h3>Step: 4</h3>
      <p>
        Once, you cropped your image it will show you the another dialog where
        you have to check if cropped character/image align properly or not.
        Further you can reset your cropping of image.
      </p>
      <h3>Step: 5</h3>
      <p>
        Move that slider back-and-forth and click on preview button, and adjust
        your setting according to your needs. Here you have to note down one
        thing carefully, that you have to preview your character with open-ended
        path.
      </p>
      <div id="guide-image">
        <div id="guide-preview-div">
          <img src={traced_image} alt="traced-image" />
          <p>A. Traced Font </p>
        </div>
        <div id="guide-result-div">
          <img src={result_font} alt="resulted-image" />
          <p>B. Resultant Font </p>
        </div>
      </div>
      <br />
      <p>
        In Image (A) You can see it has no open-ended path anywhere, so the
        resultant font will be filled character like in the Image (B).
      </p>
      <h3>Step: 6</h3>
      <p>
        You need to do this process with all the other remaining letter-box.
        Once done, you will see a create font button at the bottom the page.
      </p>
      <h3>Step: 7</h3>
      <p>
        You neeed to provide your new font name once you click on create font
        button.
      </p>
      <h3>Step: 8</h3>
      <p>
        Once you save the font name, it will show the dialog where you can check
        your created font by typing in the first box, will show the preview in
        the second box. adjust setting accordingly with sliders and finally
        download your font.
      </p>
      <h3>Step: 9</h3>
      <p>
        Once you download the font, it will give .ttf file where you can use it
        in your device by just installing the font.
      </p>
    </div>
  );
};

export default Guide;
