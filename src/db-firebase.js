const admin = require('firebase-admin');
const serviceAccount = require('../../Keys/movies-db-dbdbb-firebase-adminsdk-2mv0i-8c50e4b5ae.json');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const database = admin.database();

module.exports = database;
