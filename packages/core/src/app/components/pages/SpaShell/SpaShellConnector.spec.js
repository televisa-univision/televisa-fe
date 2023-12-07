import { mapStateToProps, areStatePropsEqual } from './SpaShellConnector';

const statePageData = {
  page: {
    data: {
      test: 'test',
    },
  },
};

const ownPropsPageData = {
  page: {
    data: {
      own: 'own',
    },
  },
};

describe('SpaShellConnector', () => {
  describe('mapStateToProps', () => {
    it('should return page state', () => {
      const pageState = mapStateToProps(statePageData);
      expect(pageState).toEqual(statePageData, {});
    });

    it('should return ownprops page', () => {
      const pageState = mapStateToProps(statePageData, ownPropsPageData);
      expect(pageState).toEqual(ownPropsPageData);
    });
  });

  describe('areStatePropsEqual', () => {
    it('should return true if navigationCount is equal', () => {
      expect(areStatePropsEqual({
        page: {
          navigationCount: 1,
        },
      }, {
        page: {
          navigationCount: 1,
        },
      })).toBeTruthy();
    });
    it('should return true if the initiator is not SPA, even if the URI are not equal', () => {
      expect(areStatePropsEqual({
        page: {
          data: {
            uri: '/a',
          },
          initiator: 'infinite-scrolling',
        },
      }, {
        page: {
          data: {
            uri: '/b',
          },
        },
      })).toBeTruthy();
    });
    it('should return false if navigation count is not equal and its a SPA transition', () => {
      expect(areStatePropsEqual({
        page: {
          navigationCount: 1,
          initiator: 'spa',
        },
      }, {
        page: {
          navigationCount: 2,
        },
      })).toBeFalsy();
    });
  });
});
