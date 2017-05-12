const knex = require('../db.js')
const bookshelf = require('bookshelf')(knex);

const UserPodcast = bookshelf.Model.extend({
  tableName: 'user_podcast'
})

const insertOne = (options, cb) => {
    UserPodcast
    .forge(options)
    .save()
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      return cb(err);
    })
}

const fetchPodcasts = (column, arr, cb) => {
    UserPodcast
    .forge()
    .where(column,'in',arr)
    .fetchAll()
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      return cb(err);
    })
}

module.exports.UserPodcast = UserPodcast;
module.exports.insertOne = insertOne;
module.exports.fetch = fetchPodcasts;
