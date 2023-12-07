import React from 'react';
import { Provider } from 'react-redux';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';

import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import defaultImageLarge from '@univision/fe-commons/dist/assets/images/radio-default-360.jpg';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import DarkCover from '@univision/fe-components-base/dist/components/DarkCover';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import Header from '@univision/fe-components-base/dist/components/Header';
import Link from '@univision/fe-components-base/dist/components/Link';
import Authenticator from '@univision/fe-commons/dist/components/Authenticator';
import MainWrapper from '../../layout/MainWrapper';

import Styles from './ErrorPage.scss';
import ErrorPageWidgets from './ErrorPageWidgets';

/**
 * Container component representing an Error page.
 * @returns {JSX}
 */
const ErrorPage = () => {
  const pageData = getPageData(Store);
  let statusCode = getKey(pageData, 'statusCode', 500);
  const supportedStatusCodes = [404, 500];
  if (!supportedStatusCodes.includes(statusCode)) statusCode = 500;
  const is404 = statusCode === 404;
  return (
    <Provider store={Store}>
      <Authenticator />
      <MainWrapper state={Store.getState()}>
        <Header pageData={pageData.data} pageCategory={pageCategories.UNIVISION} />
        <DarkCover
          overrideImageUrl={defaultImageLarge}
          className={Styles.errorPageCover}
        >
          <div className="uvs-container">
            <div className={classnames(Styles.errorPageContainer, 'row',
              {
                [Styles.widgetsContainer]: is404,
              })}
            >
              <div className={`${Styles.titlesContainer} col-12`}>
                <h2 className={`${Styles.title} uvs-font-a-bold`}>
                  {localization.get(`status${statusCode}Title`)}
                </h2>
                <p className={`${Styles.subTitle}`}>
                  {localization.get(`status${statusCode}TitleSecondary`)}
                </p>
                <p className={`${Styles.subTitle}`}>
                  {localization.get(`status${statusCode}TitleTertiary`)}
                </p>
              </div>
              {
                is404 && <ErrorPageWidgets />
              }
              <div className="col-12">
                <Link className={`${Styles.homeLink} uvs-font-a-bold`} href="/">
                  {localization.get('backToHome')}
                </Link>
              </div>
            </div>
          </div>
        </DarkCover>
        <Footer />
      </MainWrapper>
    </Provider>
  );
};

export default ErrorPage;
