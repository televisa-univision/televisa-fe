import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import ShareDrawer from '.';
import { getButtonsPosition, getMainIconClose } from './ShareDrawer.styles';

const props = {
  showCtaShare: true,
  sharingOptions: {
    facebook: {
      url: 'http://univision.com/test',
      title: 'The content title',
      imageUrl: 'http://loremflickr.com/320/240',
      isFeedDialog: true,
    },
    twitter: {
      url: 'http://univision.com/test',
      title: 'The content title',
      via: 'Univision',
    },
    mail: {
      url: 'http://univision.com/test',
      title: 'The content title',
      body: 'The content of the email',
      subject: 'The subject of the email',
    },
  },
  onClick: () => {},
  isMobile: true,
  cardSize: 'large',
  hasFavorite: false,
  isOpen: true,
};

describe('ShareDrawer component tests', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  it('returns null if the component has no sharing options', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<ShareDrawer />);
    expect(wrapper.getElement()).toBe(null);
  });
  it('renders correctly with valid props', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareButton')).toHaveLength(4);
  });
  it('renders correctly with valid props and open', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ShareDrawer {...props} isOpen isDark />
      </Provider>
    );
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isDark')).toBeTruthy();
  });
  it('renders correctly with valid props for medium', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="medium" /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
  });
  it('renders correctly with valid props for small', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="small" /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
  });
  it('renders correctly with valid props for small with favorite', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="small" hasFavorite /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
  });
  it('renders correctly with valid props for default spacing', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="defaultl" /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
  });
  it('renders correctly with valid props for default spacing with favorite', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="default" hasFavorite /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
  });
  it('renders correctly with valid props for medium with favorite', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="medium" hasFavorite /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
  });
  it('renders correctly with valid props for big with favorite and not mobile', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="large" hasFavorite isMobile={false} /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareButton')).toHaveLength(3);
  });
  it('should pass network name to onClick', () => {
    const click = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <ShareDrawer {...props} onClick={click} />
      </Provider>
    );
    wrapper.find('ShareButton').first().simulate('click', 'event');
    expect(click).toBeCalledWith('mail', expect.any(Object));
  });
  it('should pass slideshow contentype to onClick', () => {
    const click = jest.fn();
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} contentType={'slideshow'} onClick={click} /></Provider>);
    wrapper.find('ShareButton').first().simulate('click', 'event');
    expect(click).toBeCalledWith('mail', expect.any(Object));
  });
  it('should pass diferent to slideshow contentype to onClick', () => {
    const click = jest.fn();
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} contentType={'article'} onClick={click} /></Provider>);
    wrapper.find('ShareButton').first().simulate('click', 'event');
    expect(click).toBeCalledWith('mail', expect.any(Object));
  });
  it('renders correctly with valid props soccer', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="medium" type="Soccer" /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isDark')).toBeFalsy();
    expect(wrapper.find('ShareDrawer').prop('type')).toBe('Soccer');
  });
  it('renders correctly with valid props soccer in dark mode', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="medium" type="Soccer" isDark /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isDark')).toBeTruthy();
    expect(wrapper.find('ShareDrawer').prop('type')).toBe('Soccer');
  });
  it('renders correctly with valid props soccer in layout mode', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="medium" type="Soccer" isContentLayout /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isContentLayout')).toBeTruthy();
  });
  it('renders correctly with valid props soccer in layout mode with favorite icon', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="medium" type="Soccer" isContentLayout hasFavorite /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isContentLayout')).toBeTruthy();
    expect(wrapper.find('ShareDrawer').prop('hasFavorite')).toBeTruthy();
  });
  it('get main margin when is video inline landscape in getButtonsPosition', () => {
    let margin = getButtonsPosition({ isLandscape: true, hasFavorite: true });
    expect(margin).toBe('148px');
    margin = getButtonsPosition({ isLandscape: true, hasFavorite: false });
    expect(margin).toBe('109px');
    margin = getButtonsPosition({ isLandscape: false, hasFavorite: false, isListCard: true });
    expect(margin).toBe('0');
  });
  it('get main margin when is video inline landscape in getMainIconClose', () => {
    let margin = getMainIconClose({ isLandscape: true, hasFavorite: true });
    expect(margin).toBe('74px');
    margin = getMainIconClose({ isLandscape: true, hasFavorite: false });
    expect(margin).toBe('35px');
    margin = getMainIconClose({ isLandscape: true, hasFavorite: false, isListCard: true });
    expect(margin).toBe('10px');
  });
  it('renders correctly with valid props for list card', () => {
    const wrapper = mount(<Provider store={store}><ShareDrawer {...props} cardSize="medium" type="Soccer" isListCard /></Provider>);
    expect(wrapper.find('ShareDrawer__ShareWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isListCard')).toBeTruthy();
  });
});
