/**
 * @module PrendeTV DownaloadMenu animation settings
 */
/**
 * Default transition
 * @type {object}
 */
export const DEFAULT_TRANSITION = {
  damping: 50,
  restDelta: 0.5,
  restSpeed: 0.1,
  stiffness: 600,
  type: 'spring',
};

/**
 * Hide speed settings
 * @type {object}
 */
export const HIDE_SPEED = {
  damping: 80,
  restDelta: 0.5,
  restSpeed: 0.5,
  stiffness: 1500,
  type: 'spring',
  x: {
    damping: 35,
    restSpeed: 20,
    stiffness: 250,
    type: 'spring',
  },
};

/**
 * Hide speed settings
 * @type {object}
 */
export const SHOW_SPEED = {
  damping: 100,
  restDelta: 0.5,
  restSpeed: 0.1,
  stiffness: 700,
  type: 'spring',
  x: {
    damping: 35,
    stiffness: 330,
    type: 'spring',
  },
};

/**
 * mobile show properties
 * @type {object}
 */
const MOBILE_IN = {
  y: 0,
};

/**
 * mobile hide properties
 * @type {object}
 */
const MOBILE_OUT = {
  y: '-100vh',
};

/**
 * desktop show properties
 * @type {object}
 */
const DESKTOP_IN = {
  scale: 1,
  x: 0,
  y: 0,
};

/**
 * desktop hide properties
 * @type {object}
 */
const DESKTOP_OUT = {
  scale: 0,
  x: 50,
  y: -125,
};

/**
 * mobile animation settings
 * @type {ojbect}
 */
export const MOBILE_ANIMATION = {
  animate: MOBILE_IN,
  exit: MOBILE_OUT,
  initial: MOBILE_OUT,
};

/**
 * desktop animation settings
 * @type {ojbect}
 */
export const DESKTOP_ANIMATION = {
  animate: DESKTOP_IN,
  exit: DESKTOP_OUT,
  initial: DESKTOP_OUT,
};
