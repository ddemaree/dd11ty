import Slideshow from "../components/Slideshow";
import styles from "./index.module.css";

export default function HomePage() {
  const images = [
    ["cx/homepage/typekit-office.jpg", { "object-position": "40% 50%" }],
    [
      "demaree-dot-me/images/david-acnh-xmas.jpg",
      { "object-position": "65% 50%" },
    ],
    ["cx/homepage/bar-1.jpg", { "object-position": "77% 50%" }],
  ];

  return (
    <>
      <Slideshow images={images} />
      {/* <div className={styles.heroBox}>
        <p className={styles.heroText}>
          <b>Hi, I’m David.</b>
          I'm a product manager for tech companies, a web developer, and a
          writer based in New Jersey, U.S.A.
        </p>
      </div> */}
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      layout: {
        fullBleed: true,
      },
    },
  };
}
