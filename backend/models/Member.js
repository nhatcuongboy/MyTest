// models/Member.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');

let memberSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    birthday: {
        type: Date
    }
}, {
    collection: 'members'
})

//memberSchema.plugin(uniqueValidator, { message: 'Field already in use.' });
module.exports = mongoose.model('Member', memberSchema)