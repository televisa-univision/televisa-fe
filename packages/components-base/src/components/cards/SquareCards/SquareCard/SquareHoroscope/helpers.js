/**
 * Get the zodiacal sign Date
 * @param {string} sign used in the card
 * @returns {string}
 */
export default function getSignDate(sign) {
  if (!sign) return '';

  const signs = {
    aries: 'MAR 20/21 – ABR 19/20',
    tauro: 'ABR 20/21 - MAY 19/20',
    geminis: 'MAY 20/21 – JUN 23/24',
    cancer: 'JUN 24/25 – JUL 21/22',
    leo: 'JUL 22/23 – AGO 22/23',
    virgo: 'AGO 23/24 – SEP 22/23',
    libra: 'SEP 23/24 – OCT 21/22',
    escorpion: 'OCT 22/23 – NOV 21/22',
    sagitario: 'NOV 21/22 – DIC 20/21',
    capricornio: 'DIC 21/22 – ENE 18/19',
    acuario: 'ENE 19/20 – FEB 17/18',
    piscis: 'FEB 18/19  – MAR 19/20',
  };
  return signs[sign];
}
