
// module.exports = {
//   development: 'mongodb://cannaply-dev:cannaply2020@ds135946.mlab.com:35946/cannaply-dev',
//   test: 'mongodb://cannaply-test:cannaply2020@ds261136.mlab.com:61136/cannaply-test',
//   production: process.env.DATABASE_URL
// };

module.exports = {
  development: {
    username: 'dev',
    password: 'cannaply-dev',
    database: 'cannaply-dev',
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    //storage: 'postgres://gnhkmlaj:o9_hBQ...@kandula.db.elephantsql.com:5432/gnhkmlaj'
  },
  test: {
    username: 'test',
    password: 'cannaply-test',
    database: 'cannaply-test',
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    //storage: 'postgres://xrtwmtoy:sNStLh...@kandula.db.elephantsql.com:5432/xrtwmtoy',
    logging: null
  },
  production: process.env.DATABASE_URL
};
