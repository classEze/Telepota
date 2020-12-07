const passport=require('passport')
const localStrategy=require('passport-local').Strategy;
const router=require('express').Router();
const bcrypt=require('bcrypt')

const AdminModel=require('../Models/AdminModel')

async function isPasswordCorrect(raw, hashed){
return await bcrypt.compare(raw, hashed)
}

passport.use(new localStrategy({usernameField:"email"}, async (email,password, done)=>{
    try{
        const foundUser=await AdminModel.findOne({email})
        if(foundUser){
            if(isPasswordCorrect(password, foundUser.password))
              return done(null, foundUser)
            
            else{
                console.log('invalid Credentials')
                return done(null, false)
        }
    }
    else{
        console.log('Egwa ekete, No found User')
        return done(null,false)
    }
        }
catch(error){
    console.log(error)
    return done(error, false)
}
})
)

module.exports=passport