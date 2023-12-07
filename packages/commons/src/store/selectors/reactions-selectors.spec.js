import deepFreeze from 'deep-freeze';
import * as selector from './reactions-selectors';

const state = {
  reactions: {
    allIds: ['test', 'test2'],
    byId: {
      test: {
        counts: [
          { count: 10, reaction: 'HAPPY' },
          { count: 20, reaction: 'SAD' },
        ],
      },
    },
  },
};

deepFreeze(state);

describe('reactions-selectors', () => {
  describe('reactionSelector', () => {
    it('should return an empty object by default', () => {
      expect(selector.reactionsSelector()).toEqual({});
    });

    it('should return the expected value', () => {
      expect(selector.reactionsSelector(state)).toEqual(state.reactions);
    });
  });

  describe('reactionsByIdSelector', () => {
    it('should return the corresponding value', () => {
      const props = { contentId: 'test' };
      const reactionsByIdSelector = selector.makeReactionsByIdSelector();
      expect(reactionsByIdSelector(state, props))
        .toEqual(state.reactions.byId.test.counts);
    });
  });

  describe('reactionsTotalSelector', () => {
    it('should return the corresponding value', () => {
      const totalSelector = selector.reactionsTotalSelector('test');
      expect(totalSelector(state)).toBe(30);
    });
    it('should return 0 when the counts are empty', () => {
      const modifiedState = {
        ...state,
        reactions: {
          ...state.reactions,
          byId: {
            test: {
              counts: [],
            },
          },
        },
      };
      const totalSelector = selector.reactionsTotalSelector('test');
      expect(totalSelector(modifiedState)).toBe(0);
    });
  });
});
