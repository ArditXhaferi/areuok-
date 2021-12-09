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
        if(dataText[i] != undefined){
            console.log(dataText[i] != undefined);
       // check if dataText[i] exists
       if (i < dataText[i].length) {
        // text exists! start typewriter animation
       typeWriter(dataText[i], 0, function(){
         // after callback (and whole text has been animated), start next text
         StartTextAnimation(i + 1);
       });
      }
        }
    }
    // start the text animation
    StartTextAnimation(0);
  });

var redirect_uri = "https://arditxhaferi.github.io/areuok-/"; 

var client_id = "6bc594ec59a74f8f9e73aacbd0a2e628"; 
var client_secret = "366e38d096fe47e6836b5f8ebf6d9b05"; // In a real app you should not expose your client_secret to the user

var access_token = null;
var refresh_token = null;

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const TOPTRACKS = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term";
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
    "C": "C MAJOR",
    "Cm": "C MINOR",
    "C♯": "C# MINOR",
    "DB": "DB MAJOR",
    "D": "D MAJOR",
    "Dm": "D MINOR",
    "D♯": "D# MINOR",
    "EB": "EB MAJOR",
    "E": "E MAJOR",
    "Em": "E MINOR",
    "F": "F MAJOR",
    "Fm": "F MINOR",
    "F♯": "F# MAJOR",
    "F♯m": "F# MINOR",
    "G": "G MAJOR",
    "Gm": "G MINOR",
    "AB": "AB MAJOR",
    "ABm": "AB MINOR",
    "A": "A MAJOR",
    "Am": "A MINOR",
    "BB": "BB MAJOR",
    "BBm": "BB MINOR",
    "B": "B MAJOR",
    "Bm": "B MINOR",
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
            $(".loading").show();
            getTopTracks();
        }
    }
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
    url += "&scope=user-top-read";
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
        alert(this.responseText);
    }
}

function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

function getTopTracks(){
    callApi( "GET", TOPTRACKS, null, handleTopTracks );
}

function handleTopTracks(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        var loading = 0;
        var maxLoading = data.items.length;
        data.items.forEach(track => {
            axios.get('https://api.getsongbpm.com/search/?api_key=53fb0a80c6060b940acf22488eed7a6b&type=song&lookup=' + track.name)
            .then(function (response) {
                loading++;
                if(loading == maxLoading){
                    $("#slides").show();
                    $("#titles").show();
                    $("#steps").show();
                    $(".loading").hide();
                }
                var loadingItems = $(".loading li");
                for (let index = 0; index < loading; index++) {
                    let indexItem = parseInt(index/2);
                    $(loadingItems[indexItem]).removeClass("pulsing");
                    $(loadingItems[indexItem]).addClass("active");
                    if(loading - 1 == index){
                        $(loadingItems[indexItem]).addClass("pulsing");
                    }
                }
                if(response.data.search["error"] === "no result"){
                    console.log("No result: ", track.name);
                }else{
                    axios.get('https://api.getsongbpm.com/song/?api_key=53fb0a80c6060b940acf22488eed7a6b&id=' + response.data.search[0]['id'])
                    .then(function (sReponse) {
                        console.log(sReponse.data.song.key_of[0], translate_keys[sReponse.data.song.key_of][0], key_feelings[translate_keys[sReponse.data.song.key_of]][0]);
                        $("#steps").append("<li>"+sReponse.data.song.key_of+"</li>");
                        $("#slides ul").append("<li style='background-image: url(" + track.album.images[0].url + ");'></li>")
                        $("#titles ul").append("<li><h2>"+ track.name +"</h2><h4>"+key_feelings[translate_keys[sReponse.data.song.key_of]][0]+"</h4><p>"+key_feelings[translate_keys[sReponse.data.song.key_of]][1]+"</p></li>");
                        if(loading == maxLoading){
                            var script = document.createElement('script');
                            script.onload = function () {
                                //do stuff with the script
                            };
                            script.src = "slideshow.js";
                    
                            document.head.appendChild(script);
                        }
                    });
                }
            });
        })
    }
    else if ( this.status == 401 ){
        console.log("401");
    }
    else {
        alert(this.responseText);
    }
}