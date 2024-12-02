const mongoose = require('mongoose');
const url = "mongodb+srv://mahamayalaw:law123@cluster0.olyrl.mongodb.net/saurabh?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url)
    .then((result) => {
        console.log('connect to the database');

    }).catch((err) => {
        console.log(err);

    })

module.exports = mongoose;
