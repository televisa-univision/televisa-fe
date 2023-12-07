import url from 'url';
import { NativeModules, Platform } from 'react-native';
import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { BarSpacingDecorator, WhiteBgColorDecorator } from './.storybook/native/decorators';
import { loadStories } from './.storybook/native/story-loader';

if (Platform.OS === 'ios') {
  addDecorator(BarSpacingDecorator);
} else if (Platform.OS === 'android') {
  addDecorator(WhiteBgColorDecorator);
}

configure(loadStories, module);

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);
const StorybookUI = getStorybookUI({ port: 7007, host: hostname });

export default StorybookUI;
