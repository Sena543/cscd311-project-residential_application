const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const ejs = require('ejs')
const bcrypt = require('bcryptjs');
//const students = ;

const path = require('path');

const app = express();

require('./config/passport')(passport);

let db = mongoose.connection;
mongoose.connect('mongodb://localhost/student_database', {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database Connected');
});

app.use(express.urlencoded({extended: true }));
app.use(require('cookie-parser')());
app.use(express.json())

app.use(require('express-ejs-layouts'));
app.use(express.static(path.join(__dirname + '/views')))
app.set('views', 'views');
app.set('view engine', 'ejs');


app.use(session({
    secret: 'secret-student',
    resave: true,
    saveUninitialized: true,
   // cookie: { secure: true }
  }))

app.use(passport.initialize());
app.use(passport.session());

app.use( require('./routes/routes'));
app.use(require('./models/hallModel.js'));
app.use(require('./models/studentModel.js'));


const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server running on localhost:${port} `);
})