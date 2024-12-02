const mongoose = require('mongoose');
const uri = "mongodb+srv://saurabhsadhwaniofficial:h50nITDMGy2PL2ew@mahmaya-law.rjpt3.mongodb.net/?retryWrites=true&w=majority&appName=mahmaya-law";
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
