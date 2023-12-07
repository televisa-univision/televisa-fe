import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import Video from '@univision/fe-video/dist/components/Video';
import QuesAnsVideoContainer from './QuesAnsVideoContainer';

const props = {
  answer: 'Test Answer',
  question: 'Test Question',
  idx: '1',
};

/** @test {QuesAnsVideoContainer} */
describe('QuesAnsVideoContainer Spec', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    const el = (
      <Provider store={Store}>
        <QuesAnsVideoContainer />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render Question Link section only', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <QuesAnsVideoContainer {...props} isOnlyQues />
      </Provider>
    );
    const QuestionLink = wrapper.find('QuesAnsVideoContainer__QuestionLink');
    const QuestionHeading = wrapper.find('QuesAnsVideoContainer__QuestionHeading');

    expect(QuestionLink).toHaveLength(1);
    expect(QuestionHeading).toHaveLength(0);
  });

  it('should render Question Header section only', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <QuesAnsVideoContainer {...props} />
      </Provider>
    );
    const QuestionHeading = wrapper.find('QuesAnsVideoContainer__QuestionHeading');
    const QuestionLink = wrapper.find('QuesAnsVideoContainer__QuestionLink');

    expect(QuestionHeading).toHaveLength(1);
    expect(QuestionLink).toHaveLength(0);
  });

  it('should render Video Component when it is Article Question Answer Video Section', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <QuesAnsVideoContainer {...props} />
      </Provider>
    );
    const VideoComponent = wrapper.find(Video);

    expect(VideoComponent).toHaveLength(1);
  });

  it('should not render Video Component when it is only Question Section', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <QuesAnsVideoContainer {...props} isOnlyQues />
      </Provider>
    );
    const VideoComponent = wrapper.find(Video);

    expect(VideoComponent).toHaveLength(0);
  });

  it('should render Answer Read More Button when it is Article Question Answer Video Section', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <QuesAnsVideoContainer {...props} />
      </Provider>
    );
    const Answer = wrapper.find('QuesAnsVideoContainer__Answer');
    const ReadMore = wrapper.find('ReadMoreBtn');

    expect(Answer).toHaveLength(1);
    expect(ReadMore).toHaveLength(1);
  });

  it('should not render Answer Read More Button when it is only Question Section', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <QuesAnsVideoContainer {...props} isOnlyQues />
      </Provider>
    );
    const Answer = wrapper.find('QuesAnsVideoContainer__Answer');
    const ReadMore = wrapper.find('ReadMoreBtn');

    expect(Answer).toHaveLength(0);
    expect(ReadMore).toHaveLength(0);
  });

  it('should render "Leer más" Button when text is not expanded', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <QuesAnsVideoContainer {...props} />
      </Provider>
    );
    const CtaBtn = wrapper.find('ReadMoreBtn__CtaBtn');
    const CtaBtntext = CtaBtn.text();

    expect(CtaBtntext).toBe('Leer más');
  });
});
