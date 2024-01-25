const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");
const upload = multer();
const app = express();

app.get('/', function(req, res){
    res.render('page', { msg: "Random Paragraph" });
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('views'));

const mdb = require("./find_store.js");

app.post('/', function(req, res){
    var long_url = req.body.long;
    var msg = mdb.find_or_store(long_url).then(function(value) {
        res.render("page", { msg: (req.get('host') + req.originalUrl + value) });
    });
});

app.listen(8080);
