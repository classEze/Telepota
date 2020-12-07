const router=require('express').Router();
const {get_rider, post_rider, get_admin, post_admin, get_driver, post_driver} = require('../Helpers/signup')

const RiderModel=require('../Models/RiderModel')
const DriverModel=require('../Models/DriverModel')
const AdminModel=require('../Models/AdminModel')


router.get('/', (req,res)=> res.render('General_Signup'))

router.get('/rider', get_rider)
router.get('/driver', get_driver)
router.get('/admin', get_admin)

router.post('/rider', (req,res)=>{
    RiderModel.create(req.body)
    .then(result=>{
        console.log(result)
        res.redirect('/home/rider')
    })
    .catch(err=>res.send('wahoooo'))
    })

router.post('/driver', (req,res)=>{
    // RiderModel.create(req.body).then(result=>res.send(result)).catch(err=>res.send(err))
    })
router.post('/admin', (req,res)=>{
    // AdminModel.create(req.body).then(result=>res.send(result)).catch(err=>res.send(err))
    })
module.exports=router;
