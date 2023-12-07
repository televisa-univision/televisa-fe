import epgChannel from './epgChannel';

import {
  DIGITAL_CHANNEL_EPG,
  GRID_WIDGET,
  SINGLE_WIDGET,
} from '../../constants/widgetTypes';

let validArray;

describe('epgChannel helper', () => {
  beforeEach(() => {
    validArray = [
      {
        type: SINGLE_WIDGET,
        breakingNewsMode: true,
      },
      {
        type: DIGITAL_CHANNEL_EPG,
        contents: [
          {
            foo: 'foo',
          },
        ],
      },
      {
        type: GRID_WIDGET,
        contents: [
          {
            test: 'test',
          },
          {
            baz: 'baz',
          },
        ],
      },
    ];
  });
  it('should return the same type of argument if the param is not a valid array', () => {
    expect(epgChannel()).toBeUndefined();
    expect(epgChannel({ test: 'foo' })).toEqual({ test: 'foo' });
  });
  it('should not crash with an invalid array and do fast return', () => {
    const invalidArray = [3, null, undefined];
    expect(epgChannel(invalidArray)).toEqual(invalidArray);
  });
  it('should return a valid result', () => {
    const widgets = epgChannel(validArray);

    expect(widgets).toHaveLength(2);
    expect(widgets[1].type).toEqual(GRID_WIDGET);
    expect(widgets[1].contents).toEqual([{ foo: 'foo' }, { test: 'test' }]);
  });
  it('should fallback to an empty array if the value is not valid', () => {
    validArray[1].contents = null;
    const widgets = epgChannel(validArray);

    expect(widgets[1].contents).toEqual([{ test: 'test' }, { baz: 'baz' }]);
  });
});
