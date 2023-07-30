import { Variants } from "framer-motion";

export const toggleVariants: Variants = {
  initial: { position: "inherit" },
  close: { position: "fixed", right: 0, top: 38, width: 290, height: 200 },
  open: { right: 0, top: 0, width: "100vw", height: "100vh" },
};

export const lyricsVariants: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  close: {
    y: 0,
    scale: 1,
  },
  open: {
    y: -30,
    scale: 1.1,
  },
};

export const thumbnailVariants: Variants = {
  initial: {
    y: 0,
    scale: 1,
    borderRadius: 10,
  },
  close: {
    y: 0,
    scale: 1,
    borderRadius: 10,
  },
  open: {
    y: -115,
    scale: 1.899,
    borderRadius: 5,
  },
};

export const visualVariants: Variants = {
  initial: {
    opacity: 0,
  },
  active: {
    opacity: 1,
  },
};
