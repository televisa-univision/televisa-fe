import React from 'react';
import Loadable from 'react-loadable';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

import features from '@univision/fe-commons/dist/config/features';
import ContentList from '@univision/fe-components-base/dist/components/ContentList';

import Article from './Article';

jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());

describe('Article tests', () => {
  let props;

  beforeEach(() => {
    jest.spyOn(features.article, 'infiniteScrolling').mockReturnValue(true);

    props = {
      radioStation: {
        nowPlayingId: '345',
        abacast: {
          id: '123',
        },
      },
      page: {
        articleType: 'standard',
        brandable: {
          type: 'tvstation',
        },
        lead: {
          renditions: {
            '16x9-sm': {
              href: 'https://cdn3.uvnimg.com/dims4/default/1bdc0e0/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2F52%2F9e%2Fb3c59cc947dfba1afc559c027752%2Fgettyimages-803446228.jpg',
            },
          },
        },
        widgets: {},
        secondaryTags: [
          {
            title: 'title',
            link: 'link',
          },
        ],
      },
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders as expected', async () => {
    const wrapper = shallow(<Article {...props} />);
    await Loadable.preloadAll();
    expect(wrapper.find(ContentList)).toHaveLength(1);

    // default type is not radio -> no radio bar
    expect(wrapper.find('LoadableComponent')).toHaveLength(0);
  });

  it('renders as expected with related content', async () => {
    props.page.relatedContent = {
      relatedContent: [{ type: 'article' }],
    };
    const wrapper = shallow(<Article {...props} />);
    await Loadable.preloadAll();
    expect(wrapper.find(ContentList)).toHaveLength(1);

    // default type is not radio -> no radio bar
    expect(wrapper.find('LoadableComponent')).toHaveLength(0);
  });

  it('renders empty div if not page', () => {
    const wrapper = shallow(<Article page={null} />);
    expect(wrapper.contains(<div />)).toBe(true);
  });

  it('should render RecipeMicrodata if the articleType is Recipe', () => {
    props.page.articleType = 'recipe';
    const wrapper = shallow(<Article {...props} />);
    expect(wrapper.find('RecipeMicrodata')).toHaveLength(1);
  });

  it('should render a ContentList component with infinite scrolling enabled', () => {
    const wrapper = shallow(<Article {...props} />);
    const contentListComponent = wrapper.find(ContentList);
    expect(contentListComponent.props()).toEqual(expect.objectContaining({
      infiniteScrollingEnabled: true,
    }));
  });

  it('should render a ContentList component with infinite scrolling disabled for native articles ', () => {
    const componentProps = {
      ...props,
      page: {
        ...props.page,
        tagHierarchy: [{ name: 'contenido patrocinado' }],
      },
    };
    const wrapper = shallow(<Article {...componentProps} />);
    const contentListComponent = wrapper.find(ContentList);
    expect(contentListComponent.props()).toEqual(expect.objectContaining({
      infiniteScrollingEnabled: false,
    }));
  });

  it('should render a ContentList component with infinite scrolling disabled for US pages', () => {
    const componentProps = {
      ...props,
      page: {
        ...props.page,
        userLocation: 'US',
      },
      site: 'univision',
    };
    const wrapper = shallow(<Article {...componentProps} />);
    const contentListComponent = wrapper.find(ContentList);
    expect(contentListComponent.props()).toEqual(expect.objectContaining({
      infiniteScrollingEnabled: false,
    }));
  });

  it('should render Teads ad on article for TUDN and MX users only', () => {
    const componentProps = {
      ...props,
      page: {
        ...props.page,
        userLocation: 'MX',
      },
      site: 'tudn',
    };
    const wrapper = shallow(<Article {...componentProps} />);
    expect(wrapper.find('_class').at(0).props().position).toBe('inline_teads');
  });
});
