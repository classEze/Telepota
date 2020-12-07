
const RiderModel=require('../Models/RiderModel')
const DriverModel=require('../Models/DriverModel')
const AdminModel=require('../Models/AdminModel')
const router = require('../Routes/loginRoutes')

//GET ROUTES
exports.get_rider=(req,res)=>res.render('SignUp/riderUp.hbs')
exports.get_driver=(req,res)=>res.render('SignUp/driverUp.hbs')
exports.get_admin=(req,res)=>res.render('SignUp/adminUp.hbs')

//  RIDER SIGN UP
exports.post_rider=(req,res)=>{
    const{surname,username,email,password,confirm,firstname}=req.body

    if(!username||!surname||!firstname||!email||!password||!confirm)
    return res.json({message:'Please enter all fields'})

    if(password!=confirm)
    return res.json({message:'please Enter the same password'})


    RiderModel.create(req.body)
    .then(user=>{
        console.log(user)
        res.json({message:'Successfuly Saved', user})
    })
    .catch(err=>{
        console.log(err.message)
        res.json({message:'Saving to database failed'})
})
}

//  ADMIN SIGN UP
exports.post_admin=(req,res)=>{
    const{surname,username,email,password,confirm,firstname}=req.body

    if(!username||!surname||!firstname||!email||!password||!confirm)
    return res.json({message:'Please enter all fields'})

    AdminModel.create(req.body)
    .then(user=>{
        console.log(user)
        res.json({message:'Successfuly Saved', user})
    })
    .catch(err=>{
        console.log(err.message)
        res.json({message:'Saving to database failed'})
})
}


//  DRIVER SIGN UP
exports.post_driver=(req,res)=>{
    const{surname,username,email,password,confirm,firstname}=req.body

    if(!username||!surname||!firstname||!email||!password||!confirm)
    return res.json({message:'Please enter all fields'})

    DriverModel.create(req.body)
    .then(user=>{
        console.log(user)
        res.json({message:'Successfuly Saved', user})
    })
    .catch(err=>{
        console.log(err.message)
        res.json({message:'Saving to database failed'})
})
}