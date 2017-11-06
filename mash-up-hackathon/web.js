var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var router = require('./router/router');

app.use(bodyParser.urlencoded({extended:true}))
  .use(bodyParser.json())
    ;

// database
if(!!(process.env.dbuser)){
    mongoose.connect(
      "mongodb://"+process.env.dbuser+":"+process.env.dbpassword+"@ds149335.mlab.com:49335/idebackdb"
    ,{ useMongoClient: true });
}else{
  mongoose.connect( require('./config').dbstr,{ useMongoClient: true });
}

var db = mongoose.connection;

db.once("open",function(){
  console.log('database is connected');
})

// router
app.use('/',router.main)
.use('/home',router.home)
.use('/test',router.test)
  ;

var port = process.env.PORT || 3000;

app.listen(port,function(){
  console.log('server is running at '+port);
})
