import { mapStateToProps, areStatesEqual } from './LoaderIndicatorBarConnector';

const statePageData = {
  page: {
    loading: true,
  },
};

describe('LoaderBarConnector', () => {
  describe('mapStateToProps', () => {
    it('should return page state', () => {
      const pageState = mapStateToProps(statePageData);
      expect(pageState).toEqual({ loading: true });
    });
  });

  describe('areStatesEqual', () => {
    it('should return true', () => {
      expect(areStatesEqual({
        page: {
          loading: false,
        },
      }, {
        page: {
          loading: false,
        },
      })).toBeTruthy();
    });
  });
});
