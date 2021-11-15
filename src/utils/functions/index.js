import React, { useEffect, useRef } from "react";
import svg2ttf from "svg2ttf";
import SVGIcons2SVGFontStream from "svgicons2svgfont";
import Stream from "stream";
import potrace from "potrace";
import base64 from "base-64";
import { char_set, last_part } from "../container";

const getCroppedImg = (image, crop, setResult) => {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  canvas.toBlob(
    (blob) => {
      try {
        const previewUrl = window.URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(blob);

        window.URL.revokeObjectURL(previewUrl);
        setResult(anchor.href);
      } catch (e) {
        alert("please crop the character first !!");
      }
    },
    "image/png",
    1
  );
};

const getHeightWidth = (svg) => {
  return [
    svg.getAttribute("width"),
    svg.getAttribute("height"),
    svg.getBBox().width,
    svg.getBBox().height,
  ];
};

const createSvgString = (d, minX, minY, width, height) => {
  const string = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minX} ${minY} ${width} ${height}" version="1.1"> <path d="${d}" stroke="none" fill="black" fill-rule="evenodd"></path> </svg>`;
  return string;
};

const first_part = (fontName) => {
  return `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
<svg xmlns="http://www.w3.org/2000/svg">
<defs>
  <font id="demo" horiz-adv-x="1000">
    <font-face font-family="${fontName}"
      units-per-em="1000" ascent="1000"
      descent="0" />
  <missing-glyph horiz-adv-x="0" />`;
};

const getNewSvgElement = (svg) => {
  let [svgWidth, svgHeight, pathWidth, pathHeight] = getHeightWidth(svg);
  let d = svg.childNodes[1].getAttribute("d");
  let newWidth = svgWidth - pathWidth;
  let newHeight = svgHeight - pathHeight;
  let minX = newWidth / 2;
  let minY = newHeight / 2;
  let SvgString = createSvgString(d, minX, minY, newWidth, newHeight);

  return SvgString;
};

const getCroppedSvg = (vector) => {
  const container = document.getElementById("svg-preview");
  const svg = document.getElementById("svg");

  setTimeout(() => {
    container.style.display = "inline";
    svg.innerHTML = vector;
  }, 100);
};

const traceCroppedImg = (thresholdValue, result, setVector) => {
  const trace = new potrace.Potrace();
  trace.setParameters({
    threshold: thresholdValue,
    background: "transparent",
  });
  trace.loadImage(result, function (err) {
    if (err) console.log(err);
    setVector(trace.getSVG());
  });

  setTimeout(() => {
    document.getElementById("btn-four").click();
  }, 100);
};

const display_image = (setShow, setDisabled, setOpacity) => {
  setShow(true);
  setDisabled(true);
  setOpacity({ opacity: "50%" });
};

const display_svg_main = (vector, index) => {
  let svg_container = document.getElementById(String(index));
  let char = document.getElementById(`char${index}`);
  const svg = document.getElementById("svg");

  svg_container.innerHTML = vector;
  char.style.display = "none";

  char_set[index].svg = getNewSvgElement(svg.childNodes[0]);
};

const set_svg_operations = (setDisabled, setOpacity, setOpen, setShow) => {
  setDisabled(true);
  setOpacity({ opacity: "50%" });
  setOpen(false);
  setShow(true);
};

const glyphToSvgFont = async (font, options, fontName) => {
  const fontStream = new SVGIcons2SVGFontStream({
    fontName: fontName,
    fontHeight: 1000,
    round: 3,
    normalize: true,
    ...options,
  });

  const streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk) => {
        chunks.push(chunk);
      });
      stream.on("error", reject);
      stream.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf8"));
      });
    });
  };

  const result = streamToString(fontStream);

  const glyph = Object.assign(new Stream(), {
    readable: true,
    writable: true,
    metadata: {
      unicode: [font.unicode],
      name: font.name,
    },
  });

  fontStream.write(glyph, "utf-8");
  glyph.emit("data", font.svg);
  glyph.emit("close");
  glyph.emit("end");
  fontStream._flush((r) => console.log({ r }));
  fontStream.emit("end");
  fontStream.end();

  return result;
};

const glyphToBase64TTF = async (svg, options, setLink, name) => {
  let center_part = ``;
  for (let i = 0; i < svg.length; i++) {
    let result = await glyphToSvgFont(svg[i], options, name);
    result = getGlyph(result);
    center_part = center_part + result;
  }
  let new_Svg = first_part(name) + center_part + last_part;
  let new_result = base64.encode(svg2ttf(new_Svg, {}));
  setLink("data:font/truetype;charset=utf-8;base64," + new_result);
  return new_result;
};

const convertToStyle = async (name, svg, setLink, style) => {
  return `
      @font-face {
        font-family: '${name}';
        src: url(data:font/truetype;charset=utf-8;base64,${await glyphToBase64TTF(
          svg,
          {},
          setLink,
          name
        )}) format('truetype');
        font-weight: normal;
        font-style: normal;
        letter-spacing: ${style.lspace}px;
        word-spacing: ${style.wspace}px;
    }`;
};

const Font = ({ icon, name, setLink, style }) => {
  const ref = useRef(null);
  useEffect(() => {
    convertToStyle(name, icon, setLink, style).then((css) => {
      if (ref.current) {
        ref.current.innerHTML = css;
      }
    });
  }, [icon, name]);
  return <style ref={ref} />;
};

const isSvgFull = (s) => {
  for (let i = 0; i < s.length; i++) {
    if (s[i].svg === "") {
      return false;
    }
  }
  return true;
};

const getGlyph = (string) => {
  let glyph = ``;
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "<") {
      count++;
    }
    if (count === 8) {
      glyph = glyph + string[i];
    }
  }
  return glyph;
};

const correctFontName = (string) => {
  let name = string.toLowerCase();

  if (name[0] === name[0].toLowerCase()) {
    name = name.replace(name[0], name[0].toUpperCase());
  }

  for (let i = 0; i < string.length; i++) {
    if (name[i] == " ") {
      if (name[i + 1] != null && name[i + 1] === name[i + 1].toLowerCase()) {
        if (name[i + 1] != "n") {
          name = name.replace(name[i + 1], name[i + 1].toUpperCase());
        }
      }
    }
  }

  name = name.replace(/_/g, "-");
  name = name.replace(/\s/g, "-");

  return name;
};

export { getCroppedImg, traceCroppedImg, getCroppedSvg, Font };
export { display_image, set_svg_operations, display_svg_main };
export { isSvgFull, getGlyph, correctFontName };
