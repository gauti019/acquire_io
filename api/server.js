const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const cors       = require('cors');
const mongoose   = require('mongoose');
const session    = require('express-session');
let cookieParser = require('cookie-parser');
const config     = require('./config/DB')
let passport     = require('passport');
require('./models/Transaction');
require('./models/Post');
const errorHandler = require('errorhandler');
const userRoute    = require('./routes/api/users');
const port         = process.env.PORT || 4000;

mongoose.Promise = global.Promise;

const app = express();

app.use(cors() );
app.use(require('morgan')('dev'));
app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );
app.use( cookieParser());
app.use( session({
  secret: 'eminem',
  resave: false,
  saveUninitialized: false
}));

app.get('/', function(req, res){
  res.json({'j': 'j1'});
})

mongoose.connect( config.DB_url,
  {    uri_decode_auth: true  }, function(err, db) {
    if(err){
    }
    else {
      console.log("Connected to the DB")
    }
  }
);

mongoose.set('debug', true);

require('./config/passport')(passport);
app.use( require('./routes') )

app.use( passport.initialize() );
app.use( passport.session() );

app.use('/',userRoute );

const server = app.listen( port, function(){
                  console.log('Listening on Port '+port);
               });
