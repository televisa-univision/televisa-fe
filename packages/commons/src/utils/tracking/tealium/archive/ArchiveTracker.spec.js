import Tracker from '../Tracker';
import ArchiveTracker from './ArchiveTracker';

describe('ArchiveTracker test', () => {
  let fireEventSpy;

  beforeEach(() => {
    fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the click event', () => {
    ArchiveTracker.track(ArchiveTracker.events.click);

    expect(fireEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ event: 'view_screen' })
    );
  });
});
