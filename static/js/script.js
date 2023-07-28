let vids_b1 = []
let vids_b2 = []
let vids_b3 = []
let vids_x = []

let audio_b1 = []
let audio_b2 = []
let audio_b3 = []

let intro = true
let b1 = false
let b2 = false
let b3 = false
let started = false

let b1_index = 0
let b2_index = 0
let b3_index = 0

// Call the fetchAndPlayVideo function when the page loads
document.addEventListener('DOMContentLoaded', () => {
  playIntro()
})

// Function to play the intro audio
function playIntro () {
  // Hide the start button

  // Show the transcript paragraph
  const transcriptsDiv = document.getElementById('transcript_11labs')
  transcriptsDiv.style.display = 'block'

  // Make a POST request to the "/intro" route
  fetch('/intro', {
    method: 'POST'
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data, assuming 'data' is an object containing the 'response_text' and 'is_final' fields
      const responseText = data.response_text
      audioUrl = data.audioUrl
      csv_array = data.csv_array
      csv_array_audio = data.csv_array_audio

      playAudio('static/audio/' + audioUrl)

      for (let i = 1; i < csv_array.length; i++) {
        const [file_name, batch, tags, note] = csv_array[i]

        if (batch === 'b1') {
          vids_b1.push({ file_name, tags })
        } else if (batch === 'b2') {
          vids_b2.push({ file_name, tags })
        } else if (batch === 'b3') {
          vids_b3.push({ file_name, tags })
        }
      }

      for (let i = 1; i < csv_array_audio.length; i++) {
        const [file_name, batch, string, note] = csv_array_audio[i]

        if (batch === 'b1') {
          audio_b1.push({ file_name, string })
        } else if (batch === 'b2') {
          audio_b2.push({ file_name, string })
        } else if (batch === 'b3') {
          audio_b3.push({ file_name, string })
        }
      }

      b1 = data.b1

      document.getElementById('transcript_11labs').innerHTML = responseText
    })
    .catch(error => {
      console.error('Error playing intro:', error)
    })
}


// Access the webcam and stream video
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  const webcamVideo = document.getElementById('webcam-video')

  // Request access to the webcam
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      // Display the webcam video stream
      webcamVideo.srcObject = stream
    })
    .catch(error => {
      // console.log('Unable to access the webcam:', error);
    })
} else {
  // console.log('Webcam access not supported');
}


function startRec () {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition()
    const form = document.getElementById('speech-form')
    const inputField = document.getElementById('text-input')
    let isSpeaking = false

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.start()

    recognition.onresult = function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript
      inputField.value = transcript
      document.getElementById('transcript').innerHTML = transcript

      // Check for silence or pauses in speech
      const lastResult = event.results[event.results.length - 1]
      if (lastResult.isFinal) {
        isSpeaking = false
        if (!started) {
          if (
            inputField.value.trim() === 'start' ||
            inputField.value.trim() === 'stop'
          ) {
            started = true
            b1 = true
            intro = false
            console.log('started')
            document.getElementById('video-player2').style.display = 'none'
            recognition.stop()
            playAudio('static/audio/00_stream1.mp3')
            document.getElementById('transcript_11labs').innerHTML =
              'You see a stream'
            fetchAndPlayVideo()
          }
        } else {
          if (inputField.value.trim() !== '') {
            recognition.stop()
            if (b1) {
              console.log(
                'b1_index: ',
                b1_index,
                'audio_b1.length: ',
                audio_b1.length
              )
              playAudio('static/audio/' + audio_b1[b1_index].file_name)
              document.getElementById('transcript_11labs').innerHTML =
                audio_b1[b1_index].string
              console.log(b1)
              console.log(b2)
              b1_index += 1
              if (b1_index >= audio_b1.length) {
                b1 = false
                b2 = true
              }
            } else if (b2) {
              console.log('starting b2')
              playAudio('static/audio/' + audio_b2[b2_index].file_name)
              document.getElementById('transcript_11labs').innerHTML =
                audio_b2[b2_index].string
              b2_index += 1
              if (b2_index >= audio_b2.length) {
                b2 = false
                b3 = true
              }
            } else if (b3) {
              playAudio('static/audio/' + audio_b3[b3_index].file_name)
              document.getElementById('transcript_11labs').innerHTML =
                audio_b3[b3_index].string
              b3_index += 1
              if (b3_index >= audio_b3.length) {
                b3 = false
              }
            }
          }
        }
      } else {
        isSpeaking = true
      }
    }

    recognition.onstart = function () {
      isSpeaking = true
    }

    recognition.onend = function () {
      if (isSpeaking) {
        // The user has stopped speaking
        isSpeaking = false
        // Wait for 1 second before restarting the recognition
      }
    }
  }
}

function playAudio (audioUrl) {
    const audio = new Audio(audioUrl)
    audio.play()
  
    audio.addEventListener('ended', function () {
      startRec()
    })
  }


