const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const schema=mongoose.Schema;

const AdminSchema=new schema({
    name:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    phone:{type:String, required:true, unique:true},
    address:{type:String, required:true},
    role:{type:String, default:"Admin"}
},

    {timestamps:true}
)
 AdminSchema.pre('save', async function(next){
    const salti=await bcrypt.genSalt(11)
    this.password=await bcrypt.hash(this.password, salti)
    next()
})

const AdminModel=mongoose.model('Admin', AdminSchema)

module.exports=AdminModel