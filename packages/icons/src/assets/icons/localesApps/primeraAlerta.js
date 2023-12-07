import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

import { WHITE } from '../../../constants/colors';
/**
 * primeraAlerta component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const primeraAlerta = ({
  width, height, style, className, fill,
}) => (
  <Svg width={width} height={height} style={style} className={className} viewBox="0 0 80 32">
    <G fill={fill || WHITE} fillRule="nonzero">
      <Path
        d="m4.374 8.482-.907 5.14H1l2.25-12.62h3.918c1.687 0 2.793.487 3.482 1.298.543.64.839 1.452.835 2.29 0 1.262-.653 2.397-1.633 3.1-.689.487-1.524.794-2.956.794l-2.522-.002Zm2.413-2.164c.942 0 1.342-.162 1.632-.414.39-.328.616-.809.617-1.316a1.437 1.437 0 0 0-.29-.884c-.254-.34-.69-.54-1.706-.54H5.335l-.562 3.154h2.014ZM17.707 1c1.378 0 2.122.27 2.72.721.853.631 1.397 1.605 1.397 2.686 0 1.316-.743 2.416-1.814 3.029a3.605 3.605 0 0 1-1.251.432l4.009 5.754H19.92L16.056 7.94h-.69l-1.015 5.68h-2.467l2.25-12.619L17.706 1Zm-1.488 2.163-.49 2.704h1.651c.907 0 1.27-.162 1.524-.396.299-.275.47-.66.471-1.065a1.207 1.207 0 0 0-.342-.865c-.218-.234-.527-.379-1.433-.379l-1.38.001ZM26.142 1h2.466l-2.249 12.622h-2.467zM32.98 6.498l-1.288 7.124h-2.467L31.473 1h1.724l3.048 7.554L42.467 1h1.723l-2.249 12.622h-2.467l1.252-6.959-4.009 4.883h-1.723zM47.057 1h7.618l-.381 2.163h-5.152l-.471 2.615h3.884l-.381 2.163h-3.882l-.635 3.515h5.333l-.381 2.163h-7.798zM60.534 1c1.379 0 2.123.27 2.721.721.852.631 1.397 1.605 1.397 2.686 0 1.316-.744 2.416-1.814 3.029a3.605 3.605 0 0 1-1.252.432l4.01 5.754h-2.849L58.883 7.94h-.689l-1.016 5.68h-2.466L56.96 1.003 60.534 1Zm-1.487 2.163-.49 2.704h1.65c.907 0 1.27-.162 1.524-.396.3-.275.47-.66.472-1.065a1.207 1.207 0 0 0-.343-.865c-.218-.234-.526-.379-1.433-.379l-1.38.001ZM66.23 13.622l7.69-12.62h1.724L79 13.622h-2.45l-.744-2.795h-5.099l-1.702 2.795H66.23Zm5.804-4.958h3.193l-.961-3.644-2.232 3.644Z"
      />
      <G fill={fill || WHITE} fillRule="nonzero">
        <Path
          d="m5.15 32 8.716-14.3h1.953L19.622 32h-2.775l-.842-3.167h-5.777L8.295 32H5.15Zm6.579-5.618h3.617l-1.089-4.127-2.528 4.127ZM23.651 17.7h2.796L24.33 29.547h6.044L29.943 32h-8.839zM34.711 17.7h8.633l-.43 2.451h-5.839l-.535 2.962h4.4l-.432 2.451h-4.4l-.719 3.984h6.044L41.001 32h-8.839zM49.984 17.7c1.562 0 2.405.306 3.085.817.966.715 1.586 1.818 1.586 3.043 0 1.49-.844 2.738-2.057 3.433-.391.225-.822.388-1.419.49l4.542 6.515h-3.227l-4.38-6.433h-.781L46.182 32h-2.797l2.55-14.3h4.049Zm-1.686 2.451-.557 3.066h1.87c1.029 0 1.44-.184 1.727-.45.34-.31.533-.747.535-1.205a1.369 1.369 0 0 0-.39-.98c-.247-.265-.597-.428-1.625-.428l-1.56-.003ZM67.375 17.7l-.432 2.451H63.14l-2.117 11.85h-2.796l2.118-11.85h-3.803l.431-2.452zM63.922 32l8.716-14.3h1.953L78.393 32h-2.775l-.843-3.167h-5.776L67.067 32h-3.145Zm6.578-5.618h3.618l-1.09-4.127-2.528 4.127Z"
        />
      </G>
    </G>
  </Svg>
);

/**
 * primeraAlerta props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
primeraAlerta.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default primeraAlerta;
