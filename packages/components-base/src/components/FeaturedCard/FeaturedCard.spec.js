import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';

import FeaturedCard from '.';
import { image } from '../../config/storyMocks';

let props;
beforeEach(() => {
  props = {
    image,
    showIcon: true,
    type: 'slideshow',
    uri: 'http://www.univision.com/noticias/planeta/en-fotos-los-lugares-que-deberias-visitar-antes-de-que-el-cambio-climatico-los-destruya-fotos',
    primaryTag: { name: 'Noticias' },
    title: 'Belinda volvio locas a las redes sociales con este look',
    authors: [{ fullName: 'Rodrigo Garcia Valdez' }],
    description: 'Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed.',
    uid: 'a0',
  };
});

describe('FearturedCard', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FeaturedCard {...props} />, div);
  });

  it('should render duration for type=video', () => {
    props.type = 'video';
    props.duration = '3:45';
    delete props.authors;
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('DurationLabel')).toHaveLength(2);
  });

  it('should render a live label type=liveblog', () => {
    props.type = 'liveblog';
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('LiveLabel')).toHaveLength(1);
  });

  it('should render with extra padding for autoplay controls ', () => {
    props.type = 'liveblog';
    const wrapper = shallow(<FeaturedCard {...props} hasAutoPlayControls />);
    expect(wrapper.find('.hasAutoPlayControls')).toHaveLength(1);
  });

  it('should render a live label videoType=livestream', () => {
    props.videoType = 'livestream';
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('LiveLabel')).toHaveLength(1);
  });

  it('should render video type=video', () => {
    props.type = 'video';
    props.showPlayer = true;
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
  });

  it('should render an author label when author title is set in the data', () => {
    props.authors = [{ title: 'Rodrigo García' }];
    props.variant = 'light';
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('Author')).toHaveLength(1);
  });

  it('should render an author label when author fullName is set in the data', () => {
    props.authors = [{ fullName: 'Rodrigo García' }];
    props.variant = 'dark';
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('Author')).toHaveLength(1);
  });

  it('should render an empty author label when author fullName or title is not set', () => {
    props.authors = [{ foo: 'bar' }];
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('Author')).toHaveLength(0);
  });

  it('should render an empty author label when author is not a valid array', () => {
    props.authors = 'foo';
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('Author')).toHaveLength(0);
  });

  it('should render light icon for dark variant', () => {
    props.type = 'article';
    props.variant = 'dark';
    props.showIcon = true;
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('Icon').last().props().variant).toBe('light');
  });

  it('should send undefined prop icon for light variant', () => {
    props.type = 'article';
    props.variant = 'light';
    props.showIcon = true;
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('Icon').last().props().variant).toBe(undefined);
  });

  it('should have longform button if video is longform', () => {
    props.type = 'video';
    props.longform = true;
    props.authRequired = true;
    const wrapper = shallow(<FeaturedCard {...props} />);
    expect(wrapper.find('Clickable').last().props().appearance).toBe('auth');
  });
});

describe('Tracking', () => {
  it('should track clicks on content', () => {
    const widgetContext = {
      type: 'test',
    };
    const expectedCall = {
      widgetContext,
      target: 'content',
      contentTitle: props.title,
      contentUid: props.uid,
    };
    const wrapper = shallow(<FeaturedCard {...props} widgetContext={widgetContext} />);
    spyOn(WidgetTracker, 'track');
    wrapper.find('Link').first().simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), expectedCall);

    wrapper.find('Link').last().simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), expectedCall);
  });
});
