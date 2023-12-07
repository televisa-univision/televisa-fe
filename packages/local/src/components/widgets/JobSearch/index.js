import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { currentMarketSelector, jobSearchSelector } from '@univision/fe-commons/dist/store/selectors/local-selectors';
import { fetchLocalMarketContent } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import InputField from '@univision/fe-components-base/dist/components/InputField';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import Dropdown from '@univision/fe-components-base/dist/components/Dropdown';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';
import {
  jobSearchCitiesQuery,
  jobSearchIndustriesQuery,
  jobSearchJobsQuery as jobQuery,
} from '@univision/fe-graphql-services/dist/requests/queries/jobSearch';
import { JOB_RESULT_ERROR } from '@univision/fe-commons/dist/constants/messages';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import validCities from '@univision/fe-commons/dist/constants/validCities.json';
import Styles from './JobSearch.styles';
import Toggle from './Toggle';
import {
  activeMarketsAbbr,
  customCitiesNames,
  languages,
  inactiveMarket,
  utmSource,
} from './constants';
import JobsWidget from './JobsWidget';

const Container = styled.div.attrs({ className: 'col-md-12' })`${Styles.container}`;
const DropDown = styled(Dropdown)`${Styles.dropDownWrapper}`;
const Form = styled.form.attrs({ className: 'col-12' })`${Styles.form}`;
const Filters = styled.div.attrs({ className: 'col-md-4' })`${Styles.filters}`;
const Header = styled.div`${Styles.header}`;
const Wrapper = styled.div.attrs({ className: 'row' })``;
const Title = styled.span.attrs({ className: 'uvs-font-a-bold' })`${Styles.title}`;
const Jobs = styled(JobsWidget).attrs({ className: 'col-md-8' })``;

/**
 * Return cities in the correct format
 * @param {array} cities - cities where there are job
 * @returns {array}
 */
const formatCitiesResponse = (cities) => {
  const alphabeticalCities = cities.sort((a, b) => {
    return a.city.localeCompare(b.city);
  });
  return alphabeticalCities.map((item) => {
    return {
      city: item.city,
      state: item.state,
      value: `${item.city}.${item.state}`,
      name: `${item.city} - ${item.stateAbbreviation}`,
    };
  });
};

/**
 * Return industries in the correct format
 * @param {array} industries - type of industry
 * @returns {array}
 */
const formatIndustriesResponse = (industries) => {
  const spanishIndustries = [];
  const englishIndustries = [];

  industries.forEach((industry) => {
    spanishIndustries.push({
      value: industry.en,
      name: industry.es,
    });
    englishIndustries.push({
      value: industry.en,
      name: industry.en,
    });
  });

  const alphabeticalSpanishIndustries = spanishIndustries.sort((a, b) => {
    if (a.name === 'Otra') return 1;

    return a.name.localeCompare(b.name);
  });

  return {
    es: alphabeticalSpanishIndustries,
    en: englishIndustries,
  };
};

/**
 * Return market Coordinates formatted cities
 * @param {array} cities - cities where there are job
 * @returns {array}
 */
const formatMarketCoordinatesCities = (cities) => {
  const alphabeticalCities = cities.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return alphabeticalCities.map(city => ({
    value: city.name,
    name: customCitiesNames[city.name] || city.name,
  }));
};

/**
 * Get formatted market coordinates
 * @returns {{}} marketCoordinates - return formatted market coordinates
 */
const getFormattedMarkets = () => {
  const formattedMarketCoordinates = {};
  const keys = Object.keys(marketCoordinates);

  keys.forEach((key) => {
    const market = marketCoordinates[key];
    formattedMarketCoordinates[market.name] = market;
  });
  return formattedMarketCoordinates;
};

/**
 * Render the JobSearch component
 * @param {string} device - what platform user is accessing
 * @param {func} fetchLocalMarket - fetch content
 * @param {array} jobsData - jobs fetched server side
 * @param {Object} page - page information
 * @param {string} localMarketName - user local market
 * @returns {JSX}
 */
const JobSearch = ({
  device,
  fetchLocalMarket,
  jobsData,
  page,
  localMarketName,
}) => {
  const activeMarkets = activeMarketsAbbr.map(name => marketCoordinates[name]);
  const formattedMarketCities = formatMarketCoordinatesCities(activeMarkets);
  const markets = useMemo(getFormattedMarkets, []);
  const formRef = useRef();
  const serverUri = page?.config?.graphql;
  const title = page?.headerTitle;

  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [searchbar, setSearchbar] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [cities, setCities] = useState([]);
  const [industries, setIndustries] = useState([]);

  const getIndustries = useCallback(async () => {
    try {
      const response = await fetchGraphQL({
        query: jobSearchIndustriesQuery,
        serverUri,
      });
      return response?.getApploiIndustries;
    } catch (err) {
      err.message = `${JOB_RESULT_ERROR} fetch job search industries rejected: ${err.message}`;
      return clientLogging(err);
    }
  }, []);

  /**
   * Filters an array of cities based on whether they belong to the selected market.
   * @param {Array} responseCities - The array of cities to filter.
   * @returns {Array} - The filtered array of cities.
   */
  const validateCities = useMemo(() => {
    return (responseCities) => {
      if (!selectedMarket || !validCities[selectedMarket.name]) {
        return responseCities;
      }
      return responseCities.filter(city => validCities[selectedMarket.name].includes(city.name));
    };
  }, [validCities, selectedMarket]);

  /**
   * Return cities from that can be searched
   * @param {string} location - market location
   * @returns {Promise<*>}
   */
  const getCities = useCallback(async () => {
    if (!selectedMarket) return [];

    try {
      const { lat, long, radius } = selectedMarket;
      const location = { latitude: lat, longitude: long, radius };
      const response = await fetchGraphQL({
        query: jobSearchCitiesQuery,
        variables: { location },
        serverUri,
      });
      return response?.getApploiCities;
    } catch (err) {
      err.message = `${JOB_RESULT_ERROR} fetch jobs rejected: ${err.message}`;
      return clientLogging(err);
    }
  }, [selectedMarket]);

  /**
   * Handle market change
   * @param {Object} e - event submit
   */
  const handleMarketChange = useCallback((e) => {
    e.preventDefault();
    setJobs([]);
    const marketSelected = markets[e.target?.value];
    setSelectedCity(null);
    setSelectedState(null);
    setSelectedMarket(marketSelected);
    setShowLoadMore(false);
    setPagination(1);
  }, [markets]);

  /**
   * Handle city change
   * @param {Object} e - event submit
   */
  const handleCityChange = useCallback((e) => {
    e.preventDefault();
    const { city, state } = cities.find((item) => {
      return item.value === e.target?.value;
    }) || { city: null, state: null };
    setJobs([]);
    setSelectedCity(city);
    setSelectedState(state);
    setPagination(1);
  }, [cities]);

  /**
   * Handle industry change
   * @param {Object} e - event submit
   */
  const handleIndustryChange = useCallback((e) => {
    e.preventDefault();
    setJobs([]);
    const { value } = e.target;
    if (value) {
      setSelectedIndustry(value);
    } else {
      setSelectedIndustry(null);
    }
    setPagination(1);
  }, []);

  /**
   * Handle search bar events
   * @param {Object} e - event submit
   */
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const {
      current: { search },
    } = formRef;

    if (search?.value !== searchbar) {
      setJobs([]);
      setSearchbar(search?.value);
      setPagination(1);
    }
  }, [searchbar]);

  /**
   * Handle the selection in the toggle
   * @param {number|string} selectedId - id of toggle option
   */
  const handleLanguageSelect = (selectedId) => {
    const languageSelected = languages.find((language) => {
      return language.value === selectedId;
    });
    setSelectedLanguage(languageSelected);
  };

  /**
   * Handle the load more click
   */
  const handleLoadMore = useCallback(() => {
    setPagination(previousPagination => previousPagination + 1);
  }, []);

  useEffect(() => {
    if (localMarketName && activeMarketsAbbr.includes(localMarketName)) {
      const market = getKey(marketCoordinates, localMarketName);

      setSelectedMarket(market);
    } else {
      (async () => {
        setLoading(true);
        await fetchLocalMarket();
        setLoading(false);
      })();
    }
  }, [localMarketName]);

  useEffect(() => {
    (async () => {
      const industriesResponse = await getIndustries();
      if (isValidArray(industriesResponse)) {
        setIndustries(formatIndustriesResponse(industriesResponse));
      }
    })();
  }, [getIndustries]);

  useEffect(() => {
    (async () => {
      const citiesResponse = await getCities();
      if (isValidArray(citiesResponse)) {
        setCities(
          validateCities(
            formatCitiesResponse(citiesResponse)
          )
        );
      }
    })();
  }, [getCities]);

  useEffect(() => {
    if (!selectedMarket) return;

    setShowLoadMore(false);
    setLoading(true);
    (async () => {
      const { lat, long, radius } = selectedMarket;
      const location = selectedCity ? null : { latitude: lat, longitude: long, radius };
      const variables = {
        location,
        language: selectedLanguage.value,
        city: selectedCity,
        cityCenter: selectedMarket.name,
        size: 25,
        state: selectedState,
        searchTerm: searchbar,
        industry: selectedIndustry,
        page: pagination,
        utmSource: utmSource[device],
      };
      try {
        const { getApploiJobs } = await fetchGraphQL({ query: jobQuery, variables, serverUri });
        if (isValidArray(getApploiJobs)) {
          setJobs((previousJobs) => {
            return previousJobs ? [...previousJobs, ...getApploiJobs] : getApploiJobs;
          });
          setShowLoadMore(true);
        }
      } catch (err) {
        err.message = `${JOB_RESULT_ERROR} fetch jobs rejected: ${err.message}`;
        clientLogging(err);
      }
      setLoading(false);
    })();
  }, [
    selectedMarket,
    selectedCity,
    selectedState,
    selectedIndustry,
    searchbar,
    pagination,
  ]);

  /**
   * Returns No Results component
   * @returns {JSX.Element|null}
   */
  const noResults = () => {
    if (!selectedMarket && !activeMarketsAbbr.includes(localMarketName)) {
      return inactiveMarket[selectedLanguage.value];
    }

    return null;
  };

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Form ref={formRef} onSubmit={handleSearch} noValidate>
        <InputField
          id="search"
          iconClickHandler={handleSearch}
          type="search"
          placeholder={localization.get('jobSearchLabel', { language: selectedLanguage.value })}
        />
      </Form>
      <Container>
        <Filters>
          <DropDown
            iconFill={BLACK}
            placeholder={
              localization.get('allMarkets', { language: selectedLanguage.value })}
            options={formattedMarketCities}
            onChange={handleMarketChange}
            value={selectedMarket?.name}
            name="select-market"
          />
          <DropDown
            iconFill={BLACK}
            placeholder={localization.get('allCities', { language: selectedLanguage.value })}
            onChange={handleCityChange}
            options={cities}
            value={selectedCity?.value}
            name="select-city"
          />
          <DropDown
            iconFill={BLACK}
            placeholder={localization.get('allJobs', { language: selectedLanguage.value })}
            onChange={handleIndustryChange}
            options={industries[selectedLanguage.value] || []}
            value={selectedIndustry?.value}
            name="select-industry"
          />
          <Toggle
            label={`${localization.get('translate', { language: selectedLanguage.value })} ${localization.get('offers', { language: selectedLanguage.value })}`}
            options={languages}
            onSelect={handleLanguageSelect}
            value={selectedLanguage.value}
          />
        </Filters>
        <Jobs
          handleLoadMore={handleLoadMore}
          jobs={jobs || jobsData}
          language={selectedLanguage.value}
          loading={loading}
          noResultsMessage={noResults()}
          showLoadMore={showLoadMore}
        />
      </Container>
    </Wrapper>
  );
};

/**
 * Maps redux state to component props.
 * @param {Object} state redux state
 * @returns {Object}
 */
export const mapStateToProps = (state) => {
  return {
    jobsData: jobSearchSelector(state),
    localMarketName: currentMarketSelector(state),
    page: state.page,
  };
};

/**
 * Object or function to be merged into component props
 * @returns {Object}
 */
export const mapDispatchToProps = {
  fetchLocalMarket: fetchLocalMarketContent,
};

JobSearch.propTypes = {
  device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  fetchLocalMarket: PropTypes.func,
  localMarketName: PropTypes.string,
  page: PropTypes.shape({
    config: PropTypes.shape({
      graphql: PropTypes.string,
    }),
    headerTitle: PropTypes.string.isRequired,
  }),
  jobsData: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
