var mongoose = require('mongoose');

var SurveySchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        
    }
);

module.exports = mongoose.model('Survey', SurveySchema);