const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

// GET ROUTES
exports.get_driver=(req,res)=>res.render('Login/driverLogin')
exports.get_admin=(req,res)=>res.render('Login/adminLogin')
exports.get_rider=(req,res)=>res.render('Login/riderLogin')



// POST ROUTES

exports.post_rider= async (req,res)=>{
           const sub={id:req.user._id, role:req.user.role}

           const token= await jwt.sign(sub, process.env.JWT_SECRET);

           res.cookie('ifewejibaye', token, {httpOnly:true, maxAge:1000*60*60*24*15})

           res.redirect('/home/rider')
}
exports.post_driver= async (req,res)=>{
           const sub={id:req.user._id, role:req.user.role}

           const token= await jwt.sign(sub, process.env.JWT_SECRET);

           res.cookie('ifewejibaye', token, {httpOnly:true, maxAge:1000*60*60*24*15})

           res.redirect('/home/driver')
}
exports.post_admin= async (req,res)=>{
           const sub={id:req.user._id, role:req.user.role}

           const token= await jwt.sign(sub, process.env.JWT_SECRET);

           res.cookie('ifewejibaye', token, {httpOnly:true, maxAge:1000*60*60*24*15})

           res.redirect('/home/admin')
}
    




