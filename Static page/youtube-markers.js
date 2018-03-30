var buttonBox = document.querySelector('#the-button-box');
var results = document.querySelector('#result-box');
var player;
var userEvents = [];
var currentVideoId = 'z5rRZdiu1UE'
var sendButton = document.querySelector('#sendToServer');
var jsonButton = document.querySelector('#jsonButton');
var nameField = document.querySelector('#name');
var passwordField = document.querySelector('#password');
var videoLinkButtonBox = document.querySelector('#video-button-box');

function onYouTubeIframeAPIReady() {
  player = new YT.Player('playercontainer', {
      videoId: currentVideoId,
      width: '383',
      height: '243',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
      },
      playerVars: {
        'controls': 1,
        'fs': 0,
        'rel': 0,
        'showinfo': 0,
        'playsinline': 1
      }
  });
}

videoLinkButtonBox.addEventListener('click', function(e){
  if (e.target.matches (".video-link-button")) {
  }
  console.log("just clicked " + e.target.id);
  currentVideoId = e.target.id;
  console.log("just changed current video to " + currentVideoId);
  player.loadVideoById({
    'videoId': e.target.id,
  })
  if (e.target.matches("#submitVideo")) {
    currentVideoId = document.querySelector('#userVideoId').value;
    player.loadVideoById({
      'videoId': currentVideoId
    })
  }
})

buttonBox.addEventListener('click', function(e){
  console.log("just clicked " + e.target.id);
    var d = new Date();
    var theClockTime = d.getTime();
    var videoTime = 1000 * player.getCurrentTime();
    var theOffset = videoTime-theClockTime;
    console.log(theOffset);
    console.log(theClockTime);
    var newText = ("logged " + e.target.id + " event at " + player.getCurrentTime());
    var newElement = document.createElement('p');
    newElement.innerHTML = newText;
    results.prepend(newElement);
    var pw;
    if (!passwordField.value) {
      pw = "none"
    }
    else {
      pw = passwordField.value
    }
    userEvents.push({
      user: nameField.value,
      note: "",
      videoId: currentVideoId,
      videoUrl: player.getVideoUrl(),
      videoTitle: "titleHere",
      eventType: e.target.id,
      clockTs: theClockTime,
      videoTs: videoTime
    })
    switch (e.target.id) {
    case "likeButton":
    case "inButton":
    case "outButton":
    case "logButton":
      console.log("really pushed the" + e.target.id);
      break;
    case "playButton":
      console.log("really pushed the" + e.target.id + ", which means we need to play");
      if (!nameField.value || !passwordField.value) {
          var newText = ("Don't forget to type a name and password.");
          var newElement = document.createElement('p');
          newElement.innerHTML = newText;
          results.appendChild(newElement);
        }
      else {
        player.playVideo();
      }
      break;
    case "pauseButton":
      console.log("really pushed the" + e.target.id + ", which means we need to pause");
      player.pauseVideo();
      break;
    default:
      console.log("something weird has happened--none of the six buttons fired");
    }
})

function onPlayerReady(event) {
  console.log("player ready");
}

function onPlayerStateChange(event){
  console.log(event);
}

sendButton.addEventListener("click", function(){
  sendData(userEvents);
});

jsonButton.addEventListener("click", function(){
  results.innerHTML = "<pre class='no-background'>" + (JSON.stringify(userEvents, null, 4)) + "</pre>";
  // workaround to copy json to clipboard.  Remove??
  var tempText = document.createElement("textarea");
  document.body.appendChild(tempText);
  tempText.value = (JSON.stringify(userEvents, null, 4));
  tempText.select();
  document.execCommand("copy");
  document.body.removeChild(tempText);
});

function sendData(data) {
  var dataObject = {name: nameField.value, password: passwordField.value, events: data};
  var XHR = new XMLHttpRequest();
  XHR.addEventListener('load', function(event) {
    console.log("xhr loaded ok");
    location.reload();
  });
  XHR.addEventListener('error', function(event) {
    console.log("xhr failed on load");;
  });
  XHR.open('POST', '/youtube-data', true);
  XHR.setRequestHeader('Content-type','application/json; charset=utf-8');
  XHR.send(JSON.stringify(dataObject));
  // location.reload();
}

function stopVideo() {
  player.stopVideo();
}
