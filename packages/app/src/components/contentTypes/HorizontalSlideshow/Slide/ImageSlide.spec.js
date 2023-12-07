/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import ImageSlide from './ImageSlide';
import Styles from './ImageSlide.scss';

jest.mock('@univision/fe-components-base/dist/components/Picture', () => {
  const Picture = () => <div>test</div>;

  return Picture;
});

/** @test {ImageSlide} */
describe('ImageSlide', () => {
  const imageProps = {
    hideAds: [],
    hideAdByIds: jest.fn(),
    image: {
      renditions: {
        '16x9-mobile': {
          href: 'test',
        },
        original: {
          width: 0,
          height: 0,
        },
      },
      credit: 'test',
    },
    content: '',
    showContent: false,
    renderSimpleStatus: jest.fn(),
    device: 'mobile',
    shouldRefresh: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageSlide {...imageProps} activeSlideNumber={0} />, div);
  });

  it('should render without image renditions', () => {
    const props = { image: {} };
    const wrapper = mount(<ImageSlide {...imageProps} {...props} />);
    expect(wrapper.find('Picture')).toHaveLength(1);
  });

  it('should render content if have it', () => {
    const { content, ...props } = imageProps;
    const wrapper = shallow(<ImageSlide {...props} content="test" />);
    expect(wrapper.find(`div.${Styles.mobileCaption}`).length).toEqual(1);
  });

  it('should hide the content if the value is false', () => {
    const { content, showContent, ...props } = imageProps;
    const wrapper = shallow(<ImageSlide {...props} content="test" showContent={false} />);
    expect(wrapper.find(`div.${Styles.hide}`).length).toEqual(1);
  });

  it('should show the content if the value is true', () => {
    const { content, showContent, ...props } = imageProps;
    const wrapper = shallow(<ImageSlide {...props} content="test" showContent />);
    expect(wrapper.find(`div.${Styles.show}`).length).toEqual(1);
  });

  it('should show the pollQuestion if reaction exists', () => {
    const { content, showContent, ...props } = imageProps;
    const wrapper = shallow(<ImageSlide
      {...props}
      content="test"
      reaction={{ test: 'COOL' }}
      showContent
    />);
    expect(wrapper.find(`div.${Styles.pollQuestion}`).length).toEqual(1);
  });

  it('should show the pollQuestionOverride if reaction exists and it has pollQuestionOverride', () => {
    const { content, showContent, ...props } = imageProps;
    const wrapper = shallow(<ImageSlide
      {...props}
      content="test"
      reaction={{ test: 'COOL' }}
      showContent
      pollQuestionOverride="Poll Question Override"
    />);
    expect(wrapper.find(`div.${Styles.pollQuestion}`).text()).toEqual('Poll Question Override');
  });

  it('should show the statusText if reaction exists', () => {
    const { content, showContent, ...props } = imageProps;
    const wrapper = shallow(<ImageSlide
      {...props}
      content="test"
      reaction={{ test: 'COOL' }}
      showContent
    />);
    expect(wrapper.find(`div.${Styles.statusText}`).length).toEqual(1);
  });

  it('should add vertical styles if imgWidth is less than imgHeigth', () => {
    const {
      content, showContent, image, ...props
    } = imageProps;
    const newImage = {
      renditions: {
        original: {
          width: 400,
          height: 600,
        },
      },
    };
    const wrapper = shallow(<ImageSlide {...props} image={newImage} showContent />);
    expect(wrapper.find(`div.${Styles.verticalImg}`)).toHaveLength(1);
  });

  it('should add horizontal styles if imgWidth is greater than imgHeigth', () => {
    const {
      content, showContent, image, ...props
    } = imageProps;
    const newImage = {
      renditions: {
        original: {
          width: 600,
          height: 400,
        },
      },
    };
    const wrapper = shallow(<ImageSlide {...props} image={newImage} showContent />);
    expect(wrapper.find(`div.${Styles.horizontalImg}`)).toHaveLength(1);
  });

  it('should call dispatch if active', () => {
    const wrapper = shallow(<ImageSlide {...imageProps} active />);
    wrapper.instance().componentDidUpdate({ active: false });
    expect(imageProps.shouldRefresh).toHaveBeenCalledWith(true);
  });

  it('should remove the hide ads when image is active', () => {
    const wrapper = shallow(<ImageSlide {...imageProps} active hideAds={['test']} />);
    wrapper.instance().componentDidUpdate({ active: false, hideAds: [] });
    expect(imageProps.hideAdByIds).toHaveBeenCalled();
  });

  it('should not call dispatch if not active', () => {
    const wrapper = shallow(<ImageSlide {...imageProps} />);
    wrapper.instance().componentDidUpdate({ active: false });
    expect(imageProps.hideAdByIds).not.toHaveBeenCalled();
    expect(imageProps.shouldRefresh).not.toHaveBeenCalled();
  });

  it('should set truncateOpened state when onTruncateChanged function is called', () => {
    const wrapper = shallow(<ImageSlide {...imageProps} />);
    wrapper.instance().onTruncateChanged(true);
    expect(wrapper.state('truncateOpened')).toBe(true);
  });

  it('should have inline class if the image is inline', () => {
    const wrapper = shallow(<ImageSlide {...imageProps} inline />);
    expect(wrapper.find(`div.${Styles.inline}`)).toHaveLength(1);
  });

  it('should try to render SimpleStatus if required prop is present', () => {
    shallow(<ImageSlide {...imageProps} />);

    expect(imageProps.renderSimpleStatus).toHaveBeenCalledTimes(1);
  });
});
