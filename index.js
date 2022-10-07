global.app       = require('express')();
const helpers    = require('./globals')
//global.mongo     = require('./db/mongo_setup.js');
global._         = require('lodash');
const bodyParser = require('body-parser');

app.get('/',(req,res)=> res.send({msg: 'Welcome to BarryJS', version: '0.0.1'}))

// mw
app.use(bodyParser.urlencoded({extended: false})) 
app.use(bodyParser.json());

app.use(function(req, res, next){
  req.pr = Object.assign(req.body, req.query)
  var token = req.header('token') || req.query['token'] || req.body['token'];
  if (token) {
    req.token = token;
    $users.get({token}).then((user)=> {
      if (user) (req.cu = user);
      next();
    })
  } else {next(); }
});

app.get('/ping', (req, res)=>{
  res.send({pong: 'Hi from BarryJS', cu: req.cu, foo: req.pr.foo, msg: 'pong-barry-js'});
});

//mw in
const mw_incoming    = require('./mw/incoming.js');

//bl
//['routes','users','transactions','categories','plaid'].forEach(f=>{ app.use('/api/', require(`./bl/${f}.js`)); })  

//mw out
const error_handlers = require('./mw/error_handlers.js');


console.log('gonna listen')
app.listen(process.env.PORT || 3000)
console.log('Done')

