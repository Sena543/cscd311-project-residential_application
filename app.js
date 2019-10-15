const express = require('express')
const parser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const ejs =require('ejs')
const bcrypt = require('bcrypt')
const path = require('path')
const registered_students = require('./models/studentModel.js')
const router = require('./routes/routes.js');

let db = mongoose.connection;
mongoose.connect('mongodb://localhost/student_database', {useNewUrlParser: true, useUnifiedTopology: true})
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database Connected')
});

const app = express()
require('./config/passport.js')(passport)


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//session to save login session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(parser.urlencoded({extended: true }));
app.use(express.json())
app.use(router);
app.use(registered_students);

const port = process.env.port || 5000;
app.listen(port,()=>{
    console.log(`Served on ${port}`)
})
