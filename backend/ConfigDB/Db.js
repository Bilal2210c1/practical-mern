const mongoose = require('mongoose')

async function DBConnection() {
    const connect = await mongoose.connect(process.env.DATABASEE)
    if(connect) console.log("Connection Success with Atlas")
}


module.exports={DBConnection}