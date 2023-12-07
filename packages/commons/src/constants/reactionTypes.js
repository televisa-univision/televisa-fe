import localization from '../utils/localization/LocalizationManager';

export const reactionTypes = Object.freeze({
  DISLIKE: 'DISLIKE',
  FUNNY: 'FUNNY',
  LIKE: 'LIKE',
  LOVE: 'LOVE',
  SAD: 'SAD',
  SURPRISED: 'SURPRISED',
});

export default {
  global: () => [
    {
      reaction: reactionTypes.LOVE,
      title: localization.get('iLoveIt'),
      icon: 'love',
    }, {
      reaction: reactionTypes.LIKE,
      title: localization.get('iLikeIt'),
      icon: 'like',
    }, {
      reaction: reactionTypes.SURPRISED,
      title: localization.get('amazesMe'),
      icon: 'surprisedReaction',
    }, {
      reaction: reactionTypes.DISLIKE,
      title: localization.get('iDislikeIt'),
      icon: 'dislikeReaction',
    }, {
      reaction: reactionTypes.SAD,
      title: localization.get('saddensMe'),
      icon: 'sad',
    },
  ],
  tudn: () => [
    {
      reaction: reactionTypes.LOVE,
      title: localization.get('iLoveIt'),
      icon: 'loveSoccer',
    }, {
      reaction: reactionTypes.FUNNY,
      title: localization.get('iEnjoyIt'),
      icon: 'funnySoccer',
    }, {
      reaction: reactionTypes.SURPRISED,
      title: localization.get('amazesMeSoccer'),
      icon: 'surprisedReactionSoccer',
    }, {
      reaction: reactionTypes.DISLIKE,
      title: localization.get('iDislikeIt'),
      icon: 'dislikeReactionSoccer',
    }, {
      reaction: reactionTypes.SAD,
      title: localization.get('saddensMeSoccer'),
      icon: 'sadSoccer',
    },
  ],
};
