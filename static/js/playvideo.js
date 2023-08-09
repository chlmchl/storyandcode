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
    if(document.getElementById('transcript_11labs').innerHTML === "AI: And what brings you in today?") {
      filename = 'static/vids/batch_x/network_intro_dark_fast.mp4';
      playVideo(filename, 3000, true)
    }else if (document.getElementById('transcript_11labs').innerHTML === "AI: If I show you this... how does that make you feel?"){
      filename = 'static/vids/batch_3/b3_v1_faceless_1.mp4';
      playVideo(filename, 3000, true)
    } else if(document.getElementById('transcript_11labs').innerHTML === "AI: Assess... Accept.") {
      filename = 'static/vids/batch_x/bx_final_orb_2.mp4';
      playVideo(filename, 4000, false)
      setTimeout(() => document.getElementById('video-player2').style.display = 'block', 4000)
      setTimeout(() => playAudio('static/audio/26_end.mp3'), 4200)
      setTimeout(() => document.getElementById('transcript_11labs').innerHTML =
      "End session.", 4500)
      setTimeout(() => playAudio('static/audio/name.mp3'), 7500)
      setTimeout(() => document.getElementById('transcript_11labs').innerHTML =
      `Congratulations, ${userName}. You have been accepted into the House of Saturn elite training program.`, 7500)
      setTimeout(() => window.location.replace('/'), 22000) 
    } else {
      checkForMatch(vids_b3)
      filename = 'static/vids/batch_3/' + randomVideoUrl
      pacing = 1500

  //     const popupContent = `<!DOCTYPE html>
  //   <html>
  
  //   <head>
  //     <link rel="stylesheet" type="text/css" href="../static/css/participate.css" />
  //   </head>
  //   <body>
  //   <section class="container register">
  //   <div class="transcripts">
  //     <p id="transcript"></p>
  //     <p id="transcript_11labs"></p>
  //   </div>

  //   <div id="webcam-container">
  //     <video id="webcam-video" autoplay="true"></video>
  //     <canvas id="canvas"></canvas>
  //   </div>
  
  //   <div id="vid-container">
  //     <video id="video-player" muted="true" autoplay="true" playsinline="true" src="${filename}" loop></video>
  //   </div>
  // </section>
  // </body>`;
  
  //     // Open a new window with the popup content
  //     const popupWindow = window.open("", filename, "width=600,height=400");
  //     popupWindow.document.write(popupContent);
  //     popupWindow.document.close();
      
  
      playVideo(filename, pacing, true)


    }
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
