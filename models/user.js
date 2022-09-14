const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }]
    }
});

UserSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({ productId: product._id, quantity: newQuantity });
    }
    const updateCart = { items: updatedCartItems };
    this.cart = updateCart;
    return this.save();
};

UserSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

UserSchema.methods.clearCart = function() {
    this.cart = {items: []}
    return this.save();
};

module.exports = mongoose.model('User', UserSchema);

// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

// class User {
//     constructor(name, email, cart, _id) {
//         this.name = name;
//         this.email = email;
//         this.cart = cart
//         this._id = _id;
//     }

//     save() {
//         const db = getDB();
//         return db.collection('users').insertOne(this);
//     }

//     static findById(userId) {
//         const db = getDB();
//         return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
//             .then(user => {
//                 console.log(user);
//                 return user;
//             })
//             .catch(err => console.log(err));
//     }

//     addToCart(product) {
//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//         });
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];
//         if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity });
//         }
//         const updateCart = { items: updatedCartItems };
//         const db = getDB();
//         return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updateCart } });
//     }

//     getCart() {
//         const db = getDB();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         });
//         return db.collection('products').find({ _id: { $in: productIds } }).toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {
//                         ...p, quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).quantity
//                     }
//                 });
//             });
//     }

//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         });
//         const db = getDB();
//         return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: updatedCartItems } } });
//     }

//     addOrder() {
//         const db = getDB();
//         return this.getCart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new mongodb.ObjectId(this._id),
//                     name: this.name,
//                 }
//             };
//             return db.collection('orders').insertOne(order)
//         }).then(result => {
//             this.cart = { items: [] };
//             return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: [] } } });
//         });
//     }

//     getOrders() {
//         const db = getDB();
//         return db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray();
//     }
// }

// module.exports = User;