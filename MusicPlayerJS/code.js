// Selectors
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.querySelector(".play-button");
const music = document.querySelector("audio");
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('previous');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('time');
const durationEl = document.getElementById('duration');

// Songs
const songs = [
  {
    name: "big-idea-vocal",
    displayName: "Big Idea (Vocals)",
    artist: "SyncHits",
  },
  {
    name: "drum-and-bass-positive",
    displayName: "Drum & Bass Positive",
    artist: "SyncHits",
  },
  {
    name: "epic-rock-trailer",
    displayName: "Epic Rock Trailer",
    artist: "SyncHits",
  },
  {
    name: "word-of-prey-vocal",
    displayName: "Word of Prey (Vocals)",
    artist: "SyncHits",
  }
];

let isPlaying = false;

// Play Song
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause Song
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-circle-pause", "fa-circle-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

let songIndex = 0;

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Previous Song
function previousSong() {
  songIndex--;
  if (songIndex <= 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex]);
  playSong();
}

// function changeSong(e) {
//   if (e.id === 'next') {
//     songIndex++;
//     if (songIndex > songs.length - 1) {
//       songIndex = 0;
//     }
//     loadSong(songs([songIndex]));
//     playSong();
//   }
// }

// Progress Bar
function updateProgress(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }
    if (durationSec) {
      durationEl.textContent = `${durationMin}:${durationSec}`;
    }
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentMin % 60);
    // if (currentMin < 1) {
    //   currentMin = '0'
    // }
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    currentTimeEl.textContent = `${currentMin}:${currentSec}`;
  }
}

// Set Progress
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Load Song
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.wav`;
  image.src = `images/${song.name}.jpg`;
}

// Select InitialSong
loadSong(songs[songIndex]);

// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', previousSong);
music.addEventListener('timeupdate', updateProgress);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);