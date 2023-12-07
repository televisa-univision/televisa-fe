import getSocialNetworks from '../getSocialNetworks';

/**
 * @test {getSocialNetworks}
 */
describe('getSocialNetworks test', () => {
  it('should return an empty array if there is not social networks', () => {
    expect(getSocialNetworks({}, [])).toHaveLength(0);
  });

  it('should return an empty array if there is not matching social networks', () => {
    const content = {
      socialNetworks: {
        facebookUrl: {
          name: 'facebook',
        },
        randomUrl: {
          name: 'random',
        },
      },
    };
    expect(getSocialNetworks(content, [])).toHaveLength(0);
  });

  it('should return the social networks from Object', () => {
    const content = {
      socialNetworks: {
        facebookUrl: {
          name: 'facebook',
        },
        randomUrl: {
          name: 'random',
        },
      },
    };
    expect(getSocialNetworks(content, ['facebook', 'instagram'])).toHaveLength(1);
  });

  it('should return the social networks from Array', () => {
    const content = {
      socialNetworks: [{
        name: 'Facebook',
        href: '#',
      }],
    };

    expect(getSocialNetworks(content)).toEqual(content.socialNetworks);
  });
});
