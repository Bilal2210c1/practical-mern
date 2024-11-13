const express = require('express')

const app = express();
require('dotenv').config()

const cors = require('cors')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const {DBConnection} = require('./ConfigDB/Db')


const { createUser, 
        getAllUsers,
        deleteUser, 
        updateUser
     }= require('./Controller/userAccount')


//    POST AND GET 
     app.route('/user').get(getAllUsers).post(createUser)
     // DELETE AND UPDATE
     app.route('/user/:username').delete(deleteUser).put(updateUser)


app.listen(process.env.PORT,function(){
    console.log(`Server is running on port ${process.env.PORT}`)
    DBConnection(); 
})