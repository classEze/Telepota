const router=require('express').Router();
const passport=require('../strategies/passport-strategy');
const RiderModel=require('../Models/RiderModel');
const DriverModel = require('../Models/DriverModel');
const AdminModel = require('../Models/AdminModel');


router.post('/user',passport.authenticate('jwt', {session:false, failureRedirect:'/'}), (req,res)=>{

    //  UPDATE RIDER LOCATION
    if(req.user.role=="Rider"){
    const location={coordinates:[req.body.longitude, req.body.latitude]}
    RiderModel.findByIdAndUpdate( req.user._id, {location})
    .then(updated=>{
        console.log(updated)
       return res.json({msg:"Update Successful", location:updated.location})
    })
    .catch(err=>{
        console.log(err)
        res.json({ err })
    })
}

//  UPDATE DRIVER LOCATION
if(req.user.role=="Driver"){
    const location={coordinates:[req.body.longitude, req.body.latitude]}
    DriverModel.findByIdAndUpdate( req.user._id, {location})
    .then(updated=>{
        console.log(updated)
       return res.json({msg:"Update Successful", location:updated.location})
    })
    .catch(err=>{
        console.log(err)
        res.json({ err })
    })
}

//  UPDATE ADMIN LOCATION
if(req.user.role=="Admin"){
    const location={coordinates:[req.body.longitude, req.body.latitude]}
    AdminModel.findByIdAndUpdate( req.user._id, {location})
    .then(updated=>{
        res.json({msg:"Update Successful", location:updated.location})
    })
    .catch(err=>{
        res.json({ err })
    })
}
}
)

module.exports=router