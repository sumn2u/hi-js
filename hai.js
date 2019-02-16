'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var exphbs  = require('express-handlebars');
var open = require('open');
// var favicon = require('serve-favicon');
console.group('🙏 Namaste! \nWelcome to hai.js.');

var server = express();
var port = process.env.PORT || 4000;
var config = require('./src/config.js').config;
console.log(config, "fghjkl")
var rootFolder = config.rootFolder;

/* server configurations */
server.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout:'main',
  layoutsDir:rootFolder + '/common/templates/layouts/',
  partialsDir: rootFolder + '/common/templates/partials'
}));         // handlebars as default engine
server.set('views', `${rootFolder}/server/templates`);
server.set('view engine', '.hbs');
server.use(bodyParser.urlencoded({ extended: true }));    // to support URL-encoded bodies
server.use(bodyParser.json());                            // to support JSON-encoded bodies
// server.use(express.static(__dirname + '../assests'));
console.log(__dirname + '../assests')
server.use('/assests', express.static(__dirname + '/assests'))

server.use('/', express.static(__dirname + '/build'))
// server.use(favicon(__dirname + '/humanassitai.ico'));
/* routes */
// server.use('/', require('./routes/meetups.js'));
server.use('/companies', require('./src/routes/companies.js'));
server.use('/meetups', require('./src/routes/meetups.js'));
server.use('/people', require('./src/routes/people.js'));
server.use('/publish', require('./src/routes/publish.js'));
server.use('/upload', require('./src/routes/upload.js'));

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
