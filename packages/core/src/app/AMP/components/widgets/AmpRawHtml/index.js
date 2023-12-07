import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

import Styles from './AmpRawHtml.styles';

const AmpRawHtmlStyled = styled.div`${Styles.raw}`;

/**
 * Injects content via dangerouslySetInnerHTML and trigger an AMP resize.
 * @returns {*}
 * @constructor
 */
export default function AmpRawHtml({ chunk }) {
  let html = '';
  if (hasKey(chunk, 'objectData.html')) {
    html = chunk.objectData.html;
  } else if (hasKey(chunk, 'objectData.responseData.html')) {
    html = chunk.objectData.responseData.html;
  }
  const script = `
    <script type="text/javascript">
      function resizeAmpIframe(isFirstTime) {
        // 666 is an special height to hide the parent container
        const height = (!isFirstTime && !document.body.innerText) ? 666 : 1 * document.body.scrollHeight + 50;
        window.parent.postMessage({
          sentinel: 'amp',
          type: 'embed-size',
          height: height > 100 ? height : 100
        }, '*');
      }
      resizeAmpIframe(true);
      setTimeout(resizeAmpIframe, 500);
      setTimeout(resizeAmpIframe, 1000);
    </script>
  `;
  return (
    <AmpRawHtmlStyled
      dangerouslySetInnerHTML={{ __html: `${html || ''}${script}` }} // eslint-disable-line react/no-danger
    />
  );
}

AmpRawHtml.propTypes = {
  chunk: PropTypes.object.isRequired,
};
