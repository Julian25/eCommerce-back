require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.chnez6d.mongodb.net/eComerce?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {useNewUrlParser: true})
.then(() => console.log('connected to mongoDB'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => console.log(err))