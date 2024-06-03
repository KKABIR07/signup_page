const express =require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
// app.use(express.json());


mongoose.connect('mongodb://localhost:27017/Database');
var db=mongoose.connection;
db.on('error',()=>console.log("Error in connection to database"));
db.once('open',()=>console.log("connected to Database"));

app.get("/",(req,res)=>{
    return res.redirect('index.html');
})


app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var age=req.body.age;
    var email=req.body.email;
    var phonno=req.body.phonno;
    var gender=req.body.gender;
    var password=req.body.password;

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phonno":phonno,
        "gender":gender,
        "password":password
    }
    db.collection('student').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("inserted")
    })
    return res.redirect('signup_success.html');
})



const port=3000;

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});
