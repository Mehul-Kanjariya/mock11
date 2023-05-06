const express = require("express");
const app = express();
require("dotenv").config();
const {connection} = require("./db")
const {userRouter} = require("./routes/user.route");
const {auth} = require("./middleware/auth.middleware");
const {bookRouter} = require("./routes/book.route");
const {adminRouter} = require("./routes/admin.route");

app.use(express.json());
app.use("/user",userRouter);
app.use("/books",bookRouter);
app.use(auth)
app.use("/books",adminRouter);

app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected to mongo")
    }catch(err){
        console.log(err.message)
    }
    console.log(`Server is runnning at port ${process.env.port}`)
})