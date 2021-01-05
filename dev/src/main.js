const { db, auth, mail, libs } = require('./context')

const { createServer } = require('./server');

module.exports = async () => {
  const app = createServer({db, auth, mail, libs });
}