import React from 'react';
import { shallow, mount } from 'enzyme';

import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';

import Reaction from '../Reaction/Reaction';
import Status from '.';
import Styles from './Status.scss';

jest.mock('react-loadable');

Object.defineProperty(window, 'location', {
  value: {
    href: '',
  }
});

/** @test {Status} */
describe('Status', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const props = {
    actions: {
      togglePlaying: null,
      goToPrevSlide: jest.fn(),
      goToNextSlide: jest.fn(),
      onShareClick: jest.fn(),
    },
    shareData: {
      type: 'slideshow',
      primaryTag: {},
      title: 'test',
      uid: 'test',
    },
    device: 'mobile',
    slides: [{
      image: {
        type: 'image',
        uid: '00000163-03e7-d588-a967-e7efe6f60001',
        title: 'Mariana Levy',
        caption: '',
        credit: 'Instagram María Levy',
        renditions: {},
      },
      hideCaption: false,
      shortUrl: 'http://uni.vi/QJyi1013hMt#e7efe6f60001',
      caption: 'Luego de la muerte de Mariana Levy en 2005, cuando fue víctima de un infarto por un inesperado asalto a mano armada, la vida de María, la mayor de sus hijos, no ha sido fácil, a sus 22 años ha tenido que enfrentar pleitos entre su abuela y su padre, y hasta ha quedado en medio de la discusión por la herencia de su famosa madre.',
      longUrl: 'https://www.univision.com/entretenimiento/celebridades/maria-levy-pone-fin-al-pleito-con-su-padre-y-su-abuela-asi-se-llevan-ahora-fotos#e7efe6f60001',
    },
    ],
    endSlideNumber: 1,
    isLead: false,
    activeSlideId: '0',
  };

  const reactionProps = {
    slideId: 'test',
    pollOptions: [{
      uid: 'test',
      icon: { name: 'COOL' },
      internalName: 'test',
    }],
    autoSlideChangeTime: 100,
    slideshowId: '0',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Status {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should show the arrows if the value is true', () => {
    const wrapper = mount(<Status {...props} />);
    expect(wrapper.find(`div.${Styles.mobileActions}`)).toHaveLength(1);
  });

  it('should trigger next slide', () => {
    const wrapper = mount(<Status {...props} />);
    wrapper.find('#arrowRight').last().simulate('click');
    expect(props.actions.goToNextSlide).toHaveBeenCalled();
  });

  it('should trigger prev slide', () => {
    const wrapper = mount(<Status {...props} />);

    wrapper.find('#arrowLeft').first().simulate('click');
    expect(props.actions.goToPrevSlide).toHaveBeenCalled();
  });

  it('should show status text if there is an activeSlideNumber', () => {
    const wrapper = mount(<Status {...props} activeSlideNumber={1} />);

    expect(wrapper.find(`span.${Styles.statusText}`)).toHaveLength(1);
  });

  it('should show the share button if the value is true', () => {
    const wrapper = mount(<Status {...props} />);
    expect(wrapper.find(`div.${Styles.shareIcon}`)).toHaveLength(1);
  });

  it('should show the share bar component if share is pressed', () => {
    const wrapper = shallow(<Status {...props} />);
    const instance = wrapper.instance();

    instance.onShareIconClick();

    expect(wrapper.state('showShare')).toBe(false);
  });

  it('should show the reaction component if has reactions', () => {
    const wrapper = mount(<Status {...props} reaction={reactionProps} activeSlideId="0" />);

    expect(wrapper.find(Reaction)).toHaveLength(1);
  });

  it('should keep the previous activeSlideNumber for the advertising view', () => {
    const wrapper = shallow(<Status {...props} activeSlideNumber={1} />);
    const instance = wrapper.instance();

    wrapper.setProps({ activeSlideNumber: undefined });

    expect(instance.prevSlideNumber).toBe(1);
  });

  it('should not keep the previous activeSlideNumber if activeSlideNumber exists', async () => {
    const wrapper = mount(<Status {...props} activeSlideNumber={1} />);
    const instance = wrapper.instance();

    wrapper.setProps({ activeSlideNumber: 1 });

    expect(instance.prevSlideNumber).toBe(undefined);
  });

  it('should track ShareBar clicks', () => {
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<Status {...props} />);
    const instance = wrapper.instance();

    instance.onShareBarClick('facebook');

    expect(SocialTracker.track).toBeCalled();
  });

  it('should track ShareBar clicks for reaction type', () => {
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<Status {...props} reaction={reactionProps} activeSlideId="0" />);
    const instance = wrapper.instance();

    instance.onShareBarClick('twitter');

    expect(SocialTracker.track).toBeCalled();
  });

  it('should call openStatusEl if activeSlideNumber is equal to 0', () => {
    const wrapper = mount(<Status {...props} activeSlideNumber={0} />);
    expect(wrapper.find(`div.${Styles.callToStart}`)).toHaveLength(1);
  });

  it('should call goToNextSlide onClick to callToStart button', () => {
    const wrapper = mount(<Status {...props} activeSlideNumber={0} />);
    const button = wrapper.find(`div.${Styles.callToStart}`);

    button.simulate('click');

    expect(props.actions.goToNextSlide).toHaveBeenCalledWith('button');
  });

  it('should show activeSlideNumber in status text if it exists', () => {
    const wrapper = mount(<Status {...props} reaction={reactionProps} activeSlideNumber={2} />);
    expect(wrapper.find(`span.${Styles.statusText} > div > em`).html()).toEqual('<em>2</em>');
  });

  it('should add open class if device is equal to desktop', () => {
    const wrapper = mount(<Status {...props} activeSlideNumber={0} reaction={null} device="desktop" />);
    expect(wrapper.find(`div.${Styles.openCard}`)).toHaveLength(1);
  });

  it('should show the openShareButtons if reaction exists & device = desktop activeSlideNumber equal 0', () => {
    const wrapper = mount(<Status {...props} activeSlideNumber={0} reaction={reactionProps} device="desktop" />);
    expect(wrapper.find(`div.${Styles.openShareButtons}`)).toHaveLength(1);
  });

  it('should show the openShareButtons if reaction exists & device = desktop & activeSlideNumber equal 1 ', () => {
    const wrapper = mount(<Status {...props} activeSlideNumber={1} reaction={reactionProps} device="desktop" />);
    expect(wrapper.find(`div.${Styles.openShareButtons}`)).toHaveLength(1);
  });

  it('should show the inline wrapper if the value is true', () => {
    const wrapper = mount(<Status {...props} inline />);
    expect(wrapper.find(`div.${Styles.inline}`)).toHaveLength(1);
  });

  it('should not show the inline wrapper if the value is false', () => {
    const wrapper = mount(<Status {...props} inline={false} />);
    expect(wrapper.find(`div.${Styles.inline}`)).toHaveLength(0);
  });

  it('should show the isLead wrapper if inline exists and the value is true', () => {
    const wrapper = mount(<Status {...props} inline isLead />);
    expect(wrapper.find(`div.${Styles.lead}`)).toHaveLength(1);
  });

  it('should show the replay button if isEndOfSlideshow is true', () => {
    const wrapper = mount(<Status {...props} isEndOfSlideshow inline />);
    expect(wrapper.find(`button.${Styles.replay}`)).toHaveLength(1);
  });

  it('should show pause button when running in inline case', () => {
    const wrapper = mount(<Status {...props} running inline />);
    expect(wrapper.find('Icon').first().prop('name')).toEqual('pausecircle');
  });

  it('should add the adStatus class if activeSlide number not exists and is different to 0', () => {
    const { activeSlideNumber, ...newProps } = props;
    const wrapper = mount(<Status {...newProps} activeSlideNumber={null} />);
    expect(wrapper.find(`span.${Styles.adStatus}`)).toHaveLength(1);
  });

  it('should show the prevSlideNumber if activeSlideNumber is empty', () => {
    const { activeSlideNumber, ...newProps } = props;
    Status.prototype.prevSlideNumber = 1;
    const wrapper = mount(<Status {...newProps} activeSlideNumber={null} />);

    expect(wrapper.find('em')).toHaveLength(1);
  });

  it('should add the adStatus class to reaction if activeSlide number not exists and is different to 0', () => {
    const wrapper = mount(<Status
      {...props}
      activeSlideNumber={null}
      reaction={reactionProps}
    />);

    expect(wrapper.find(`span.${Styles.adStatus}`)).toHaveLength(1);
  });

  it('should show the prevSlideNumber to reaction if activeSlideNumber is empty', () => {
    const wrapper = mount(<Status
      {...props}
      activeSlideNumber={null}
      reaction={reactionProps}
    />);

    expect(wrapper.find('em')).toHaveLength(1);
  });

  it('should show the prevSlideNumber to inline status if activeSlideNumber is 0 or undefined', () => {
    const { activeSlideNumber, ...newProps } = props;
    Status.prototype.prevSlideNumber = 1;
    const wrapper = mount(<Status
      {...newProps}
      activeSlideNumber={0}
      endSlideNumber={10}
      reaction={reactionProps}
      inline
      showArrows
    />);
    expect(wrapper.find(`div.${Styles.inlineStatusText}`).text()).toBe('0/10');
  });

  it('should render SimpleStatus correctly', () => {
    const wrapper = mount(<Status
      {...props}
      simple
      activeSlideNumber={0}
    />);

    expect(wrapper.find('SimpleStatus').exists()).toBe(true);
    expect(wrapper.find(`button.${Styles.simpleControl}`).exists()).toBe(true);
  });

  it('should have SimpleStatus correctly show the previous slide number if necessary', () => {
    Status.prototype.prevSlideNumber = 4;
    const wrapper = mount(<Status
      simple
      {...props}
      activeSlideNumber={undefined}
    />);

    expect(wrapper.find('em').text()).toEqual('4');
  });
});
