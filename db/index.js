const pg = require('pg');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'podiocast',
  },
  pool: {min: 0, max: 10}
});

knex.schema.createTableIfNotExists('users', (table) => {
  table.increments();
  table.string('username');
  table.string('password');
  table.timestamps();
})

knex.schema.createTableIfNotExists('podcasts', (table) => {
  table.integer('collectionId').primary().unique();
  table.string('collectionName');
  table.string('feedUrl');
  table.string('artistName');
})

knex.schema.createTableIfNotExists('episodes', (table) => {
  table.increments();
  table.string('title');
  table.string('url');
  table.string('duration');
  table.string('pubDate');
  table.integer('collectionId');
})

knex.schema.createTableIfNotExists('user_episodes', (table) => {
  table.increments();
  table.int('user_id');
  table.int('podcast_id');
})

const bookshelf = require('bookshelf')(knex);

var Users = bookshelf.Model.extend({
  tableName: 'users'
})

var Podcasts = bookshelf.Model.extend({
  tableName: 'podcasts'
})

var Episodes = bookshelf.Model.extend({
  tableName: 'episodes'
})

var user_episodes = bookshelf.Model.extend({
  tableName: 'user_episodes'
})

module.exports.knex = knex;
module.exports.bookshelf = bookshelf;
