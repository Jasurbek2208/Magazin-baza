import React, { useState, useEffect } from "react";

// Style
import { StyledStatistics } from "./StyledStatistics";

export default function TaminotStatistics({ staticsType }) {
  const [isZoom, setIsZoom] = useState("");
  const [zoomX, setZoomX] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [backClick, setBackClick] = useState(false);

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

  function resetImg() {
    setIsZoom("");
    setZoomX("");
  }

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
    if (!isZoom) window.scrollTo(0, scrollY);
  }, [isZoom]);

  document.addEventListener("keyup", (e) => {
    if (!isZoom) return;

    if (e.code === "Escape") {
      resetImg();
    }

    if (e.ctrlKey) {

      if (e.key === "+") {
        
        if (!zoomX) {
          setZoomX("zoomX ");

        } else if (zoomX === "zoomX ") {
          setZoomX("zoomX2 ");
        }

      } else if (e.key === "-" && zoomX === "zoomX2 ") setZoomX("");
    }
  });

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
                onClick={() => {
                  setBackClick(false);
                  setIsZoom(i.check);
                }}
                src={i.check}
                alt={"check-" + idx + 1}
                className="img"
              />
            </div>
          </div>
        </div>
      ))}

      {isZoom ? (
        <div
          className="image-full-size"
          onClick={() =>
            window.matchMedia("only screen and (max-width: 760px)").matches
              ? setBackClick((p) => !p)
              : null
          }
        >
          <nav className={(backClick ? "ON " : "") + "full-img-navbar"}>
            <ul>
              <li>
                <i
                  onClick={resetImg}
                  className="icon fa-regular fa-circle-xmark"
                ></i>
              </li>
            </ul>
          </nav>
          <div
            className={
              (zoomX ? zoomX : "") + (backClick ? "ON " : "") + "img__wrapper"
            }
          >
            <img
              onClick={() =>
                window.matchMedia("only screen and (max-width: 760px)").matches
                  ? null
                  : zoomX === "zoomX2 "
                  ? setZoomX("")
                  : zoomX === "zoomX "
                  ? setZoomX("zoomX2 ")
                  : setZoomX("zoomX ")
              }
              onDoubleClick={() =>
                !window.matchMedia("only screen and (max-width: 760px)").matches
                  ? null
                  : zoomX === "zoomX2 "
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
