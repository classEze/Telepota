const router=require('express').Router();
const bcrypt=require('bcrypt')

const RiderModel=require('../Models/RiderModel')

async function isPasswordCorrect(raw, hashed){
return await bcrypt.compare(raw, hashed)
}

passport.use(new localStrategy({usernameField:"email"}, async (email,password, done)=>{
    try{
        const foundUser = await RiderModel.findOne({email})
        if(foundUser){
            if(await isPasswordCorrect(password, foundUser.password)) 
            return done(null, foundUser)

            else{
                console.log('invalid Credentials')
                return done(null, false)
        }
    }
    else{
        console.log('Egwa ekete, No found User, rider')
        return done(null,false)
    }
        }
catch(error){
    return done(error, false)
}
})
)
router.get('/', (req,res)=>res.render('Login/riderLogin'))

router.post('/',
    passport.authenticate('local', {session:false, failureRedirect:'/login/rider'}) ,

async (req,res)=>{
    const sub={id:req.user._id, role:req.user.role}

    const token= await jwt.sign(sub, process.env.JWT_SECRET);

    res.cookie('ifewejibaye', token, {httpOnly:true, maxAge:1000*60*60*24*15})

    res.redirect('/home/rider')
}
)

module.exports=router