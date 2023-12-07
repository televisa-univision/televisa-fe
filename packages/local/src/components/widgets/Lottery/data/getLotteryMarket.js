export default (market) => {
  switch (market) {
    case 'Atlanta':
      return {
        region: 'GA',
        height: {
          mobileHeight: 1980,
          desktopHeight: 2650,
        },
      };
    case 'Austin':
    case 'Dallas Ft. Worth':
    case 'Houston':
    case 'San Antonio':
      return {
        region: 'TX',
        height: {
          mobileHeight: 2050,
          desktopHeight: 2650,
        },
      };
    case 'Chicago':
      return {
        region: 'IL',
        height: {
          mobileHeight: 1300,
          desktopHeight: 1700,
        },
      };
    case 'Bakersfield':
    case 'Fresno':
    case 'Los Angeles':
    case 'Sacramento':
    case 'San Diego':
    case 'San Francisco':
      return {
        region: 'CA',
        height: {
          mobileHeight: 1250,
          desktopHeight: 1800,
        },
      };
    case 'Miami':
    case 'Tampa Bay':
    case 'Orlando':
      return {
        region: 'FL',
        height: {
          mobileHeight: 1700,
          desktopHeight: 2300,
        },
      };
    case 'Nueva York':
      return {
        region: 'NY',
        height: {
          mobileHeight: 1400,
          desktopHeight: 2000,
        },
      };
    case 'Philadelphia':
      return {
        region: 'PA',
        height: {
          mobileHeight: 1700,
          desktopHeight: 2300,
        },
      };
    case 'Phoenix':
      return {
        region: 'AZ',
        height: {
          mobileHeight: 1150,
          desktopHeight: 1850,
        },
      };
    case 'Puerto Rico':
      return {
        region: 'PR',
        height: {
          mobileHeight: 1200,
          desktopHeight: 1800,
        },
      };
    case 'Raleigh':
      return {
        region: 'NC',
        height: {
          mobileHeight: 1150,
          desktopHeight: 1850,
        },
      };
    case 'Salt Lake City':
      return {
        region: 'ID',
        height: {
          mobileHeight: 1150,
          desktopHeight: 1850,
        },
      };
    case 'Washington':
      return {
        region: 'DC',
        height: {
          mobileHeight: 1150,
          desktopHeight: 1850,
        },
      };
    default:
      return {};
  }
};
