import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import classnames from 'classnames';

import bgPattern from '@univision/fe-commons/dist/assets/images/striped-background.svg';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import features from '@univision/fe-commons/dist/config/features';
import { DEEP_SEA } from '@univision/fe-utilities/styled/constants';

import Link from '../../Link';
import Picture from '../../Picture';
import config from '../../../config';
import Button from '../../Button';
import ShareButton from '../../ShareButton';
import * as sizes from '../../Picture/imageSizes';
import Styles from './RelatedArticle.scss';

/**
 * RelatedArticle enhancement
 * @param {Object} props the component props
 * @returns {JSX}
 */
class RelatedArticle extends React.Component {
  /**
   * set initialState and bind methods
   * @param {Object} props Component properties
   */
  constructor(props) {
    super();

    this.toggleShare = this.toggleShare.bind(this);

    this.state = {
      showShare: props.showShare,
    };
  }

  /**
   * toggle showShare state boolean
   */
  toggleShare() {
    this.setState(({ showShare }) => ({ showShare: !showShare }));
  }

  /**
   * render the component1
   * @returns {JSX}
   */
  render() {
    const deviceSizeOverrides = {
      xl: sizes.SMALL,
      lg: sizes.SMALL,
    };
    const {
      uri, title, image, alignment, sharing, theme, isLiveBlog, onClick, lazyLoad,
    } = this.props;

    let alignClass = '';
    if (alignment) alignClass = Styles[`pull-${alignment}`];
    const { showShare } = this.state;

    let bgStyle = {};
    if (alignment && !isLiveBlog) {
      bgStyle = {
        backgroundImage: `url(${bgPattern})`,
      };
    }
    const isWorldCupMVP = features.deportes.isWorldCupMVP();
    const separatorMVPcolor = isWorldCupMVP ? DEEP_SEA : theme.primary;

    return (
      <div
        className={classnames(Styles.relatedArticle, alignClass)}
        style={bgStyle}
      >
        <div className={Styles.inner}>
          <div className={Styles.colLeft}>
            <div>
              <h4>
                <span
                  className={classnames(Styles.separator, { [Styles.separatorMVP]: isWorldCupMVP })}
                  style={{ borderColor: separatorMVPcolor }}
                />
                {localization.get('related')}
              </h4>
              <h5 className={'uvs-font-a-bold'}>
                <Link
                  onClick={onClick}
                  href={uri}
                  className={classnames({ [Styles.relatedMVP]: isWorldCupMVP })}
                >
                  {title}
                </Link>
              </h5>
            </div>
            {!isWorldCupMVP && (
              <div className={Styles.share}>
                <Button
                  plain
                  onClick={this.toggleShare}
                  className={`${Styles.shareButton} uvs-font-a-bold ${
                    showShare ? Styles.shareActive : ''
                  }`}
                >
                  {localization.get('share')} <Icon name="share" size="small" />
                </Button>
                {showShare && (
                <div className={`${Styles.shareButtons} uvs-font-a-bold`}>
                  <ShareButton
                    name="facebook"
                    className={Styles.articleShare}
                    sharingOptions={sharing.options}
                  />
                  <ShareButton
                    name="twitter"
                    className={Styles.articleShare}
                    sharingOptions={sharing.options}
                  />
                  <ShareButton
                    name="mail"
                    className={Styles.articleShare}
                    sharingOptions={sharing.options}
                  />
                </div>
                )}
              </div>
            )}

          </div>
          {image && (
            <div className={Styles.colRight}>
              <Link onClick={onClick} href={uri}>
                {lazyLoad === true && (
                  <LazyLoad height={100} offset={100} once>
                    <Picture alt={title} image={image} deviceSizeOverrides={deviceSizeOverrides} />
                  </LazyLoad>
                )}
                {lazyLoad === false && (
                  <Picture alt={title} image={image} deviceSizeOverrides={deviceSizeOverrides} />
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

RelatedArticle.propTypes = {
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  sharing: PropTypes.object,
  alignment: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  theme: PropTypes.object,
  lazyLoad: PropTypes.bool,
  showShare: PropTypes.bool,
  isLiveBlog: PropTypes.bool,
};

RelatedArticle.defaultProps = {
  sharing: {},
  theme: config.defaultTheme,
  lazyLoad: true,
  showShare: false,
  isLiveBlog: false,
};

export default RelatedArticle;
