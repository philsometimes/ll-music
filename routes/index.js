var express = require('express');
var router = express.Router();
var SessionInfo = require('../models/cellotapsession.js')


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Codelab Music', cellotap: "/cellotap" });
// });

/* GET cellotap page. */
router.get ('/', function(req, res, next){
  res.render('cellotap', {title: "Cello Tap"});
});

/* POST cellotap form contents.*/
router.post('/cellosend', function(req, res, next){
  res.send('received cellotap session data');
  console.log('received cellotap session data');
  console.log(JSON.stringify(req.body, null, 4));
  var newSessionInfo = new SessionInfo({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
    userEmail: req.body.userEmail,
    userBackground: req.body.userBackground,
    userBlurb: req.body.userBlurb,
    userComment: req.body.userComment,
    userEvents: req.body.userEvents
  });
  console.log(JSON.stringify(newSessionInfo, null, 4));

// router.post('/youtube-data', function(req, res, next){
//   console.log("received post request from " + req.body.name);
//   console.log(JSON.stringify(req.body));
//   var postTs = new Date().getTime();
//   console.log("the postTs is " + postTs);
//   if (req.body.password==process.env.DEV_PASSWORD) {
//     console.log("password match");
//   }
//   req.body.events.forEach(marker => {
//       console.log("creating marker for " + marker.ts);
//       var newMarker = new Marker({
//         userName : req.body.name,
//         note: marker.note,
//         videoId: marker.videoId,
//         videoUrl: marker.videoUrl,
//         videoTitle: marker.videoTitle,
//         clockTs : marker.clockTs,
//         videoTs : marker.videoTs,
//         type : marker.eventType
//       })
//       console.log(JSON.stringify(newMarker));
//       newMarker.save(function(err){
//         if (err) { console.log("there was an error"); return next(err); }
//       })
//   })



  newSessionInfo.save(function(err){
    if (err){
      console.log(err)
    }
    else {
      console.log('saved '+ newSessionInfo.userName + "'s submission to the database");
    }
  })
})

module.exports = router;
