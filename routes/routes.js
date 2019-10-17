const router = require('express').Router();
const passport = require('passport')
const students = require('../models/studentModel');
const hall = require('../models/hallModel.js');
const bcrypt = require('bcryptjs');
const {ensureAuthenticated,forwardAuthenticated } = require('../config/auth');

/**
 * TO DO
 * add a function to generate student id and pass it to the student_id space
 */

// Login Page
router.get('/login', forwardAuthenticated, (req, res) =>{
     res.render('login')
    });

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('register')
});

 //endpoint to handle new student registration
router.post('/register', async(req,res)=>{
    
    const {student_name,student_id, student_password} = req.body;
    if(!student_name || !student_id || !student_password){
        res.send('Enter your credentials')
    }

    //hashing the password
    const hashpass=await bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(req.body.password, salt, function(err, hash){
            r_student.password = hash;
        })
    })
    const r_student = new students({
        name: req.body.name,
        student_id:req.body.id,
        student_password:hashpass
    });

    try{
       await r_student.save();
    }catch(err){
        res.status(400).send(err);
    }
    console.log(hashpass)
    console.log(r_student.password)
    res.send('Done!!');
})


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/select_halls',
      failureRedirect: '/login',
     // failureFlash: true
    })(req, res, next);
  });

router.post('/select_halls',ensureAuthenticated, (req, res)=>{
    const {hall_name, block, room_number} = req.body;
    if(!hall_name || !block || !room_number){
        res.send('Select or logout');
    }

})


module.exports = router;
