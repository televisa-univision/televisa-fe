import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import TeamImage from '@univision/shared-components/dist/components/v2/TeamImage';
import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import squadGlossary from '../../../../config/WidgetHeaderConfig/widgetHeader.config';
import SquadTable from './SquadTable';

import Styles from './SquadLayout.scss';

/**
 * Squad layout view
 * @param {Object} props The scoping label and competition scope
 * @returns {JSX}
 */
const SquadLayout = (props) => {
  const {
    data,
    isTudn,
    playerTracker,
  } = props;
  if (isValidArray(data.playerList)) {
    const theme = themes.sports;
    const managerName = getKey(data.manager, '0.fullName');
    let glossary = squadGlossary('SquadGlossary');

    glossary = isValidArray(glossary) && glossary.map(content => (
      <div key={content[0]} className={Styles.glossaryContent}>
        <span className={classnames(Styles.abbr, 'uvs-font-a-bold')}>{content[0]}:</span>
        <span className={Styles.meaning}>{content[1]}</span>
      </div>
    ));

    return (
      <div className={Styles.container}>
        <TitleWrapper
          theme={theme}
          isTudn={isTudn}
          className={classnames({ [Styles.titleWrapper]: isTudn })}
        >
          <WidgetTitle
            isTudn={isTudn}
            className={classnames({ [Styles.widgetTitle]: isTudn })}
          >
            {localization.get('squad')}
          </WidgetTitle>
        </TitleWrapper>
        <div className={Styles.teamSquad}>
          <div className={Styles.teamImage}>
            <TeamImage uri={data.imageURI} size="large" />
          </div>
          <div className={Styles.teamData}>
            <div className={classnames(Styles.name, 'uvs-font-a-bold')}>{data.fullName}</div>
            {managerName && (
              <div className={classnames(Styles.name, Styles.manager)}>
                <span className={classnames('uvs-font-a-bold', Styles.abbr)}>DT. </span>
                {managerName}
              </div>
            )}
          </div>
        </div>
        <SquadTable playerList={data.playerList} playerTracker={playerTracker} />
        {glossary && (
          <div className={Styles.glossary}>
            {glossary}
          </div>
        )}
      </div>
    );
  }
  return <div />;
};

/**
 * @property {Object} data - the squad data
 * @property {string} [data.fullName] - the team squad full name
 * @property {string} [data.imgeURI] - the team squad logo url
 * @property {array} [data.manager] - the manager data array
 * @property {array} [data.playerList] - the team squad player list
 * @property {boolean} [isTudn] is true use the tudn style
 * @property {function} [playerTracker] - the tracking function for players
 */
SquadLayout.propTypes = {
  data: PropTypes.shape({
    fullName: PropTypes.string,
    imageURI: PropTypes.string,
    manager: PropTypes.array,
    playerList: PropTypes.array,
  }),
  isTudn: PropTypes.bool,
  playerTracker: PropTypes.func,
};

SquadLayout.defaultProps = {
  data: {},
  isTudn: false,
};

export default SquadLayout;
