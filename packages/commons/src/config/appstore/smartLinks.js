const smartLinkBase = {
  prefix: '5c75a80bcee04',
  creative_id: 'mobilebanner01',
  utm_campaign: 'TVE-2019',
  utm_source: 'univisioncom',
  utm_medium: 'mobilebanner01',
};

// 'smart' links campaigns
const smartLinks = {
  guiatv: {
    site_id: 'univisioncom',
    cp_0: 'browse',
    cp_3: 'TVE-2019',
    web_page: 'page/landing',
    utm_content: 'TVE-2019',
  },
  tentpole: {
    site_id: 'univisioncom',
    cp_0: 'browse',
    cp_3: 'TVE-2019',
    web_page: 'page/landing',
    utm_content: 'TVE-2019',
  },
  novela: {
    site_id: 'univisioncom',
    cp_0: 'browse',
    cp_3: 'TVE-2019',
    web_page: 'page/landing',
    utm_content: 'TVE-2019',
  },
};

export default (type) => {
  return {
    ...smartLinkBase,
    ...smartLinks[type],
  };
};
