export const toastVariants = {
  initial: {
    bottom: -50,
  },
  active: {
    bottom: 60,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.5,
    },
  },
  exit: {
    bottom: -50,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.5,
      delay: 3,
    },
  },
};
