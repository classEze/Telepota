const router=require('express').Router();
const passport=require('../strategies/passport-strategy');


router.get('/rider',passport.authenticate('jwt', {session:false, failureRedirect:'/'}), (req,res)=>res.render('Home/riderHome')
)

router.get('/driver', (req,res)=>res.render('Home/driverHome'))
router.get('/admin', (req,res)=>res.render('Home/adminHome'))


module.exports=router