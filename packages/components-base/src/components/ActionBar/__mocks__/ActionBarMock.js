import {
  reactionTypes,
} from '@univision/fe-commons/dist/constants/reactionTypes';

const reactions = [
  {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.LOVE,
  }, {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.DISLIKE,
  }, {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.LIKE,
  }, {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.SAD,
  }, {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.SURPRISED,
  },
];

const reactionTUDN = [
  {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.LOVE,
  }, {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.FUNNY,
  }, {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.SURPRISED,
  }, {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.DISLIKE,
  }, {
    count: Math.floor(Math.random() * 10000),
    reaction: reactionTypes.SAD,
  },
];

export default {
  user: {
    reactions: {
      byId: {
        '00000171-a2a9-d200-a77b-f6ed1add0000': {
          contentId: '00000171-a2a9-d200-a77b-f6ed1add0000',
          reaction: reactionTypes.LOVE,
        },
      },
    },
  },
  reactions: {
    byId: {
      '00000171-a2a9-d200-a77b-f6ed1add0000': {
        contentId: '00000171-a2a9-d200-a77b-f6ed1add0000',
        counts: reactions,
      },
      topTwo: {
        contentId: 'topTwo',
        counts: [
          {
            count: Math.floor(Math.random() * 10000),
            reaction: reactionTypes.LOVE,
          }, {
            count: Math.floor(Math.random() * 10000),
            reaction: reactionTypes.DISLIKE,
          },
        ],
      },
      topOne: {
        contentId: 'topOne',
        counts: [
          {
            count: Math.floor(Math.random() * 10000),
            reaction: reactionTypes.LOVE,
          },
        ],
      },
      noneReaction: {
        contentId: 'noneReaction',
        counts: null,
      },
      reactionTUDN: {
        contentId: 'reactionTUDN',
        counts: reactionTUDN,
      },
    },
  },
};
