import React from 'react';

import { storiesOf } from '@storybook/react';

import SoccerMatchNav from '.';

const navContent = [
  { name: 'En vivo', link: '#link1', type: 'link1' },
  { name: 'Comentarios', link: '#link2', type: 'link2' },
  { name: 'Alineaciones', link: '#link3', type: 'link3' },
  { name: 'Estadísticas', link: '#link4', type: 'link4' },
  { name: 'Resumen', link: '#link5', type: 'link5' },
];

const divStyle = {
  height: '200px',
};
storiesOf('Base/SoccerMatchNav', module)
  .addDecorator((story) => {
    return (
      <div className="uvs-container">
        {story()}
        <div id="link1" style={divStyle}>En Vvivo</div>
        <div id="link2" style={divStyle}>Comentarios</div>
        <div id="link3" style={divStyle}>Alineaciones</div>
        <div id="link4" style={divStyle}>Estadísticas</div>
        <div id="link5" style={divStyle}>Resumen</div>
      </div>
    );
  })
  .add('default', () => (
    <SoccerMatchNav navLinks={navContent} />
  ))
  .add('default (isTudn)', () => (
    <SoccerMatchNav navLinks={navContent} isTudn />
  ))
  .add('with 2 nav items', () => (
    <SoccerMatchNav navLinks={[
      { name: 'Comentarios', link: '#link2', type: 'link2' },
      { name: 'Estadísticas', link: '#link4', type: 'link4' },
    ]}
    />
  ))
  .add('prop (isWorldCupMVP)', () => (
    <SoccerMatchNav navLinks={navContent} isTudn />
  ));
