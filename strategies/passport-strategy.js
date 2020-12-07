const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const RiderModel=require('../Models/RiderModel')
const DriverModel=require('../Models/DriverModel')
const AdminModel=require('../Models/AdminModel')

const Extractor=(req)=>{
    if(req && req.cookies) return req.cookies.ifewejibaye 
}

passport.use(new JWTStrategy({
    jwtFromRequest:Extractor,
    secretOrKey:process.env.JWT_SECRET
}, async (payload,done)=>{
    try{
        let foundUser;

        if(payload.role=="Rider") foundUser = await  RiderModel.findById(payload.id)
        if(payload.role=="Driver") foundUser = await  DriverModel.findById(payload.id)
        if(payload.role=="Admin") foundUser = await  AdminModel.findById(payload.id)

        if(foundUser){
            return done(null, foundUser)
        }
        else{
            return done(null, false)
        }      
    }
    catch(err){
        return done(err, false)
    }
}))
module.exports = passport