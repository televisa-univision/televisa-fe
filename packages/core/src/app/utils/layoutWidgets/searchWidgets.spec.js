import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import searchWidget from './searchWidgets';

/** @test {searchWidget} */
describe('searchWidget test', () => {
  it('should returns array with valid widgets', () => {
    const widgets = searchWidget();
    expect(widgets[0]).toEqual(expect.objectContaining({
      type: widgetTypes.SEARCH_WIDGET_BODY,
      settings: expect.any(Object),
    }));
  });

  it('should extend previous widgets with the new ones', () => {
    const widgets = searchWidget({ widgets: [{ uid: 1 }] });
    expect(widgets).toHaveLength(2);
  });
});
