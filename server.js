require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

const mongoose = require('mongoose', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('connect')
    })
    .catch((err) => {
        console.log(err);
    });

const session = require('express-session'); 
const MongoStore = require('connect-mongo');
const flash = require('connect-flash'); 

const routes = require('./routes');

const helmet = require('helmet');
const csrf = require('csurf');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: process.env.SECRETSESSION,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

const { checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(csrf());
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('connect', () => {
    app.listen(3000, () => console.log("Servidor iniciado"))
})
