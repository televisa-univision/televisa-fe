import React from 'react';
import { mount, shallow } from 'enzyme';
import Loadable from 'react-loadable';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import AmpShareBar from '../../sharebar/AmpShareBar';

import AmpRawHtml from '../../widgets/AmpRawHtml';
import Article from './AmpArticle';
import ArticleBody from './ArticleBody/AmpArticleBody';

jest.mock('@univision/fe-commons/dist/assets/images/radio-default-360.jpg', () => jest.fn(() => 'default.jpg'));

let props;
beforeEach(() => {
  props = {
    radioStation: {
      nowPlayingId: '345',
      abacast: {
        id: '123',
      },
    },
    page: {
      articleType: 'standard',
      brandable: {},
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
      body: [{}],
    },
  };
});

describe('Article tests', () => {
  it('renders as expected', async () => {
    await Loadable.preloadAll();
    const wrapper = mount(<Article {...props} />);
    expect(wrapper.find(ArticleBody)).toHaveLength(1);
    expect(wrapper.find(AmpShareBar)).toHaveLength(1);
  });
  it('should render RecipeMicrodata if the articleType is Recipe', () => {
    props.page.articleType = 'recipe';
    const wrapper = shallow(<Article {...props} />).dive();
    expect(wrapper.find('RecipeMicrodata')).toHaveLength(1);
  });
  it('renders empty div if not page', () => {
    const wrapper = shallow(<Article page={null} />);
    expect(wrapper.contains(<div />)).toBe(true);
  });
  it('renders an AmpRawHtml', () => {
    Store.dispatch(setPageData({ requestParams: { articleRawHtml: '0' } }));
    const wrapper = shallow(<Article {...props} />);
    expect(wrapper.find(AmpRawHtml)).toHaveLength(1);
  });
});
