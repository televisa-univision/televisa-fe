import Store from '../../../../store/store';
import setPageData from '../../../../store/actions/page-actions';
import * as subNavTypes from '../../../../constants/subNavTypes';
import radio from '.';
import radioNacional from './radioNacional';
import chicagoData from './__mocks__/chicago.json';
import radioData from './__mocks__/radio.json';
import lotteryData from './__mocks__/lottery.json';

describe('radio data suite', () => {
  it('should bring default data', () => {
    const data = radio();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
  });
  it('should return main uforia section data', () => {
    const mockData = radioData;
    const data = radio(mockData);

    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.title.name).toBeNull();
  });
  it('should return radio station data', () => {
    const mockData = chicagoData;

    Store.dispatch(setPageData({ data: mockData }));
    const data = radio(mockData, Store);
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toHaveLength(1);
    expect(data.links.length).toBeGreaterThan(0);
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.title.name).toBeNull();
  });
  it('should return radio station data with lottery entry', () => {
    const mockData = lotteryData;

    Store.dispatch(setPageData({ data: mockData }));
    const data = radio(mockData, Store);
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toHaveLength(2);
    expect(data.links.length).toBeGreaterThan(0);
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.title.name).toBeNull();
  });
  it('should return radio section data for podcasts', () => {
    const data = radio({ uri: 'http://univision.com/radio/podcasts/test' });

    expect(data.links).toHaveLength(5);
  });
  it('should return radio section data for eventos', () => {
    const data = radio({ uri: 'http://univision.com/radio/eventos/test' });

    expect(data.links).toHaveLength(5);
  });
  it('should return radio station data without about station', () => {
    const mockData = chicagoData;
    delete mockData.radioStation.contact.aboutStation;
    Store.dispatch(setPageData({ data: mockData }));
    const data = radio(mockData, Store);
    expect(data.links).toHaveLength(0);
  });
});

describe('Radio Nacional data object', () => {
  it('should return default data', () => {
    const data = radioNacional();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});
