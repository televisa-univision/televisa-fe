import LocalizationManager from '../LocalizationManager';
import englishData from '../common/en.json';
import spanishData from '../common/es.json';
import localization from '..';

/**
 * @test {LocalizationManager}
 */
describe('LocalizationManager test', () => {
  beforeEach(() => {
    localization.setLanguage('es');
  });

  it('should translate to spanish', () => {
    Object.keys(spanishData).forEach((key) => {
      expect(localization.get(key)).toBe(spanishData[key]);
    });
  });

  it('should translate to english', () => {
    localization.setLanguage('en');
    Object.keys(englishData).forEach((key) => {
      expect(localization.get(key)).toBe(englishData[key]);
    });
  });

  it('should ignore unknown languages', () => {
    localization.setLanguage('RANDOM');
    expect(localization.getCurrentLanguage()).toBe('es');
  });

  it('should translate to spanish for unsupported languages', () => {
    localization.language = undefined;
    Object.keys(spanishData).forEach((key) => {
      expect(localization.get(key)).toBe(spanishData[key]);
    });
  });

  it('should support extending the default translations', () => {
    const extendedLocalization = new LocalizationManager().extend({
      spanishData: {
        advertisement: 'customTranslation',
        customKey: 'extendedTranslation',
      }
    });
    expect(extendedLocalization.get('advertisement')).toEqual('customTranslation');
    expect(extendedLocalization.get('customKey')).toEqual('extendedTranslation');
  });

  it('should return the key when there is not a valid translation for that key', () => {
    const key = 'weirdKeyName';
    expect(localization.get(key)).toBe(key);
  });

  it('should return the locals value as fallback when this is a string', () => {
    const key = 'weirdKeyName';
    const fallback = 'weird key name';
    expect(localization.get(key, { fallback })).toBe(fallback);
  });

  it('should return the fallback value when there is no local match and fallback was set', () => {
    const extendedLocalization = new LocalizationManager().extend({
      spanishData: {
        propSubstitution: 'with {weirdKey}',
      }
    });
    const key = 'propSubstitution';
    const fallback = 'bar';
    const locals = {
      weirdKeyName: 'foo',
    };

    expect(extendedLocalization.get(key, { locals, fallback })).toEqual('with bar');
  });

  it('should return the key with properties substitution', () => {
    const extendedLocalization = new LocalizationManager().extend({
      spanishData: {
        propSubstitution: 'with {substitution}',
      }
    });
    expect(extendedLocalization.get('propSubstitution', {
      locals: {
        substitution: 'value',
      }
    })).toBe('with value');
  });

  it('should return the key with multiple properties substitution', () => {
    const extendedLocalization = new LocalizationManager().extend({
      spanishData: {
        propSubstitution: 'with {multiple} {substitution}',
      }
    });
    expect(extendedLocalization.get('propSubstitution', {
      locals: {
        multiple: 2,
        substitution: 'values',
      }
    })).toBe('with 2 values');
  });

  it('should return the key with missing property substitution', () => {
    const extendedLocalization = new LocalizationManager().extend({
      spanishData: {
        propSubstitution: 'with {substitution}',
      }
    });
    expect(extendedLocalization.get('propSubstitution', {
      locals: {
        substitution: null,
      }
    })).toBe('with {substitution}');
  });

  it('should translate to given language (Spanish)', () => {
    const key = 'advertisement';
    const language = 'es';
    expect(localization.get(key, { language })).toBe('Publicidad');
  });

  it('should translate to given language (English)', () => {
    const key = 'advertisement';
    const language = 'en';
    expect(localization.get(key, { language })).toBe('Advertisement');
  });
});
