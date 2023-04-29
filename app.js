const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// use environment variables (.env file)
dotenv.config({ path: './.env' })

// const taskssRouter = require('./routes/api/contacts');
const authsRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const columnsRouter = require('./routes/api/columns');
const tasksRouter = require("./routes/api/tasks");

// initialize application
const app = express();

// use morgan logger in 'development' mode
if (process.env.NODE_ENV === 'development') app.use(logger('dev'));

// Mongo DB connection
mongoose.connect(process.env.MONGO_URL).then((connection) => {
    // console.log(connection);
    console.log('Mongo DB connected..');
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// serv statics files
app.use(express.static('public/avatars'))

// use all routes of project
app.use('/auth', authsRouter)
app.use('/user', usersRouter)
app.use("/columns", columnsRouter)
app.use('/tasks', tasksRouter)

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const options = {
    explorer: true
};

// use swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    console.log(err);

    res.status(err.status).json({ message: err.message })
})

module.exports = app