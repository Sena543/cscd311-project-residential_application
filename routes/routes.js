const express = require('express')
const registered_students = require('../models/studentModel.js')
const router = express.Router();
const passport = require('passport')
const bcrypt = require('bcrypt')
const {ensureAuthenticated } = require('../config/auth.js');



router.get('/', (req, res)=>{
    res.render('index.ejs');
});

router
.get('/login',(req,res)=>{
    res.render('login.ejs');
})

.post('/login',(req,res,next)=>{
     passport.authenticate('local', 
     { successRedirect: 'select_halls.ejs',
      failureRedirect: 'login.ejs',
       failureFlash: true })
           //res.send('select_halls.ejs')
       });

router
.get('/register',(req, res)=>{
    res.render('register_student.ejs')
})

.post('/register', (req,res)=>{
    
    let [student_pass, confirm_pass]=[req.body.pass, req.body.confirm_pass]
    const [student_name, student_id]=[req.body.name, req.body.id]
    if(!student_pass||student_pass !== confirm_pass){
        res.render('register_student.ejs')
    }

    let students = new registered_students({
        name:student_name,
        id:student_id,
        password:student_pass
    })
    try{ 
       bcrypt.genSalt(10, async function(err, salt){
          await  bcrypt.hash(student_pass, salt, function(err, hash){
                if(err){throw err};
                students.password = hash;
                students.save()
                .then(success=>{
                    res.render('login.ejs')
                })
                .catch(err=>console.log(err));
                console.log(hash)
                console.log(req.body)
            })
        })
    }catch{throw new Error}
    });


router
.post('/save_selected_halls',ensureAuthenticated,(req, res)=>{
    //res.send(req.students.id)
    let [hall,block,room] = [req.body.choose_hall, req.body.choose_block, req.body.choose_room]
    console.log(hall, block, room)
})

/*
TO DO
res.render('/select_halls.ejs', {
    name: req.registered_students.name
})
<p><%= name</p>
download fresh of the boat
*/


module.exports= router;