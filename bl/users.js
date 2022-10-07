const exp = require('express');
const bcrypt = require('bcrypt');
const r = exp.Router();

app.all('/users/deleteAll',(req,res)=>{ 
  $users.deleteMany().then(z=>{
    res.send('ok')
  })
})

app.all('/register',(req,res)=>{
  let fields = ['username', 'password'];
  if (!(data = verifyFields(req, res, fields))) return;

  let username = data.username;

  $users.findOne({username: username}).then(d=>{
    if (d) { 
      res.status(401).send({error: 'Username already taken'}) 
    } 
    else {
      var userData = {username: username, hashedPass: bcrypt.hashSync(data.password, 10), 
        _id: niceId(), token: niceId(), plaid_tokens: {}};
      $users.insertOne(userData, (err, data)=>{
        if (err) res.send({err: err})
        let user = data.ops[0];
        res.send(user)
      })
    }
  })
})

app.all('/login',(req,res)=>{
  let fields = ['username', 'password'];
  if (!(data = verifyFields(req, res, fields))) return;

  let username = data.username;
  let password = data.password;

  $users.findOne({username}).then(d=>{    
    if (!d) { 
      res.status(401).send({error: 'No such user'}) 
    } else {       
      if (!(bcrypt.compareSync(password, d.hashedPass))) { 
        res.status(401).send({err: 'Wrong password'}) 
      } else {
        $users.update_one({username}, {token: niceId()}).then(user=>{
          res.send(mapUser(user))
        })  
      } 
    }
  })
})

app.all('/update_settings', (req,res)=> {
  if (!requireUser(req,res)) return;

  let allowed_settings = ['first_name','last_name', 'email', 'company_name', 'business_type']
  let data             = pick(req.pr, allowed_settings)
  $users.update_one({token: req.token},data).then(user=>{
    res.send({msg: "User updated.", user: mapUser(user)})
  })
});

app.get('/users/all', function(req, res){    
  $users.find({}).toArray().then(users=>res.send({users: users.map(u=>mapUser(u))}));
});

app.get('/users/me', function(req, res){      
  if (!requireUser(req,res)) return;
  res.send({users: [mapUser(req.cu)]});
});


module.exports = r;
