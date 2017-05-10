var db = process.env.DATABASE_URL || 'newdatabase';

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: db
    }
  }
};
