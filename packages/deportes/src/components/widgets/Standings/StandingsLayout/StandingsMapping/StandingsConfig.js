export const LIGA_MX_APERTURA = '199';
export const LIGA_MX_CLAUSURA = '385';
export const MLS = '98';
export const GROUP = 'group';
export const DEFAULT = 'default';
export const FLEXIBLE = 'Flexible';

/**
 * Standings Configuration Object.
 * Object used to configure standings layout,
 * like how many teams to show when standings table is in compact mode
 * how many highlighted teams are in the standings, meaning which ones move on to playoffs
 * @property {bool} hasTopTeams - if tournament should have top qualifying teams into playoffs
 * @property {number} top - how many top teams are qualifying into playoffs,
 * count starts from 0
 * @property {number} show - how many teams to show when standings is in compact mode,
 * count starts from 0
 * @property {Array} dashed - where to show a dashed border that indicates teams
 * below the dashed line are already disqualified
 */
const CONFIG = Object.freeze({
  [LIGA_MX_APERTURA]: {
    hasTopTeams: true,
    top: 7,
    show: 7,
    dashed: [],
    hasPointsPerGame: false,
  },
  [LIGA_MX_CLAUSURA]: {
    hasTopTeams: true,
    top: 7,
    show: 7,
    dashed: [],
    hasPointsPerGame: false,
  },
  [MLS]: {
    hasTopTeams: true,
    top: 6,
    show: 6,
    dashed: [],
    hasPointsPerGame: true,
  },
  [GROUP]: {
    hasTopTeams: true,
    top: 1,
    show: 4,
    dashed: [],
    hasPointsPerGame: false,
  },
  [DEFAULT]: {
    hasTopTeams: false,
    top: 0,
    show: 4,
    dashed: [],
    hasPointsPerGame: false,
  },
});

export default CONFIG;
