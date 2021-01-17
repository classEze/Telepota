
const router=require('express').Router();

const jwt=require('jsonwebtoken')
const {post_rider, post_driver, post_admin} = require('../Helpers/login')

router.get('/', (req,res)=>res.render('General_Login'))
router.get('/rider', (req,res)=>res.render('Login/riderLogin'))
router.get('/driver', (req,res)=>res.render('Login/driverLogin'))
router.get('/admin', (req,res)=>res.render('Login/adminLogin'))

router.post('/rider', post_rider, async (req,res)=>{

    const sub={id:req.user._id, role:req.user.role}

    const token= await jwt.sign(sub, process.env.JWT_SECRET);

    res.cookie('ifewejibaye', token, {httpOnly:true, maxAge:1000*60*60*24*15})

    res.redirect('/home/rider')
})
router.post('/driver', post_driver, async (req,res)=>{

    const sub={id:req.user._id, role:req.user.role}

    const token= await jwt.sign(sub, process.env.JWT_SECRET);

    res.cookie('ifewejibaye', token, {httpOnly:true, maxAge:1000*60*60*24*15})

    res.redirect('/home/driver')
})
router.post('/admin', post_admin, async (req,res)=>{

    const sub={id:req.user._id, role:req.user.role}

    const token= await jwt.sign(sub, process.env.JWT_SECRET);

    res.cookie('ifewejibaye', token, {httpOnly:true, maxAge:1000*60*60*24*15})

    res.redirect('/home/admin')
})


module.exports=router;



