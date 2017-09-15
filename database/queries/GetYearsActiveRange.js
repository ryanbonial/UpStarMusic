const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  const maxPromise = Artist.find({})
    .sort({ yearsActive: -1 })
    .limit(1);

  const minPromise = Artist.find({})
    .sort({ yearsActive: 1 })
    .limit(1);

  return Promise.all([minPromise, maxPromise])
    .then(results => {
      return {
        min: results[0][0].yearsActive,
        max: results[1][0].yearsActive,
      };
    });
};
