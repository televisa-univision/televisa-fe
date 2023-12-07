import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';
import BasicTemplate from './BasicTemplate';

describe('BasicTemplate', () => {
  it('should render without crashing', () => {
    const component = create(<BasicTemplate />);
    expect(component.root).toBeDefined();
  });

  it('should include the scripts', () => {
    const component = create(<BasicTemplate scripts={[
      'testSrc',
    ]}
    />);
    const scriptComponent = component.root.findByType('script');
    expect(scriptComponent).toBeDefined();
  });
  it('should include the scripts for initialState', () => {
    const component = mount(
      <BasicTemplate
        scripts={[
          'testSrc',
        ]}
        initialState={[
          'testSrc',
        ]}
      />
    );
    expect(component.find('script')).toHaveLength(2);
  });
});
