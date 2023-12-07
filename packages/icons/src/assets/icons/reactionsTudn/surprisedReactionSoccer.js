import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Stop,
  Svg,
} from 'svgs';

/**
 * surprisedReaction icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const surprisedReactionSoccer = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="50%"
        y1="111.073%"
        x2="50%"
        y2="-11.6%"
        id="prefix__surprisedreactiona"
      >
        <Stop stopColor="#F5A238" offset="0%" />
        <Stop stopColor="#FAD156" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__surprisedreactionb">
        <Stop stopColor="#945F1A" offset="0%" />
        <Stop stopColor="#25180C" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="prefix__surprisedreactionc">
        <Stop stopColor="#F5A238" stopOpacity={0} offset="0%" />
        <Stop stopColor="#FFFDF7" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__surprisedreactiond">
        <Stop stopColor="#4B4B4B" offset="0%" />
        <Stop stopColor="#3B3B3B" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z"
        fill="url(#prefix__surprisedreactiona)"
        fillRule="nonzero"
      />
      <Path
        d="M125.333 144c-19.146 0-34.666 20.296-34.666 45.333s15.52 45.334 34.666 45.334c19.146 0 34.667-20.297 34.667-45.334C160 164.296 144.48 144 125.333 144z"
        fill="url(#prefix__surprisedreactionb)"
        fillRule="nonzero"
      />
      <Path
        d="M125.333 10.667c-45.655 0-82.666 29.847-82.666 66.666 0 36.82 37.01 66.667 82.666 66.667S208 114.152 208 77.333s-37.011-66.666-82.667-66.666z"
        fill="url(#prefix__surprisedreactionc)"
        fillRule="nonzero"
        opacity={0.5}
      />
      <Ellipse
        fill="url(#prefix__surprisedreactiond)"
        cx={69.333}
        cy={104}
        rx={21.333}
        ry={24}
      />
      <Ellipse
        fill="url(#prefix__surprisedreactiond)"
        cx={181.333}
        cy={104}
        rx={21.333}
        ry={24}
      />
      <Path
        d="M178.811 44.886c-3.067 1.512-6.267.206-7.781-2.635-1.528-2.867-.748-6.198 2.352-7.728 13.783-6.8 29.52-4.96 38.89 5.781 2.248 2.58 1.828 6.014-.508 8.217-2.363 2.227-5.779 2.329-8.06-.287-5.848-6.706-15.931-7.771-24.893-3.349l-.59-1.195.59 1.196zM51.659 53.202c-2.445 2.348-5.913 2.145-8.28 0-2.418-2.19-2.746-5.57-.233-7.985C54.205 34.6 69.967 31.553 81.982 39.02c2.867 1.783 3.555 5.2 2.11 8.046-1.482 2.922-4.657 4.108-7.628 2.262-7.56-4.7-17.755-2.896-24.805 3.873l-.923-.961.923.961z"
        fill="#484848"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

surprisedReactionSoccer.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default surprisedReactionSoccer;
