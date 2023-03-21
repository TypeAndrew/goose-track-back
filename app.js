const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// use environment variables (.env file)
dotenv.config({ path: './.env' })

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

// initialize application
const app = express();

// use morgan logger in 'development' mode
if (process.env.NODE_ENV === 'development') app.use(logger('dev'));

// Mongo DB connection
mongoose.connect(process.env.MONGO_URL).then((connection) => {
    console.log(connection);
    console.log('Mongo DB connected..');
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    res.status(err.status).json({ message: err.message })
})

module.exports = app