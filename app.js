
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , sqlite3 = require('sqlite3').verbose()
  , testDB = new sqlite3.Database('tester.db')
  , db = new sqlite3.Database('real_stuff.db');
var app = module.exports = express.createServer();

//////
//
//
//
testDB.serialize(function() {
  
  testDB.run("CREATE TABLE ADDRESS (lat NUMERIC, lon NUMERIC, line varchar(255))");



  var stmt = testDB.prepare("INSERT INTO ADDRESS VALUES (?, ?, ?)");
  for (var i = 0; i < 10; i++) {
      stmt.run([43.64, -79.39, 'Toronto something']);
  }
  stmt.finalize();

  testDB.each("SELECT rowid AS id, lat, lon, line FROM ADDRESS", function(err, row) {
    if (err){
      console.log(err);
    }else{
      console.log(row.id + ": " + row.line + " lat:" + row.lat + " lon " + row.lon);
    }
  });
});

db.close();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/addresses', function(req, res){
  var mockup = [];
  testDB.each("SELECT rowid AS id, lat, lon, line FROM ADDRESS", function(err, row) {
    if (err){
      console.log(err);
    }else{
      console.log(row.id + ": " + row.address_line + " lat:" + row.lat + " lon " + row.lon);
    }
    mockup.push(row);
  },
  function(){
    res.send(mockup);
  });
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
