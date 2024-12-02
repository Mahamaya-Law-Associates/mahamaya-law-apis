const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: {type: String},
    email: String,
    password: String,
    
})

module.exports = model('user', mySchema);