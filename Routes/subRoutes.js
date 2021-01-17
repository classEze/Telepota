const router=require('express').Router();
const passport=require('../strategies/passport-strategy');
const RiderModel=require('../Models/RiderModel');
const DriverModel = require('../Models/DriverModel');
const AdminModel = require('../Models/AdminModel');


router.post('/user',passport.authenticate('jwt', {session:false, failureRedirect:'/'}), (req,res)=>{

    //  UPDATE RIDER SUB
    if(req.user.role=="Rider"){
    RiderModel.findByIdAndUpdate( req.user._id, {subscription:req.body.sub})
    .then(updated=>{
        console.log(updated)
       return res.json({msg:"Update Successful", sub:updated.subscription.endpoint})
    })
    .catch(err=>{
        console.log(err)
        res.json({ err })
    })
}

//  UPDATE DRIVER SUB
if(req.user.role=="Driver"){
    DriverModel.findByIdAndUpdate( req.user._id, {subscription:req.body.sub})
    .then(updated=>{
        console.log(updated)
       return res.json({msg:"Update Successful", sub:updated.subscription.endpoint})
    })
    .catch(err=>{
        console.log(err)
        res.json({ err })
    })
}

//  UPDATE ADMIN SUB
if(req.user.role=="Admin"){
    AdminModel.findByIdAndUpdate( req.user._id, {subscription:req.body.sub})
    .then(updated=>{
        res.json({msg:"Update Successful", sub:updated.subscription.endpoint})
    })
    .catch(err=>{
        res.json({ err })
    })
}

}
)

module.exports=router