export const EXPLAINER_ID = 'casting_explainer';
export const SHOW = 'show';
export const SKIP = 'skip';
export const HIDDEN = 'hidden';
export const UNDERSTOOD = 'understood';
export const CASTING_IMAGE = 'https://st1.uvnimg.com/0f/a7/6d6070b34ce7b26c87179f983588/controls.png';
export const CASTING_TITLE = 'castingExplainerTitle';
export const CASTING_COPY = 'castingExplainerCopy';
export const TRACK_CLOSING = 'closing';
export const TRACK_UNDERSTOOD = 'entendido';
export const INT_RADIX = 10;

/**
 * Explainer variant to use for framer motion animation with props
 * @param {Object} props - component props
 * @param {bool} [props.showExplainerUp] - if should animate y to up or down
 * @param {bool} [props.showArrowRight] - If should animate x to right
 * @returns {Object}
 */
export const variantExplainer = ({ showExplainerUp, showArrowRight }) => (
  {
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 50,
        restSpeed: 0.1,
        restDelta: 0.5,
        staggerChildren: 0.02,
        delay: 0.05,
        delayChildren: 0.1,
        y: {
          type: 'spring',
          stiffness: 330,
          damping: 35,
        },
        scale: {
          type: 'spring',
          stiffness: 330,
          damping: 35,
        },
      },
    },
    hidden: {
      opacity: 0,
      scale: 0,
      y: showExplainerUp ? -110 : 110,
      x: showArrowRight ? 100 : -100,
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
        scale: {
          type: 'spring',
          stiffness: 250,
          damping: 35,
          restSpeed: 1,
        },
      },
    },
  }
);
export const variants = {
  image: {
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 45,
        scale: {
          type: 'spring',
          stiffness: 330,
          damping: 25,
        },
      },
    },
    hidden: {
      opacity: 0,
      scale: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 45,
        scale: {
          type: 'spring',
          stiffness: 250,
          damping: 35,
        },
      },
    },
  },
  skip: {
    show: {
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 45,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 45,
      },
    },
  },
};
