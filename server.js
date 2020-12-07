//Import Third party modules
const express=require('express')
const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')

//Import My modules

const app=express();
const port=process.env.PORT || 7000


//MONGOOSE CONNECTION
mongoose.connect('mongodb://localhost/Telepot', {useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser:true, useFindAndModify:false})
.then(()=>{
    console.log('Connected Succesfully')
    app.listen(port, console.log('Server Started on port ' + port));
})
.catch(err=>console.log(err))



//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(cookieParser())


//HANDLEBARS
const handlebars=require('express-handlebars');
app.set('view engine', 'hbs')
app.engine('hbs', handlebars
({
    layoutsDir:__dirname +'/Views/layouts',
    partialsDir:__dirname+'/Views/partials',
    extname:'hbs',
    helpers: {
        section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
        }
        }
}))


//ROUTES

app.get('/', (req,res)=>res.render('homepage'))

app.use('/home', require('./Routes/homeRoutes'))

app.use('/login', require('./Routes/loginRoutes'))

app.use('/signup', require('./Routes/signupRoutes'))

app.use('/subscribe', require('./Routes/subRoutes'))


app.use((req,res,next)=>res.status(404).json({message:'404, no such page'}))

app.use((err, req,res,next)=>res.status(500).json({message:'500, Internal Server Error'}))




