const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();

const mdb = require('./find_store.js');
const translate = require('./translate.js');
const redirect = require('./redirect.js');

app.get('/', function(req, res) {
    res.render('page', { msg: 'Random Paragraph' });
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('views'));

app.post('/', function(req, res) {
    var long_url = req.body.long;

    mdb.find_or_store(long_url).then(
        function(value) {
            res.render('page', { msg: (req.get('host') + req.originalUrl + value) });
        }
    )
});

app.get('/:id', function(req, res) {
    var url = req.params.id;

    var db_id = translate.url_to_hex(url);

    redirect.get_url(db_id).then(
        function(value) {
            if (value == '!') {
                res.status(404).json('Not Found');
            } else {
                if (!/^https?:\/\//i.test(value)) {
                    value = 'http://' + value;
                }
                res.redirect(value);
            }
        }
    )
})

app.listen(8080);
