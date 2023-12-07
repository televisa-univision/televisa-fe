import Tracker from '../Tracker';

/**
 * Archive Tracker
 */
class ArchiveTracker extends Tracker {
  /**
   * Constructor method
   */
  constructor() {
    super({
      click: ArchiveTracker.trackClick,
    });
  }

  /**
   * Tracks clicks in archive
   */
  static trackClick() {
    const utagData = {
      event: 'view_screen',
    };
    Tracker.fireEvent(utagData);
  }
}

export default new ArchiveTracker();
