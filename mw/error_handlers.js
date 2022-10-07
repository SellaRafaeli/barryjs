//error handling: 404, 500
app.use(function(req, res, next) {
  res.status(404).send({error: "No such action."});
});

app.use(function (err, req, res, next) {
  res.status(500).send({err: err.stack})
})
