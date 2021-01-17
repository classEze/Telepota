const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const Schema=mongoose.Schema;

const SubSchema = new Schema({
    endpoint:{type:String, required:true},
    keys:{type:Object, required:true}
})


const GeoSchema=new Schema({
    type:{type:String, default:"Point"},
    coordinates:[Number]
})



const DriverSchema=new Schema({
    name:{type:String, required:true},
    role:{type:String, default:"Driver"},
    password:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    available:{type:String, default:false},
    car:String,
    plate:{type:String, required:true},
    phone:{type:String, required:true, unique:true},
    address:{type:String, required:true},
    subscription:{type:SubSchema},
    location:{type:GeoSchema, index:'2dsphere'}

},

    {timestamps:true}
)

DriverSchema.pre('save', async function(next){
    const salti=await bcrypt.genSalt(11)
    this.password=await bcrypt.hash(this.password, salti)
    next()
})

const DriverModel=mongoose.model('Driver', DriverSchema)

module.exports=DriverModel