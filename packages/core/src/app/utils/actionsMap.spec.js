import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import * as searchWidget from './layoutWidgets/searchWidgets';
import searchActionDefinition from '../components/pages/Search/config/searchActionDefinitions';
import actionsMap, { pageCategoryActions } from './actionsMap';

searchWidget.default = jest.fn();

/** @test {actionsMap} */
describe('core ActionsMap', () => {
  it('should actionsMap[type] to be set', () => {
    const type = widgetTypes.SEARCH_WIDGET_BODY;

    expect(actionsMap[type]).toEqual({
      action: expect.any(Function),
      extractor: expect.any(Function),
    });
  });

  it('should actionMap call "fetchResults"', () => {
    const type = widgetTypes.SEARCH_WIDGET_BODY;
    const fetchResultsSpy = jest.spyOn(searchActionDefinition, 'fetchResults');
    global.fetch = jest.fn(() => ({
      json: () => Promise.resolve('response'),
      ok: true,
    }));

    expect(actionsMap[type].action()).toEqual(expect.objectContaining({
      payload: expect.any(Object),
    }));
    expect(fetchResultsSpy).toHaveBeenCalled();
  });

  it('should pageCategoryActions set search widgets', () => {
    const data = { widgets: [] };
    const categoryActions = pageCategoryActions[categories.SEARCH];

    expect(categoryActions).toHaveProperty('action', expect.any(Function));
    categoryActions.action(data);
    expect(searchWidget.default).toHaveBeenCalledWith(data);
  });
});
