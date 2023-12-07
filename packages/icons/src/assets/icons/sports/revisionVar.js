import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path, G } from 'svgs';

import { BLACK, WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * revisionVar component
 * @param {!Object} props - components props
 * @param {string} props.fill - custom fill color
 * @param {string} props.stroke - custom stroke color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {string} props.className - class name modifier
 * @param {Object} props.style - style override
 * @returns {JSX}
 */
const revisionVar = ({
  fill,
  stroke,
  height,
  width,
  viewBox,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox={viewBox}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path fill={WHITE} d="M21 58h214v131H21z" />
      <Path fill={`${stroke || fill || BLACK}`} d="M167.266 125.701c1.973 0 3.826.153 5.643-.033 3.276-.335 5.28-2.259 5.729-5.197.492-3.217-.727-5.706-3.432-6.876-2.564-1.108-5.23-.741-7.94-.7V125.7zm-.149 8.968v15.261h-11.45v-45.856c1.449 0 2.815-.022 4.18.004 5.995.113 12.038-.176 17.974.468 7.069.768 10.966 4.638 12.192 10.783 1.39 6.97-.76 11.773-6.955 15.54-.442.27-.88.543-1.488.918l11.645 16.825c-4.157.631-7.968 1.264-11.8 1.727-.53.064-1.369-.586-1.722-1.12-2.855-4.313-5.69-8.641-8.394-13.045-.956-1.557-2.028-2.26-4.182-1.505zM103.17 150.594c2.21-5.921 4.3-11.505 6.38-17.091 3.458-9.28 6.93-18.553 10.34-27.847.416-1.134.941-1.607 2.235-1.569 3.231.096 6.47-.022 9.7.082.59.02 1.497.562 1.684 1.065 5.374 14.396 10.675 28.818 15.983 43.238.042.114.016.252.035.67l-11.905 1.864c-.918-2.784-1.882-5.427-2.643-8.124-.404-1.434-1.11-1.865-2.62-1.827-4.287.107-8.58.084-12.87.009-1.216-.022-1.743.392-2.057 1.49a94.1 94.1 0 01-2.195 6.783c-.19.515-.905 1.186-1.397 1.201-3.423.105-6.851.056-10.67.056zm17.68-18.53h10.547l-5.16-15.664-.408.073-4.98 15.591zM75.317 104.097l10.691 32.591c.432-1.179.728-1.905.966-2.648 2.945-9.176 5.933-18.34 8.775-27.546.502-1.627 1.274-2.05 2.9-1.993 3.29.115 6.59.034 10.185.034-.226.746-.37 1.329-.578 1.889-5.297 14.219-10.624 28.427-15.87 42.664-.551 1.498-1.26 2.078-2.934 1.997-3.03-.148-6.073.015-9.105-.093-.592-.021-1.498-.57-1.688-1.077-5.432-14.51-10.79-29.046-16.233-43.77l12.89-2.048" />
      <Path fill={`${stroke || fill || BLACK}`} d="M21 177V53h214v139h-79v11H99v-11H21v-15zm16 0h182V68H37v109z" />
    </G>
  </Svg>
);

revisionVar.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default revisionVar;
