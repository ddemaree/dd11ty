import { createSignal, createEffect, onMount } from "solid-js";
import "./ImageCompare.css";

export default function ImageCompare({ children }) {
  let wrapperElem, sliderElem, firstImg, secondImg, animateSlider;
  const [percent, setPercent] = createSignal(0.5);

  function updateImageWidths() {
    const firstImgWidth = 1.0 * percent();
    const secondImgWidth = 1.0 - percent();

    firstImg.style.width = `${firstImgWidth * 100}%`;
    secondImg.style.width = `${secondImgWidth * 100}%`;
  }

  onMount(() => {
    const slotElem = wrapperElem.querySelector("astro-slot");

    let eligibleChildren = [];
    slotElem.childNodes.forEach((node) => {
      if (node.tagName === "FIGURE" || node.tagName === "IMG") {
        eligibleChildren.push(node);
      }
      // TODO: If a standalone img, wrap as figure
    });
    [firstImg, secondImg] = eligibleChildren;

    firstImg.classList.add("ic-image", "ic-image-left");
    secondImg.classList.add("ic-image", "ic-image-right");

    const imgDimensions = firstImg.getBoundingClientRect();
    const aspectRatio =
      parseFloat(imgDimensions.height) / parseFloat(imgDimensions.width);

    // Make it responsive
    wrapperElem.style.paddingTop = `${aspectRatio * 100}%`;
    wrapperElem.classList.add("ic-ready");

    updateImageWidths();

    wrapperElem.addEventListener("pointerdown", (e) => {
      e = e || window.event;
      e.preventDefault();
      animateSlider = true;

      const wrapperRect = wrapperElem.getBoundingClientRect();

      wrapperElem.addEventListener("pointermove", (e) => {
        e = e || window.event;
        e.preventDefault();
        const currentX = e.clientX;

        const offsetX = currentX - wrapperRect.x;
        const newPercent = offsetX / wrapperRect.width;

        if (animateSlider) setPercent(newPercent);
      });

      wrapperElem.addEventListener("pointerup", (e) => {
        e = e || window.event;
        e.preventDefault();
        e.stopPropagation();

        animateSlider = false;
      });
    });
  });

  createEffect(() => {
    updateImageWidths();
  });

  return (
    <figure ref={wrapperElem} class="dd-image-compare ic-root">
      <div
        class="ic-slider"
        ref={sliderElem}
        style={{ left: `${percent() * 100}%` }}
      ></div>
      {children}
    </figure>
  );
}
