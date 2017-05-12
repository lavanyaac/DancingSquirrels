const db = process.env.DATABASE_URL || { database: 'newdatabase' };

module.exports = {

  development: {
    client: 'pg',
    connection: db
  }
};
