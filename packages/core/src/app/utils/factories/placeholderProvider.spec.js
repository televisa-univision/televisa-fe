import horoscopeConfig from '@univision/fe-components-base/dist/components/widgets/Horoscope/configs';
import loveCalculatorConfig from '@univision/fe-components-base/dist/components/widgets/LoveCalculator/configs';
import placeholderProvider, { PlaceholderProvider } from './placeholderProvider';

jest.mock('@univision/fe-components-base/dist/components/widgets/Placeholder/Default', () => jest.fn());
jest.mock('@univision/fe-components-base/dist/components/Placeholder', () => jest.fn());
jest.mock('@univision/fe-components-base/dist/components/widgets/Horoscope/configs', () => ({
  settings: {
    title: 'horoscpoe',
  },
  animals: [{ name: 'animal1', link: '/url' }],
}));
jest.mock('@univision/fe-components-base/dist/components/widgets/LoveCalculator/configs', () => ({
  settings: {
    title: 'lovecalc',
  },
}));

let opts;
beforeEach(() => {
  opts = {
    theme: {
      primary: 'blue',
      secondary: 'red',
    },
    widget: {
      type: '',
      contents: [],
      settings: {
        title: 'title',
      },
    },
  };
});

describe('placeholderProvider', () => {
  it('returns the default placeholder without alterations', () => {
    const placeholder = placeholderProvider(opts);
    expect(placeholder.props.content).toEqual(opts.widget.contents);
    expect(placeholder.props.settings).toEqual(opts.widget.settings);
    expect(placeholder.props.theme).toEqual(opts.theme);
  });

  it('returns placeholder with altered props for HoroscoposInteractiveChineseHoroscopes', () => {
    opts.widget.type = 'HoroscoposInteractiveChineseHoroscopes';
    const placeholder = placeholderProvider(opts);
    expect(placeholder.props.content).toEqual([{
      title: horoscopeConfig.animals[0].name,
      uri: horoscopeConfig.animals[0].path,
    }]);
    expect(placeholder.props.settings).toEqual({ title: horoscopeConfig.settings.title });
  });

  it('returns placeholder with altered props for HoroscoposInteractiveLoveCalculator', () => {
    opts.widget.type = 'HoroscoposInteractiveLoveCalculator';
    const placeholder = placeholderProvider(opts);
    expect(placeholder.props.content).toEqual([{
      title: loveCalculatorConfig.settings.description,
    }]);
    expect(placeholder.props.settings).toEqual({ title: loveCalculatorConfig.settings.title });
  });

  it('returns an empty placeholder with no props', () => {
    const placeholder = placeholderProvider({});
    expect(placeholder.props).toEqual({
      content: undefined,
      settings: undefined,
      theme: undefined,
    });
  });
});

it('should returns a function which render a placeholder for SingleWidget', () => {
  opts.widget.type = 'SingleWidget';
  const placeholder = PlaceholderProvider(opts)();
  expect(placeholder.props.content).toEqual(opts.widget.contents);
  expect(placeholder.props.settings).toEqual(opts.widget.settings);
  expect(placeholder.props.theme).toEqual(opts.theme);
  expect(placeholder.props.hideInDesktop).toEqual(false);
  expect(placeholder.props.hasWidth).toEqual(true);
});

describe('PlaceholderProvider', () => {
  it('should return a function which renders the placeholder', () => {
    const placeholder = PlaceholderProvider(opts)();
    expect(placeholder.props.content).toEqual(opts.widget.contents);
    expect(placeholder.props.settings).toEqual(opts.widget.settings);
    expect(placeholder.props.theme).toEqual(opts.theme);
  });
});
