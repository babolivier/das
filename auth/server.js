var MacaroonsBuilder	= require('macaroons.js').MacaroonsBuilder;
var MacaroonsVerifier	= require('macaroons.js').MacaroonsVerifier;
var express		= require('express');
var app			= express();
var bodyParser		= require('body-parser');

var location = "https://ent.brendanabolivier.com";
var secretKey = "pocsecret";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/form.html');
});

app.post('/', function(req, res, next) {
	var identifier = req.body.first+';'+req.body.last;

	var m = new MacaroonsBuilder(location, secretKey, identifier)
		.add_first_party_caveat("status = student")
		.getMacaroon();

	res.cookie('das-macaroon', m.serialize());

	res.send('Logged in as ' + req.body.first + ' ' + req.body.last + ' (student)');
});

app.get('/teacher', function(req, res, next) {
	res.sendFile(__dirname + '/form.html');
});

app.post('/teacher', function(req, res, next) {
	var identifier = req.body.first+';'+req.body.last;

	var m = new MacaroonsBuilder(location, secretKey, identifier)
		.add_first_party_caveat("status = teacher")
		.getMacaroon();

	res.cookie('das-macaroon', m.serialize());

	res.send('Logged in as ' + req.body.first + ' ' + req.body.last + ' (teacher)');
});

app.listen(1337, function() {
	console.log('Server started');
});

