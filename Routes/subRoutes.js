const router=require('express').Router();
const passport=require('../strategies/passport-strategy');
const RiderModel=require('../Models/RiderModel');
const DriverModel = require('../Models/DriverModel');
const AdminModel = require('../Models/AdminModel');


router.post('/rider',passport.authenticate('jwt', {session:false, failureRedirect:'/'}), (req,res)=>{

    //  UPDATE RIDER SUB
    if(req.user.role="Rider"){
    RiderModel.findByIdAndUpdate( req.user._id, {subscription:req.body.sub})
    .then(updated=>{
        console.log(updated)
       return res.json({msg:"Update Successful", sub:updated.subscription})
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
       return res.json({msg:"Update Successful", sub:updated.subscription})
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
        res.json({msg:"Update Successful", sub:updated.subscription})
    })
    .catch(err=>{
        res.json({ err })
    })
}

}
)

router.post('/driver', (req,res)=>res.send('Home/driverHome'))


router.post('/admin', (req,res)=>res.send('Home/adminHome'))


module.exports=router