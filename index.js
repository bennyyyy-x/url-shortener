const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();

const mdb = require('./find_store.js');
const translate = require('./translate.js');
const redirect = require('./redirect.js');

app.get('/', function(req, res) {
    res.render('page', { msg: '' });
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('views'));

app.post('/', function(req, res) {
    var long_url = req.body.long;
    if (!/^https?:\/\//i.test(long_url)) {
        long_url = 'http://' + long_url;
    }
    if (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( long_url )) {
        mdb.find_or_store(long_url).then(
            function(value) {
                res.render('page', { msg: (req.get('host') + req.originalUrl + value) });
            }
        )
    } else {
        res.render('page', { msg: 'Invalid URL Entered' });
    }
});

app.use('/:id', function(req, res) {
    var url = req.params.id;

    var db_id = translate.url_to_hex(url);

    redirect.get_url(db_id).then(
        function(value) {
            if (value == '!') {
                res.status(404).json('Not Found');
            } else {
                res.redirect(value);
            }
        }
    )
})

app.listen(8080);
