const router=require('express').Router();
const passport=require('../strategies/passport-strategy');

router.get('/user', (req,res)=>{
    res.cookie('ifewejibaye', '', {maxAge:1})
    res.redirect('/');
        })
module.exports=router
