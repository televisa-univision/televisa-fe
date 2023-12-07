import React from 'react';
import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import BrandedSubNav from './BrandedSubNav';
import Styles from '../GlobalHeaders.stories.scss';
import Subnav from '.';

const theme = {
  primary: '#2358bf',
  secondary: '#23a2ee',
};

const links = [
  {
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
  },
];

const multimpleItems = [
  {
    link: '#6',
    name: 'Política',
  }, {
    link: '#7',
    name: 'Améxica',
  }, {
    link: '#8',
    name: 'Inmigración',
  }, {
    link: '#9',
    name: 'América Latina',
  }, {
    link: '#10',
    name: 'Gizmodo Español',
  }, {
    link: '#11',
    name: 'México',
  }, {
    link: '#12',
    name: 'Salud',
  }, {
    link: '#14',
    name: 'Educación',
  },
];

storiesOf('Layout/Subnav', module)
  .add('default', () => {
    return (
      <div className={Styles.wrapper}>
        <Subnav links={links} theme={theme} />
      </div>
    );
  })
  .add('multiple items light mode', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const subNavLinks = [...links, ...multimpleItems];
    return (
      <div className={Styles.wrapper}>
        <Subnav links={subNavLinks} theme={theme} />
      </div>
    );
  })
  .add('multiple items dark mode', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const subNavLinks = [...links, ...multimpleItems];
    return (
      <div className={Styles.wrapper}>
        <Subnav links={subNavLinks} theme={theme} variant="dark" />
      </div>
    );
  })
  .add('default mobile version', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    const subNavLinks = [...links];
    return (
      <div className={Styles.wrapper}>
        <Subnav links={subNavLinks} theme={theme} variant="light" />
      </div>
    );
  })
  .add('with BrandedSubNav', () => {
    const data = {
      brandable: {
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
      },
    };
    Store.dispatch(setPageData({ data, device: 'desktop' }));
    const subNavLinks = [...links, ...multimpleItems];
    const customProps = {
      variant: 'dark',
      subNavComponent: BrandedSubNav,
      fixedSectionUrl: true,
      sectionUrl: '/shows',
    };
    return (
      <div className={Styles.wrapper}>
        <Subnav links={subNavLinks} {...customProps} />
      </div>
    );
  });
