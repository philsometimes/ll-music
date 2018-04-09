// var buttonBox = document.querySelector('#function');
// var results = document.querySelector('#result-box');
var userEvents = [];

/* temporarily assign currentVideo variables to the default movie */
var currentVideoId = '260963404'
var currentVideoTitle = 'Cello Tap'
var currentVideoUrl = 'https://vimeo.com/260963404'

/* get document forms and buttons */
var speedToggleButton = document.querySelector('#controlsspeedtoggle');
var playPauseButton = document.querySelector('#controlsplaypause');
var volUpButton = document.querySelector('#controlsvolup');
var volDownButton = document.querySelector('#controlsvoldown');
var trackingToggle = document.querySelector('input[name=clickThruToggle]');
var surveyButton = document.querySelector('#surveybutton');
var submitButton = document.querySelector('#submitbutton');
var nameField = document.querySelector('#nameform');
var passwordField = document.querySelector('#pwform');
var emailField = document.querySelector('#emailform');
var backgroundSurvey = document.querySelectorAll('#surveybgs input');
var blurbField = document.querySelector('#otherform');
var commentField = document.querySelector('#commentform');
// var videoLinkButtonBox = document.querySelector('#video-button-box');
var playercontainer = document.querySelector('#playercontainer');
var vimeoElement = document.createElement('iframe');
var videoOverlay = document.querySelector('#main-overlay');
var secretStuff = document.querySelector('.peekaboo');
var wholeSite = document.querySelector('.site');

/* default state on first load */
trackingToggle.checked=false;
secretStuff.style.display="none";
videoOverlay.style.pointerEvents="none";

/* get responses from checkboxes */
function getArtCheckboxes(){
  var artList=[];
  for (var i = 0; backgroundSurvey[i]; i++) {
    if(backgroundSurvey[i].checked){
      artList[i]=backgroundSurvey[i].value;
    }
    else {
      artList[i]="";
    }
  }
  return artList;
}




/* options passed to Vimeo API */
var options = {
        id: currentVideoId,
        loop: true
  };

/* make vimeo player */
var player = new Vimeo.Player('playercontainer', options);
  player.setVolume(0);
  player.on('play', function() {
    // console.log('played the video!');
    player.getVideoTitle().then(function(title) {
        // console.log('title:', title);
        currentVideoTitle = title;
      });

    player.getVideoUrl().then(function(url) {
        // console.log('url:', url);
        currentVideoUrl = url;
        // url = the vimeo.com url for the video
      })
        .catch(function(error) {
          switch (error.name) {
              case 'PrivacyError':
                  // the url isn’t available because of the video’s privacy setting
                  break;

              default:
                  // some other error occurred
                  break;
          }
      });
});



/*putting this aside until we get multiple videos working*/
// videoLinkButtonBox.addEventListener('click', function(e){
//   if (e.target.matches (".video-link-button")) {
//     console.log("just clicked " + e.target.id);
//     currentVideoId = e.target.id;
//     console.log("just changed current video to " + currentVideoId);
//     player.loadVideo(e.target.id)
//       .then(function(id){
//         console.log("hope we just played video with id " + id);
//         player.getVideoTitle().then(function(title) {
//             console.log('title:', title);
//             currentVideoTitle = title;
//           });
//         player.getVideoUrl().then(function(url) {
//             console.log('url:', url);
//             currentVideoUrl = url;
//             // url = the vimeo.com url for the video
//
//           })
//             .catch(function(error) {
//               switch (error.name) {
//                   case 'PrivacyError':
//                       // the url isn’t available because of the video’s privacy setting
//                       break;
//
//                   default:
//                       // some other error occurred
//                       break;
//               }
//           });
//
//         })
//       .catch(function(err){
//         console.log(err);
//         })
//
//   }
//   else if (e.target.matches("#submitVideo")) {
//     currentVideoId = document.querySelector('#userVideoId').value;
//     player.loadVideo(currentVideoId)
//       .then()
//       .catch();
//   }
//   else {
//     console.log("problem");
//   }
// })



/* cursor tracking over video */
/* seems to return things scaled by 1.1 compared to actual*/
videoOverlay.addEventListener('click', function(e){
    /* e is event object */
    /*get xy client position as percentage of overlay div at that point in time!!!!*/
  /*responsive stuff, chuck if this breaks */
  var vidWindowWidth = e.currentTarget.offsetWidth;
  var vidWindowHeight = e.currentTarget.offsetHeight;
  console.log("client width is: "+vidWindowWidth);
  console.log("client height is: "+vidWindowHeight);
  /*end responsive try*/
  var x = e.clientX - e.currentTarget.offsetLeft;
  var y = e.clientY - e.currentTarget.offsetTop;
  console.log("x is " + x);
  console.log("y is " + y);
  var relativeX = x/vidWindowWidth;
  var relativeY = y/vidWindowHeight;
  console.log("relative x is " + relativeX);
  console.log("relative y is " + relativeY);
  var d = new Date();
  var theClockTime = d.getTime();
  player.getCurrentTime().then(function(seconds) {
    var videoTimeS=seconds;
    console.log("seconds: "+videoTimeS);
    var videoTimeMs=videoTimeS*1000;
    player.addCuePoint(videoTimeS)
      .then(function(id) {
        // cue point was added successfully
        // console.log("added cue point, pushing user events");
        userEvents.push({
              userName: nameField.value,
              note: "",
              videoId: currentVideoId,
              videoUrl: currentVideoUrl,
              videoTitle: currentVideoTitle,
              eventType: "clickCapture",
              clockTs: theClockTime,
              videoTs: videoTimeMs,
              xPosition: x,
              yPosition: y,
              relativeXPosition: relativeX,
              relativeYPosition: relativeY
            })
      }).catch(function(error) {
          switch (error.name) {
              case 'UnsupportedError':
                  // cue points are not supported with the current player or browser
                  break;

              case 'RangeError':
                  // the time was less than 0 or greater than the video’s duration
                  break;

              default:
                  // some other error occurred
                  break;
          }
    });
  });

});


    /*replacing*/
  // player.getCurrentTime()
  //   .then(function(seconds){
  //     var videoTime = 1000 * seconds;
  //     // var theOffset = theClockTime-videoTime;
  //     // var newText = ("logged " + e.target.id + " event at " + videoTime + ". x = " + trueX + " and y = " + trueY );
  //     // var newElement = document.createElement('p');
  //     // newElement.innerHTML = newText;
  //     // results.prepend(newElement);
  //     userEvents.push({
  //       userName: nameField.value,
  //       note: "",
  //       videoId: currentVideoId,
  //       videoUrl: currentVideoUrl,
  //       videoTitle: currentVideoTitle,
  //       eventType: e.target.id,
  //       clockTs: theClockTime,
  //       videoTs: videoTime,
  //       xPosition: x,
  //       yPosition: y,
  //       relativeXPosition: relativeX,
  //       relativeYPosition: relativeY
  //     })
  //     // console.log(userEvents);
  //   })
//   .catch(function(err){
//     console.log(err);
//     });
// });

playPauseButton.addEventListener('click', function(){
  player.getPaused().then(function(paused) {
      // paused = whether or not the player is paused
      // console.log(paused);
      switch (paused) {
        case true:
          player.play();
          console.log("Playing video...");
          break;
        case false:
          player.pause();
          console.log("Pausing video...");
          break;
        default:
      }
  }).catch(function(error) {
      // an error occurred
  });
})

volUpButton.addEventListener('click', function(){
  player.getVolume().then(function(volume) {
      // volume = the volume level of the player
      switch (true) {
        case (volume<1):
          newVol=volume+0.1;
          player.setVolume(newVol);
          console.log("Volume increased to "+Math.round(newVol*10));
          break;
        case (volume>=1):
          console.log("Volume at max");
          break;
        default:
      }
  }).catch(function(error) {
      // an error occurred
  });
})

volDownButton.addEventListener('click', function(){
  player.getVolume().then(function(volume) {
      // volume = the volume level of the player
      switch (true) {
        case (volume>0):
          newVol=volume-0.1;
          player.setVolume(newVol);
          console.log("Volume decreased to "+Math.round(newVol*10));
          break;
        case (volume<=1):
          console.log("Video muted");
          break;
        default:
      }
  }).catch(function(error) {
      // an error occurred
  });
})

surveyButton.addEventListener('click', function(){
  if (nameField.value=== "" || passwordField.value=== ""  || emailField.value=== "" ) {
    alert("Please fill in all fields");
  } else {
    secretStuff.style.display="grid";
  }
})

// buttonBox.addEventListener('click', function(e){
//   console.log("just clicked " + e.target.id);
//     var d = new Date();
//     var theClockTime = d.getTime();
//     player.getCurrentTime()
//       .then(function(seconds){
//         var videoTime = 1000 * seconds;
//         var theOffset = videoTime-theClockTime;
//         console.log("got " + seconds + " for seconds (which we turned into " + videoTime + " for the videoTs), and " + theClockTime + " for clockTs, and thus the offset is " + theOffset);
//         console.log(theOffset);
//         console.log(theClockTime);
//         var newText = ("logged " + e.target.id + " event at " + videoTime);
//         var newElement = document.createElement('p');
//         newElement.innerHTML = newText;
//         // results.prepend(newElement);
//         userEvents.push({
//           userName: nameField.value,
//           note: "",
//           videoId: currentVideoId,
//           videoUrl: currentVideoUrl,
//           videoTitle: currentVideoTitle,
//           eventType: e.target.id,
//           clockTs: theClockTime,
//           videoTs: videoTime
//         })
//         switch (e.target.id) {
//         case "likeButton":
//         case "inButton":
//         case "outButton":
//         case "logButton":
//           console.log("really pushed the" + e.target.id);
//           break;
//         case "overlayOn":
//           videoOverlay.style.pointerEvents = "none";
//           break;
//         case "overlayOff":
//           videoOverlay.style.pointerEvents = "auto";
//           break;
//         case "playButton":
//           console.log("really pushed the" + e.target.id + ", which means we need to play");
//           if (!nameField.value || !passwordField.value) {
//               var newText = ("Don't forget to type a name and password.");
//               var newElement = document.createElement('p');
//               newElement.innerHTML = newText;
//               // results.appendChild(newElement);
//             }
//           else {
//             player.play();
//             player.play().then(function() {
//               // the video was played
//               console.log("just started video");
//               })
//               .catch(function(error) {
//                 switch (error.name) {
//                   case 'PasswordError':
//                     console.log("password error");
//                     // the video is password-protected and the viewer needs to enter the
//                     // password first
//                     break;
//                   case 'PrivacyError':
//                     console.log("privacy error");
//                     // the video is private
//                     break;
//                   default:
//                     console.log("some other error");
//                     // some other error occurred
//                     break;
//                   }
//               });
//           }
//           break;
//         case "pauseButton":
//           console.log("really pushed the" + e.target.id + ", which means we need to pause");
//           player.pause().then(function() {
//               console.log("just paused, one hopes.");
//               // the video was paused
//               })
//             .catch(function(error) {
//               switch (error.name) {
//                 case 'PasswordError':
//                   // the video is password-protected and the viewer needs to enter the
//                   // password first
//                   break;
//                 case 'PrivacyError':
//                   // the video is private
//                     break;
//                 default:
//                   // some other error occurred
//                   break;
//               }
//             });
//           break;
//         default:
//           console.log("something weird has happened--none of the six buttons fired");
//         }
//         })
//       .catch(function(err){
//         console.log(err);
//         });
// })

function onPlayerReady(event) {
  console.log("player ready");
}

function onPlayerStateChange(event){
  console.log(event);
}

/*-- RECYCLE THIS --*/
// surveyButton.addEventListener("click", function(){
//   sendData(userEvents);
// });

trackingToggle.addEventListener("change", function(){
  if(this.checked) {
    videoOverlay.style.pointerEvents="auto";
  } else {
    videoOverlay.style.pointerEvents="none";
  }
})

submitButton.addEventListener("click", function(){
  // results.innerHTML = "<pre class='no-background'>" + (JSON.stringify(userEvents, null, 4)) + "</pre>";
  // workaround to copy json to clipboard.  Remove??
  // var tempText = document.createElement("textarea");
  // document.body.appendChild(tempText);
  // tempText.value = (JSON.stringify(userEvents, null, 4));
  // tempText.select();
  // document.execCommand("copy");
  // document.body.removeChild(tempText);
  sendData(userEvents);
});

function sendData(data) {
  var dataObject = {userName: nameField.value, userPassword: passwordField.value, userEmail: emailField.value, userBackground: getArtCheckboxes(), userBlurb: blurbField.value, userComment: commentField.value, userEvents: data};
  var XHR = new XMLHttpRequest();
  XHR.addEventListener('load', function(event) {
    console.log("xhr loaded ok");
    // location.reload();
  });
  XHR.addEventListener('error', function(event) {
    console.log("xhr failed on load");;
  });
  XHR.open('POST', '/cellosend', true);
  XHR.setRequestHeader('Content-type','application/json; charset=utf-8');
  XHR.send(JSON.stringify(dataObject));
  console.log(dataObject);

  console.log("sent session data to the db");
  // location.reload();
}

function stopVideo() {
  player.stopVideo();
}

//Touch.clientX will do mobile
