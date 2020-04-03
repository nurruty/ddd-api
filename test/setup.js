const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiChange = require('chai-change');
const cleanDatabase = require('test/support/cleanDatabase');

// const container = require('src/container');
// const database = container.resolve('database');
// database.sync({ force: true });

chai.use(dirtyChai);
chai.use(chaiChange);

// Comment this line if you're not using a database
beforeEach(cleanDatabase);