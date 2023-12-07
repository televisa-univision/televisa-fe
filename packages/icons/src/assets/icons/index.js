import { getIconsWithType } from '../../utils/helpers';
import iconsList from './icons.json';

export const iconsWithType = getIconsWithType();

// All available icons by category
export default iconsList;

// Icons allowed to be load as group
// coz are used all at the same time
export const iconsAllowedGroups = {
  reactionsTudn: iconName => import(/* webpackChunkName: "icons/iconsreactionsTudn" */ `./reactionsTudn/${iconName}`),
  reactionsUvn: iconName => import(/* webpackChunkName: "icons/iconsreactionsUvn" */ `./reactionsUvn/${iconName}`),
};
