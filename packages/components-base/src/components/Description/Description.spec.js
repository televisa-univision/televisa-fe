import React from 'react';
import { mount, shallow } from 'enzyme';
import Description from '.';

/** @test {Description} */
describe('Description ', () => {
  it('should render the component with a text', () => {
    const wrapper = mount(<Description strip>hello</Description>);
    expect(wrapper.text()).toBe('hello');
  });

  it('should render the component with rich text w/ valid properties', () => {
    const text = [{
      type: 'text',
      value: '<p><b>Hello, World!<b/></p>',
    }];
    const wrapper = mount(<Description richTextDescription={text}>hello</Description>);
    // eslint-disable-next-line no-underscore-dangle
    const richText = wrapper.children().prop('dangerouslySetInnerHTML').__html;
    expect(wrapper.find('div')).toHaveLength(1);
    expect(richText).toEqual(text[0].value);
  });

  it('should render original child when rich text has invalid properties', () => {
    const text = [{
      type: 'text',
    }];
    const wrapper = mount(<Description strip richTextDescription={text}>hello</Description>);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.props().children).toBe('hello');
  });

  it('should render with at least one valid property', () => {
    const text = [
      {
        type: 'text',
      },
      {
        type: 'text',
        value: '<p>This is rich text</p>',
      },
    ];
    const wrapper = mount(<Description strip richTextDescription={text}>hello</Description>);
    expect(wrapper.find('div')).toHaveLength(1);
    // eslint-disable-next-line no-underscore-dangle
    expect(wrapper.children().prop('dangerouslySetInnerHTML').__html).toBe(text[1].value);
  });

  it('should render the component with a custom class', () => {
    const wrapper = shallow(<Description className="foo">hello</Description>);
    expect(wrapper.find('.foo')).toHaveLength(1);
  });

  it('should render the component with small flavour', () => {
    const wrapper = mount(<Description size="small">hello</Description>);
    expect(wrapper.find('Description__RichTextCmpStyled')).toHaveStyleRule('font-size', '0.875rem');
  });

  it('should render the component with regular flavour if size is not specified', () => {
    const wrapper = mount(<Description>hello</Description>);
    expect(wrapper.find('Description__RichTextCmpStyled')).toHaveStyleRule('font-size', '1rem');
  });

  it('should render the component with large flavour', () => {
    const wrapper = mount(<Description size="large">hello</Description>);
    expect(wrapper.find('Description__RichTextCmpStyled')).toHaveStyleRule('font-size', '1.125rem');
  });
});
