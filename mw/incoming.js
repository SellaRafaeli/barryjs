global.verifyFields = function(req, res, fields) {
  let data   = {};
  let dataOK = true;
  fields.forEach(f=>{
    data[f] = req.body[f] || req.query[f];
    if (!data[f]) {
      dataOK = false
      res.status(400).send({error: `Missing field: ${f}. Expected fields are: ${fields.join(', ')}.`})
    }
  });
  return (dataOK) ? data : null;
}

global.requireUser = function(req,res){
  if (!req.cu) {
    res.status(401).send({error: "Invalid token"})
  }
  return !!req.cu;
}