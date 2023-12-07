import React from 'react';

import { storiesOf } from '@storybook/react';

import RawHtmlContainer from '.';
import pageData from './__mocks__/mockData.json';

storiesOf('Enhancement/RawHtml Container', module)
  .add('with title and content', () => (
    <RawHtmlContainer
      html="<iframe width='560' height='315' src='https://www.youtube.com/embed/GF60Iuh643I' frameborder='0'></iframe>"
    />
  ))
  .add('with twitter embed', () => (
    <RawHtmlContainer
      html="<blockquote class='twitter-tweet' data-lang='en'><p lang='en' dir='ltr'>Do NOT push that button, Kylo... <a href='https://twitter.com/hashtag/StarWars?src=hash&amp;ref_src=twsrc%5Etfw'>#StarWars</a> <a href='https://twitter.com/hashtag/TheLastJedi?src=hash&amp;ref_src=twsrc%5Etfw'>#TheLastJedi</a> <a href='https://t.co/VgkT3I8xPo'>pic.twitter.com/VgkT3I8xPo</a></p>&mdash; IGN (@IGN) <a href='https://twitter.com/IGN/status/917612015253721089?ref_src=twsrc%5Etfw'>October 10, 2017</a></blockquote><script async src='//platform.twitter.com/widgets.js' charset='utf-8'></script>"
    />
  ))
  .add('with fragment embed inline', () => (
    <RawHtmlContainer
      settingsExternalContent={pageData[1].objectData.responseData}
      html={pageData[1].objectData.responseData.html}
    />
  ))
  .add('with fragment embed iframe', () => (
    <RawHtmlContainer
      settingsExternalContent={pageData[0].objectData.responseData}
      html={pageData[0].objectData.responseData.html}
    />
  ));
