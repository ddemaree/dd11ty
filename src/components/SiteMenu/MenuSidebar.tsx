import { motion, Variants } from "framer-motion";

export default function MenuSidebar({
  menuOpen = false,
}: {
  menuOpen: boolean;
}) {
  const sidebarVariants: Variants = {
    open: {
      clipPath: `circle(1800px at 300px 40px)`,
      bottom: "0px",
      position: "fixed",
      height: "100dvh",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      clipPath: `circle(24px at 300px 40px)`,
      position: "absolute",
      bottom: "60px",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      clipPath: `circle(32px at 300px 40px)`,
      opacity: 0.3,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="top-0 right-0 w-[var(--sidebar-width)] shadow-md bg-red-400 dark:bg-red-800"
      variants={sidebarVariants}
    />
  );
}
