import { shallow } from 'enzyme';
import Loadable from 'react-loadable';

import ContentCarousel from '@univision/fe-components-base/dist/components/widgets/ContentCarousel';
import ImageItems from 'components/widgets/ImageItems/ImageItems';

import contentWidgetFactory from './contentWidgetFactory';

jest.mock('@univision/fe-components-base/dist/components/widgets/ContentCarousel', () => ({
  __esModule: true,
  default: 'ContentCarousel',
}));
jest.mock('components/widgets/ImageItems/ImageItems', () => ({
  __esModule: true,
  default: 'ImageItems',
}));
jest.mock('react-lazyload', () => jest.fn(c => c.children));

jest.mock('@univision/fe-commons/dist/config/features/content', () => ({
  isSpaEnabled: () => true,
  shouldForceSpa: () => false,
}));

let data;
beforeEach(() => {
  data = {
    widgets: [{
      settings: {
        genericWidget: {
          type: 'ContentCarouselWidget',
        },
      },
      contents: [],
    }, {
      settings: {
        genericWidget: {
          type: 'ImageItems',
        },
      },
      contents: [],
    }],
  };
});

describe('contentWidgetFactory', () => {
  it('returns an array of widgets', async () => {
    const value = contentWidgetFactory(data);
    await Loadable.preloadAll();
    expect(value).toHaveLength(2);
    expect(shallow(value[0]).dive().type()).toEqual(ContentCarousel);
    expect(shallow(value[1]).dive().type()).toEqual(ImageItems);
  });

  it('returns an array of widgets - lazyLoading = false', async () => {
    const value = contentWidgetFactory(data, false);
    await Loadable.preloadAll();
    expect(value).toHaveLength(2);
    expect(shallow(value[0]).children().dive().find(ContentCarousel)).toHaveLength(1);
    expect(shallow(value[1]).children().dive().find(ImageItems)).toHaveLength(1);
  });

  it('aborts if widgets is not an array', () => {
    const value = contentWidgetFactory({});
    expect(value).toEqual(null);
  });

  it('returns null for individual widget if it does not have a type', () => {
    data.widgets[0].settings.genericWidget = {};
    const value = contentWidgetFactory(data);
    expect(value[0]).toEqual(null);
  });

  it('returns the default component when type is not recognized by the application', async () => {
    const dataWithUnknownWidget = {
      widgets: [{
        settings: {
          genericWidget: {
            type: 'YouDontKnowMe',
          },
        },
        contents: [],
      }],
    };

    const value = contentWidgetFactory(dataWithUnknownWidget, false);
    await Loadable.preloadAll();
    expect(shallow(value[0]).children().dive().find(ImageItems)).toHaveLength(1);
    expect(value).toHaveLength(1);
  });
});
