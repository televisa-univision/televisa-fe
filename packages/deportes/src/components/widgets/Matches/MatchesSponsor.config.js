/**
 * Define sponsors by soccer competition id
 * @param {string} id - of soccer competition
 * @returns {Object}
 */
export default function(id) {
  const sponsor = {
    // for MLS soccer competition id is 98
    98: {
      name: 'Seat Geek',
      logo: 'https://st1.uvnimg.com/04/97/12d5c69042089587424314040696/seatgeek-2x.png',
    },
  };
  // Return particular sponsor for id if found
  return sponsor[id];
}
