import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { BLACK } from '@univision/fe-utilities/styled/constants';
import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import prendeTvTheme from '@univision/fe-commons/dist/themes/prendetv';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import widgetFlavor from '@univision/fe-commons/dist/constants/widgetFlavors';
import features from '@univision/fe-commons/dist/config/features';
import { DARKISH_GRAY, DEEP_SEA, GREEN_DARKER } from '@univision/fe-utilities/esm/styled/constants';

import data from '../SquareCard/__mocks__/squareCard.json';
import ListCard from '.';

const props = {
  href: 'https://app.prende.tv',
};
const store = configureStore();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => jest.fn(),
}));

describe('ListCard component tests', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(<ListCard />, div);
  });
  it('returns null if the component has no content type', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<ListCard {...data[0]} type={null} />);
    expect(wrapper.getElement()).toBe(null);
  });
  it('renders correctly with valid props for article default', () => {
    const theme = {
      primary: 'red',
      secondary: 'blue',
    };
    const wrapper = mount(<ListCard {...data[0]} theme={theme} />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('ListCardImage')).toHaveLength(1);
  });
  it('renders correctly with valid props for article default in list grid', () => {
    const wrapper = mount(<ListCard {...data[0]} listGrid />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('ListCardImage')).toHaveLength(1);
  });
  it('renders correctly with valid props for article default in list grid', () => {
    const wrapper = mount(<ListCard {...data[0]} listGrid />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('ListCardImage')).toHaveLength(1);
    expect(wrapper.find('ListCard__ActionBarStyled')).toHaveLength(0);
  });
  it('renders correctly with valid props for article with no sharing options', () => {
    const wrapper = mount(<ListCard {...data[0]} listGrid sharing={null} />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('ListCard__ActionBarStyled')).toHaveLength(0);
  });
  it('renders correctly with valid props for article vertical', () => {
    const wrapper = mount(
      <ListCard
        {...data[0]}
        layout={VERTICAL}
      />
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(VERTICAL);
    expect(wrapper.find('Icon').first().prop('name')).toBe('articleCta');
    expect(wrapper.find('ListCardImage')).toHaveLength(1);
    expect(wrapper.find('ListCard__ActionBarStyled')).toHaveLength(0);
  });
  it('renders correctly with isDark prop', () => {
    const wrapper = mount(<ListCard {...data[0]} isDark />);
    expect(wrapper.find('ListCard').prop('isDark')).toBe(true);
  });
  it('renders correctly with isDark prop, text only and no readTime', () => {
    const wrapper = mount(<ListCard {...data[0]} isDark isTextOnly readTime={null} />);
    expect(wrapper.find('ListCard').prop('isDark')).toBe(true);
    expect(wrapper.find('ListCardImage')).toHaveLength(0);
    expect(wrapper.find('ListCard').prop('isTextOnly')).toBe(true);
  });

  it('renders correctly with isDark prop and text only', () => {
    const wrapper = mount(<ListCard {...data[0]} isDark isTextOnly />);
    expect(wrapper.find('ListCard').prop('isDark')).toBe(true);
    expect(wrapper.find('ListCardImage')).toHaveLength(0);
    expect(wrapper.find('ListCard').prop('isTextOnly')).toBe(true);
  });
  it('renders correctly with isDark prop, text only and vertical layout', () => {
    const wrapper = mount(<ListCard {...data[1]} layout={VERTICAL} isDark isTextOnly />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(VERTICAL);
    expect(wrapper.find('ListCardImage')).toHaveLength(0);
    expect(wrapper.find('ListCard').prop('isTextOnly')).toBe(true);
  });
  it('renders correctly with text only', () => {
    const wrapper = mount(<ListCard {...data[0]} isTextOnly />);
    expect(wrapper.find('ListCard').prop('isDark')).toBe(false);
    expect(wrapper.find('ListCardImage')).toHaveLength(0);
    expect(wrapper.find('ListCard').prop('isTextOnly')).toBe(true);
  });
  it('renders correctly with text only and vertical layout', () => {
    const wrapper = mount(<ListCard {...data[1]} layout={VERTICAL} isTextOnly />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(VERTICAL);
    expect(wrapper.find('ListCardImage')).toHaveLength(0);
    expect(wrapper.find('ListCard').prop('isTextOnly')).toBe(true);
  });

  it('renders correctly with isDark prop and text only with sponsor', () => {
    const wrapper = mount(<ListCard {...data[26]} isDark isTextOnly />);
    expect(wrapper.find('ListCard').prop('isDark')).toBe(true);
    expect(wrapper.find('ListCardImage')).toHaveLength(0);
    expect(wrapper.find('ListCard').prop('isTextOnly')).toBe(true);
  });
  it('renders correctly with isDark prop, text only and vertical layout with sponsor', () => {
    const wrapper = mount(<ListCard {...data[26]} layout={VERTICAL} isDark isTextOnly />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(VERTICAL);
    expect(wrapper.find('ListCardImage')).toHaveLength(0);
    expect(wrapper.find('ListCard').prop('isTextOnly')).toBe(true);
  });
  it('renders correctly with text only with sponsor', () => {
    const wrapper = mount(<ListCard {...data[26]} isTextOnly />);
    expect(wrapper.find('ListCard').prop('isDark')).toBe(false);
    expect(wrapper.find('ListCardImage')).toHaveLength(0);
    expect(wrapper.find('ListCard').prop('isTextOnly')).toBe(true);
  });
  it('renders correctly with text only and vertical layout with sponsor', () => {
    const wrapper = mount(<ListCard {...data[26]} layout={VERTICAL} isTextOnly />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(VERTICAL);
    expect(wrapper.find('ListCardImage')).toHaveLength(0);
    expect(wrapper.find('ListCard').prop('isTextOnly')).toBe(true);
  });

  it('renders correctly with opinion props', () => {
    const wrapper = mount(<ListCard {...data[2]} />);
    expect(wrapper.find('Label').prop('type')).toBe('opinion');
  });
  it('renders correctly with advertising', () => {
    const wrapper = mount(<ListCard {...data[3]} type="advertising" />);
    expect(wrapper.find('Label').prop('type')).toBe('advertising');
  });
  it('renders correctly with advertising and with advertisement brand', () => {
    const wrapper = mount(
      <ListCard {...data[3]} type="advertising" advertisementBrand="Pepsi" />
    );
    expect(wrapper.find('Label').prop('type')).toBe('advertising');
    expect(wrapper.find('ListContent__PublishedWrapper').text()).toBe('Por: Pepsi');
  });
  it('renders correctly with valid props for slideshow horizontal', () => {
    const wrapper = mount(<ListCard {...data[4]} />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('ListCardImage').prop('isSlideshow')).toBe(true);
  });
  it('renders correctly with valid props for slideshow vertical', () => {
    const wrapper = mount(
      <ListCard {...data[4]} layout={VERTICAL} />
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(VERTICAL);
    expect(wrapper.find('ListCardImage').prop('isSlideshow')).toBe(true);
  });
  it('renders correctly with valid props for slideshow is dark', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[4]} isDark />
      </Provider>
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('ListCardImage').prop('isDark')).toBe(true);
  });
  it('should not render card images if not present', () => {
    const wrapper = mount(<ListCard {...data[4]} cardImages={[]} />);
    expect(wrapper.find('ListCardImage__ImageGridImage')).toHaveLength(0);
  });
  it('renders correctly with valid props for video horizontal', () => {
    const wrapper = mount(<ListCard {...data[5]} />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
  });
  it('renders correctly with valid props for video vertical', () => {
    const wrapper = mount(
      <ListCard {...data[5]} layout={VERTICAL} />
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(VERTICAL);
  });
  it('renders correctly with valid props for livestream video in dark mode', () => {
    const wrapper = mount(<ListCard {...data[7]} isDark />);
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
  });
  it('renders correctly with valid props for livestream video in dark mode', () => {
    const wrapper = mount(
      <ListCard {...data[7]} layout={VERTICAL} isDark />
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(VERTICAL);
  });
  it('renders correctly with valid props for radio in horizontal', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[15]} />
      </Provider>
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('ListCardImage').prop('isRadio')).toBe(true);
  });
  it('renders correctly with valid props for radio in vertical layout', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[15]} layout={VERTICAL} />
      </Provider>
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(VERTICAL);
    expect(wrapper.find('ListCardImage').prop('isRadio')).toBe(true);
  });
  it('renders correctly with valid props for promo channel with Logo', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[19]} />
      </Provider>
    );
    expect(wrapper.find('ListContent__LogoWrapper').length).toBe(1);
  });
  it('renders correctly with valid props for promo channel without Logo', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[20]} />
      </Provider>
    );
    expect(wrapper.find('ListCard__LogoWrapper').length).toBe(0);
  });
  it('renders correctly with external promo', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[17]} layout={HORIZONTAL} isDark />
      </Provider>
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('ListCard__TitleWrapper').prop('isCentered')).toBe(true);
  });
  it('renders correctly with valid props for prendetv channel with Logo', () => {
    const theme = prendeTvTheme().widgetTheme;
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[24]} flavor={widgetFlavor.FLAVOR_PRENDE_TV} theme={theme} />
      </Provider>
    );
    expect(wrapper.find('ListContent__LogoWrapper').length).toBe(1);
    expect(wrapper.find('Label__ListItemLabel')).toHaveStyleRule('color', BLACK);
  });
  it('renders correctly with soccermatch', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[10]} layout={HORIZONTAL} />
      </Provider>
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('MatchCardScore').length).toBe(1);
  });
  it('renders correctly with soccermatch and text only', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard
          {...data[10]}
          layout={HORIZONTAL}
          isTextOnly
        />
      </Provider>
    );
    expect(wrapper.find('ListCard').prop('layout')).toBe(HORIZONTAL);
    expect(wrapper.find('MatchCardScore').length).toBe(1);
  });

  it('should not render title if hideText', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[17]} hideText />
      </Provider>
    );

    expect(wrapper.find('ListCard__TitleWrapper')).toHaveLength(0);
  });

  it('renders correctly with sponsor vertical', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[26]} layout={VERTICAL} />
      </Provider>
    );
    expect(wrapper.find('ListContent__ContentSponsor')).toHaveLength(1);
  });

  it('renders correctly with sponsor horizontal', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[26]} layout={HORIZONTAL} />
      </Provider>
    );
    expect(wrapper.find('ListContent__ContentSponsor')).toHaveLength(1);
  });
  it('renders correctly with flavor prendetv', () => {
    const theme = prendeTvTheme().widgetTheme;
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[24]} flavor={widgetFlavor.FLAVOR_PRENDE_TV} theme={theme} />
      </Provider>
    );
    const containerLink = wrapper.find('ListCardImage__CardContainerLink').prop('href');
    expect(containerLink).toMatch(props.href);
  });
  it('renders correctly with flavor is different to prendetv', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[26]} layout={HORIZONTAL} />
      </Provider>
    );
    const containerLink = wrapper.find('ListCardImage__CardContainerLink').prop('href');
    expect(containerLink).not.toMatch(props.href);
  });
  it('renders correctly with feature flag vix in true', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(true);
    const theme = prendeTvTheme().widgetTheme;
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[24]} flavor={widgetFlavor.FLAVOR_PRENDE_TV} theme={theme} />
      </Provider>
    );
    const containerLink = wrapper.find('ListCardImage__CardContainerLink').prop('href');
    expect(containerLink).toMatch(props.href);
  });
  it('renders correctly with valid background for prendetv channel with vix feature flag and dark', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(true);
    const theme = prendeTvTheme().widgetTheme;
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[24]} flavor={widgetFlavor.FLAVOR_PRENDE_TV} theme={theme} isDark />
      </Provider>
    );
    expect(wrapper.find('ListCard__Wrapper').length).toBe(1);
    expect(wrapper.find('ListCard__Wrapper')).toHaveStyleRule('background', DARKISH_GRAY);
  });

  it('render component ListCard__LabelMVP inside ListCard if flag isWorldCupMVP is true', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const theme = {
      primary: 'red',
      secondary: 'blue',
    };
    const propsMVP = {
      device: 'mobile',
      isDark: false,
      widgetContext: {
        isWorldCupMVP: true,
      },
    };
    const wrapper = mount(
      <ListCard
        {...data[0]}
        {...data[2]}
        theme={theme}
        widgetContext={{ isWorldCupMVP: true }}
        {...propsMVP}
      />
    );
    expect(wrapper.find('ListCard__LabelMVP')).toHaveLength(1);
    expect(wrapper.find('Label__ListItemWrapper')).toHaveLength(1);
    expect(wrapper.find('Label__ListItemLabel')).toHaveLength(1);
  });

  it('render component ListCard__Label inside ListCard if flag isWorldCup is false', () => {
    const theme = {
      primary: 'red',
      secondary: 'blue',
    };
    const wrapper = mount(
      <ListCard
        {...data[0]}
        theme={theme}
      />
    );
    expect(wrapper.find('Label__ListItemLabel')).toHaveLength(1);
  });

  it('render component TextUVN__TextStyled inside ListCard with color DEEP_SEA and only mobile', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const propsMVP = {
      device: 'mobile',
      isListItem: true,
      isDark: false,
      widgetContext: {
        isWorldCupMVP: true,
      },
      theme: {
        primary: DEEP_SEA,
      },
    };
    const wrapper = mount(
      <ListCard
        {...data[0]}
        {...propsMVP}
      />
    );
    expect(wrapper.find('ListCard__LabelMVP')).toHaveLength(1);
    expect(wrapper.find('Label__ListItemWrapper')).toHaveLength(1);
    expect(wrapper.find('Label__ListItemLabel')).toHaveLength(1);
    expect(wrapper.find('TextUVN__TextStyled')).toHaveLength(1);
    expect(wrapper.find('TextUVN__TextStyled')).toHaveStyleRule('color', DEEP_SEA);
  });

  it('render component TextUVN__TextStyled inside ListCard with color GREEN_DARKER and only desktop', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const propsMVP = {
      device: 'desktop',
      isListItem: true,
      isDark: false,
      widgetContext: {
        isWorldCupMVP: true,
      },
      theme: {
        primary: GREEN_DARKER,
      },
    };
    const wrapper = mount(
      <ListCard
        {...data[0]}
        {...propsMVP}
      />
    );
    expect(wrapper.find('ListCard__TextWrapper')).toHaveLength(1);
    expect(wrapper.find('ListCard__Badge')).toHaveLength(1);
    expect(wrapper.find('ListCard__LabelLink')).toHaveLength(1);
    expect(wrapper.find('Label__ListItemWrapper')).toHaveLength(1);
    expect(wrapper.find('Label__ListItemLabel')).toHaveLength(1);
    expect(wrapper.find('TextUVN__TextStyled')).toHaveStyleRule('color', GREEN_DARKER);
  });
  it('should render correctly with feature flag isVerticalLayout in true and isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <ListCard {...data[24]} layout={VERTICAL} />
      </Provider>
    );
    const containerLabel = wrapper.find('ListCard__LabelCustom').prop('isVerticalLayout');
    expect(containerLabel).toBe(true);
  });
});
