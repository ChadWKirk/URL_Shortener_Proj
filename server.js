const express = require('express');
const app = express();

app.use('/public', express.static('public')); //instead of app.use(express.static('public'));

app.set('view engine', 'ejs'); //use ejs

app.get('/', (req, res) => {
    res.render('index'); //get index.ejs on the screen
});

app.listen(process.env.PORT || 5000); //communicate thru port 5000