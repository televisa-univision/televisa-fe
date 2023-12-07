import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components';

import { BLACK, WHITE } from '../../constants/colors';
import { getIconsWithType } from '../../utils/helpers';
import weatherMapping from './mapping/weather.json';
import Icon from '.';

import Styles from './Icon.stories.styles';

const iconsList = getIconsWithType();
const iconsName = Object.keys(iconsList);
const styles = {
  backgroundColor: BLACK,
};

/**
 * Decorator function
 * @param {Object} storyFn - story to include decorator to
 * @returns {JSX}
 */
const Decorator = storyFn => (
  <View style={styles}>
    { storyFn() }
  </View>
);

storiesOf('Icon/All', module)
  .add('default', () => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {iconsName.map(iconName => (
          <Icon key={iconName} name={iconName} />
        ))}
      </View>
    );
  });

storiesOf('Icon/Custom size icon', module)
  .add('refresh', () => (
    <Icon name="refresh" size={[100, 100]} fill="#ff00ff" />
  ))
  .add('digital', () => (
    <Icon name="digital" size={[45, 45]} viewBox="0 0 25 25" fill="#ff00ff" />
  ))
  .add('tv', () => (
    <Icon name="tv" size={[45, 45]} viewBox="0 0 25 25" fill="#ff00ff" />
  ))
  .add('key', () => (
    <Icon name="key" size={[24, 24]} fill="#ff00ff" />
  ));

storiesOf('Icon/Network Logos', module)
  .add('Univision color', () => (
    <Icon name="univision" size={[80, 19]} />
  ))
  .add('Univision Mobile color', () => (
    <Icon name="univisionMobile" size={[14, 15]} />
  ))
  .add('Galavision color', () => (
    <Icon name="galavision" size={[75, 20]} />
  ))
  .add('Galavision Mobile color', () => (
    <Icon name="galavisionMobile" size={[15, 16]} />
  ))
  .add('TUDN color', () => (
    <Icon name="tudn" size={[100, 24]} />
  ))
  .add('TUDNXtra color', () => (
    <Icon name="tudnXtra" size={[102, 26]} viewBox="0 0 102 26" />
  ))
  .add('TUDNcom color', () => (
    <Icon name="tudnCom" size={[102, 26]} viewBox="0 0 68 12" />
  ))
  .add('Unimas color', () => (
    <Icon name="unimas" size={[50, 18]} />
  ))
  .add('Prende Tudn color', () => (
    <Icon name="prendeTudn" size={[170, 22]} />
  ))
  .add('Unimas Mobile color', () => (
    <Icon name="unimasMobile" size={[16, 14]} />
  ))
  .add('UDN Mobile color', () => (
    <Icon name="udnMobile" size={[63, 16]} />
  ))
  .add('UDN Legacy color', () => (
    <Icon name="udnLegacy" size={[36, 20]} />
  ))
  .add('UDN Legacy Mobile color', () => (
    <Icon name="udnMobileLegacy" size={[14, 16]} />
  ))
  .add('PrendeTudn Mobile color', () => (
    <Icon name="prendeTudnMobile" size={[126, 22]} />
  ));

storiesOf('Icon/Network White Logos', module)
  .addDecorator(Decorator)
  .add('Univision white', () => (
    <Icon name="univisionWhite" size={[80, 19]} />
  ))
  .add('Univision Mobile white', () => (
    <Icon name="univisionMobileWhite" size={[14, 15]} />
  ))
  .add('Galavision white', () => (
    <Icon name="galavisionWhite" size={[75, 20]} />
  ))
  .add('Galavision Mobile white', () => (
    <Icon name="galavisionMobileWhite" size={[14, 16]} />
  ))
  .add('TUDN white', () => (
    <Icon name="tudn" size={[100, 24]} fill={WHITE} />
  ))
  .add('TUDNXtra white', () => (
    <Icon name="tudnXtra" size={[102, 26]} fill={WHITE} viewBox="0 0 102 26" />
  ))
  .add('TUDNcom white', () => (
    <Icon name="tudnCom" size={[102, 26]} fill={WHITE} viewBox="0 0 68 12" />
  ))
  .add('Unimas white ', () => (
    <Icon name="unimasWhite" size={[50, 18]} />
  ))
  .add('Unimas Mobile white', () => (
    <Icon name="unimasMobileWhite" size={[16, 14]} />
  ))
  .add('UDN white', () => (
    <Icon name="udnWhite" size={[100, 24]} />
  ))
  .add('UDN Mobile white', () => (
    <Icon name="udnMobileWhite" size={[63, 16]} />
  ))
  .add('UDN Legacy white', () => (
    <Icon name="udnWhiteLegacy" size={[36, 20]} />
  ))
  .add('UDN Legacy Mobile white', () => (
    <Icon name="udnMobileWhiteLegacy" size={[14, 16]} />
  ))
  .add('Uninow Horizontal', () => (
    <Icon name="uninowHorizontal" size={[50, 16]} />
  ));

storiesOf('Icon/Invalid', module)
  .add('Invalid icon', () => {
    return <Icon name="exampleNotFound" />;
  });

iconsName.forEach((iconName) => {
  const iconType = iconsList[iconName];
  const isWhite = iconName.match(/White/);
  const DecoratorIcon = isWhite ? Decorator : storyFn => storyFn();

  storiesOf(`Icons ${iconType}/Small Icon`, module)
    .addDecorator(DecoratorIcon)
    .add(iconName, () => {
      return <Icon name={iconName} size="small" />;
    });
  storiesOf(`Icons ${iconType}/Medium Icon (default)`, module)
    .addDecorator(DecoratorIcon)
    .add(iconName, () => {
      return <Icon name={iconName} />;
    });
  storiesOf(`Icons ${iconType}/Large Icon`, module)
    .addDecorator(DecoratorIcon)
    .add(iconName, () => {
      return <Icon name={iconName} size="large" />;
    });
  storiesOf(`Icons ${iconType}/Replacing colors`, module)
    .addDecorator(DecoratorIcon)
    .add(iconName, () => {
      return <Icon name={iconName} size="large" fill="#ff00ff" />;
    });
});

storiesOf('Icons weather mapping', module)
  .add('All Icons', () => {
    const Row = styled.tr`${Styles.row}`;
    const TableHead = styled.th`${Styles.head}`;
    return (
      <table style={{ width: '100%' }}>
        <Row title>
          <TableHead icon>Icon</TableHead>
          <TableHead code>code</TableHead>
          <TableHead>Name</TableHead>
        </Row>
        {Object.keys(weatherMapping).map((icon) => {
          const iconName = weatherMapping[icon];
          return (
            <Row items>
              <TableHead icon><Icon name={iconName} /></TableHead>
              <TableHead code>{icon}</TableHead>
              <TableHead name>{iconName}</TableHead>
            </Row>
          );
        })}
      </table>
    );
  });
