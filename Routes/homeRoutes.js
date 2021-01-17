const router=require('express').Router();
const passport=require('../strategies/passport-strategy');


router.get('/rider',passport.authenticate('jwt', {session:false, failureRedirect:'/login/rider'}), redirect_da, (req,res)=>res.render('Home/riderHome'))
router.get('/driver', passport.authenticate('jwt', {session:false, failureRedirect:'/login/driver'}), redirect_ra,  (req,res)=>res.render('Home/driverHome'))
router.get('/admin', passport.authenticate('jwt', {session:false, failureRedirect:'/login/admin'}), redirect_dr,  (req,res)=>res.render('Home/adminHome'))


function redirect_da(req,res,next){
    if(req.user.role=='Driver' || req.user.role=='Admin')return res.redirect('/')
    next();
}
function redirect_ra(req,res,next){
    if(req.user.role=='Rider' || req.user.role=='Admin')return res.redirect('/')
    next();
}
function redirect_dr(req,res,next){
    if(req.user.role=='Driver' || req.user.role=='Rider')return res.redirect('/')
   next();
}
module.exports=router