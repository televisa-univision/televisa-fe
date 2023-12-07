import React from 'react';
import PropTypes from 'prop-types';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Link from '@univision/fe-components-base/dist/components/Link';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import Title from '@univision/fe-components-base/dist/components/Title';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import * as ratios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import ButtonIcon from '@univision/fe-components-base/dist/components/ButtonIcon';
import * as buttonTypes from './buttonTypes';
import Styles from './GradientBox.scss';

/**
 * Basic building block for image+text+cta based container components
 * e.g. widgets like {@link AltoImpacto} and {@link PromoCard}
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const GradientBox = ({
  useOriginal, isRadio, title, type, uri, image, link, className,
}) => {
  const url = hasKey(link, 'href') ? link.href : uri;
  let deviceSizeOverrides = {
    xl: sizes.LARGE,
    lg: sizes.LARGE,
  };
  let aspectRatio = ratios.ASPECT_RATIO_16X9;
  let altoImpactoMobile;

  if (useOriginal) {
    aspectRatio = ratios.ASPECT_RATIO_ORIGINAL;
  } else {
    altoImpactoMobile = {
      xl: sizes.LARGE,
      lg: sizes.LARGE,
      md: sizes.LARGE,
      sm: sizes.LARGE,
      xsm: sizes.LARGE,
    };

    deviceSizeOverrides = {
      xl: sizes.X_LARGE,
      lg: sizes.LARGE,
      md: sizes.MEDIUM,
      sm: sizes.MEDIUM,
    };
  }

  const { text, icon } = buttonTypes.getType(type, isRadio);

  return (
    <div className={`${className} row`}>
      <div className={`${Styles.wrapperGradient}`}>
        <Title element="h2" hidden>
          {localization.get('moreNewsOfInterest')}
        </Title>
        <Link href={url} className={Styles.link}>
          <div className={`${Styles.imageCont} `}>
            <Picture
              alt={title}
              image={image}
              deviceSizeOverrides={deviceSizeOverrides}
              aspectRatio={aspectRatio}
              className={useOriginal ? '' : Styles.altoImpactoDesktop}
            />
            {!useOriginal && (
              <Picture
                alt={title}
                image={image}
                deviceSizeOverrides={altoImpactoMobile}
                aspectRatio={ratios.ASPECT_RATIO_1X1}
                className={Styles.altoImpactoMobile}
              />
            )}
          </div>
          <div className={`${Styles.actionWrapper}`}>
            <Title className={`${Styles.title}`} size="large">
              {title}
            </Title>
            <ButtonIcon
              icon={icon}
              text={text}
              className={useOriginal ? Styles.promo : Styles.alto}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {content} component content
 */
GradientBox.propTypes = {
  useOriginal: PropTypes.bool,
  isRadio: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  uri: PropTypes.string,
  image: PropTypes.shape({
    renditions: PropTypes.object,
  }),
  link: PropTypes.object,
  className: PropTypes.string,
};

/**
 * Default props values
 * @property {object} default content
 */
GradientBox.defaultProps = {
  useOriginal: false,
  isRadio: true,
  title: '',
  type: 'externalcontent',
  uri: '',
  image: {
    renditions: {},
  },
  link: {},
};

export default GradientBox;
