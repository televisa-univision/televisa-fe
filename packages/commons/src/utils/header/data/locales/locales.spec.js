import Store from '../../../../store/store';
import setPageData from '../../../../store/actions/page-actions';
import * as subNavTypes from '../../../../constants/subNavTypes';
import * as headerHelper from '../../helpers';
import Features from '../../../../config/features';

import locales from '.';

import mockDataLosAngeles from './__mocks__/los-angeles.data';
import mockDataChicago from './__mocks__/chicago.data';
import mockDataDallas from './__mocks__/dallas.data';
import mockDataPerson from './__mocks__/person.data';
import mockDataElection from './__mocks__/election.data';
import mockDataJobs from './__mocks__/jobs.data';
import mockDataATE from './__mocks__/askExperts.data';
import mockDataLosAngelesCoronavirusSection from './__mocks__/losAngelesCoronavirus.data';
import mockDataChicagoCoronavirusSection from './__mocks__/chicagoCoronavirus.data';

jest.mock('../../../../config/features', () => ({
  localMarkets: {
    forceMarketJobs: jest.fn(),
    forceAskExperts: jest.fn(),
  },
}));

headerHelper.getClientDevice = jest.fn();

describe('Locales data object suite', () => {
  it('should construct the correct data structure when no data is defined', () => {
    const data = locales();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should construct the correct data structure when there is no custom first link', () => {
    const mockData = mockDataLosAngeles;

    Store.dispatch(setPageData({ data: mockData }));

    const data = locales(mockData, Store);

    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should construct the correct data structure when links have a custom first link', () => {
    const mockData = mockDataChicago;

    Store.dispatch(setPageData({ data: mockData }));

    const data = locales(mockData, Store);

    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should construct the correct data structure when links have a custom last link', () => {
    const mockData = mockDataDallas;

    Store.dispatch(setPageData({ data: mockData }));

    const data = locales(mockData, Store);

    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should have SECTION_SUBNAV when the type is a person content type on any locales market', () => {
    const mockData = mockDataPerson;
    Store.dispatch(setPageData({ data: mockData }));
    const data = locales(mockData, Store);
    expect(data.subNavType).toBeDefined();
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });

  it('should construct the header with the elections 2020 header plus icon related with the local market', () => {
    const mockData = mockDataElection.data;
    Store.dispatch(setPageData({ data: mockData }));
    const data = locales(mockData, Store);
    expect(data.title.logoMarket.icon).toEqual('bayAreaApp');
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/e9/26/e648eea94e17aabbda49c210e456/destino2020-logo.svg');
  });

  it('should construct the header with the Coronavirus header in Los Angeles Local Market', () => {
    const mockData = mockDataLosAngelesCoronavirusSection.data;
    Store.dispatch(setPageData({ data: mockData }));
    const data = locales(mockData, Store);
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/09/4c/853e49fc4a46ae30d9ae8717a70b/lg-coronavirus.svg');
  });

  it('should construct the header without the Coronavirus header in all markets other than Los Angeles Local Market', () => {
    const mockData = mockDataChicagoCoronavirusSection.data;
    Store.dispatch(setPageData({ data: mockData }));
    const data = locales(mockData, Store);
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/48/42/b2ddf9d24b2cace31836900fe9be/chicago-32px.svg');
  });

  it('should construct the header for jobs', () => {
    Features.localMarkets.forceMarketJobs.mockReturnValue(true);
    Features.localMarkets.forceAskExperts.mockReturnValue(false);
    const mockData = mockDataJobs.data;
    Store.dispatch(setPageData({ data: mockData }));
    const data = locales(mockData, Store);
    expect(data.title.logoMarket.icon).toEqual('bayAreaApp');
    expect(data.title.isLocalesJob).toBeTruthy();
  });

  it('should construct the header for ask the experts', () => {
    Features.localMarkets.forceAskExperts.mockReturnValue(true);
    Features.localMarkets.forceMarketJobs.mockReturnValue(false);
    const mockData = mockDataATE.data;
    Store.dispatch(setPageData({ data: mockData }));
    const data = locales(mockData, Store);
    expect(data.title.logoMarket.icon).toEqual('bayAreaApp');
    expect(data.title.isAskExperts).toBeTruthy();
  });
});
