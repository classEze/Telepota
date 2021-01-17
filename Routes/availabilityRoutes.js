const router=require('express').Router();
const passport=require('../strategies/passport-strategy');
const DriverModel = require('../Models/DriverModel');

router.patch('/driver', passport.authenticate('jwt', {session:false, failureRedirect:'/'}), (req,res)=>{
    DriverModel.findByIdAndUpdate( req.user._id, {available:req.body.available}, {new:true})
    .then(updated=>{
       return res.json({msg:"Update Successful", availability:updated.available})
    })
    .catch(err=>{
        console.log(err)
        res.json({ err })
    })
})
module.exports=router
