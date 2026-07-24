const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const fileInput = document.getElementById("fileInput");
const playlist = document.getElementById("playlist");
const songTitle = document.getElementById("songTitle");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

let songs = [];
let currentSong = 0;
let isRepeat = false;


// Upload music
fileInput.addEventListener("change", function(){

    songs = [];

    for(let file of this.files){

        songs.push({
            name:file.name,
            url:URL.createObjectURL(file)
        });

    }

    showPlaylist();

    loadSong(0);

});


// Show playlist
function showPlaylist(){

    playlist.innerHTML="";

    songs.forEach((song,index)=>{

        let li=document.createElement("li");

        li.innerHTML="🎵 "+song.name;

        li.onclick=function(){
            loadSong(index);
            playSong();
        };

        playlist.appendChild(li);

    });

}


// Load song
function loadSong(index){

    currentSong=index;

    audio.src=songs[index].url;

    songTitle.innerHTML=songs[index].name;

}


// Play song
function playSong(){

    audio.play();

    playBtn.innerHTML="⏸";

}


// Pause / Play button
function playPause(){

    if(audio.paused){

        playSong();

    }else{

        audio.pause();

        playBtn.innerHTML="▶️";

    }

}


// Next song
function nextSong(){

    if(songs.length===0)return;

    currentSong++;

    if(currentSong>=songs.length){
        currentSong=0;
    }

    loadSong(currentSong);
    playSong();

}


// Previous song
function previousSong(){

    if(songs.length===0)return;

    currentSong--;

    if(currentSong<0){
        currentSong=songs.length-1;
    }

    loadSong(currentSong);
    playSong();

}


// Progress bar
audio.addEventListener("timeupdate",()=>{

    progress.value=(audio.currentTime/audio.duration)*100 || 0;

    current.innerHTML=formatTime(audio.currentTime);

    duration.innerHTML=formatTime(audio.duration);

});


progress.addEventListener("input",()=>{

    audio.currentTime=(progress.value/100)*audio.duration;

});


// Volume
volume.addEventListener("input",()=>{

    audio.volume=volume.value;

});


// Repeat
function repeatSong(){

    isRepeat=!isRepeat;

    audio.loop=isRepeat;

}


// Shuffle
function shuffle(){

    if(songs.length>0){

        let random=Math.floor(Math.random()*songs.length);

        loadSong(random);

        playSong();

    }

}


// Download
function downloadSong(){

    if(!audio.src)return;

    let a=document.createElement("a");

   