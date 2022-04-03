import Slideshow from "../components/Slideshow";
import styles from "./index.module.css";

export default function HomePage() {
  const images = [
    "cx/homepage/typekit-office.jpg",
    "demaree-dot-me/images/david-acnh-xmas.jpg",
    "cx/homepage/bar-1.jpg",
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
