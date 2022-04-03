import { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions";
import classNames from "classnames";
import styles from "./Slideshow.module.css";

// Create your instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "demaree",
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

export default function Slideshow({ images }) {
  const delay = 10000;
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);
  const currentImgRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function getImageURL(path) {
    const img = cld.image(path);
    img.resize(Resize.scale(1200));
    return img.toURL();
  }

  const startTimeout = () => {
    return setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
  };

  const handleVisibilityChange = (e) => {
    if (document.hidden) {
      resetTimeout();
    } else {
      startTimeout();
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = startTimeout();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      resetTimeout();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentIndex]);

  useEffect(() => {
    const wrapperElem = wrapperRef.current;
    const existingImage = currentImgRef.current;

    const currImg = document.createElement("img");
    const imgWrap = document.createElement("span");
    imgWrap.classList.add(styles.imageWrap);
    currImg.classList.add(styles.imageLoading);
    currImg.onload = () => currImg.classList.remove(styles.imageLoading);

    const [imgPath, imgStyles] = images[currentIndex];
    currImg.src = getImageURL(imgPath);
    currImg.oncontextmenu = (e) => false;

    if (imgStyles) {
      for (const key in imgStyles) {
        if (Object.hasOwnProperty.call(imgStyles, key)) {
          const element = imgStyles[key];
          currImg.style.setProperty(key, element);
        }
      }
    }

    if (existingImage) {
      imgWrap.classList.add(styles.nextImage);

      imgWrap.onanimationend = () => {
        imgWrap.classList.remove(styles.nextImage);
        wrapperElem.removeChild(existingImage);
      };
    }

    imgWrap.appendChild(currImg);
    wrapperElem.appendChild(imgWrap);
    currentImgRef.current = imgWrap;
  }, [currentIndex]);

  return (
    <div
      ref={wrapperRef}
      className={classNames([
        "w-full h-[100vh] bg-slate-800 relative overflow-hidden",
        styles.slideshowContainer,
      ])}
    />
  );
}
