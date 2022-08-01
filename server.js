const express = require('express'); //importing express module into express constant
const app = express();  //making constant app stand for express() function. express() is top level function in express module, bringing in methods etc. from it.
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');  //ShortUrl can now use the methods and properties in shortUrl model (including shortID)


mongoose.connect('mongodb://localhost/urlShortener', {  //connect to MongoDB database
    useNewUrlParser: true, useUnifiedTopology: true //avoid deprecation errors (mongodb version)
});

app.use('/public', express.static('public')); //basically allowing to use static files from the public folder

app.set('view engine', 'ejs'); //setting the view engine extension of our app to ejs
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls }); //get index.ejs on the screen. when getting '/', respond by rendering index.
});

app.post('/shortUrls', async (req, res) => {    //when at /shortUrls, use shortId module to create a short URL and send to DB.
   await ShortUrl.create({ full: req.body.fullUrl })    //creaate short url
   res.redirect('/')
});

app.get('/:shortUrl', async (req, res) => { //whenever there is anything after the first / (in this case we created a var called shortUrl)
   const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl }) //find a thing in our DB that matches shortUrl (the string after first slash)
   if (shortUrl == null) return res.sendStatus(404);    //if it doesn't exist, 404 error

   shortUrl.clicks++;   //add one click to the shortUrl const we just created
   shortUrl.save()  //save the shortUrl in our DB

   res.redirect(shortUrl.full); //redirect to the full Url when clicked
})

app.listen(process.env.PORT || 5000); //communicate thru port 5000