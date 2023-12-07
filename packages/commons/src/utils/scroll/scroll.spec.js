import { getSliderScrollLockRegister } from '.';

describe('Scroll Helpers', () => {
  describe('getSliderScrollLockRegister', () => {
    /**
     * Creates a mock ref to test getSliderScrollLockRegister
     * @param {boolean} options.mockAddEventListener decides if addEventListener
     * should be mocked.
     * @returns {Object}
     */
    const createMockRef = ({ mockAddEventListener = true } = {}) => {
      const listeners = {};
      const addEventListener = mockAddEventListener
        ? jest.fn()
        : (key, callback) => {
          listeners[key] = callback;
        };

      return {
        current: {
          addEventListener,
          removeEventListener: jest.fn(),
        },
        triggerEvent(key, event) {
          listeners[key](event);
        },
      };
    };

    it('should register and clean necessary events', () => {
      const ref = createMockRef();
      const registerSliderScrollLockHandlers = getSliderScrollLockRegister(ref);
      const cleanup = registerSliderScrollLockHandlers(ref);
      cleanup();

      expect(ref.current.addEventListener).toHaveBeenCalledTimes(2);
      expect(ref.current.addEventListener).toHaveBeenNthCalledWith(
        1,
        'touchstart',
        expect.any(Function)
      );
      expect(ref.current.addEventListener).toHaveBeenNthCalledWith(
        2,
        'touchmove',
        expect.any(Function),
        { passive: false }
      );
      expect(ref.current.removeEventListener).toHaveBeenCalledTimes(2);
      expect(ref.current.removeEventListener).toHaveBeenNthCalledWith(
        1,
        'touchstart',
        expect.any(Function)
      );
      expect(ref.current.removeEventListener).toHaveBeenNthCalledWith(
        2,
        'touchmove',
        expect.any(Function),
        { passive: false }
      );
    });

    it('should not crash if current ref is not present', () => {
      const ref = createMockRef();
      const registerSliderScrollLockHandlers = getSliderScrollLockRegister(ref);
      delete ref.current;

      expect(() => {
        const cleanup = registerSliderScrollLockHandlers(ref);
        cleanup();
      }).not.toThrow();
    });

    it('should correctly trigger ontouchstart event', () => {
      const ref = createMockRef({ mockAddEventListener: false });
      const registerSliderScrollLockHandlers = getSliderScrollLockRegister(ref);
      registerSliderScrollLockHandlers(ref);

      expect(() => {
        ref.triggerEvent('touchstart', { touches: [{ clientX: 0 }] });
      }).not.toThrow();
    });

    it('should disable vertical scroll when horizontally scrolling', () => {
      const ref = createMockRef({ mockAddEventListener: false });
      const registerSliderScrollLockHandlers = getSliderScrollLockRegister(ref);
      registerSliderScrollLockHandlers(ref);
      ref.triggerEvent('touchstart', { touches: [{ clientX: 0 }] });
      const touchmoveEvent = {
        touches: [{ clientX: 10 }],
        preventDefault: jest.fn(),
      };
      ref.triggerEvent('touchmove', touchmoveEvent);

      expect(touchmoveEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(touchmoveEvent.returnValue).toBe(false);
    });

    it('should not disable vertical scroll if not scrolling horizontally', () => {
      const ref = createMockRef({ mockAddEventListener: false });
      const registerSliderScrollLockHandlers = getSliderScrollLockRegister(ref);
      registerSliderScrollLockHandlers(ref);
      ref.triggerEvent('touchstart', { touches: [{ clientX: 0 }] });
      const touchmoveEvent = {
        touches: [{ clientX: 4 }],
        preventDefault: jest.fn(),
      };
      ref.triggerEvent('touchmove', touchmoveEvent);

      expect(touchmoveEvent.preventDefault).toHaveBeenCalledTimes(0);
      expect(touchmoveEvent.returnValue).toBe(undefined);
    });
  });
});
