const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

// class Product {
//     constructor(title, price, description, imageUrl, _id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = _id ? new mongodb.ObjectId(_id) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDB();
//         let dbOpertion;
//         if (this._id) {
//             dbOpertion = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//         } else {
//             dbOpertion = db.collection('products').insertOne(this)
//         }
//         return dbOpertion
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => console.log(err));
//     }

//     static fetchAll() {
//         const db = getDB();
//         return db.collection('products').find().toArray()
//             .then(products => {
//                 console.log(products);
//                 return products;
//             })
//             .catch(err => console.log(err));
//     }

//     static findById(productId) {
//         const db = getDB();
//         return db.collection('products').find({ _id: new mongodb.ObjectId(productId) }).next()
//             .then(product => {
//                 console.log(product);
//                 return product;
//             })
//             .catch(err => console.log(err));
//     }

//     static deleteById(productId) {
//         const db = getDB();
//         return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(productId) })
//             .then(result => {
//                 console.log('Deleted');
//             })
//             .catch(err => console.log(err));
//     }
// }

// module.exports = Product;