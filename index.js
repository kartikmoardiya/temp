const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./Database/db');
const router = express.Router();
const model = require('./Models/user')
var cors = require("cors");
const PORT = process.env.PORT || 3000;



const user = require('./Routes/users')

app.use(cors());
app.use(express.json());
app.use('/user',user); 


app.get('/',(req,res)=>{
    res.json({msg:"Welcome, Welcome, Bhale Padhara"});
})

app.listen(PORT, ()=>{
    console.log("Listing on port 3000...");
})
