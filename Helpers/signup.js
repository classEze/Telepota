
const RiderModel=require('../Models/RiderModel')
const DriverModel=require('../Models/DriverModel')
const AdminModel=require('../Models/AdminModel')

//GET ROUTES
exports.get_rider=(req,res)=>res.render('SignUp/riderUp.hbs')
exports.get_driver=(req,res)=>res.render('SignUp/driverUp.hbs')
exports.get_admin=(req,res)=>res.render('SignUp/adminUp.hbs')


//  RIDER SIGN UP
exports.post_rider= (req,res)=>{
    RiderModel.create(req.body)
    .then(result=>{
        console.log(result)
        res.redirect('/home/rider')
    })
    .catch(err=>console.log('Error, account not created', err))
    }
    
    //  DRIVER SIGN UP
    exports.post_driver = (req,res)=>{
        DriverModel.create(req.body).then(result=>{
            console.log(result)
            res.redirect('/home/driver')
        })
        .catch(err=>console.log('Error, account not created', err))
        }

    //  ADMIN SIGN UP
    exports.post_admin= (req,res)=>{
        AdminModel.create(req.body).then(result=>{
            console.log(result)
            res.redirect('/home/admin')
        })
        .catch(err=>console.log('Error, account not created', err))
        }
