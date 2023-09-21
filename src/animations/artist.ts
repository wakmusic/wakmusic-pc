import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  square: { height: 200 },
  round: { height: 93 },
};

export const artistImageVariants: Variants = {
  square: { width: 140 },
  round: { width: 68 },
};

export const backgroundVariants: Variants = {
  square: { width: 140, height: 180, borderRadius: 8, y: 0 },
  round: { width: 68, height: 68, borderRadius: 100, y: 4 },
};

export const characterVariants: Variants = {
  square: {
    width: 140,
    height: 180,
    y: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    cursor: "auto",
  },
  round: {
    width: 68,
    height: 84,
    y: -12,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    cursor: "pointer",
  },
};

export const contentVariants: Variants = {
  square: { x: 0 },
  round: { x: -8 },
};

export const hiddenVariants: Variants = {
  square: { opacity: 1 },
  round: { opacity: 0, transition: { duration: 0.02 } },
};
