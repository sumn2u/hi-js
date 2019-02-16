'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var exphbs  = require('express-handlebars');
var open = require('open');
var favicon = require('serve-favicon');
console.group('🙏 Namaste! \nWelcome to hai.js.');

var server = express();
var port = process.env.PORT || 3000;

/* server configurations */
server.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout:'main',
  layoutsDir:__dirname + '/templates/layouts/',
  partialsDir: __dirname + '/templates/partials'
}));         // handlebars as default engine
server.set('views', 'templates');
server.set('view engine', '.hbs');
server.use(bodyParser.urlencoded({ extended: true }));    // to support URL-encoded bodies
server.use(bodyParser.json());                            // to support JSON-encoded bodies
server.use(express.static(__dirname + '/assests'));
server.use(favicon(__dirname + '/humanassitai.ico'));
/* routes */
server.use('/', require('./routes/meetups.js'));
server.use('/companies', require('./routes/companies.js'));
server.use('/meetups', require('./routes/meetups.js'));
server.use('/people', require('./routes/people.js'));
server.use('/publish', require('./routes/publish.js'));
server.use('/upload', require('./routes/upload.js'));

server.listen(port, function() {

  console.log(`Server is up and running on http://localhost:${port}`);

  console.log('📂 Opening Admin.');
  console.groupEnd("")
  open('http://localhost:' + port + '/meetups', function(err) {
    if (err) {
      console.log('Unable to open browser, try http://localhost:3000 instead.', err);
    }
  });
});