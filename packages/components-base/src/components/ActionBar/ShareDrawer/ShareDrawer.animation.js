export const OPEN = 'open';
export const CLOSED = 'closed';

export const variants = {
  close: {
    open: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        restDelta: 2,
      },
    },
    closed: {
      scale: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  },
  buttonWrapper: {
    open: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  },
  buttons: {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: 39,
      opacity: 0,
      transition: {
        x: { stiffness: 1000 },
      },
    },
  },
  drawer: {
    open: {
      opacity: 1,
      zIndex: 4,
      transition: {
        type: 'spring',
        stiffness: 100,
        restDelta: 2,
        mass: 0.5,
      },
    },
    closed: {
      opacity: 0,
      zIndex: 2,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        mass: 0.2,
      },
    },
  },
};
