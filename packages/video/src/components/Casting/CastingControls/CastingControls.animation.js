export const CASTING_ON = 'castingOn';
export const CASTING_OFF = 'castingOff';
export const SHOW = 'show';
export const HIDDEN = 'hidden';

export const variants = {
  castingControls: {
    castingOn: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 55,
        restSpeed: 0.1,
        restDelta: 0.5,
        y: {
          type: 'spring',
          stiffness: 330,
          damping: 35,
        },
      },
    },
    castingOff: {
      y: 50,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 55,
        restSpeed: 0.1,
        restDelta: 0.5,
        y: {
          type: 'spring',
          stiffness: 250,
          damping: 35,
          restSpeed: 1,
        },
      },
    },
  },
  disableScreen: {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 50,
        restSpeed: 0.1,
        restDelta: 0.5,
        staggerChildren: 0.02,
        delayChildren: 0.1,
        y: {
          type: 'spring',
          stiffness: 330,
          damping: 35,
        },
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 55,
        restSpeed: 0.1,
        restDelta: 0.5,
        staggerChildren: 0.02,
        staggerDirection: -1,
        y: {
          type: 'spring',
          stiffness: 250,
          damping: 35,
          restSpeed: 1,
        },
      },
    },
  },
  buttons: {
    show: {
      y: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: -100 },
      },
    },
    hidden: {
      y: 39,
      opacity: 0,
      transition: {
        x: { stiffness: 1000 },
      },
    },
  },
};
