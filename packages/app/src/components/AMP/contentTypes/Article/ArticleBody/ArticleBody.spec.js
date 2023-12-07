import React from 'react';

import { shallow, mount } from 'enzyme';

import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import { ThemeProvider } from 'styled-components';
import ArticleLead from '../ArticleLead';
import ArticleChunk from '../ArticleChunk';
import {
  OpinionAuthor,
} from './ArticleBody.styles';
import ArticleBody from '.';

jest.mock('../ArticleLead', () => () => <div>lead</div>);
jest.mock('../ArticleChunk', () => () => <div>chunk</div>);
jest.mock('../../../Author', () => () => <div>author</div>);

const mockPageData = { data: {} };

storeHelpers.getPageData = jest.fn((() => mockPageData));

let props;
beforeEach(() => {
  props = {
    uid: 'uid',
    primaryTag: { name: 'topic' },
    title: 'title',
    lead: { type: 'image' },
    body: [{ type: 'text', value: '<p>hello</p>' }, { type: 'text', value: '<p>world</p>' }],
    description: 'test',
    authors: [
      {
        title: 'test',
        image: {
          renditions: {
            '16x9-sm': {
              href: 'test',
            },
          },
        },
      },
    ],
    tempAuthors: [
      {
        fullName: 'Temp',
        company: 'Company',
        designation: 'Publisher',
      },
    ],
    publishDate: new Date().toISOString(),
    secondaryTags: [],
  };
});

describe('ArticleBody tests', () => {
  it('renders a lead when available', () => {
    const wrapper = shallow(<ArticleBody {...props} />);
    expect(wrapper.find(ArticleLead)).toHaveLength(1);
    wrapper.setProps({ lead: null });
    expect(wrapper.find(ArticleLead)).toHaveLength(0);
  });

  it('renders ArticleChunks for each item in body', () => {
    const wrapper = shallow(<ArticleBody {...props} authors={null} tempAuthors={null} />);
    expect(wrapper.find(ArticleChunk)).toHaveLength(props.body.length + 1);
  });

  it('does not fail if body is not defined', () => {
    props.body = null;
    props.description = null;
    const wrapper = shallow(<ArticleBody {...props} />);
    expect(wrapper.find(ArticleChunk)).toHaveLength(0);
  });

  it('should render date and opinion if isOpinionArticle and `optionText` is available', () => {
    const wrapper = mount(<ArticleBody {...props} opinionText="test" isOpinionArticle />);
    expect(wrapper.find('ArticleBodystyles__OpinionAuthor')).toHaveLength(1);
    expect(wrapper.find('ArticleBodystyles__OpinionAuthorAvatar')).toHaveLength(1);
    expect(wrapper.find('ArticleBodystyles__OpinionWrapper')).toHaveLength(1);
  });

  it('should NOT render date and opinion if NOT OpinionArticle', () => {
    const wrapper = shallow(<ArticleBody {...props} opinionText="test" />);
    expect(wrapper.find(OpinionAuthor)).toHaveLength(0);
  });

  it('should NOT render date and opinion if isOpinionArticle but no `opinionText`', () => {
    const wrapper = shallow(<ArticleBody {...props} isOpinionArticle />);
    expect(wrapper.find('div.opinion')).toHaveLength(0);
  });

  it('should render with recipe data', () => {
    const recipeData = {
      ingredients: [
        'sugar',
        'spice',
        'all things nice',
      ],
    };
    const wrapper = shallow(<ArticleBody {...props} recipeData={recipeData} />);
    expect(wrapper.find('ArticleRecipe')).toHaveLength(1);
  });
  it('should render with secondary tag as label', () => {
    const secondaryTags = [
      {
        name: 'Política',
        link: 'https://performance.univision.com/temas/politica',
      },
    ];
    const wrapper = mount(<ArticleBody {...props} secondaryTags={secondaryTags} />);

    expect(wrapper.find('ArticleBodystyles__TagLabel').text()).toEqual(secondaryTags[0].name);
  });

  it('should render overriden the theme configuration', () => {
    const theme = {
      custom: {
        b: 'red',
        'a:hoover': 'red',
        a: 'red',
      },
      tagLabelColor: 'red',
    };
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticleBody {...props} theme={theme} />
      </ThemeProvider>,
    );
    expect(getComputedStyle(wrapper.find('ArticleBodystyles__TagLabel').getDOMNode()).getPropertyValue('color')).toBe('red');
  });
});
