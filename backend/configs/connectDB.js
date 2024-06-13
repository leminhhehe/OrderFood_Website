const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.set('strictQuery', false); 

    mongoose.connect(process.env.MONGO_URI, {
        dbName: "FOOD_ORDER",
    })
    .then(() => {
        console.log("Connection to Database successfully");
    })
    .catch((err) => {
        console.error(`Connection to Database failed! ${err}`);
    });
};

module.exports = connectDB;
