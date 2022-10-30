const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const {passportInit} = require("./src/config/passport-config");
const expressSession = require("express-session");
const indexRoute = require('./src/routes/index');
const authRoute = require('./src/routes/auth');
const adminRoute = require('./src/routes/admin');
const app = express();
require('dotenv').config();


// database setup
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL).then(() => console.log('database running'))
.catch(err => console.log(err.message));

// passport local init
passportInit(passport);

// passport google init
// passportGoogleInit(passport);
// cors
app.use(cors({
  origin:'*'
}))
// express-session
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// express middlewares
app.use(expressLayouts);
app.set("layout", "./layouts/index");
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
app.use('/', indexRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))