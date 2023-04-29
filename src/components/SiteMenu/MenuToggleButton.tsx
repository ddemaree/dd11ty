import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggleButton = ({
  toggle,
}: {
  toggle: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="relative z-50 flex h-12 w-12 select-none place-content-center place-items-center rounded-full bg-transparent"
      onClick={toggle}
    >
      <motion.svg width="23" height="23" viewBox="0 0 23 23">
        <g className="fill-current stroke-current">
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </g>
      </motion.svg>
    </button>
  );
};

export default MenuToggleButton;
