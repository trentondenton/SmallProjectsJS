// Selectors
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const playBtn = document.getElementById("play-button");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("time");
const durationEl = document.getElementById("duration");

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

// Previous Song
function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Progress Bar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
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
loadSong(songs[songIndex]); 1

// Event Listeners
prevBtn.addEventListener("click", previousSong);
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);