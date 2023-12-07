import React from 'react';

import ButtonUniNow from '../../../../../widgets/ButtonUniNow';
import ButtonShop from '../../../../../widgets/ButtonShop';
import ButtonPrendeTv from '../../../../ButtonPrendeTv';
/**
 * This component merges the ButtonUniNow and ButtonPrendeTV in one component to
 * keep a cleaner rendering logic
 * @returns {JSX}
 */
const UniNow = () => {
  return (
    <>
      <ButtonShop />
      <ButtonUniNow />
      <ButtonPrendeTv />
    </>
  );
};

export default UniNow;
