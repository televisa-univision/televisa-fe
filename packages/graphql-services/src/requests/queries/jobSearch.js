export const jobSearchCitiesQuery = `
  query getApploiCities($location: ApploiLocationInput!) {
    getApploiCities(location: $location) {
      city
      state
      stateAbbreviation
      location {
        latitude
        longitude
      }
    }
  }
`;

export const jobSearchJobsQuery = `
  query getApploiJobs($location: ApploiLocationInput, $language: Language = es, $city: String, $cityCenter: String, $utmSource: String, $state: String, $searchTerm: String, $industry: String, $page: Int = 1, $teams: String, $size: Int) {
    getApploiJobs(location: $location, language: $language, city: $city, cityCenter: $cityCenter, utmSource: $utmSource, state: $state, searchTerm: $searchTerm, industry: $industry, page: $page, teams: $teams, size: $size) {
      id
      name {
        en
        es
      }
      brandName
      description {
        en
        es
      }
      publishedDate
      jobType
      industry
      city
      state
      jobCode
      redirectApplyUrl
      applyMethod
      resumeRequired
      partner {
        sponsored
        source
        redirectApply
        utmMedium
        utmCampaign
        keyword
        searchFetchId
        page
        order
        cityCenter
        utmSource
      }
    }
  }
`;

export const jobSearchIndustriesQuery = `
  query getApploiIndustries{
    getApploiIndustries{
      es
      en
    }
  }
`;

export const getApploiUser = `
  query getApploiUser($token: String!) {
    getApploiUser(token: $token) {
      email
      firstName
      lastName
      phoneNumber
      resumeFileName
    }
  }
`;

export const getJobApplicationStatus = `
  query getJobApplicationStatus($jobId: String!, $token: String!) {
    getJobApplicationStatus(jobId: $jobId, token: $token) {
      alreadyApplied
    }
  }
`;
