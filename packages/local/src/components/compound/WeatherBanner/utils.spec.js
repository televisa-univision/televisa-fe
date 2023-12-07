import buildTrackObject from './utils';

describe('Test buildTrackObject function', () => {
  it('Should return track object for the weather modal', () => {
    const expectedModalObject = {
      cardId: '123',
      cardType: 'alertas cta with badge',
      cardTitle: 'alertas del tiempo',
      widgetPos: 0,
      widgetTitle: 'topnav-weather modal',
      widgetType: 'topnav-weather modal',
    };
    expect(buildTrackObject({ type: 'modal', id: '123' })).toStrictEqual(expectedModalObject);
  });
  it('Should return track object for the weather tiempo page', () => {
    const expectedModalObject = {
      cardId: '124',
      cardType: 'alertas cta',
      cardTitle: 'alertas del tiempo',
      widgetPos: 0,
      widgetTitle: 'tiempo section header',
      widgetType: 'header',
    };
    expect(buildTrackObject({ type: 'tiempo', id: '124' })).toStrictEqual(expectedModalObject);
  });
  it('Should return track object for the weather card', () => {
    const expectedModalObject = {
      cardId: '125',
      widgetPos: 1,
      cardType: 'alertas cta with badge',
      cardTitle: 'alertas del tiempo',
      widgetTitle: 'ultimas noticias',
      widgetType: 'locales - opening widget',
    };
    expect(buildTrackObject({ type: 'widget', id: '125', widgetPos: 1 })).toStrictEqual(expectedModalObject);
  });
  it('Should return track object for the weather card without data', () => {
    const expectedModalObject = {
      cardType: 'alertas cta with badge',
      cardTitle: 'alertas del tiempo',
      widgetTitle: 'ultimas noticias',
      widgetType: 'locales - opening widget',
    };
    expect(buildTrackObject({ type: 'widget' })).toStrictEqual(expectedModalObject);
  });
  it('Should return track object for the weather modal with extreme alert', () => {
    const extremeAlert = {
      detailKey: '123',
    };
    const expectedModalObject = {
      cardId: '123',
      cardType: 'alertas cta with badge',
      cardTitle: 'alertas del tiempo',
      widgetPos: 0,
      widgetTitle: 'topnav-weather modal',
      widgetType: 'topnav-weather modal',
    };
    expect(buildTrackObject({ type: 'modal', extremeAlert })).toStrictEqual(expectedModalObject);
  });
});
