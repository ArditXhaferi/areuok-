//Animations
$(document).ready(function(){
    const wrapperEl = document.querySelector('.wrapper');
    const numberOfEls = 90;
    const duration = 6000;
    const delay = duration / numberOfEls;
    
    let tl = anime.timeline({
      duration: delay,
      complete: function() { tl.restart(); }
    });
    
    function createEl(i) {
      let el = document.createElement('div');
      const rotate = (360 / numberOfEls) * i;
      const translateY = -50;
      const hue = Math.round(360 / numberOfEls * i);
      el.classList.add('el');
      el.style.backgroundColor = 'hsl(' + hue + ', 40%, 60%)';
      el.style.transform = 'rotate(' + rotate + 'deg) translateY(' + translateY + '%)';
      tl.add({
        begin: function() {
          anime({
            targets: el,
            backgroundColor: ['hsl(' + hue + ', 40%, 60%)', 'hsl(' + hue + ', 60%, 80%)'],
            rotate: [rotate + 'deg', rotate + 10 +'deg'],
            translateY: [translateY + '%', translateY + 10 + '%'],
            scale: [1, 1.25],
            easing: 'easeInOutSine',
            direction: 'alternate',
            duration: duration * .1
          });
        }
      });
      wrapperEl.appendChild(el);
    };
    
    for (let i = 0; i < numberOfEls; i++) createEl(i);
})













document.addEventListener('DOMContentLoaded',function(event){
    // array with texts to type in typewriter
    var dataText = [ "Learn what feelings you've been listening lately..."];
    
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
       document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
       if (typeof dataText[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 20000);
       }
       // check if dataText[i] exists
      if (i < dataText[i].length) {
        // text exists! start typewriter animation
       typeWriter(dataText[i], 0, function(){
         // after callback (and whole text has been animated), start next text
         StartTextAnimation(i + 1);
       });
      }
    }
    // start the text animation
    StartTextAnimation(0);
  });









//var redirect_uri = "https://makeratplay.github.io/SpotifyWebAPI/"; // change this your value
var redirect_uri = "http://127.0.0.1:5500/index.html";
 

var client_id = "6bc594ec59a74f8f9e73aacbd0a2e628"; 
var client_secret = "366e38d096fe47e6836b5f8ebf6d9b05"; // In a real app you should not expose your client_secret to the user

var access_token = null;
var refresh_token = null;
var currentPlaylist = "";
var radioButtons = [];

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";
const TOPTRACKS = "https://api.spotify.com/v1/me/top/tracks";
const key_feelings = {
    "C MAJOR": [
        "Innocently Happy",
        "Completely pure. Simplicity and naivety. The key of children. Free of burden, full of imagination. Powerful resolve. Earnestness. Can feel religious.            "
    ],
    "C MINOR": [
        "Innocently Sad, Love-Sick",
        "Declarations of love and lamenting lost love or unhappy relationships. It is languishing and full of longing, a soul in search of something different."
    ],
    "C# MINOR": [
        "Despair, Wailing, Weeping",
        "A passionate expression of sorrow and deep grief. Full of penance and self-punishment. An intimate conversation with God about recognition of wrongdoing and atonement."
    ],
    "DB MAJOR": [
        "Grief, Depressive",
        "Rapture in sadness. A grimacing key of choking back tears. It is capable of a laugh or smile to pacify those around, but the truth is in despair. Fullness of tone, sonority, and euphony."
    ],
    "D MAJOR": [
        "Triumphant, Victorious War-Cries",
        "Screaming hallelujah's, rejoicing in conquering obstacles. War marches, holiday songs, invitations to join the winning team."
    ],
    "D MINOR": [
        "Serious, Pious, Ruminating",
        "Melancholy, feminine, brooding worries, contemplation of negativity."
    ],
    "D# MINOR": [
        "Deep Distress, Existential Angst",
        "Dealing with anxiety and existential terror, deep distress, dark depression. The dark night of the soul. Fear, hesitation, shuddering, goose bumps. The language of ghosts."
    ],
    "EB MAJOR": [
        "Cruel, Hard, Yet Full of Devotion",
        "Love, Devotion, Intimacy, Openness, Honest Communion. Conversations with God."
    ],
    "E MAJOR": [
        "Quarrelsome, Boisterous, Incomplete Pleasure",
        "Shouts of Joy, Complete Delight, yet Bickering, Short-fused, Ready to Fight."
    ],
    "E MINOR": [
        "Effeminate, Amorous, Restless",
        "This key can carry grief, mournfulness, restlessness. Like a princess locked in a tower longing for her rescuer and future lover."
    ],
    "F MAJOR": [
        "Furious, Quick-Tempered, Passing Regret",
        "Complaisance, Controlled calmness over the readiness to explode. Deeply angry but composed and sociable still. Religious sentiment."
    ],
    "F MINOR": [
        "Obscure, Plaintive, Funereal",
        "Deepest depression, lament over death and loss, groans of misery, ready to expire. Harrowing. Melancholic."
    ],
    "F# MAJOR": [
        "Conquering Difficulties, Sighs of Relief",
        "Triumph over evil, obstacles, hurdles. Surmounting foes and finally finding rest in victory. Brilliant clarity of thought and feeling."
    ],
    "F# MINOR": [
        "Gloomy, Passionate Resentment",
        "Tearing at your hair and shirt, discontentment, long periods of lamentation and crying. Still capable of fighting this feeling."
    ],
    "G MAJOR": [
        "Serious, Magnificent, Fantasy",
        "Rustic, Idyllic, Poetic, Lyrical. Calm and satisfied. Tenderness and Gratitude. Friendship and Faith. It is a gentle key full of peace."
    ],
    "G MINOR": [
        "Discontent, Uneasiness",
        "Worry of the future, of a failed plan, gnashing of teeth. Concern over a failed plan. Struggling with dislike and malcontent."
    ],
    "AB MAJOR": [
        "Death, Eternity, Judgement",
        "Putrefaction, Expansive viewpoints of a dark cosmos and existence. Ghosts, Ghouls, Goblins, Graveyards. Haunting and Lingering."
    ],
    "AB MINOR": [
        "Grumbling, Moaning, Wailing",
        "Suffocation of the Heart, Lamentations, Life-Long Struggles. A negative look at the experiences of life, competition, growth."
    ],
    "A MAJOR": [
        "Joyful, Pastoral, Declaration of Love",
        "Innocent Love, Satisfaction with the current state of affairs. Optimistic. Belief in Heaven and reuniting with lost loved ones. Youthful and cheerful. Trusting in the spirit of the divine."
    ],
    "A MINOR": [
        "Tender, Plaintive, Pious",
        "Womanly, Graceful in character. Capable of soothing."
    ],
    "BB MAJOR": [
        "Joyful, Quaint, Cheerful",
        "Love, Clear Conscience, Hopeful Aspirations for the future and a better world. Optimistic and able to take control in order to ensure peace."
    ],
    "BB MINOR": [
        "Terrible, the Night, Mocking",
        "The Garment of Night, Surly, Blasphemous, Turning away the world and the divine. Preparations for the end. Pessimism and giving up. Belief in darkness."
    ],
    "B MAJOR": [
        "Harsh, Strong, Wild, Rage",
        "Uncontrolled passions. Angry, Jealous, Fury, Despair, Burdened with negative energy. Prepared to fight."
    ],
    "B MINOR": [
        "Solitary, Melancholic, Patience",
        "The key of patience, calmly waiting for fate, destiny, and the submission to providence and karma."
    ]
}

const translate_keys = {
    "Fm": "F MINOR",
    "C": "C MAJOR",
    "E": "E MAJOR",
    "Am": "A MINOR",
    "Gm": "G MINOR",
    "F": "F MAJOR",
    "A": "A MAJOR",
    "G": "G MAJOR"
}

function onPageLoad(){
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
    else{
        access_token = localStorage.getItem("access_token");
        if ( access_token == null ){
            // we don't have an access token so present token section
            document.getElementById("tokenSection").style.display = 'block';  
        }
        else {
            // we have an access token so present device section
            document.getElementById("deviceSection").style.display = 'block';  
            $("#entry").hide();
            refreshDevices();
            refreshPlaylists();
            currentlyPlaying();
            getTopTracks();
        }
    }
    refreshRadioButtons();
}

function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function requestAuthorization(){
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-top-read user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function refreshDevices(){
    callApi( "GET", DEVICES, null, handleDevicesResponse );
}

function handleDevicesResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems( "devices" );
        data.devices.forEach(item => addDevice(item));
    }
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function addDevice(item){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("devices").appendChild(node); 
}

function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

function refreshPlaylists(){
    callApi( "GET", PLAYLISTS, null, handlePlaylistsResponse );
}

function getTopTracks(){
    callApi( "GET", TOPTRACKS, null, handleTopTracks );
}

function handleTopTracks(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        data.items.forEach(track => {
            console.log(track);
            //$(".list").append("<li><img class='track-img' src='" + track.album.images[0].url + "'/><h1 class='text-white'>" + track.name + "</h1></li>");
            axios.get('https://api.getsongbpm.com/search/?api_key=53fb0a80c6060b940acf22488eed7a6b&type=song&lookup=' + track.name)
            .then(function (response) {
                if(response.data.search[0]['id'] === "undefined"){
                    //$(element).append(" is key of: not found");
                }else{
                    axios.get('https://api.getsongbpm.com/song/?api_key=53fb0a80c6060b940acf22488eed7a6b&id=' + response.data.search[0]['id'])
                    .then(function (sReponse) {
                        console.log(key_feelings[translate_keys[sReponse.data.song.key_of]][0])
                        //$(element).find('h1').append(" is key of: " + key_feelings[translate_keys[sReponse.data.song.key_of]][0]);
                        $("#steps").append("<li>"+sReponse.data.song.key_of+"</li>");
                        $("#slides ul").append("<li style='background-image: url(" + track.album.images[0].url + ");'></li>")
                        $("#titles ul").append("<li><h2>"+ track.name +"</h2><h4>"+key_feelings[translate_keys[sReponse.data.song.key_of]][0]+"</h4><p>"+key_feelings[translate_keys[sReponse.data.song.key_of]][1]+"</p></li>");
                        var script = document.createElement('script');
                        script.onload = function () {
                            //do stuff with the script
                        };
                        script.src = "slideshow.js";
                
                        document.head.appendChild(script);
                    });
                }
            });
        })
        console.log($("#slides ul").length);
        // $(".list li").each(track =>{
        //     let element = $('.list li')[track]
        //     let trackName = $(element).text()
        //     trackName = trackName.replace(/[^a-zA-Z ]/g, "");
        //     trackName = trackName.replaceAll(" ", "+");
        //     //TODO: Turn this to one call only
        //     axios.get('https://api.getsongbpm.com/search/?api_key=53fb0a80c6060b940acf22488eed7a6b&type=song&lookup=' + trackName)
        //     .then(function (response) {
        //         if(response.data.search[0]['id'] === "undefined"){
        //             $(element).append(" is key of: not found");
        //         }else{
        //             axios.get('https://api.getsongbpm.com/song/?api_key=53fb0a80c6060b940acf22488eed7a6b&id=' + response.data.search[0]['id'])
        //             .then(function (sReponse) {
        //                 $(element).find('h1').append(" is key of: " + key_feelings[translate_keys[sReponse.data.song.key_of]][0]);
        //             });
        //         }
        //     });
        // })
        removeAllItems( "playlists" );
        data.items.forEach(item => addPlaylist(item));
        document.getElementById('playlists').value=currentPlaylist;
    }
    else if ( this.status == 401 ){
        // refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function trackKeys(){
    console.log(this);
    if(this.status == 200){
        console.log(this.responseText);
    }
}

function handlePlaylistsResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems( "playlists" );
        data.items.forEach(item => addPlaylist(item));
        document.getElementById('playlists').value=currentPlaylist;
    }
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function addPlaylist(item){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name + " (" + item.tracks.total + ")";
    document.getElementById("playlists").appendChild(node); 
}

function removeAllItems( elementId ){
    let node = document.getElementById(elementId);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function play(){
    let playlist_id = document.getElementById("playlists").value;
    let trackindex = document.getElementById("tracks").value;
    let album = document.getElementById("album").value;
    let body = {};
    if ( album.length > 0 ){
        body.context_uri = album;
    }
    else{
        body.context_uri = "spotify:playlist:" + playlist_id;
    }
    body.offset = {};
    body.offset.position = trackindex.length > 0 ? Number(trackindex) : 0;
    body.offset.position_ms = 0;
    callApi( "PUT", PLAY + "?device_id=" + deviceId(), JSON.stringify(body), handleApiResponse );
}

function shuffle(){
    callApi( "PUT", SHUFFLE + "?state=true&device_id=" + deviceId(), null, handleApiResponse );
    play(); 
}

function pause(){
    callApi( "PUT", PAUSE + "?device_id=" + deviceId(), null, handleApiResponse );
}

function next(){
    callApi( "POST", NEXT + "?device_id=" + deviceId(), null, handleApiResponse );
}

function previous(){
    callApi( "POST", PREVIOUS + "?device_id=" + deviceId(), null, handleApiResponse );
}

function transfer(){
    let body = {};
    body.device_ids = [];
    body.device_ids.push(deviceId())
    callApi( "PUT", PLAYER, JSON.stringify(body), handleApiResponse );
}

function handleApiResponse(){
    if ( this.status == 200){
        console.log(this.responseText);
        setTimeout(currentlyPlaying, 2000);
    }
    else if ( this.status == 204 ){
        setTimeout(currentlyPlaying, 2000);
    }
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }    
}

function deviceId(){
    return document.getElementById("devices").value;
}

function fetchTracks(){
    let playlist_id = document.getElementById("playlists").value;
    if ( playlist_id.length > 0 ){
        url = TRACKS.replace("{{PlaylistId}}", playlist_id);
        callApi( "GET", url, null, handleTracksResponse );
    }
}

function handleTracksResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems( "tracks" );
        data.items.forEach( (item, index) => addTrack(item, index));
    }
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function addTrack(item, index){
    let node = document.createElement("option");
    node.value = index;
    node.innerHTML = item.track.name + " (" + item.track.artists[0].name + ")";
    document.getElementById("tracks").appendChild(node); 
}

function currentlyPlaying(){
    callApi( "GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse );
}

function handleCurrentlyPlayingResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        if ( data.item != null ){
            document.getElementById("albumImage").src = data.item.album.images[0].url;
            document.getElementById("trackTitle").innerHTML = data.item.name;
            document.getElementById("trackArtist").innerHTML = data.item.artists[0].name;
        }


        if ( data.device != null ){
            // select device
            currentDevice = data.device.id;
            document.getElementById('devices').value=currentDevice;
        }

        if ( data.context != null ){
            // select playlist
            currentPlaylist = data.context.uri;
            currentPlaylist = currentPlaylist.substring( currentPlaylist.lastIndexOf(":") + 1,  currentPlaylist.length );
            document.getElementById('playlists').value=currentPlaylist;
        }
    }
    else if ( this.status == 204 ){

    }
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function saveNewRadioButton(){
    let item = {};
    item.deviceId = deviceId();
    item.playlistId = document.getElementById("playlists").value;
    radioButtons.push(item);
    localStorage.setItem("radio_button", JSON.stringify(radioButtons));
    refreshRadioButtons();
}

function refreshRadioButtons(){
    let data = localStorage.getItem("radio_button");
    if ( data != null){
        radioButtons = JSON.parse(data);
        if ( Array.isArray(radioButtons) ){
            removeAllItems("radioButtons");
            radioButtons.forEach( (item, index) => addRadioButton(item, index));
        }
    }
}

function onRadioButton( deviceId, playlistId ){
    let body = {};
    body.context_uri = "spotify:playlist:" + playlistId;
    body.offset = {};
    body.offset.position = 0;
    body.offset.position_ms = 0;
    callApi( "PUT", PLAY + "?device_id=" + deviceId, JSON.stringify(body), handleApiResponse );
    //callApi( "PUT", SHUFFLE + "?state=true&device_id=" + deviceId, null, handleApiResponse );
}

function addRadioButton(item, index){
    let node = document.createElement("button");
    node.className = "btn btn-primary m-2";
    node.innerText = index;
    node.onclick = function() { onRadioButton( item.deviceId, item.playlistId ) };
    document.getElementById("radioButtons").appendChild(node);
}