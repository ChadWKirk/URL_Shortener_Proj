const mongoose = require('mongoose');
const shortId = require('shortid');     //module to make short URL

const shortUrlSchema = new mongoose.Schema({        //create new schema (database layout)
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);    //exports new schema as ShortURL to be referenced