require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You're successfully connected to MongoDB!");
  } catch(err) {
    // Ensures that the client will close when you get error
    await mongoose.disconnect();
    console.log("Error connecting to the database. \n", err);
  }
}
run().catch(console.dir);

module.exports = mongoose;
