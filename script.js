const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music 
const songs = [
    {
        name: 'Kabira',
        displayName: 'Kabira - Yeh Jawaani Hai Deewani',
        artist: 'Arijit Singh',
    },
    {
        name: 'Buddhu Sa Mann',
        displayName: 'Buddhu Sa Mann',
        artist: 'Armaan Malik',
    },
    {
        name: 'mast magan',
        displayName: 'Mast Magan - 2 States',
        artist: 'Arijit Singh',
    },
    {
        name: 'namo',
        displayName: 'Namo Namo Ji Shankara',
        artist: 'Amit Trivedi',
    },
    {
        name: 'Main Rang Sharbaton ka',
        displayName: 'Main Rang Sharbaton ka',
        artist: 'Arijit Singh',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Sneh Patel',
    }
];

//Check if playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play or Pause Event Listner
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previouse Song
function prevSong(){
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On load Select First Song
loadSong(songs[songIndex]);

// Update ProgressBar & Time
// e --> event object , which contain many attribute
//  among them we are using srcElement, duration and currentTime
function updateProgressBar(e){ 
    if(isPlaying){
        const {duration, currentTime} = e.srcElement; 
        // Update progress Bar Width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate Display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        // delay Switching duration element to avoid NaN.
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate Display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
// 'this' refer to the element that receive the event. this --> progressContainer , in our case
//e is event that containe attributes like clientWidth.
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event listners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);