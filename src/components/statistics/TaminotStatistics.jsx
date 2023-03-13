import React, { useState, useEffect } from "react";
import { StyledStatistics } from "./StyledStatistics";

export default function TaminotStatistics({ staticsType }) {
  const [isZoom, setIsZoom] = useState("");
  const [zoomX, setZoomX] = useState("");
  const [scrollY, setScrollY] = useState(0);

  // image download
  // function downloadImage(imageSrc) {
  //   let imgURL = imageSrc
  //     .split("/o/")[1]
  //     .split("%2F")
  //     .join("/")
  //     .split("?alt=")[0];

  //   fetch(url, { mode: "no-cors" })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       console.log(blob);
  //       const fileURL = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = fileURL;
  //       link.download = "check.png";
  //       link.click();
  //     });
  // }

  useEffect(() => {
    const handleScroll = () => {
      if (!isZoom) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isZoom]);

  useEffect(() => {
    if (!isZoom) {
      window.scrollTo(0, scrollY);
    }
  }, [isZoom]);

  return (
    <StyledStatistics className="statistcs__wrapper">
      {JSON.parse(
        localStorage.getItem(
          staticsType === "oziqOvqatChiqim"
            ? "oziqOvqatChiqim"
            : "korxonaUchunChiqim"
        )
      )?.map((i, idx) => (
        <div
          key={i.kiritilganSana + idx}
          className={(isZoom ? "openImg " : "") + "action__wrapper"}
        >
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
              {/* <li>
                <i
                  onClick={() => downloadImage(isZoom)}
                  className="icon fa-sharp fa-solid fa-download"
                ></i>
              </li> */}
              <li>
                <i
                  onClick={() => {
                    setIsZoom("");
                    setZoomX("");
                  }}
                  className="icon fa-regular fa-circle-xmark"
                ></i>
              </li>
            </ul>
          </nav>
          <div className={(zoomX ? zoomX : "") + "img__wrapper"}>
            <img
              onClick={() =>
                zoomX === "zoomX2 "
                  ? setZoomX("")
                  : zoomX === "zoomX "
                  ? setZoomX("zoomX2 ")
                  : setZoomX("zoomX ")
              }
              src={isZoom}
              alt="check"
              id="myimg"
              className={(zoomX ? zoomX : "") + "img-full"}
            />
          </div>
        </div>
      ) : null}
    </StyledStatistics>
  );
}
