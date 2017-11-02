var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false,
        required: true
    }
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports= Article;