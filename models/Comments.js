var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: {
    type:String
  },
  body: {
    type:String
  }
});

var comments = mongoose.model('comments', NoteSchema);
module.exports = comments;