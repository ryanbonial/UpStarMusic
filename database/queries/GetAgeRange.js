const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const maxPromise = Artist.find({})
    .sort({ age: -1 })
    .limit(1);

  const minPromise = Artist.find({})
    .sort({ age: 1 })
    .limit(1);

  return Promise.all([minPromise, maxPromise])
    .then(results => {
      return {
        min: results[0][0].age,
        max: results[1][0].age,
      };
    });
};
