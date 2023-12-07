import shareButtonDataHelper from './shareButtonDataHelper';

let sharingOptions;
beforeEach(() => {
  sharingOptions = {
    facebook: {
      url: 'http://www.local.univision.com/en-US/albuquerque/kkss/noticias/test-quiz',
      redirectUrl: 'http://www.local.univision.com/en-US/albuquerque/kkss/noticias/test-quiz',
      isFeedDialog: true,
      appId: '645138725541385',
      title: 'Test Quiz',
      description: 'Testing',
      imageUrl: 'http://univision-bs.s3.amazonaws.com/e9/d8/45d6dc504ed980a3e48a66278c38/download-15.jpeg',
    },
    twitter: {
      title: 'Test Quiz',
      url: 'http://www.local.univision.com/en-US/albuquerque/kkss/noticias/test-quiz',
      via: 'UniNoticias',
    },
    mail: {
      subject: 'Test Quiz',
      body: 'Un amigo te ha recomendado este contenido que puede ser de tu inters. Test Quiz Encuntralo en este enlace: http://www.local.univision.com/en-US/albuquerque/kkss/noticias/test-quiz Visitamos www.univision.com',
    },
    whatsapp: {
      url: 'http://www.local.univision.com/en-US/albuquerque/kkss/noticias/test-quiz',
      message: 'Test Quiz',
    },
  };
});
/** @test {shareButtonDataHelper} */
describe('shareButtonDataHelper ', () => {
  it('should return appropriate props for facebook share button', () => {
    const props = shareButtonDataHelper('facebook', sharingOptions);
    expect(Object.keys(props)).toEqual(['href', 'target']);
  });

  it('should return appropriate props for facebook share button for non-feed', () => {
    sharingOptions.facebook.isFeedDialog = false;
    const props = shareButtonDataHelper('facebook', sharingOptions);
    expect(Object.keys(props)).toEqual(['href', 'target']);
  });

  it('should return appropriate props for twitter share button', () => {
    const props = shareButtonDataHelper('twitter', sharingOptions);
    expect(Object.keys(props)).toEqual(['href', 'target']);
  });

  it('should return appropriate props for whatsapp share button', () => {
    const props = shareButtonDataHelper('whatsapp', sharingOptions);
    expect(Object.keys(props).sort()).toEqual(['href', 'dataActionAttr', 'target'].sort());
  });

  it('should return appropriate props for mail share button', () => {
    const props = shareButtonDataHelper('mail', sharingOptions);
    expect(Object.keys(props)).toEqual(['href', 'target']);
  });

  it('should return null if no name provided or no data exists', () => {
    let props = shareButtonDataHelper();
    expect(props).toEqual(null);
    props = shareButtonDataHelper('test');
    expect(props).toEqual(null);
  });
});
