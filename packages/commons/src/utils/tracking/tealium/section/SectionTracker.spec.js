import * as helpers from '../../../helpers';
import gtmManager from '../../googleTagManager/gtmManager';
import SectionTracker, { onMilestone } from './SectionTracker';

import setPageData from '../../../../store/actions/page-actions';
import Store from '../../../../store/store';

let events = [];

beforeEach(() => {
  Store.dispatch(setPageData({ data: { type: 'section' } }));
  events = [];
  spyOn(gtmManager, 'triggerEvent').and.callFake((event) => {
    events.push(event);
  });
});

describe('SectionTracker', () => {
  it('should handle the scrolling event', () => {
    SectionTracker.track(SectionTracker.events.scrolling, {
      milestone: 25,
    });
    expect(events[0].event).toBe('section_25_percent');
  });

  it('onMilestone should trackScrolling passing the visible widget', () => {
    const widgetsContainer = {
      getElementsByClassName: () => [
        {
          offsetHeight: 500,
          getAttribute: () => '5',
        },
      ],
    };

    spyOn(helpers, 'isInViewport').and.returnValue(true);

    onMilestone([50], widgetsContainer);
    expect(events[0].event).toBe('section_50_percent');
    expect(events[0].widget_pos).toEqual('5');
  });

  it('onMilestone should trackScrolling even if there is not visible widget', () => {
    const widgetsContainer = {
      getElementsByClassName: () => [],
    };

    spyOn(helpers, 'isInViewport').and.returnValue(true);

    onMilestone([100], widgetsContainer);
    expect(events[0].event).toBe('section_100_percent');
    expect(events[0].widget_pos).toEqual(0);
  });
});
