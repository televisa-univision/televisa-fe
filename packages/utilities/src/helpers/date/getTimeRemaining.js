/**
 * @module helpers/date/getTimeRemaining
 */
import formatDigit from '../number/formatDigit';

/**
 * Create a array whit date info for days, hours, minutes and seconds
 * @param {number} time - value in milliseconds
 * @returns {Object[]} remaining data formatted as
 * [{ title: 'Days', number: 01 }, ...]
 */
export default function getTimeRemaining(time) {
  if (time > 0) {
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    days = formatDigit(days);
    hours = formatDigit(hours);
    minutes = formatDigit(minutes);
    seconds = formatDigit(seconds);

    return [
      {
        title: 'Días',
        number: days,
      },
      {
        title: 'Hrs',
        number: hours,
      },
      {
        title: 'Mins',
        number: minutes,
      },
      {
        title: 'Segs',
        number: seconds,
      },
    ];
  }

  return [
    {
      title: 'Días',
      number: '00',
    },
    {
      title: 'Hrs',
      number: '00',
    },
    {
      title: 'Mins',
      number: '00',
    },
    {
      title: 'Segs',
      number: '00',
    },
  ];
}
