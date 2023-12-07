import extractContentIds from './extractContentIds';

const pageData = {
  widgets: [{
    contents: [{
      uid: 'test',
    }],
  }],
  uid: 'page',
};

const pageDataNoWidgets = {
  uid: 'test',
  widgets: [],
};

const widgetData = [{
  contents: [{
    uid: 'testwidget',
  }],
}];

const pageDataWidgetsNoContent = {
  uid: 'test',
  widgets: [
    { name: 'test' },
  ],
};

describe('extractContentIds', () => {
  it('should return an empty array', () => {
    expect(extractContentIds({})).toEqual([]);
    expect(extractContentIds({ data: {}, isWidget: true })).toEqual([]);
  });
  it('should return a filled array', () => {
    expect(extractContentIds({ data: pageData })).toEqual(['page', 'test']);
    expect(extractContentIds({ data: widgetData, isWidget: true })).toEqual(['testwidget']);
    expect(extractContentIds({ data: pageDataNoWidgets })).toEqual(['test']);
    expect(extractContentIds({ data: pageDataWidgetsNoContent })).toEqual(['test']);
  });
});
