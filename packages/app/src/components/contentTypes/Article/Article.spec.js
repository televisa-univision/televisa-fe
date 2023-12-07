import React from 'react';
import { shallow } from 'enzyme';

import Article from '.';
import ArticleContent from './ArticleContent';

describe('Article tests', () => {
  let props;

  beforeEach(() => {
    props = {
      radioStation: {
        nowPlayingId: '345',
        abacast: {
          id: '123',
        },
      },
      pageData: {
        data: {
          articleType: 'standard',
          brandable: {
            type: 'tvstation',
          },
          isInfiniteScrollEnabled: true,
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
      },
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders as expected', () => {
    const wrapper = shallow(<Article {...props} />);
    expect(wrapper.find('ContentList')).toHaveLength(1);
    expect(wrapper.find('Connect(GlobalWidget)')).toHaveLength(1);
  });

  it('should not enable infiniteScroll if page is horoscope as expected', () => {
    const newProps = { ...props };
    newProps.pageData.data.pageCategory = 'horoscopos';
    const wrapper = shallow(<Article {...newProps} />);
    expect(wrapper.find('ContentList')).toHaveLength(1);
    expect(wrapper.find('Connect(GlobalWidget)')).toHaveLength(1);
  });

  it('renders as expected with related content', () => {
    props.pageData.data.relatedContent = {
      relatedContent: [{ type: 'article' }],
    };
    const wrapper = shallow(<Article {...props} />);
    expect(wrapper.find(ArticleContent)).toBeDefined();
  });

  it('should not render infinite scroll', () => {
    props.pageData.site = 'univision';
    props.pageData.data.userLocation = 'US';
    const wrapper = shallow(<Article {...props} />);
    expect(wrapper.find(ArticleContent)).toBeDefined();
  });

  it('renders empty div if not page', () => {
    const wrapper = shallow(<Article pageData={null} />);
    expect(wrapper.contains(<div />)).toBe(true);
  });

  it('should render RecipeMicrodata if the articleType is Recipe', () => {
    props.pageData.data.articleType = 'recipe';
    const wrapper = shallow(<Article {...props} />);
    expect(wrapper.find('RecipeMicrodata')).toHaveLength(1);
  });
});
