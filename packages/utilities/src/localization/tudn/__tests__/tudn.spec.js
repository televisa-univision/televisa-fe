import LocalizationManager from '../../LocalizationManager';
import es from '../es.json';
import en from '../en.json';
import localization from '..';

/**
 * @test {tudn/localization}
 */
describe('localization tudn test', () => {
  it('should return an instance of LocalizationManager', () => {
    expect(localization).toBeInstanceOf(LocalizationManager);
  });

  it('should return localization with TUDN locale keys', () => {
    expect(localization.translations.es).toEqual(expect.objectContaining(es));
    expect(localization.translations.en).toEqual(expect.objectContaining(en));
  });
});
