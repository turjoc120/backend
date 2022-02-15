const mongoose = require("mongoose")
// const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;


async function connectDatabase() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sg7vl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        });
}

module.exports = connectDatabase
