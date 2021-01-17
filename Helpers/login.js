const bcrypt=require('bcrypt')

const RiderModel=require('../Models/RiderModel')
const DriverModel=require('../Models/DriverModel')
const AdminModel=require('../Models/AdminModel')

// POST ROUTES
async function isPasswordCorrect(raw, hashed){
    return await bcrypt.compare(raw, hashed)
    }
    

exports.post_rider= async (req,res,next)=>{
    try{
        const foundUser=await RiderModel.findOne({email:req.body.email})
        if(foundUser){
            if(await isPasswordCorrect(req.body.password, foundUser.password)){
                console.log("Login Successful")
                req.user=foundUser
                next();
            }
            else{
                console.log("Invalid Credentials")
                res.redirect('/login/rider')
            }
        }
        else{
            console.log("User Not Found")
            res.redirect('/login/rider')
        }
    }
    catch(err){
        console.log("Login Failed", err)
        res.redirect('/login/rider')
    }
}


exports.post_driver= async (req,res,next)=>{
    try{
        const foundUser=await DriverModel.findOne({email:req.body.email})
        if(foundUser){
            if(await isPasswordCorrect(req.body.password, foundUser.password)){
                console.log("Login Successful")
                req.user=foundUser
                next();
            }
            else{
                console.log("Invalid Credentials")
                res.redirect('/login/driver')
            }
        }
        else{
            console.log("User not Found")
            res.redirect('/login/driver')
        }
    }
    catch(err){
        console.log("Login Failed", err)
        res.redirect('/login/driver')
    }
}



exports.post_admin= async (req,res,next)=>{
    try{
        const foundUser=await AdminModel.findOne({email:req.body.email})
        if(foundUser){
            if(await isPasswordCorrect(req.body.password, foundUser.password)){
                console.log("Login Successful")
                req.user=foundUser
                next();
            }
            else{
                console.log("invalid Credentials")
                res.redirect('/login/admin')
            }
        }
        else{
            console.log("User not Found")
            res.redirect('/login/admin')
        }
    }
    catch(err){
        console.log("Login Failed", err)
        res.redirect('/login/admin')
    }
}
    




