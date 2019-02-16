'use strict';

var express = require('express'),
  handlebars = require('handlebars'),
  moment = require('moment'),
  path = require('path'),
  fs = require('fs'),
  fsExtra = require('fs-extra'),
  exphbs  = require('express-handlebars'),
  router = express.Router();

var merge = require("merge-jsons");

var db = require('../db.js')();
var config = require('../config.js').config;
var _formatDate = require('../utils.js').formatDate;
var _populate = require('../utils.js').populate;


var buildDir = config.buildDir
var rootFolder = config.rootFolder;

function _publishEp(episodes) {
  episodes && episodes.forEach(function(episode) {
    episode.URL =  "https://hijs.herokuapp.com";

    var hbsTemplate = fs.readFileSync(path.join(__dirname, '../client/templates/views/index.hbs')).toString();
    var template = handlebars.compile(hbsTemplate);
    var htmlTemplate = template(episode);
    // var changeFileExt = file.fileName.replace(/.hbs/g, ".html");
    // make a next index.html file too which ovrides the fingerprinitng
    // fs.writeFileSync(path.join(__dirname, `../../${buildDir}/`+ changeFileExt), htmlTemplate, 'utf8', function(err) {
    //   if (err) throw err;
    // });
    
    fs.writeFileSync(path.join(__dirname, `../../${buildDir}/` + episode.date.replace(/\s+/g, '_') + '.html'), htmlTemplate, 'utf8', function(err) {
      if (err) throw err;
    });
    // make a next index.html file too which ovrides the fingerprinitng
    fs.writeFileSync(path.join(__dirname, `../../${buildDir}/index.html`), htmlTemplate, 'utf8', function(err) {
      if (err) throw err;
    });
    // fs.copyFile('map.html', path.join(__dirname, '../dist/map.html'), (err) => {
    //     if (err) throw err;
    //     console.log('source.txt was copied to destination.txt');
    // });
  });
}

var copyRecursiveSync = function(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
   if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  
  } else {
    fs.linkSync(src, dest);
  }
};

function buldDist(distFolder, episodes, people, companies){
  
  let peopleL = {
    "people" : people,
    "page_title" : "People page | hai.js",
    "URL":'http://localhost:4000'
  }
  let episodesL = {
    "episodes" : episodes,
    "page_title" : "Episode page | hai.js",
    "URL":'http://localhost:4000'
  }
  let companiesL = {
    "companies": companies,
    "page_title" : "Companies page | hai.js",
    "URL":'http://localhost:4000'
  }
  let peopleVSepisodeL = merge.mergeJSON(peopleL,episodesL )
  let finalJSON = merge.mergeJSON(peopleVSepisodeL, companiesL)
  let jsonObj = JSON.stringify(finalJSON)
  fs.writeFile(path.join(__dirname, '../app.json'), jsonObj, 'utf8', function(err) {
    if (err) throw err;
  });
  let filesL = [{fileName:'index.hbs', data: episodesL},
  {fileName:'people.hbs', data: peopleL},
  {fileName:'companies.hbs', data: companiesL}]
  
  
  if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder) 
  }
  var partials = [];
  console.log("📦 Building distribution folder for production 🚀")
  fs.readdir(path.join(rootFolder,'/common/templates/partials'), function (err, files) {
    // "files" is an Array with files names
    if(err){
      console.log(err, "err =>")
    }
    files.forEach(file => {
      var filePartial = fs.readFileSync(path.join(`${rootFolder}/common/templates/partials`, file), 'utf-8'); 
      // partials.push({name:path.parse(file).name,filePartial:filePartial })
      handlebars.registerPartial(path.parse(file).name, filePartial);
    })
    _publishFile(filesL)
  });

 


}
function _publishFile (files) {
  files.forEach(file => {

    var hbsTemplate = fs.readFileSync(path.join(rootFolder, '/client/templates/views/'+file.fileName)).toString();
    
    //console.log(file.data ,'file.data')
    //  var partialHeader = fs.readFileSync(path.join(rootFolder, '/client/templates/partials/header_client.hbs'), 'utf-8'); 
    //  var partialFooter = fs.readFileSync(path.join(rootFolder, '/client/templates/partials/footer_client.hbs'), 'utf-8'); 
    //  handlebars.registerPartial('header', partialHeader);
    //  handlebars.registerPartial('footer', partialFooter);
     var template = handlebars.compile(hbsTemplate);
     var htmlTemplate = template(file.data);
    //exphbs.registerPartial('header', partial);
    // console.log(htmlTemplate,'htmlTemplate ==>')
    var changeFileExt = file.fileName.replace(/.hbs/g, ".html");
    // make a next index.html file too which ovrides the fingerprinitng
    fs.writeFileSync(path.join(__dirname, `../../${buildDir}/`+ changeFileExt), htmlTemplate, 'utf8', function(err) {
      if (err) throw err;
    });
  

    // console.log(htmlTemplate, "file ==>", file.fileName);
  })
  let distFolder = path.join(__dirname, '../../build/')
  console.log("⌛ copying assests folder.")
  copyRecursiveSync(path.join(__dirname, '../../assests/'), `${distFolder}/assests/` );

  console.log("✅  completed building production file.")
}

function _publish(episodes, people, companies) {
   // console.log(episode, 'episode')
    // get all folder ;
    let distFolder = path.join(__dirname, '../../build/')
    console.log(distFolder, "dfgh")
    rmDir(`${distFolder}/assests/`)
      //done
      buldDist(distFolder, episodes, people, companies)
    // }).catch(err => {
    //   console.error(err)
    // })
}


var rmDir = function(dir, rmSelf) {
  var files;
  rmSelf = (rmSelf === undefined) ? true : rmSelf;
  dir = dir + "/";
  try { files = fs.readdirSync(dir); } catch (e) { console.log("!Oops, directory not exist."); return; }
  if (files.length > 0) {
      files.forEach(function(x, i) {
          if (fs.statSync(dir + x).isDirectory()) {
              rmDir(dir + x);
          } else {
              fs.unlinkSync(dir + x);
          }
      });
  }
  if (rmSelf) {
      // check if user want to delete the directory ir just the files in this directory
      fs.rmdirSync(dir);
  }
}

/* Publish all meetups. */
router.get('/', function(req, res) {
  var _people, _companies;

  db.companies.find({}, function(err, docs) {
    _companies = docs;
    db.people.find({}, function(err, docs) {
      _people = docs;
      db.meetups.find({}, function(err, docs) {
        docs.forEach(function(e) {
          var _date = moment(e.date, 'YYYY/MM/DD');

          e.episode = +e.episode < 10 ? "0" + e.episode : e.episode;
          e.year = _date.year();
          e.month = _date.format('MMMM');
          e.day = _date.format('Do');

          _formatDate(e, "startsAt", "startsAtHr", "startsAtMin", "startsAtAMPM");
          _formatDate(e, "endsAt", "endsAtHr", "endsAtMin", "endsAtAMPM");

          e.endsAtHr = e.endsAtHr > 12 ? e.endsAtHr - 12 : e.endsAtHr;

          if (e.session) {
            e.session.forEach(function(s, idx) {
              var _startingAt = moment(s.time, "HH:mm");
              s.time = s.time + _startingAt.format('a');

              s.index = idx + 1;
              _populate(s, "speakers", _people);
            });
          }

          /* populate with values from db */
          _populate(e, "sponsors", _companies);
          _populate(e, "supporters", _companies);
        });
        _publishEp(docs)

        // _publish(docs, _people, _companies);
        res.redirect('/meetups');
      });
    });
  });
});

module.exports = router;
