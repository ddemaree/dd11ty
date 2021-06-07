module.exports = function(req, res) {
  console.log(res.params)
  res.json({status: "It's working!", params: req.params})
}