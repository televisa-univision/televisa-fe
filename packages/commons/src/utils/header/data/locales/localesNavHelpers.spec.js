import {
  isPartOfAskExperts,
  isPartOfElectionsSection,
  isPartOfLocalesJobs,
  isPartOfCoronavirusNav,
} from './localesNavHelpers';

describe('isPartOfElectionsSection', () => {
  it('should return true if the uri is under elections path', () => {
    const url = 'https://www.test.com/local/miami-wltv/elecciones-estados-unidos-2020';
    expect(isPartOfElectionsSection(url)).toBeTruthy();
  });
  it('should return false if the uri is not under elections path', () => {
    const url = 'https://www.test.com/local/miami-wltv/';
    expect(isPartOfElectionsSection(url)).toBeFalsy();
  });
});

describe('isPartOfLocalesJobs', () => {
  it('should return true if the uri is under job listing path', () => {
    const url = 'https://www.test.com/local/miami-wltv/ofertas-de-trabajo-en-miami';
    expect(isPartOfLocalesJobs(url)).toBeTruthy();
  });
  it('should return false if the uri is not under job listing path', () => {
    const url = 'https://www.test.com/local/miami-wltv/';
    expect(isPartOfLocalesJobs(url)).toBeFalsy();
  });
});

describe('isPartOfAskExperts', () => {
  it('should return true if the uri is under ask the experts path', () => {
    const url = 'https://www.test.com/local/miami-wltv/pregunta-al-experto';
    expect(isPartOfAskExperts(url)).toBeTruthy();
  });
  it('should return false if the uri is not under job listing path', () => {
    const url = 'https://www.test.com/local/miami-wltv/';
    expect(isPartOfAskExperts(url)).toBeFalsy();
  });
});

describe('isPartOfCoronavirusNav', () => {
  it('should return true if the uri is under ask the experts path', () => {
    const url = 'https://www.test.com/local/los-angeles-kmex/coronavirus';
    expect(isPartOfCoronavirusNav(url)).toBeTruthy();
  });
  it('should return false if the uri is not under job listing path', () => {
    const url = 'https://www.test.com/local/los-angeles-kmex/';
    expect(isPartOfCoronavirusNav(url)).toBeFalsy();
  });
});
