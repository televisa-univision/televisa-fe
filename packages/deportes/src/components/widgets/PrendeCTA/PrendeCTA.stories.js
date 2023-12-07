import React from 'react';

import { storiesOf } from '@storybook/react';

import PRENDE_CTA_IMAGES from '@univision/fe-commons/dist/constants/prendeCTAImages';

import PrendeCTA from '.';

storiesOf('Widgets/Prende CTA', module)
  .add('With Basics', () => (
    <PrendeCTA />
  ))
  .add('With isLive', () => (
    <PrendeCTA isLive />
  ))
  .add('With Basics mobile', () => (
    <PrendeCTA device="mobile" />
  ))
  .add('With isLive mobile', () => (
    <PrendeCTA
      isLive
      device="mobile"
      subTitle="subTitle"
      shortTitle="MEX vs USA"
    />
  ))
  .add('With Vix icon', () => (
    <PrendeCTA
      isLive
      subTitle="MEX vs USA"
      shortTitle="MEX vs USA"
      isVixEnabled
      imageConfig={PRENDE_CTA_IMAGES['uefa champions league']}
    />
  ))
  .add('With Vix icon mobile', () => (
    <PrendeCTA
      isLive
      device="mobile"
      subTitle="MEX vs USA"
      shortTitle="MEX vs USA"
      isVixEnabled
      imageConfig={PRENDE_CTA_IMAGES['uefa champions league']}
    />
  ));
