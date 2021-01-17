const router=require('express').Router();
const passport=require('../strategies/passport-strategy');
const DriverModel = require('../Models/DriverModel');
const {send_push} = require('../Helpers/push')

router.post('/user', passport.authenticate('jwt', {session:false, failureRedirect:'/'}), (req,res)=>{
    console.log(req.body)
    DriverModel.find({
        location:{
            $nearSphere:{
                $maxDistance:300000,
                $geometry:{
                    type:'Point',
                    coordinates:[req.body.longitude, req.body.latitude]
                }
            }
        }
            }
            ).then(result=>{
                if(result.length>0){
                    console.log(result)
                    const paired=result[0];
                    const data = {
                        name:req.user.name,
                        email:req.user.email,
                        phone:req.user.phone,
                        to:req.body.to,
                        from:req.body.from
                    }

                    res.json({name:paired.name, phone:paired.phone, email:paired.email, car:paired.car, plate:paired.plate})
                    send_push( paired.subscription, data )
                    // send_push( req.user.subcription, paired )
                }
                else{
                    console.log('No result')
                    res.json({message:'Seems no driver is in close proximity, You should try again after a few minutes'})
                }
            })
            .catch(err=>{
                console.log(err)
                res.send(err)})
        })
module.exports = router
