const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const artistQuery = Artist
    .find(buildQuery())
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  const countAllQuery = Artist.count(buildQuery());

  function buildQuery() {
    const query = {};

    if (criteria.name.trim()) {
      // Search using index
      // query.$text = {
      //   $search: criteria.name,
      //   $caseSensitive: false
      // };

      // Search using regexp
      query.name = { $regex: criteria.name, $options: 'i' };
    }

    if (criteria.age) {
      query.age = {
        $gte: criteria.age.min,
        $lte: criteria.age.max
      };
    }

    if (criteria.yearsActive) {
      query.yearsActive = {
        $gte: criteria.yearsActive.min,
        $lte: criteria.yearsActive.max
      };
    }

    return query;
  }

  return Promise.all([artistQuery, countAllQuery])
    .then(results => {
      return {
        all: results[0],
        count: results[1],
        offset,
        limit
      };
    });
};

