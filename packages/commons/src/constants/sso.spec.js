import {
  iFrameAncestorsRegex,
  iFrameAncestors,
} from './sso';

describe('iFrameAncestors and iFrameAncestorsRegex', () => {
  it('should iFrameAncestors and iFrameAncestorsRegex have the same length', () => {
    // If we define a new iFrameAncestors we need to provide also a new entry
    // for iFrameAncestorsRegex because both are used for validation purposes
    // related to valid Referrers or valid frame-ancestors for the CSP policy
    expect(iFrameAncestors.length).toEqual(iFrameAncestorsRegex.length);
  });
});
