import dynamic from 'next/dynamic';

import { CardPlaceHolder } from '../../components/Placeholder';

/**
 * Wrapper to use react loadable or next/dynamic
 * @param {Object} options - Dynamic import options
 * @param {Object} placeholder - Loading placeholder
 * @returns {React.ComponentType<{}>}
 */
const dynamicWrapper = (options, placeholder = CardPlaceHolder) => {
  if (process.env.APP_VERSION === '2') {
    return dynamic({
      loader: options.loader,
      loading: placeholder,
      loadableGenerated: {
        modules: options.modules,
        webpack: options.webpack,
      },
    });
  }
  return {
    ...options,
    loading: placeholder,
  };
};

export default dynamicWrapper;
