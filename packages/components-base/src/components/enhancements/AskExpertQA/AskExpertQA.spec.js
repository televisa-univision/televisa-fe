import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';

import AskTheExpertQA from './AskExpertQA';
import props from './_mockData_/mock_data.json';

describe('AskTheExpertQA Tests', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    const el = (
      <AskTheExpertQA />
    );
    ReactDOM.render(el, div);
  });

  it('should render "Read More" Button when answer text is not expanded', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <AskTheExpertQA {...props} />
      </Provider>
    );
    const CtaBtn = wrapper.find('ReadMoreBtn__CtaBtn').first().text();

    expect(CtaBtn).toBe('Leer más');
  });

  it('should not render "Read More" Button when Text of the Answer section Expands', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <AskTheExpertQA {...props} />
      </Provider>
    );

    const ReadMoreBtn = wrapper.find('ReadMoreBtn');
    act(() => {
      ReadMoreBtn.first().simulate('click');
    });

    const Answer = wrapper.find('QuesAnsVideoContainer__Answer');
    const Elipsis = Answer.first().props().hasElipsis;

    expect(Elipsis).toBe(false);
  });
});
