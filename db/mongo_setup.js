global.mongo     = require('mongodb').MongoClient;

const dbURL      = process.env.MONGODB_URI || 'mongodb://localhost:27017/barryjs';

mongo.connect(dbURL, function(err, dbConn) { 
  log('connecting db')
  db     = dbConn; 
  $foo   = db.collection('foo');  
  $users = db.collection('users');  
  $txs   = db.collection('txs');  

  var coll = $users.__proto__;
  coll.get        = function(crit = {}){ return this.findOne(crit) }
  coll.get_all    = function(crit = {}){ return this.find(crit).toArray() }
  coll.upsert_one = function(crit,fields) { return this.findOneAndUpdate(crit,{'$set': fields},{upsert:true, returnOriginal:false}).then(z=>z.value)}

  coll.update_one = function(crit,fields) { return this.findOneAndUpdate(crit,{'$set': fields},{upsert:false, returnOriginal:false}).then(z=>z.value)}

  coll.edit_one = function(crit,fields) { return this.findOneAndUpdate(crit,{'$set': fields},{upsert:true, returnOriginal:false}).then(z=>z.value)}

  coll.add        = function(data) { data['_id']=guid(); return this.insertOne(data).t(z=>z.ops[0])}
  coll.printAll        = function(crit) { this.get_all(crit).then(console.log) }
});
