import PostHeader from "@components/PostHeader";
import RandomRollOnScroll from "./RandomRoller";

const POSSIBLE_ROLLS: { [key: string]: string } = {
  rick: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  tariq: "https://www.youtube.com/embed/_caMQpiwiaU",
  poke: "https://www.youtube.com/embed/lOqy8cC72wA",
};

function getRandomRoll() {
  const keys = Object.keys(POSSIBLE_ROLLS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return POSSIBLE_ROLLS[randomKey];
}

export default function OKRRollPage() {
  const roll = getRandomRoll();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <PostHeader
        title="The Complete Guide to OKRs"
        date="2023-04-01T00:00:00"
      />

      <RandomRollOnScroll roll={roll} initialLoad={false} />
    </div>
  );
}
