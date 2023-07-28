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
      const randomIndex = Math.floor(Math.random() * (vids_b1.length - 1))
      const randomVideoUrl = vids_b1[randomIndex].file_name
      filename = 'static/vids/batch_1/' + randomVideoUrl
      pacing = 3000
      playVideo(filename, pacing, false)
    } else if (b2) {
      const randomIndex = Math.floor(Math.random() * (vids_b2.length - 1))
      const randomVideoUrl = vids_b2[randomIndex].file_name
      filename = 'static/vids/batch_2/' + randomVideoUrl
      pacing = 1500
      playVideo(filename, pacing, false)
    } else if (b3) {
      const randomIndex = Math.floor(Math.random() * (vids_b3.length - 1))
      const randomVideoUrl = vids_b3[randomIndex].file_name
      filename = 'static/vids/batch_3/' + randomVideoUrl
      pacing = 1000
      playVideo(filename, pacing, false)
    }
  }