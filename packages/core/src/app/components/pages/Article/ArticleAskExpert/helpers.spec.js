import AskExpertHelpers from './helpers';

/** @test {Ask Experts Helpers} */
describe('Ask Expert Helpers', () => {
  it('should return a phone number', () => {
    const pageData = {
      data: {
        askExpertData: {
          phoneNumber: '555.888.0000',
        },
      },
    };
    expect(AskExpertHelpers.getAskExpertPhoneNumber(pageData)).toBe('555.888.0000');
  });

  it('should return expert company bio', () => {
    const pageData = {
      data: {
        askExpertData: {
          phoneNumber: '555.888.0000',
          website: 'www',
        },
        authors: [
          {
            address: 'address',
            description: 'description',
            fullName: 'fullName',
            image: 'image',
          },
        ],
      },
    };
    expect(AskExpertHelpers.getAskExpertCompanyBioInfo(pageData)).toStrictEqual({
      address: 'address',
      description: 'description',
      image: 'image',
      name: 'fullName',
      phone: '555.888.0000',
      website: 'www',
    });
  });

  it('should return expert company bio even when askExpertData is empty', () => {
    const pageData = {
      data: {
        askExpertData: {
          phoneNumber: '',
          website: '',
        },
        authors: [
          {
            address: 'address',
            description: 'description',
            fullName: 'fullName',
            image: 'image',
            phoneNumber: '888.888.8888',
            website: 'www1',
          },
        ],
      },
    };
    expect(AskExpertHelpers.getAskExpertCompanyBioInfo(pageData)).toStrictEqual({
      address: 'address',
      description: 'description',
      image: 'image',
      name: 'fullName',
      phone: '888.888.8888',
      website: 'www1',
    });
  });

  it('should return expert company bio even when askExpertData is empty and authors is empty', () => {
    const pageData = {
      data: {
        askExpertData: {
          phoneNumber: '',
          website: '',
        },
        authors: [
          {
            address: 'address',
            description: 'description',
            fullName: 'fullName',
            image: 'image',
            phoneNumber: '',
            website: '',
          },
        ],
      },
    };
    expect(AskExpertHelpers.getAskExpertCompanyBioInfo(pageData)).toStrictEqual({
      address: 'address',
      description: 'description',
      image: 'image',
      name: 'fullName',
      phone: '',
      website: '',
    });
  });
});
