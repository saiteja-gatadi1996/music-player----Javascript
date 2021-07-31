const musicContainer = document.getElementById('music-container')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const image = document.getElementById('image')

// Song titles, this should match with the ones(images and songs) we are included inside the folder
const songs = ['hey', 'summer', 'ukulele']

// Keep track of song
let songIndex = 1

// 1. Upon loading application, we need to set some default data
loadSong(songs[songIndex])

function loadSong(data) {
  //ex: hey
  title.innerText = data
  audio.src = `music/${data}.mp3`
  image.src = `images/${data}.jpg`
}

function playSong() {
  //adding play to the music container (which is the Fragment div)

  // 4. Upon click on play button, title and progress should be shown, image will be rotating
  musicContainer.classList.add('play')

  // we are removing the exisitng play button class
  playBtn.querySelector('i.fas').classList.remove('fa-play')

  // 3. Upon click on play button, Pause button has to be shown
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  //then we want to load the song
  loadSong(songs[songIndex])

  playSong()
}

function nextSong() {
  songIndex++

  if (songIndex > songs.length - 1) {
    songIndex = 0
  }

  //then we want to load the song
  loadSong(songs[songIndex])

  playSong()
}

// Set Progress bar

function setProgress(e) {
  const width = this.clientWidth
  console.log(`Total width is ${width}`)

  const x = e.offsetX
  console.log(`clicked at value is ${x}`)

  const songDuration = audio.duration

  audio.currentTime = (x / width) * songDuration
}

//Update Progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  console.log(duration, currentTime) // 217.417143 0.087209

  const progressPercent = (currentTime / duration) * 100
  console.log(`progressPercent ${progressPercent}`) // 0.053361017626839105

  // Now you start seeing the song showing the progress filling up
  progress.style.width = `${progressPercent}%`
}

//Event listeners
playBtn.addEventListener('click', () => {
  //checking if it is already playing
  const isPlaying = musicContainer.classList.contains('play')
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

//change songs upon click event buttons (prev, next)
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Time/song update
audio.addEventListener('timeupdate', updateProgress)

// Click on progress bar
progressContainer.addEventListener('click', setProgress)

// Song ends, then it plays next song
audio.addEventListener('ended', nextSong)
