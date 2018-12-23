const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    fName: {type: String, required: true},
    mName: {type: String, required: true},
    lName: {type: String, required: true},
    contact: {type: Number, required: true},
    eMail: {type: String, required: true},
    blk: {type: Number, required: true},
    lot: {type: Number, required: true},
    ph: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true}


});


// Export the model
module.exports = mongoose.model('Users', UsersSchema);