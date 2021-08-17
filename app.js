const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

const app= express()
app.use(express.json())
app.use(cors())
const dbConfig = require('./config/database.config.js');


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


require('./routes/bank.routes.js')(app);

PORT=process.env.PORT || 4000

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

app.listen(PORT,()=>{
    console.log('Server started');
})