import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';

import AllSectionsBase from './Base';

/**
 * AllSections with Profile Connection
 * @param {Object} props to be passed to AllSectionsBase
 * @returns {JSX}
 */
const AllSections = (props) => {
  return (
    <Provider store={Store}>
      <Fragment>
        <AllSectionsBase {...props} />
      </Fragment>
    </Provider>
  );
};

export default AllSections;
