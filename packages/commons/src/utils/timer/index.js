/**
 * Creates a timer
 * @param {number} duration total timer duration in seconds
 * @param {Function} next the callback to change the frame
 * @param {Function} tickCb callback for the status tick
 * @param {number} interval the time between frames in milliseconds
 * @returns {Object}
 */
export default function createTimer(duration, next, tickCb, interval = 1000) {
  const status = {
    tick: 0,
    frame: 0,
    paused: false,
  };

  let timer;
  /**
   * initialize the timer
   */
  const init = () => {
    const timerDuration = duration * 1000;

    timer = setInterval(() => {
      if (!status.paused) {
        if (status.tick + interval < timerDuration) {
          status.tick += interval;
          if (tickCb) tickCb(status.tick);
        } else {
          status.frame += 1;
          status.tick = 0;
          next(status.frame);
        }
      }
    }, interval);
  };

  init();

  return {
    start() { status.paused = false; },
    stop() { status.paused = true; },
    update(idx) {
      status.tick = 0;
      status.frame = idx;

      if (!status.paused) {
        clearInterval(timer);
        init();
      }
    },
    cancel() { clearInterval(timer); },
  };
}
