const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD +'@cluster0.xk0xnof.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('DB Connected');
        _db = client.db()
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDB = () => {
    if(_db) {
        return _db
    }
    throw 'No Database Found';
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;