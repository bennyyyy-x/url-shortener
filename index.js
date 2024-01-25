const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;

// var mongoose = require('mongoose');
// mongoose.connect("mongodb+srv://bennyxu:T3eL8KOMydkKc6Ya@cluster0.h4t5cmh.mongodb.net/?retryWrites=true&w=majority");

// var url_schema = mongoose.Schema({
//     long_url: String,
//     short_url: String
// });
// var urls = mongoose.model("url", url_schema);

app.use(express.static(path.join(__dirname)))

app.get('/', function(req, res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "page.html"));
});

// for html script
function get_long_url() {
    var long_url = document.getElementById("long_url").value;
    console.log("long_url is " + long_url);
    document.write(long_url);
}

app.listen(port, () => {
    console.log("Listening on port " + port);
});
