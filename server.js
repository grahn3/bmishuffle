require('dotenv').load();
var express     = require('express')
  , bodyParser  = require('body-parser')
  , morgan      = require('morgan')
  , kleiDust    = require('klei-dust')
  , http        = require('http')
  , Routes      = require('./routes')
  , _           = require('underscore')
  , app         = express();

// Render configuration
require('dustjs-helpers');
kleiDust.setOptions({extension: 'html'});
app.set('views', __dirname + '/views');
app.engine('html', kleiDust.dust);
app.set('view engine', 'html');
app.set('view options', {layout: false});
app.use(express.static(__dirname + '/public', {redirect: false}));

// Server configuation
app.set('port', process.env.PORT || 3000);
app.use( morgan( "dev", {skip: function(req, res){ return res.statusCode === 304; }}));

// Create application/json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create server
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port') + ' in ' +app.get('env')+ ' mode');
});

// Import routes
var routes = new Routes(app);
