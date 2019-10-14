const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registered_students = require('../models/studentModel.js')

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'student_id'}, (student_id, password, done)=>{
            //find student id with entered

            registered_students.findOne({ id: student_id })
            .then(student =>{
                if(!student){
                    return done(null,false,{message:"Can't find that ID"})
                }

                bcrypt.compare(password, student.password, (err, is_match)=>{
                    if(err){
                        throw err;
                    }

                    if(is_match){
                        return done(null, student)
                    }else{
                        return done(null, false, {message: 'Incorrect Password'})
                    }
                    
                })
            })
            .catch((err)=>console.log(err))
        })
    )
    
passport.serializeUser((user, done)=> {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
      //to do - add a regex to search the id instead of the _id
    if (id.match(/[0-9]^{8}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        registered_students.findById(id, (err, student)=> {
            done(err, student);
          })
      }
    
  });
}

/*registered_students.findById(id, (err, student)=> {
      done(err, student);
      
    }); */
