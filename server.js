const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

//app.listen(3000, function () {
//    console.log('listening on 3000')
//})


//app.get('/', (req, res) => {
//    res.sendFile('/home/praaveen/express/share' + '/index.html')
//})


var db

MongoClient.connect('mongodb://name:password@ds239968.mlab.com:39968/share', (err, client) => {
    if (err) return console.log(err)
    db = client.db('share')
    app.listen(3000, function () {
        console.log('listening on 3000')
    })
})


app.get('/',(req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
    if(err) return console.log(err)
    res.render('index.ejs',{quotes: result})
    })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
res.redirect('/')

})
})


app.put('/quotes', (req, res) => {
    db.collection('quotes').
    findOneAndUpdate({name: 'test3'}, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    } ,{
              sort: {_id:-1},
              upsert: true
          },
          (err, result) => {
              if (err) return res.send(err)
              res.send(result)
           }


    )
})

app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'})
})
})