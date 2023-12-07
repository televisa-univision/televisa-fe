import React from 'react';

import { storiesOf } from '@storybook/react';

import GatsbyInjector from '.';

const params = 'path=/external-content/test/opta-ranking.html&width=100%&competition=199&season=2017&widget=team';
const traking = 'path=%2Ffragments%2Fnoticias%2Ficij-video%2Fportada2.html&display=iframe&fullWidth=true&adSettings=%7B%22disable3rdPartyAds%22:false,%22disableAds%22:false,%22adTagValue%22:%22liveblog_test/testnavigationsection%22,%22targeting%22:%7B%22tag%22:%5B%22test%22%5D%7D,%22contentSpecificSettings%22:%7B%7D%7D&tracking=%7B%22content_id%22:%2200000161-4a05-d22d-af6d-ee87f74a0000%22,%22section_level1%22:%22test%20navigation%20section%22,%22title%22:%22test%20liveblog%22,%22content_type%22:%22liveblog%22,%22permalink%22:%22https://www.univision.com/test/test-liveblog%22,%22section_full_hierarchy%22:%5B%22test%20navigation%20section%22%5D,%22content_vertical%22:%22test%22,%22environment_name%22:%22prod%22%7D';
const noticias = 'path=/fragments/noticias/quieres-registrar-a-uno-de-tus-candidatos-cuentanos-tu-historia-confidencialmente/poll.html';
const paramsObj = [{ prop: 'width', value: '100%' }, { prop: 'competition', value: '199' }, { prop: 'season', value: '2017' }, { prop: 'widget', value: 'team' }];
const path = '/external-content/test/opta-ranking.html';

storiesOf('Widgets/GatsbyInjector', module)
  .add('with team opta rankings', () => (
    <GatsbyInjector params={params} />
  ))
  .add('with noticias fragment', () => (
    <GatsbyInjector params={noticias} />
  ))
  .add('display adSettings and Tracking values', () => (
    <GatsbyInjector params={traking} />
  ))
  .add('with path and params (object)', () => (
    <GatsbyInjector path={path} params={paramsObj} />
  ));
