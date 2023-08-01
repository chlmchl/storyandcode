let randomVideoUrl = ''
let oldMatchingFiles = ''
let matchingFiles = ''

// Function to set the video source and start playing
function playVideo (filename, pacing, match) {
  const videoPlayer = document.getElementById('video-player')
  videoPlayer.src = filename

  videoPlayer.addEventListener('loadeddata', () => {
    // Play request was interrupted, try again after a short delay
    videoPlayer.play().catch(error => {
      setTimeout(() => videoPlayer.play(), 50)
    })
  })

  // Attach an event listener to play the next video when the current one ends
  if (!match) {
    setTimeout(() => fetchAndPlayVideo(), pacing)
  }
}

// Function to fetch the video URL and start playing
function fetchAndPlayVideo () {
  if (b1) {
    // Call getMatchingFileName() and store the result in a variable
    matchingFiles = getMatchingFileName(vids_b1)
    if(matchingFiles.toString() === oldMatchingFiles.toString()) {
      matchingFiles = ''
    }
    // Check if the matchingFileName is empty or undefined
    if (!matchingFiles) {
      // If it's empty or undefined, call getRandomVideo()
      getRandomVideo(vids_b1)
    } else {
      // Do something with the matchingFiles if it's not empty
      //console.log('Matching video filename:', matchingFiles)
      const randomIndex = Math.floor(Math.random() * (matchingFiles.length - 1))
      randomVideoUrl = matchingFiles[randomIndex]
      oldMatchingFiles = matchingFiles
    }
    // console.log(randomVideoUrl)
    filename = 'static/vids/batch_1/' + randomVideoUrl
    pacing = 3000
    playVideo(filename, pacing, false)
  } else if (b2) {
    matchingFiles = getMatchingFileName(vids_b2)
    if(matchingFiles.toString() === oldMatchingFiles.toString()) {
      matchingFiles = ''
    }

    // Check if the matchingFileName is empty or undefined
    if (!matchingFiles) {
      // If it's empty or undefined, call getRandomVideo()
      getRandomVideo(vids_b2)
    } else {
      // Do something with the matchingFiles if it's not empty
      //console.log('Matching video filename:', matchingFiles)
      const randomIndex = Math.floor(Math.random() * (matchingFiles.length - 1))
      randomVideoUrl = matchingFiles[randomIndex]
      oldMatchingFiles = matchingFiles
    }
    filename = 'static/vids/batch_2/' + randomVideoUrl
    pacing = 1200
    playVideo(filename, pacing, false)
  } else if (b3) {
     // Call getMatchingFileName() and store the result in a variable
     matchingFiles = getMatchingFileName(vids_b3)
     if(matchingFiles.toString() === oldMatchingFiles.toString()) {
       matchingFiles = ''
     }
     // Check if the matchingFileName is empty or undefined
     if (!matchingFiles) {
       // If it's empty or undefined, call getRandomVideo()
       getRandomVideo(vids_b3)
     } else {
       // Do something with the matchingFiles if it's not empty
       //console.log('Matching video filename:', matchingFiles)
       const randomIndex = Math.floor(Math.random() * (matchingFiles.length - 1))
       randomVideoUrl = matchingFiles[randomIndex]
       oldMatchingFiles = matchingFiles
     }
     // console.log(randomVideoUrl)
     filename = 'static/vids/batch_3/' + randomVideoUrl
     pacing = 1000
     playVideo(filename, pacing, false)
  }
}

function getRandomVideo (currentBatch) {
  const randomIndex = Math.floor(Math.random() * (currentBatch.length - 1))
  randomVideoUrl = currentBatch[randomIndex].file_name

  return randomVideoUrl
}
