import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import Description from '@univision/fe-components-base/dist/components/Description';
import features from '@univision/fe-commons/dist/config/features';

import ContentHeader from '.';

const store = configureStore();

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

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('renders as expected', () => {
    const wrapper = mount(<ContentHeader {...props} />);
    expect(wrapper.find('Title').text()).toEqual(props.title);
    expect(wrapper.find(Description).getElement().props.children).toEqual('description');
  });

  it('should contain a Description with rich text children if available', () => {
    const richTextDescription = [{
      type: 'text',
      value: '<p>Para muchos estudiantes latinos, <b>los problemas personales, financieros o familiares se convierten en obst&aacute;culos en su aprendiz</b>aje. Kenneth Bares, hoy maestro de Ciencias de secundaria, se qued&oacute; sin hogar, lo perdi&oacute; todo, hasta a un familiar, en un incendio, pero la educaci&oacute;n lo sac&oacute; <i>&quot;del hueco en el que estaba&quot;</i>. &Eacute;l entiende por experiencia propia que ofrecer un <a href="http://#">ambiente seguro es el primer paso</a> para asegurar una educaci&oacute;n de calidad.</p>',
    }];
    const wrapper = mount(<ContentHeader {...props} richTextDescription={richTextDescription} />);
    expect(wrapper.find('Title').text()).toEqual(props.title);
    const descEl = wrapper.find(Description).getElement();
    expect(descEl.props.richTextDescription)
      .toEqual(richTextDescription);
  });

  it('should show statusText if reaction exists & type is equal to slide', () => {
    const wrapper = mount(makeContentHeader({ ...props, reaction: { test: 'COOL' }, type: "slide", description: null, }));
    expect(wrapper.find('em')).toHaveLength(1);
  });

  it('should render a SimpleStatus component if prop is present', () => {
    mount(makeContentHeader({ ...props, type: "slide", description: "text", }));
    expect(props.renderSimpleStatus).toHaveBeenCalledTimes(1);
  });

  it('should render expand button on the left if reaction exists', () => {
    const wrapper = mount(makeContentHeader({ ...props, type: "slide", description: "text", reaction: { test: 'COOL' } }));
    const truncateWrapper = wrapper.find('Truncate');
    expect(truncateWrapper.props().expandPosition).toBe('left');
  });

  it('should render expand button on the right if no reaction exists', () => {
    const wrapper = mount(makeContentHeader({ ...props, type: "slide", description: "text", reaction: null }));
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

  it('should have isWorldCupMVP ArticleDescription', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const richTextDescription = [{
      type: 'text',
      value: '<p>Para muchos estudiantes latinos, <b>los problemas personales, financieros o familiares se convierten en obst&aacute;culos en su aprendiz</b>aje. Kenneth Bares, hoy maestro de Ciencias de secundaria, se qued&oacute; sin hogar, lo perdi&oacute; todo, hasta a un familiar, en un incendio, pero la educaci&oacute;n lo sac&oacute; <i>&quot;del hueco en el que estaba&quot;</i>. &Eacute;l entiende por experiencia propia que ofrecer un <a href="http://#">ambiente seguro es el primer paso</a> para asegurar una educaci&oacute;n de calidad.</p>',
    }];
    const isArticle = true;
    const wrapper = mount(makeContentHeader({ ...props, isArticle, type: "default", richTextDescription }));
    const contentDescription = wrapper.find('ContentHeader__ArticleDescription');
    expect(contentDescription.prop('isWorldCupMVP')).toBe(true);
  });
});
