const song = document.getElementById('song');
const playPauseBtn = document.getElementById('play-pause');
const nextSongBtn = document.getElementById('next-song');
const prevSongBtn = document.getElementById('previous-song');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.querySelector('.currentTime');
const durationTimeEl = document.querySelector('.durationTime');
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');
const thumbnail = document.getElementById('thumbnail');
const background = document.getElementById('background');

const tracks = [
  {
    src: '/assets/music/Billie Eilish - BIRDS OF A FEATHER.mp3',
    title: 'BIRDS OF A FEATHER',
    artist: 'Billie Eilish',
    thumbnail: 'assets/img/billi.jpg',
  },
  {
    src: 'assets/music/Harry Styles - As It Was.mp3',
    title: 'As It Was',
    artist: 'Harry Styles ',
    thumbnail: 'assets/img/harrys-house-review.webp',
  }
];

let isPlaying = false;
let currentTrackIndex = 0;

function playPause() {
  if (isPlaying) {
    song.pause();
    playPauseBtn.src = './assets/icons/play.png';
  } else {
    song.play();
    playPauseBtn.src = './assets/icons/pause.png';
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack();
  playSong();
}

function previousSong() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack();
  playSong();
}

function loadTrack() {
  const track = tracks[currentTrackIndex];
  song.src = track.src;
  songTitle.textContent = track.title;
  songArtist.textContent = track.artist;
  thumbnail.src = track.thumbnail;
  background.src = track.thumbnail;
}

function playSong() {
  song.play();
  playPauseBtn.src = './assets/icons/pause.png';
  isPlaying = true;
}

song.addEventListener('timeupdate', () => {
  const progress = (song.currentTime / song.duration) * 100;
  progressBar.value = progress;

  currentTimeEl.textContent = formatTime(song.currentTime);

  if (!isNaN(song.duration)) {
    progressBar.max = 100;
    durationTimeEl.textContent = formatTime(song.duration);
  }
});


function changeProgressBar() {
  const seekTime = (progressBar.value / 100) * song.duration;
  song.currentTime = seekTime;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

song.addEventListener('ended', nextSong);

window.onload = loadTrack;
