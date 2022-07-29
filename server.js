const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {  //connect to MongoDB database
    useNewUrlParser: true, useUnifiedTopology: true
});

app.use('/public', express.static('public')); //instead of app.use(express.static('public'));

app.set('view engine', 'ejs'); //use ejs
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls }); //get index.ejs on the screen
});

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
});

app.listen(process.env.PORT || 5000); //communicate thru port 5000