
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
dotenv.config()

//Connect to Db
mongoose.connect(
process.env.DB_CONNECT,
{ useUnifiedTopology: true },
() => console.log('connected to Db'))

//body-parser
app.use(bodyParser.json())

//Import Routes
const Router = require('./controller/controller')
//import
// const Router = require('./routes/post')



//ROUTES
app.use('/posts',Router)

app.get('/posts', (req,res) => {
    res.send('We are on posts')
})




app.listen(8000)
            
