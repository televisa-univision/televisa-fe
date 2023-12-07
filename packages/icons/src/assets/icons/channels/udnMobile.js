import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * udnMobile component
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const udnMobile = ({
  width, height, fill, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 63 16"
    className={className}
    style={style}
  >
    <G fill={`${fill || '#067E5A'}`} id="Page-1" fillRule="evenodd">
      <Path d="M38.3311111,2 C41.5511111,2 44.3666667,3.8842782 44.3718519,7.63880771 C44.3718519,11.1408533 41.5251852,13.1466978 38.3311111,13.1466978 L31.9118519,13.1466978 L31.9118519,5.06253653 L33.3637037,6.37171245 L33.3637037,6.38573933 L33.3637037,11.823495 L38.2792593,11.823495 C40.877037,11.8001169 42.9718519,9.89246055 42.9718519,7.54529515 C42.9718519,5.19812975 40.877037,3.29047341 38.2792593,3.26709527 L31.9118519,3.26709527 L31.9118519,2 L38.3311111,2 Z M38.4555556,5.06253653 L31.9118519,5.0578609 L31.9118519,5.04850964 L31.9118519,3.73465809 L38.2740741,3.73465809 L38.2740741,3.73933372 L38.2740741,3.73465809 C40.5866667,3.76271186 42.4481481,5.4552893 42.4481481,7.54529515 C42.4481481,9.63530099 40.5814815,11.3325541 38.2740741,11.3559322 L38.2740741,11.3512566 L38.2740741,11.3559322 L33.8874074,11.3559322 L33.8874074,6.85797779 L33.8874074,6.84395091 L35.2977778,8.1157218 L35.2977778,10.0888369 L38.4555556,10.0888369 C40.0111111,10.0888369 41.2244444,8.97603741 41.2244444,7.57334892 C41.2244444,6.24547049 40.1874074,5.06253653 38.4555556,5.06253653 Z M4,2 L16.6414815,2 L16.6414815,3.29514904 L4,3.29514904 L4,2 Z M4,5.06253653 L4,3.77206312 L16.6414815,3.77206312 L16.6414815,5.06253653 L12.0162963,5.06253653 L8.62518519,5.06253653 L4,5.06253653 Z M10.5851852,6.82992402 L12.0162963,8.12507306 L12.0162963,13.1747516 L10.5851852,13.1747516 L10.5851852,13.1466978 L10.5851852,6.98421975 L10.5851852,6.82992402 Z M10.0562963,13.1466978 L10.0562963,13.1747516 L8.62518519,13.1747516 L8.62518519,5.06253653 L10.0562963,6.35300994 L10.0562963,6.98421975 L10.0562963,13.1466978 Z M29.0237037,2 L30.46,2 L30.46,7.94272355 C30.46,10.8509643 28.3807407,13.3898305 24.2118519,13.3898305 C20.3385185,13.3898305 18.1037037,10.8322618 18.1037037,7.94272355 L18.1037037,2 L19.5348148,2 L19.5348148,7.95675044 C19.5607407,10.2992402 21.6762963,12.188194 24.2792593,12.188194 C26.8822222,12.188194 28.9977778,10.2992402 29.0237037,7.95675044 L29.0237037,2 Z M20.0481481,2 L21.4844444,2 L21.4844444,8.05961426 C21.4844444,9.46697838 22.7185185,10.5563998 24.2792593,10.5563998 C25.7518519,10.5563998 27.0585185,9.62127411 27.0585185,8.05961426 L27.0585185,2 L28.5,2 L28.5,7.95675044 L28.4948148,7.95675044 L28.5,7.95675044 C28.4688889,10.0420807 26.5918519,11.7206312 24.2740741,11.7206312 C21.9562963,11.7206312 20.0740741,10.037405 20.0481481,7.95675044 L20.0533333,7.95675044 L20.0481481,7.95675044 L20.0481481,2 Z M56.0281481,2.01870251 L57.4644444,2.01870251 L57.4644444,13.1747516 L54.457037,13.1747516 L49.1785185,7.05435418 L49.1785185,13.1747516 L47.7422222,13.1747516 L47.7422222,3.73933372 L48.0274074,3.73933372 L55.0274074,11.8328463 L56.0281481,11.8328463 L56.0281481,2.01870251 Z M55.5044444,11.3606078 L55.2814815,11.3606078 L48.2866667,3.27177089 L47.2185185,3.27177089 L47.2185185,13.1747516 L45.7822222,13.1747516 L45.7822222,2.01870251 L48.9814815,2.01870251 L54.0681481,7.91466978 L54.0681481,2.01870251 L55.5044444,2.01870251 L55.5044444,11.3606078 Z M59.1755556,2.01870251 C59.8196528,2.01870251 60.3422222,2.528872 60.3422222,3.15768556 C60.3422222,3.78649912 59.8196528,4.29666861 59.1755556,4.29666861 C58.5314583,4.29666861 58.0088889,3.78649912 58.0088889,3.15768556 C58.0088889,2.528872 58.5314583,2.01870251 59.1755556,2.01870251 Z M59.1755556,4.07124489 C59.6920486,4.07124489 60.1113194,3.66192285 60.1113194,3.15768556 C60.1113194,2.65344828 59.6920486,2.25005845 59.1755556,2.25005845 C58.6590625,2.25005845 58.2397917,2.65938048 58.2397917,3.15768556 C58.2397917,3.66192285 58.6590625,4.07124489 59.1755556,4.07124489 Z M59.0175694,3.25260082 L59.0175694,3.78056692 L58.7259028,3.78056692 L58.7259028,2.53480421 L59.1816319,2.53480421 C59.3396181,2.53480421 59.4307639,2.57039743 59.5036806,2.62971946 C59.5826736,2.6949737 59.6312847,2.79582116 59.6312847,2.90853302 C59.6312847,3.03310929 59.5705208,3.13395675 59.4672222,3.19327878 C59.4429167,3.21107539 59.4186111,3.2170076 59.3882292,3.228872 L59.7710417,3.77463472 L59.4550694,3.77463472 L59.0965625,3.24666861 L59.0175694,3.24666861 L59.0175694,3.25260082 Z M59.1877083,3.05626136 C59.2545486,3.05626136 59.2849306,3.04260124 59.3092361,3.00845093 C59.3274653,2.98796075 59.3335417,2.9606405 59.3335417,2.92649019 C59.3335417,2.89233988 59.3274653,2.86501963 59.3092361,2.84452945 C59.2849306,2.8172092 59.2545486,2.78988895 59.1877083,2.78988895 L59.0175694,2.78988895 L59.0175694,3.0494313 L59.1877083,3.0494313 L59.1877083,3.05626136 Z" />
    </G>
  </Svg>
);

udnMobile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default udnMobile;
