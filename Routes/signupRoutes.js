const router=require('express').Router();
const {get_rider, post_rider, get_admin, post_admin, get_driver, post_driver} = require('../Helpers/signup')

const RiderModel=require('../Models/RiderModel')
const DriverModel=require('../Models/DriverModel')
const AdminModel=require('../Models/AdminModel')


router.get('/', (req,res)=> res.render('General_Signup'));
router.get('/rider', get_rider)
router.get('/driver', get_driver)
router.get('/admin', get_admin)



router.post('/rider', post_rider)

router.post('/driver', post_driver)

router.post('/admin', post_admin)

module.exports=router;
