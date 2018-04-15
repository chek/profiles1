var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var randomProfile = require('random-profile-generator');
  let i = 0;
  const profiles = [];
  for (i = 0; i < 5; i++) { 
      const profile = randomProfile.profile();
      profiles.push(profile)
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(profiles));
  //res.send(profiles.length);
});

module.exports = router;
