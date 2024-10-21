require("dotenv").config();
const express = require("express");
require("./config/database");
const productRouter = require('./router/productRouter');
const PORT = process.env.PORT || 2015;

const app = express();
app.use(express.json());

app.use('/api/v1', productRouter);


app.listen(PORT,()=>{
    console.log(`server is listening to PORT:${PORT}.`)
})