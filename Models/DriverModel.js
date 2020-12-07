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
    driver_id:{type:Number, autoIndex:true},
    surname:{type:String, required:true},
    firstname:{type:String, required:true},
    role:{type:String, default:"Driver"},
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    vehicle_type:{type:String, required:true},
    phone:{type:Number, required:true, unique:true},
    address:{type:String, required:true},
    plate_number:{type:String, required:true},
    subscription:{type:SubSchema},
    location:{type:GeoSchema, required:true, index:'2dsphere'}

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