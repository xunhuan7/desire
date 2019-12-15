const mongoose = require('mongoose')
const {DATABASE} = require('../config/environment')

mongoose.Promise = global.Promise;

mongoose.connect(DATABASE.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.on('connected', function () {
    console.info('Mongoose connection open to ' + DATABASE.DB_URL + '......');
});

connection.on('error', function (err) {
    console.error('Mongoose connection error: ' + err);
});

connection.on('disconnected', function () {
    console.info('Mongoose connection disconnected ......');
});

module.exports = mongoose
