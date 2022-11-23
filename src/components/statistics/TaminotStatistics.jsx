import React, { useState } from "react";
import { StyledStatistics } from "./StyledStatistics";

export default function TaminotStatistics({ staticsType }) {
  const [isZoom, setIsZoom] = useState("");
  const [zoomX, setZoomX] = useState("");

  function downloadImage(imageSrc) {
    fetch(imageSrc).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "check";
        alink.click();
      });
    });
  }

  return (
    <StyledStatistics className="statistcs__wrapper">
      {JSON.parse(
        localStorage.getItem(
          staticsType === "oziqOvqatChiqim"
            ? "oziqOvqatChiqim"
            : "korxonaUchunChiqim"
        )
      )?.map((i, idx) => (
        <div key={i.kiritilganSana + idx} className="action__wrapper">
          <div className="top">
            <p>{i.kiritilganSana}</p>
            <p>{i.masulShaxs}</p>
          </div>
          <div className="body">
            <div className="left">
              <h3 className="title">{i.chiqim + " so'm "}</h3>
              <i className="icon icon-arrow-up-down red"></i>
            </div>
            <div className="right">
              <img
                onClick={() => setIsZoom(i.check)}
                src={i.check}
                alt={"check-" + idx + 1}
                className="img"
              />
            </div>
          </div>
        </div>
      ))}

      {isZoom ? (
        <div className="image-full-size">
          <nav className="full-img-navbar">
            <ul>
              <li>
                <a href={isZoom} download>
                  Open
                </a>
              </li>
              <li>
                <i
                  onClick={() => downloadImage(isZoom)}
                  className="icon fa-sharp fa-solid fa-download"
                ></i>
              </li>
              <li>
                <i
                  onClick={() => setIsZoom("")}
                  className="icon fa-regular fa-circle-xmark"
                ></i>
              </li>
            </ul>
          </nav>
          <img
            onDoubleClick={() =>
              zoomX === "zoomX2 "
                ? setZoomX("")
                : zoomX === "zoomX "
                ? setZoomX("zoomX2 ")
                : setZoomX("zoomX ")
            }
            src={isZoom}
            alt="check"
            className={(zoomX ? zoomX : "") + "img-full"}
          />
        </div>
      ) : null}
    </StyledStatistics>
  );
}
