const title = document.getElementById('title');
const artist = document.getElementById('artist');
const image = document.querySelector('img');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currrentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const volumeRange = document.getElementById('volume-range')
const volumeBar = document.getElementById('volume-bar')

//music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    }
];

//check if playing
let isPlaying = false;


//play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

//pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

//play or pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}

// .current song
let songIndex = 0;

// next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;

    }
    loadSong(songs[songIndex]);
    playSong();
}

// prev song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;


    }
    loadSong(songs[songIndex]);
    playSong();
}


// update progress

function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // update progress
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calc
        let durationSeconds = Math.floor(duration % 60);
        const durationMinutes = Math.floor(duration / 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        // delay
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        // calc
        let currentSeconds = Math.floor(currentTime % 60);
        const currentMinutes = Math.floor(currentTime / 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currrentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// set progress
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;

}

// volume controls

// volume bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // rounding volume
    if (volume < 0.1) {
        volume = 0;

    }
    if (volume > 0.9) {
        volume = 1;

    }
    volumeBar.style.width = `${volume * 100}%`;
    music.volume = volume;
    console.log(volume);
}


// on load - select first song
loadSong(songs[songIndex]);


// event liasteners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
volumeRange.addEventListener('click', changeVolume);




