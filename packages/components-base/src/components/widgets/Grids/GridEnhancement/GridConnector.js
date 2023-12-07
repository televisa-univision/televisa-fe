import WithNativeMarker from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeMarker';
import WithPersonalizedWidget from '../../../personalize/WithPersonalizedWidget';
import { GridEnhancement } from '.';

const GridWidgetWithNative = WithNativeMarker(GridEnhancement, 'content');
const GridWidgetWithPersonalization = WithPersonalizedWidget(GridWidgetWithNative, 'content');

export default GridWidgetWithPersonalization;
