// app.js
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

// initialize our express app
const app = express();

const route = require('./routes/route');

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://guna-admin:gunaadmin@cluster0.qb0ti.mongodb.net/slots';

//let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(process.env.MONGODB_URI || dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', route);

let port = 6070;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});