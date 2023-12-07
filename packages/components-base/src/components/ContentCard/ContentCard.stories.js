import React from 'react';
import classnames from 'classnames';

import { storiesOf } from '@storybook/react';

import { image } from '../../config/storyMocks';
import Logo from '../Logo';
import ContentCard from '.';
import Styles from './ContentCard.stories.scss';

/**
 * Dummy wrapper for content card
 * @param {Object} props - content card props
 * @returns {JSX}
 */
const PromoWrapperV = props => (
  <div className={`${Styles.container} col-md-3`}>
    <ContentCard {...props} />
  </div>
);

/**
 * Dummy wrapper for content card
 * @param {Object} props - content card props
 * @returns {JSX}
 */
const PromoWrapperH = props => (
  <div className={`${Styles.container} col-md-8`}>
    <ContentCard {...props} />
  </div>
);
const logo = 'https://cdn2.performance.univision.com/dims4/default/5c0ea79/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png';

storiesOf('Cards/Legacy/ContentCard/Vertical', module)
  .add('default vertical', () => {
    return (
      <PromoWrapperV
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        author="Rodrigo Garcia Valdez"
        primaryTag={{ name: 'Noticias' }}
        type="article"
      />
    );
  })
  .add('dark (variant)', () => {
    return (
      <PromoWrapperV
        type="article"
        device="desktop"
        image={image}
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        author="Rodrigo Garcia Valdez"
        variant="dark"
        className={Styles.darkVariant}
      />
    );
  })
  .add('Without Tag', () => {
    return (
      <PromoWrapperV
        image={image}
        showTag={false}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        author="Rodrigo Garcia Valdez"
        primaryTag={{ name: 'Noticias' }}
        type="article"
      />
    );
  })
  .add('Content Slideshow', () => {
    return (
      <PromoWrapperV
        device="desktop"
        image={image}
        primaryTag={{ name: 'América Latina' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="slideshow"
        author="Rodrigo Garcia Valdez"
      />
    );
  })
  .add('Content Slideshow (Icon content)', () => {
    return (
      <PromoWrapperV
        device="desktop"
        image={image}
        primaryTag={{ name: 'Noticias' }}
        iconContent="24"
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="slideshow"
        author="Rodrigo Garcia Valdez"
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
      />
    );
  })
  .add('Content Article', () => {
    return (
      <PromoWrapperV
        device="desktop"
        image={image}
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="article"
        author="Rodrigo Garcia Valdez"
      />
    );
  })
  .add('Content Article (recipe)', () => {
    return (
      <PromoWrapperV
        device="desktop"
        image={image}
        primaryTag={{ name: 'Cena Delicioso' }}
        title="Albóndigas en salsa de tomate y chipotle"
        type="article"
        articleType="recipe"
        author="Rodrigo Garcia Valdez"
      />
    );
  })
  .add('Content Article (video lead)', () => {
    return (
      <PromoWrapperV
        device="desktop"
        image={image}
        primaryTag={{ name: 'Noticias' }}
        showIcon
        title="Belinda volvio locas a las redes sociales con este look"
        type="article"
        leadType="video"
        author="Rodrigo Garcia Valdez"
      />
    );
  })
  .add('Content Video', () => {
    return (
      <PromoWrapperV
        device="desktop"
        image={image}
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="video"
        duration="1:21"
        author="Rodrigo Garcia Valdez"
      />
    );
  })
  .add('Content Video without author', () => {
    return (
      <PromoWrapperV
        wrapperElement="button"
        image={image}
        view="vertical"
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="video"
        durationString="1:21"
      />
    );
  })
  .add('Content (secondary label)', () => {
    return (
      <PromoWrapperV
        device="desktop"
        secLabel={<Logo src={logo} className={Styles.logo} />}
        image={image}
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="slideshow"
        author="Rodrigo Garcia Valdez"
      />
    );
  })
  .add('Content Radio Station', () => {
    const radioStation = {
      abacast: {
        id: '2315',
      },
      featuredStationsPromoImage: {
        renditions: {
          original: {
            href: 'https://st1.uvnimg.com/2a/96/c27557244a3793f63771a023ed2b/90e2c333d8ac4efe9790ed83b46d4e56',
            width: 1920,
            height: 1080,
          },
          '16x9-med': {
            href: 'https://st1.uvnimg.com/dims4/default/daf9f19/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F2a%2F96%2Fc27557244a3793f63771a023ed2b%2Fresizes%2F500%2F90e2c333d8ac4efe9790ed83b46d4e56',
            width: 400,
            height: 225,
          },
          '16x9': {
            href: 'https://st1.uvnimg.com/dims4/default/057903a/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F2a%2F96%2Fc27557244a3793f63771a023ed2b%2Fresizes%2F1500%2F90e2c333d8ac4efe9790ed83b46d4e56',
            width: 1024,
            height: 698,
          },
          '16x9-mobile': {
            href: 'https://st1.uvnimg.com/dims4/default/4241a0c/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F2a%2F96%2Fc27557244a3793f63771a023ed2b%2Fresizes%2F500%2F90e2c333d8ac4efe9790ed83b46d4e56',
            width: 480,
            height: 270,
          },
        },
      },
    };
    return (
      <PromoWrapperV
        radioStation={radioStation}
        device="desktop"
        image={image}
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="radiostation"
        author="Rodrigo Garcia Valdez"
      />
    );
  })
  .add('Content Soccermatch', () => {
    return (
      <PromoWrapperV
        device="desktop"
        image={image}
        primaryTag={{ name: 'Chivas vs Toluca' }}
        title="Chivas vs Toluca"
        type="soccermatch"
      />
    );
  })
  .add('As button (Playlist)', () => {
    return (
      <PromoWrapperV
        showTag={false}
        wrapperElement="button"
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="video"
      />
    );
  })
  .add('with Última hora label', () => {
    return (
      <PromoWrapperV
        showTag={false}
        wrapperElement="button"
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="breakingNews"
      />
    );
  })
  .add('with En vivo label', () => {
    return (
      <PromoWrapperV
        showTag={false}
        wrapperElement="button"
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="livestream"
      />
    );
  })
  .add('with Liveblog label', () => {
    return (
      <PromoWrapperV
        showTag={false}
        wrapperElement="button"
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="liveblog"
      />
    );
  })
  .add('with En vivo label & auth', () => {
    return (
      <PromoWrapperV
        authRequired
        showTag={false}
        wrapperElement="button"
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        videoType="livestream"
        type="video"
      />
    );
  })
  .add('longform (auth & latest episode)', () => {
    return (
      <PromoWrapperV
        showTag={false}
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="video"
        durationString="1:21"
        longform
        authRequired
        hasNextEpisode={false}
        variant="dark"
        className={Styles.darkVariant}
      />
    );
  })
  .add('longform (auth & not latest episode)', () => {
    return (
      <PromoWrapperV
        showTag={false}
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="video"
        durationString="1:21"
        longform
        authRequired
        hasNextEpisode
        variant="dark"
        className={Styles.darkVariant}
      />
    );
  })
  .add('longform (no auth & latest episode)', () => {
    return (
      <PromoWrapperV
        showTag={false}
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="video"
        durationString="1:21"
        longform
        authRequired={false}
        hasNextEpisode={false}
        variant="dark"
        className={Styles.darkVariant}
      />
    );
  })
  .add('longform (no auth & not latest episode)', () => {
    return (
      <PromoWrapperV
        showTag={false}
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="video"
        durationString="1:21"
        longform
        authRequired={false}
        hasNextEpisode
        variant="dark"
        className={Styles.darkVariant}
      />
    );
  });

storiesOf('Cards/Legacy/ContentCard/Horizontal', module)
  .add('default horizontal', () => {
    return (
      <PromoWrapperH
        author="Rodrigo Garcia Valdez"
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        primaryTag={{ name: 'Noticias' }}
        view="horizontal"
        type="article"
      />
    );
  })
  .add('dark (variant)', () => {
    return (
      <PromoWrapperH
        author="Rodrigo Garcia Valdez"
        className={Styles.darkVariant}
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        device="desktop"
        image={image}
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        variant="dark"
        view="horizontal"
        type="article"
      />
    );
  })
  .add('Content Articule', () => {
    return (
      <PromoWrapperH
        author="Rodrigo Garcia Valdez"
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        device="desktop"
        image={image}
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="article"
        view="horizontal"
      />
    );
  })
  .add('Content Video', () => {
    return (
      <PromoWrapperH
        author="Rodrigo Garcia Valdez"
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        device="desktop"
        image={image}
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="video"
        view="horizontal"
      />
    );
  })
  .add('Content Soccermatch', () => {
    return (
      <PromoWrapperH
        device="desktop"
        view="horizontal"
        image={image}
        primaryTag={{ name: 'Chivas vs Toluca' }}
        title="Chivas vs Toluca"
        type="soccermatch"
      />
    );
  })
  .add('Content Slideshow (Icon content)', () => {
    return (
      <PromoWrapperH
        author="Rodrigo Garcia Valdez"
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        device="desktop"
        durationString="1:21"
        iconContent="24"
        image={image}
        view="horizontal"
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="slideshow"
      />
    );
  })
  .add('Content (secondary label)', () => {
    return (
      <PromoWrapperH
        author="Rodrigo Garcia Valdez"
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        device="desktop"
        image={image}
        view="horizontal"
        primaryTag={{ name: 'Noticias' }}
        secLabel={<Logo src={logo} className={Styles.logo} />}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="slideshow"
      />
    );
  })
  .add('with Liveblog label', () => {
    return (
      <PromoWrapperH
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        device="desktop"
        image={image}
        view="horizontal"
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="liveblog"
        author="Rodrigo Garcia Valdez"
      />
    );
  })
  .add('with En vivo label & auth', () => {
    return (
      <PromoWrapperH
        authRequired
        showTag={false}
        wrapperElement="button"
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        videoType="livestream"
        view="horizontal"
        type="video"
      />
    );
  })
  .add('As button (Playlist) & overlay custom', () => {
    const nowWatching = <div className={classnames('uvs-font-a-bold', Styles.nowWatching)}>Now watching</div>;
    return (
      <PromoWrapperH
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        device="desktop"
        image={image}
        overlay={nowWatching}
        showIcon={false}
        showTag={false}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="article"
        view="horizontal"
        wrapperElement="button"
      />
    );
  })
  .add('longform (auth & latest episode)', () => {
    return (
      <PromoWrapperH
        authRequired
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        hasNextEpisode={false}
        image={image}
        longform
        durationString="1:21"
        primaryTag={{ name: 'Noticias' }}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        type="video"
        view="horizontal"
        variant="dark"
        className={Styles.darkVariant}
      />
    );
  })
  .add('in Playlist', () => {
    return (
      <PromoWrapperH
        author="Rodrigo Garcia Valdez"
        description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        primaryTag={{ name: 'Noticias' }}
        view="horizontal"
        type="article"
        showInPlaylist
      />
    );
  });

storiesOf('Cards/Legacy/ContentCard/List', module)
  .add('Content (type list)', () => {
    return (
      <PromoWrapperH
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        author="Rodrigo Garcia Valdez"
        primaryTag={{ name: 'Noticias' }}
        number="1"
        view="list"
        type="article"
      />
    );
  })
  .add('Content (type list number)', () => {
    return (
      <PromoWrapperH
        image={image}
        title="¿Qué harías si un halcón trata de llevarse a tu mascota?"
        author="Rodrigo Garcia Valdez"
        primaryTag={{ name: 'Noticias' }}
        number="3"
        showNumberOnly
        view="list"
        type="article"
      />
    );
  });
