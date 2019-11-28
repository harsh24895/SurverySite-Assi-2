var mongoose = require('mongoose');

var SurveySchema = new mongoose.Schema(
    {
        title: String,
        description: String,
    }
    // },
    // votes{
    //     type: String,
    //     require: true
    // }

);

module.exports = mongoose.model('Survey', SurveySchema);