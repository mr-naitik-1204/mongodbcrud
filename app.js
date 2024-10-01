const express = require('express');
const app = express()

const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}))

const MongoClient=require('mongodb').MongoClient
const url="mongodb://localhost:27017"
const client=new MongoClient(url)

const db = client.db("naitikkherala")
const collection =db.collection("register")

client.connect(url)

.then((res)=>{
        console.log("conect");
        
})
.catch((eror)=>{
    console.log(eror);
    
})

app.set('view engine','ejs')

app.get('/',async(req,res)=>{
    const data =await collection.find().toArray()
    console.log(data);

    res.render('mogo',{data})
    
})

app.post('/createdata',async(req,res)=>{
    console.log(req.body);
    await collection.insertOne(req.body)

    res.redirect('/')
    
})

app.listen(8090)