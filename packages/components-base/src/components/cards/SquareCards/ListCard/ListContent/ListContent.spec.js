import React from 'react';
import { shallow } from 'enzyme';

import ListContent from '.';

describe('ListContent Component', () => {
  it('render component IconArticleStyledMVP inside ListContent', () => {
    const propsTest = {
      title: 'eLiga MX: Calendario, estadísticas y resultados de la liga virtual',
      type: 'article',
      ctIsValid: true,
      description: 'Sigue todos los partidos, tablas y estadísticas del nuevo torneo de Liga MX luego de 6 jornadas.',
      isWorldCupMVP: true,
      cardType: {
        isArticle: true,
      },
    };
    const wrapper = shallow(
      <ListContent {...propsTest} />
    );
    expect(wrapper.find('ListContent__IconArticleStyledMVP')).toHaveLength(1);
  });
  it('render component IconArticleStyled inside ListContent', () => {
    const propsTest = {
      title: 'eLiga MX: Calendario, estadísticas y resultados de la liga virtual',
      type: 'article',
      ctIsValid: false,
      description: 'Sigue todos los partidos, tablas y estadísticas del nuevo torneo de Liga MX luego de 6 jornadas.',
      isWorldCupMVP: false,
      cardType: {
        isArticle: true,
      },
    };
    const wrapper = shallow(
      <ListContent {...propsTest} />
    );
    expect(wrapper.find('ListContent__IconArticleStyled')).toHaveLength(1);
  });
});
