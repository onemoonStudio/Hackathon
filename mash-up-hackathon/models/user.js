var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username : {type:String} ,
  times:[{
    date:{type:String},
    count : {type:Number , 'default':0}
  }],
  chosen_categ: { type:Array },
  history:[{
      date : {type:String},
      thumbnail_src:{type:String,required:true},
      title:{type:String,required:true,index:'hashed'},
      speaker:{type:String,required:true},
      time_duration:{type:Number,'default':0},
      url:{type:String,required:true},
      rated_1:{type:String},
      rated_2:{type:String}
  }]
})


var userInfo = mongoose.model( "userInf" , userSchema);

module.exports = userInfo;
