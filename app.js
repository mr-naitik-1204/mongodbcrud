const express = require('express');
const app = express()

const bodyparser = require('body-parser');
const { ObjectId } = require('mongodb');
app.use(bodyparser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const db = client.db("naitikkherala")
const collection = db.collection("register")

client.connect(url)

    .then((res) => {
        console.log("conect");

    })
    .catch((eror) => {
        console.log(eror);

    })
var editdata = null;
var id = null;
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const data = await collection.find().toArray();
    res.render('mogo', { data, editdata });

})

app.post('/createdata', async (req, res) => {
    console.log(req.body);
    if (id) {
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
       id = null; 
        editdata = null; 
    } else {
        await collection.insertOne(req.body);
    }
    res.redirect('/')

})

app.get('/deletedata', async (req, res) => {
    id = req.query.delet;
        await collection.deleteOne({ _id: new ObjectId(id) });
       id = null;
        res.redirect('/');
})

app.get('/updetedata', async (req, res) => {
   id = req.query.up;
    editdata = await collection.findOne({ _id: new ObjectId(id) });
    res.redirect('/');
})

app.listen(8090)