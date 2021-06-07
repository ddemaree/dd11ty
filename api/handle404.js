module.exports = function(req, res) {
  res.json({status: "It's working!", params: req.params})
}