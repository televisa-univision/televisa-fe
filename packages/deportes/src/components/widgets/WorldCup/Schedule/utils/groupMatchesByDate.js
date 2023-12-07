import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

/**
 * Groups all WC matches by date
 * @param {array} matches - world cup matches
 * @returns {Object}
 */
export default function groupMatchesByDate(matches) {
  if (!isValidArray(matches)) {
    return {};
  }

  const sections = {};
  const dates = [];

  matches.forEach((item) => {
    const { date } = item;
    const dateObj = new Date(date);
    const key = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;

    if (!sections[key]) {
      sections[key] = [
        { ...item },
      ];
      dates.push({ key, dateObj });
    } else {
      sections[key].push(item);
    }
  });

  return {
    sections,
    dates,
  };
}
