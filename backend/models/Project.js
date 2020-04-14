
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let projectSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    members: [Schema.Types.ObjectId]
}, {
    collection: 'projects'
})

projectSchema.plugin(uniqueValidator, { message: 'Name already in use.' });
module.exports = mongoose.model('Project', projectSchema)