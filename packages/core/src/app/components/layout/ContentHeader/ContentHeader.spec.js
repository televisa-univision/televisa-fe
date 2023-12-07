import React from 'react';
import { shallow } from 'enzyme';

import Description from '@univision/fe-components-base/dist/components/Description';
import ContentHeader from './ContentHeader';
import Styles from './ContentHeader.scss';

jest.mock('@univision/fe-commons/dist/assets/images/radio-default-360.jpg', () => 'default.jpg');

let props;
beforeEach(() => {
  props = {
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

describe('ContentHeader tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<ContentHeader {...props} />);
    expect(wrapper.find('.title').text()).toEqual(props.title);
    expect(wrapper.find(Description).getElement().props.children).toEqual('description');
  });

  it('should contain a Description with rich text children if available', () => {
    const richTextDescription = [{
      type: 'text',
      value: '<p>Para muchos estudiantes latinos, <b>los problemas personales, financieros o familiares se convierten en obst&aacute;culos en su aprendiz</b>aje. Kenneth Bares, hoy maestro de Ciencias de secundaria, se qued&oacute; sin hogar, lo perdi&oacute; todo, hasta a un familiar, en un incendio, pero la educaci&oacute;n lo sac&oacute; <i>&quot;del hueco en el que estaba&quot;</i>. &Eacute;l entiende por experiencia propia que ofrecer un <a href="http://#">ambiente seguro es el primer paso</a> para asegurar una educaci&oacute;n de calidad.</p>'
    }];
    const wrapper = shallow(<ContentHeader {...props} richTextDescription={richTextDescription} />);
    expect(wrapper.find('.title').text()).toEqual(props.title);
    const descEl = wrapper.find(Description).getElement();
    expect(descEl.props.richTextDescription)
      .toEqual(richTextDescription);
  });

  it('should show statusText if reaction exists & type is equal to slide', () => {
    const wrapper = shallow(<ContentHeader {...props} reaction={{ test: 'COOL' }} type="slide" />);
    expect(wrapper.find(`div.${Styles.statusText}`)).toHaveLength(1);
  });

  it('should render a SimpleStatus component if prop is present', () => {
    shallow(<ContentHeader {...props} reaction={{ test: 'COOL' }} type="slide" />);
    expect(props.renderSimpleStatus).toHaveBeenCalledTimes(1);
  });

  it('should render expand button on the left if reaction exists', () => {
    const wrapper = shallow(<ContentHeader {...props} reaction={{ test: 'COOL' }} type="slide" />);
    const truncateWrapper = wrapper.find('Truncate');

    expect(truncateWrapper.props().expandPosition).toBe('left');
  });

  it('should render expand button on the right if no reaction exists', () => {
    const wrapper = shallow(<ContentHeader {...props} type="slide" />);
    const truncateWrapper = wrapper.find('Truncate');

    expect(truncateWrapper.props().expandPosition).toBe('right');
  });
});
