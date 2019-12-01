var mongoose = require('mongoose');

var SurveySchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        exampleRadios1: ["radio"],
  exampleRadios2: ["radio"],
        exampleRadios3: ["radio"]
    }
  
);

module.exports = mongoose.model('Survey', SurveySchema);