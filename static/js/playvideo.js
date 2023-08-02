let randomVideoUrl = ''
let oldMatchingFiles = ''
let matchingFiles = ''

// Function to set the video source and start playing
function playVideo (filename, pacing, loop) {
  const videoPlayer = document.getElementById('video-player')
  videoPlayer.src = filename

  videoPlayer.addEventListener('loadeddata', () => {
    // Play request was interrupted, try again after a short delay
    videoPlayer.play().catch(error => {
      setTimeout(() => videoPlayer.play(), 50)
    })
  })

  // Attach an event listener to play the next video when the current one ends
  if(loop) {
    setTimeout(() => fetchAndPlayVideo(), pacing)
  }
  
}

// Function to fetch the video URL and start playing
function fetchAndPlayVideo () {
  if (b1) {
    checkForMatch(vids_b1)
    filename = 'static/vids/batch_1/' + randomVideoUrl
    pacing = 3000
    playVideo(filename, pacing, false)
  } else if (b2) {
    checkForMatch(vids_b2)
    filename = 'static/vids/batch_2/' + randomVideoUrl
    pacing = 2000
    playVideo(filename, pacing, true)
  } else if (b3) {
      checkForMatch(vids_b3)
     filename = 'static/vids/batch_3/' + randomVideoUrl
     pacing = 1500
     playVideo(filename, pacing, true)
  }
}

function checkForMatch (vids_array) {
  matchingFiles = getMatchingFileName(vids_array)
  if(matchingFiles.toString() === oldMatchingFiles.toString()) {
    matchingFiles = ''
  }

  // Check if the matchingFileName is empty or undefined
  if (!matchingFiles) {
    // If it's empty or undefined, call getRandomVideo()
    getRandomVideo(vids_array)
  } else {
    // Do something with the matchingFiles if it's not empty
    //console.log('Matching video filename:', matchingFiles)
    const randomIndex = Math.floor(Math.random() * (matchingFiles.length - 1))
    randomVideoUrl = matchingFiles[randomIndex]
    oldMatchingFiles = matchingFiles
  }

  return randomVideoUrl
}

function getRandomVideo (currentBatch) {
  const randomIndex = Math.floor(Math.random() * (currentBatch.length - 1))
  randomVideoUrl = currentBatch[randomIndex].file_name

  return randomVideoUrl
}
