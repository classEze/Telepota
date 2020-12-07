const router=require('express').Router();

const { post_driver, get_driver, get_admin, post_admin, get_rider, post_rider} = require('../Helpers/login.js')

router.get('/', (req,res)=>res.render('General_Login'))

router.route('/rider')
.get(get_rider)
.post( authenticate_rider,  post_rider)


router.route('/driver')
.get(get_driver)
.post( authenticate_driver,  post_driver)


router.route('/admin')
.get(get_admin)
.post( authenticate_admin,  post_admin)


function authenticate_rider(req,res,next){
    const strategy=require('../strategies/rider_login_strategy')
    strategy.authenticate( 'local', {session:false}, (err,user,info)=>{
        if(err) return res.render('Login/rider')
        if(!user) return res.render('Login/rider')
       return  next()

    })(req,res)
}


function authenticate_driver(req,res,next){
    const strategy=require('../strategies/driver_login_strategy')
    strategy.authenticate( 'local', {session:false, failureRedirect:'/login/rider'})
}


function authenticate_admin(req,res,next){
    const strategy=require('../strategies/admin_login_strategy')
    strategy.authenticate( 'local', {session:false, failureRedirect:'/login/rider'})
}


module.exports=router