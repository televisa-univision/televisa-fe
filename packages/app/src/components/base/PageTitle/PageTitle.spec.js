import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import PageTitle from '.';

const props = {
  seo: {
    title: 'seo test',
  },
  title: 'default title',
};

describe('PageTitle test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageTitle />, div);
  });
  it('should render SEO title', () => {
    const wrapper = shallow(<PageTitle {...props} />);
    expect(wrapper.find('Title').prop('children')).toBe(props.seo.title);
  });
  it('should fallback to default title', () => {
    const modifiedProps = {
      ...props,
      seo: {},
    };
    const wrapper = shallow(<PageTitle {...modifiedProps} />);
    expect(wrapper.find('Title').prop('children')).toBe(props.title);
  });
  it('should render tv station title', () => {
    const modifiedProps = {
      ...props,
      tvStation: {
        title: 'tvStation title',
      },
    };
    const wrapper = shallow(<PageTitle {...modifiedProps} />);
    expect(wrapper.find('Title').last().prop('children')).toBe(modifiedProps.tvStation.title);
  });
});
