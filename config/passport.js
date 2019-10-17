const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//load the student model
const students = require('../models/studentModel');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'student_id'}, (student_id, student_password, done)=>{
            students.findOne({id:student_id})
            .then((student)=>{
                if(!student){
                    return done(null, false, {message:'Student not found!'});
                }
                //matching pass
                bcrypt.compare(student_password, student.password, (err, isMatch)=>{
                    if(err){ console.log(err)};

                    if(isMatch){
                        return done(null, student)
                    } else{
                        return done(null, fasle, {message:'Password is incorrect'});
                    }
                });
            })
            .catch((err)=>{ console.log(err);  }) 
        })   
    );

    passport.serializeUser(function(students, done) {
        done(null, students.id);
      });
      
      passport.deserializeUser(function(id, done) {
        students.findOne(students.id, function(err, student) {
          done(err, student);
        });
      });

}   

/**
 *  new LocalStrategy({usernameField: 'student_id'}, (student_id, password, done)=>{
            students.findOne({id:student_id}, (err, student)=>{
                if(err){return res.send(err) }

                if(!student){return res.send('Student not found') }
                 //compare passswords
        bcrypt.compare(student_password, student.password,(err, checkPass)=>{
            if(err){  return res.send(err); }

            if(!checkPass){ return res.send('invalid password'); }
            })
        })
    })
 */
