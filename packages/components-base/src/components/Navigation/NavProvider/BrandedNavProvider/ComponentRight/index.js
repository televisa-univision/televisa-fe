import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import features from '@univision/fe-commons/dist/config/features';
import getComponent from './getComponent';

/**
 * Component on the right of the Branded Header renderer
 * @param {Object} props of the component
 * @param {string} [brandableType] - type of brandable (tv, radio, show)
 * to load its corresponding components. It can be null
 * @returns {JSX}
 */
const ComponentRight = (props) => {
  const { brandableType } = props;
  const isRegistrationEnabled = useSelector(features.registration.enableRegistration);
  const LoadedComponent = getComponent(brandableType, isRegistrationEnabled);
  return <LoadedComponent {...props} />;
};

ComponentRight.propTypes = {
  brandableType: PropTypes.string,
};

export default ComponentRight;
