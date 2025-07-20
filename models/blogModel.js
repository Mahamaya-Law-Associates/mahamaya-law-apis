const { Schema, model } = require('../connection');

const mySchema = new Schema({
    title: {type: String},
    description: String,
    image: String,
    author: String,
    date: String
})

module.exports = model('blog', mySchema);