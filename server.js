var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');
app.use(cors());
var sentiment = require('sentiment');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));

var additional;
var exists = fs.existsSync('additional.json');
if (exists) {
  console.log('loading additional words');
  var txt = fs.readFileSync('additional.json', 'utf8');
  additional = JSON.parse(txt);
} else {
  console.log('No additional words');
  additional = {};
}

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.get('/add/:word/:score', addWord);

function addWord(req, res) {
  var word = req.params.word;
  var score = Number(req.params.score);

  additional[word] = score;

  var reply = {
    status: 'success',
    word: word,
    score: score
  }
  console.log('adding: ' + JSON.stringify(reply));

  var json = JSON.stringify(additional, null, 2);
  fs.writeFile('additional.json', json, 'utf8', finished);
  function finished(err) {
    console.log('Finished writing additional.json');
    res.send(reply);
  }
}

app.post('/analyze', analyze);

function analyze(req, res) {
  var text = req.body.text;
  var reply = sentiment(text, additional);
  res.send(reply);
}
