import createTimer from '.';

jest.useFakeTimers();

describe('Timer util tests', () => {
  it('calls the callback after 3 seconds', () => {
    const callback = jest.fn();
    createTimer(3, callback);
    jest.runTimersToTime(3000);
    expect(callback.mock.calls.length).toBe(1);
  });

  it('restarts a paused timer', () => {
    const callback = jest.fn();
    const timer = createTimer(1, callback);
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(1);
    timer.stop();
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(1);
    timer.start();
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(2);
  });

  it('doesnt call the callback when the timer is paused', () => {
    const callback = jest.fn();
    const timer = createTimer(1, callback);
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(1);
    timer.stop();
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(1);
  });

  it('should reinit the timer when update is called', () => {
    const callback = jest.fn();
    const timer = createTimer(1, callback);
    timer.update(1);
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(1);
  });

  it('should not reinit the timer when update is called if paused', () => {
    const callback = jest.fn();
    const timer = createTimer(1, callback);
    timer.stop();
    timer.update(1);
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(0);
  });

  it('clears a timer when cancel method is called', () => {
    const callback = jest.fn();
    const timer = createTimer(1, callback);
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(1);
    timer.cancel();
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toBe(1);
  });

  it('should call the onTick callback', () => {
    const onNext = jest.fn();
    const onTick = jest.fn();
    const timer = createTimer(5, onNext, onTick);
    timer.update(1);
    jest.runOnlyPendingTimers();
    expect(onTick).toHaveBeenCalled();
  });
});
