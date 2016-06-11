var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

request("http://www.cnn.com/2016/06/10/politics/mitt-romney-donald-trump-racism/", function (errror, response, html) {
  var $ = cheerio.load(html);
  var result = [];
  $(figure.rollover).each(function(i. element){

      var link = $(element.children().children().src())
  })
  console.log(result);
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('public'));

//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "week-18-mongo-db";
var collections = ["notes"];
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});



// Routes
app.get('/', function(req, res) {
  res.send(index.html);
});

//Save to DB
app.post('/submit', function(req, res) {
  console.log(req.body);
  db.notes.save(req.body, function(err, saved) {
    if (err) {
      console.log(err);
    } else {
      res.send(saved);
    }
  });
});

//Get from DB
app.get('/all', function(req, res) {
  db.notes.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});


//Find One in DB
app.get('/find/:id', function(req, res){

    //when searching by an id, the id needs to be passed in as (mongojs.ObjectId(IDYOUWANTTOFIND))
    console.log(req.params.id);
    db.notes.findOne({
        '_id': mongojs.ObjectId(req.params.id)
    }, function(err, found){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(found);
            res.send(found);
        }
    });
});


//Update One in the DB
app.post('/update/:id', function(req, res) {
    //when searching by an id, the id needs to be passed in as (mongojs.ObjectId(IDYOUWANTTOFIND))

  db.notes.update({
    '_id': mongojs.ObjectId(req.params.id)
  }, {
    $set: {
            'title': req.body.title,
      'note': req.body.note,
            'modified': Date.now()
    }
  }, function(err, edited) {
    if (err) {
      console.log(err);
            res.send(err);
    } else {
      console.log(edited);
            res.send(edited);
    }
  });
});


//Delete One from the DB
app.get('/delete/:id', function(req, res) {
  db.notes.remove({
    "_id": req.params.id
  }, function(err, removed) {
    if (err) {
      console.log(err);
            res.send(err);
    } else {
      console.log(removed);
      res.send(removed);
    }
  });
});


//Clear the DB
app.get('/clearall', function(req, res) {
    db.notes.remove({}, function(err, response){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(response);
            res.send(response);
        }
    });
});



app.listen(3000, function() {
  console.log('App running on port 3000!');
});