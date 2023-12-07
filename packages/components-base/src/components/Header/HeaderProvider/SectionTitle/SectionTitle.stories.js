import React from 'react';

import { storiesOf } from '@storybook/react';
import logo from '@univision/fe-commons/dist/assets/images/logo-noticias-color.svg';
import tulip from '@univision/fe-commons/dist/assets/images/tulip-color.svg';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import BreakPoint from '@univision/fe-commons/dist/utils/breakpoint/breakPointMediator';

import BrandedSubNav from '../Subnav/BrandedSubNav';
import Styles from '../GlobalHeaders.stories.scss';

import SectionTitle from '.';

const theme = {
  primary: '#2358bf',
  secondary: '#23a2ee',
};

const props = {
  theme,
  baseUrl: '/',
  renderingOptions: {
    showSearch: true,
    showLinks: true,
  },
  title: 'Educación',
  logoMobile: tulip,
  logoDesktop: logo,
  links: {
    primary: [{
      link: '#',
      name: 'Inicio',
      active: true,
    }, {
      link: '#1',
      name: 'Becas',
    }, {
      link: '#2',
      name: 'Universidades',
    }, {
      link: '#3',
      name: 'Nuestros Maestros',
    }, {
      link: '#4',
      name: 'Educación Temprana',
    }],
  },
};

const brandable = {
  show: {
    airTimeText: 'Lunes y Viernes - 7 AM / 7C',
    headerLogo: {
      original: {
        href: 'https://cdn5.performance.univision.com/20/b8/9f95eed348f49509f92fda1d6372/lg-el-gordo-y-la-flaca-desktop.svg',
      },
    },
    socialNetworks: {
      facebookUrl: {
        text: null,
        url: 'https://www.facebook.com/despiertamerica/',
        target: '_blank',
        hashTags: [],
      },
      googleUrl: null,
      instagramUrl: {
        text: null,
        url: 'https://www.instagram.com/despiertamerica/',
        target: '_blank',
        hashTags: [],
      },
      linkedInUrl: null,
      pinterestUrl: null,
      snapchatUrl: null,
      twitterUrl: {
        text: null,
        url: 'https://twitter.com/despiertamerica',
        target: '_blank',
        hashTags: [],
      },
      youTubeUrl: null,
    },
  },
};

storiesOf('Widgets/GlobalHeaders - SectionTitle', module)
  .add('default', () => {
    return (
      <div className={Styles.wrapper}>
        <SectionTitle {...props} />
      </div>
    );
  })
  .add('default with large title', () => {
    props.title = 'EN VIVO: El presidente Donald Trump anuncia en prime time a su nominado para juez de la Corte Suprema de justicia de EEUU para sustituir a Anthony Kennedy.';
    return (
      <div className={Styles.wrapper}>
        <SectionTitle {...props} />
      </div>
    );
  })
  .add('with animation (Mobile)', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    props.title = 'Deportes - Mundial rusia 2018';
    return (
      <div className={Styles.wrapper}>
        <SectionTitle {...props} />
      </div>
    );
  })
  .add('with animation dark variant (Mobile)', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    props.title = 'Deportes - Mundial rusia 2018';
    const customProps = {
      variant: 'dark',
      sectionUrl: '/shows',
      theme: {},
    };
    return (
      <div className={Styles.wrapper}>
        <SectionTitle {...customProps} {...props} />
      </div>
    );
  })
  .add('with animation theme variant (Mobile)', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    props.title = 'Deportes - Mundial rusia 2018';
    const customProps = {
      variant: 'light',
      sectionTitleBg: true,
      sectionUrl: '/shows',
      theme: {},
    };
    return (
      <div className={Styles.wrapper}>
        <SectionTitle {...customProps} {...props} />
      </div>
    );
  })
  .add('with BrandedSubNav - desktop', () => {
    const data = { brandable };
    BreakPoint.value = 'lg';
    Store.dispatch(setPageData({ data, device: 'desktop' }));
    const customProps = {
      variant: 'dark',
      subNavComponent: BrandedSubNav,
      fixedSectionUrl: true,
      sectionUrl: '/shows',
      theme: {},
    };
    return (
      <div className={Styles.wrapper}>
        <SectionTitle {...props} {...customProps} />
      </div>
    );
  })
  .add('with BrandedSubNav - desktop - NO LINKS', () => {
    const data = { brandable };
    BreakPoint.value = 'lg';
    Store.dispatch(setPageData({ data, device: 'desktop' }));
    const customProps = {
      variant: 'dark',
      subNavComponent: BrandedSubNav,
      fixedSectionUrl: true,
      sectionUrl: '/shows',
      theme: {},
      links: [],
    };
    return (
      <div className={Styles.wrapper}>
        <SectionTitle {...props} {...customProps} />
      </div>
    );
  })
  .add('with BrandedSubNav - mobile', () => {
    const data = { brandable };
    BreakPoint.value = 'xs';
    Store.dispatch(setPageData({ data, device: 'mobile' }));
    const customProps = {
      variant: 'dark',
      subNavComponent: BrandedSubNav,
      fixedSectionUrl: true,
      sectionUrl: '/shows',
      theme: {},
    };
    return (
      <div className={Styles.wrapper}>
        <SectionTitle {...props} {...customProps} />
      </div>
    );
  });
