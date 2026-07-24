const audio=document.getElementById("audio");
const playBtn=document.getElementById("playBtn");
const fileInput=document.getElementById("fileInput");
const playlist=document.getElementById("playlist");
const songTitle=document.getElementById("songTitle");
const progress=document.getElementById("progress");
const current=document.getElementById("current");
const duration=document.getElementById("duration");
const volume=document.getElementById("volume");

let songs=[];
let currentSong=0;
let repeat=false;


// Upload songs
fileInput.onchange=function(){

songs=[];

for(let file of this.files){

songs.push({
name:file.name,
url:URL.createObjectURL(file)
});

}

showPlaylist();

loadSong(0);

};


// Show playlist
function showPlaylist(){

playlist.innerHTML="";

songs.forEach((song,index)=>{

let li=document.createElement("li");

li.textContent="🎵 "+song.name;

li.onclick=function(){

loadSong(index);
playSong();

};

playlist.appendChild(li);

});

}


// Load song
function loadSong(index){

if(songs.length==0)return;

currentSong=index;

audio.src=songs[index].url;

songTitle.textContent=songs[index].name;

}


// Play
function playSong(){

audio.play()
.then(()=>{

playBtn.textContent="⏸";

})
.catch(error=>{

alert("Sankhani nyimbo kaye");

});

}


// Play/Pause
function playPause(){

if(audio.paused){

playSong();

}else{

audio.pause();

playBtn.textContent="▶️";

}

}


// Next
function nextSong(){

if(songs.length==0)return;

currentSong++;

if(currentSong>=songs.length)
currentSong=0;

loadSong(currentSong);

playSong();

}


// Previous
function previousSong(){

if(songs.length==0)return;

currentSong--;

if(currentSong<0)
currentSong=songs.length-1;

loadSong(currentSong);

playSong();

}


// Progress
audio.ontimeupdate=function(){

if(audio.duration){

progress.value=(audio.currentTime/audio.duration)*100;

}

current.textContent=time(audio.currentTime);

duration.textContent=time(audio.duration);

}


progress.oninput=function(){

audio.currentTime=(progress.value/100)*audio.duration;

}


// Volume
volume.oninput=function(){

audio.volume=volume.value;

}


// Repeat
function repeatSong(){

repeat=!repeat;

audio.loop=repeat;

}


// Shuffle
function shuffle(){

if(songs.length){

let r=Math.floor(Math.random()*songs.length);

loadSong(r);

playSong();

}

}


// Download
function downloadSong(){

if(!audio.src)return;

let a=document.createElement("a");

a.href=audio.src;

a.download=songs[currentSong].name;

a.click();

}


// End
audio.onended=function(){

if(!repeat)
nextSong();

};


// Time
function time(t){

if(isNaN(t)) return "0:00";

let m=Math.floor(t/60);

let s=Math.floor(t%60);

if(s<10)s="0"+s;

return m+":"+s;

}
