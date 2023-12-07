import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import styled from 'styled-components';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import Description from '@univision/fe-components-base/dist/components/Description';
import features from '@univision/fe-commons/dist/config/features';
import Styles from './ContentHeader.styles';

import ContentHeader from '.';

const store = configureStore();
/**
 * Resizes the window to the specified dimensions.
 * @param {number} x - The new width of the window.
 * @param {number} y - The new height of the window.
 */
const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};

/**
 * Returns a React component that wraps the ContentHeader component with a Redux Provider.
 * @param {Object} props - The props to pass to the ContentHeader component.
 * @returns {React.Component} - A React component that wraps the
 * ContentHeader component with a Redux Provider.
 */
const makeContentHeader = (props = {}) => {
  return (
    <Provider store={store}>
      <ContentHeader {...props} />
    </Provider>
  );
};

jest.mock('@univision/fe-commons/dist/assets/images/radio-default-360.jpg', () => 'default.jpg');

describe('ContentHeader tests', () => {
  let props;

  beforeEach(() => {
    props = {
      theme: {
        showCateogryTag: true,
      },
      featuredTag: 'featuredTag',
      device: 'desktop',
      title: 'article title',
      description: 'description',
      lead: {
        renditions: {
          original: {
            href: 'image.jpg',
          },
        },
      },
      renderSimpleStatus: jest.fn(),
    };
  });

  it('renders as expected', () => {
    const wrapper = mount(makeContentHeader(props));
    expect(wrapper.find('Title').text()).toEqual(props.title);
    expect(wrapper.find(Description).getElement().props.children).toEqual('description');
  });

  it('should contain a Description with rich text children if available', () => {
    const richTextDescription = [{
      type: 'text',
      value: '<p>Para muchos estudiantes latinos, <b>los problemas personales, financieros o familiares se convierten en obst&aacute;culos en su aprendiz</b>aje. Kenneth Bares, hoy maestro de Ciencias de secundaria, se qued&oacute; sin hogar, lo perdi&oacute; todo, hasta a un familiar, en un incendio, pero la educaci&oacute;n lo sac&oacute; <i>&quot;del hueco en el que estaba&quot;</i>. &Eacute;l entiende por experiencia propia que ofrecer un <a href="http://#">ambiente seguro es el primer paso</a> para asegurar una educaci&oacute;n de calidad.</p>',
    }];
    const wrapper = mount(makeContentHeader({ ...props, richTextDescription }));
    expect(wrapper.find('Title').text()).toEqual(props.title);
    const descEl = wrapper.find(Description).getElement();
    expect(descEl.props.richTextDescription)
      .toEqual(richTextDescription);
  });

  it('should show statusText if reaction exists & type is equal to slide', () => {
    const wrapper = mount(makeContentHeader({
      ...props, reaction: { test: 'COOL' }, type: 'slide', description: null,
    }));
    expect(wrapper.find('em')).toHaveLength(1);
  });

  it('should render a SimpleStatus component if prop is present', () => {
    mount(makeContentHeader({ ...props, type: 'slide', description: 'text' }));
    expect(props.renderSimpleStatus).toHaveBeenCalledTimes(1);
  });

  it('should render expand button on the left if reaction exists', () => {
    const wrapper = mount(makeContentHeader({
      ...props,
      type: 'slide',
      description: 'text',
      reaction: { test: 'COOL' },
    }));
    const truncateWrapper = wrapper.find('Truncate');
    expect(truncateWrapper.props().expandPosition).toBe('left');
  });

  it('should render expand button on the right if no reaction exists', () => {
    const wrapper = mount(makeContentHeader({
      ...props, type: 'slide', description: 'text', reaction: null,
    }));
    const truncateWrapper = wrapper.find('Truncate');
    expect(truncateWrapper.props().expandPosition).toBe('right');
  });
  it('should have isWorldCupMVP TitleStyled and isArticle', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const isArticle = true;
    const wrapper = mount(makeContentHeader({ ...props, isArticle }));
    const contentTitle = wrapper.find('ContentHeader__TitleStyled');
    expect(contentTitle.prop('isWorldCupMVP')).toBe(true);
  });
  it('should have the correct size is Article TitleStyled', () => {
    const isArticle = true;
    const wrapper = mount(makeContentHeader({ ...props, isArticle }));
    const contentTitle = wrapper.find('ContentHeader__TitleStyled').getDOMNode();
    expect(getComputedStyle(contentTitle).getPropertyValue('font-size')).toBe('1.75rem');
  });
  it('should have Televisa Site TitleStyled', () => {
    features.televisa.isTelevisaSite = jest.fn(() => true);
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = mount(makeContentHeader({ ...props }));
    const contentTitle = wrapper.find('ContentHeader__TitleStyled');
    expect(contentTitle.prop('isTelevisaSite')).toBe(true);
  });
  it('should have isWorldCupMVP ArticleDescription', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const richTextDescription = [{
      type: 'text',
      value: '<p>Para muchos estudiantes latinos, <b>los problemas personales, financieros o familiares se convierten en obst&aacute;culos en su aprendiz</b>aje. Kenneth Bares, hoy maestro de Ciencias de secundaria, se qued&oacute; sin hogar, lo perdi&oacute; todo, hasta a un familiar, en un incendio, pero la educaci&oacute;n lo sac&oacute; <i>&quot;del hueco en el que estaba&quot;</i>. &Eacute;l entiende por experiencia propia que ofrecer un <a href="http://#">ambiente seguro es el primer paso</a> para asegurar una educaci&oacute;n de calidad.</p>',
    }];
    const isArticle = true;
    const wrapper = mount(makeContentHeader({
      ...props, isArticle, type: 'default', richTextDescription,
    }));
    const contentDescription = wrapper.find('ContentHeader__ArticleDescription');
    expect(contentDescription.prop('isWorldCupMVP')).toBe(true);
  });

  it('sould render with a descriptionFontSize are set', () => {
    const theme = {
      descriptionFontSize: 'large',
      titleFontSize: 'sm',
    };
    const wrapper = mount(makeContentHeader({ ...props, theme, isArticle: true }));
    expect(wrapper).toBeDefined();
  });
});

describe('ContentHeader styles', () => {
  it('should load the sm title with the correct titleFontSize and titleLineHeight size', () => {
    const theme = {
      titleFontSize: { sm: '50px' },
      titleLineHeight: { sm: '60px' },
    };
    const TitleStyled = styled.h1`${Styles.title}`;
    const wrapper = mount(<TitleStyled isArticle theme={theme} />);
    const title = wrapper.find('h1').getDOMNode();
    expect(getComputedStyle(title).getPropertyValue('font-size')).toBe('3.125rem');
  });

  it('should load the md title with the correct titleFontSize and titleLineHeight size', () => {
    const theme = {
      titleFontSize: { md: '10px' },
      titleLineHeight: { md: '10px' },
    };
    resizeWindow(1024, 768);
    const TitleStyled = styled.h1`${Styles.title}`;
    const wrapper = mount(<TitleStyled isArticle theme={theme} />);
    const title = wrapper.find('h1').getDOMNode();
    expect(getComputedStyle(title).getPropertyValue('font-size')).toBe('1.5rem');
  });

  it('should load the description with the correct descriptionFontSize size', () => {
    const theme = {
      descriptionFontSize: '40px',
    };
    resizeWindow(1024, 768);
    const DescriptionStyled = styled.div`${Styles.description}`;
    const wrapper = mount(<DescriptionStyled isWorldCupMVP theme={theme} />);
    const descriptionDiv = wrapper.find('div').getDOMNode();
    expect(getComputedStyle(descriptionDiv).getPropertyValue('font-size')).toBe('1.125rem');
  });

  it('should load the categoryTag with the default color', () => {
    const CategoryTagStyled = styled.div`${Styles.categoryTag}`;
    const wrapper = mount(<CategoryTagStyled />);
    const categoryTagDiv = wrapper.find('div').getDOMNode();
    expect(getComputedStyle(categoryTagDiv).getPropertyValue('color')).toBe('rgb(0, 0, 0)');
  });

  it('should load the categoryTag with the correct categoryColor', () => {
    const theme = {
      categoryColor: 'red',
    };
    const CategoryTagStyled = styled.div`${Styles.categoryTag}`;
    const wrapper = mount(<CategoryTagStyled theme={theme} />);
    const categoryTagDiv = wrapper.find('div').getDOMNode();
    expect(getComputedStyle(categoryTagDiv).getPropertyValue('color')).toBe('red');
  });
});
