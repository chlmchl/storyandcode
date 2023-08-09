let vids_b1 = []
let vids_b2 = []
let vids_b3 = []
let vids_x = []
let vids_montage = [
  'static/vids/batch_montage/Montage_1.mp4',
  ' static/vids/batch_montage/Montage_2.mp4',
  'static/vids/batch_montage/Montage_3.mp4',
  'static/vids/batch_montage/Montage_4.mp4',
  'static/vids/batch_montage/Montage_5.mp4'
]

let audio_b1 = []
let audio_b2 = []
let audio_b3 = []

let intro = true
let b1 = false
let b2 = false
let b3 = false
let started = false

let b1_index = -1
let b2_index = 0
let b3_index = 0

let userName = ''

// Call the fetchAndPlayVideo function when the page loads
document.addEventListener('DOMContentLoaded', () => {
  playIntro()
})

function sayMyName () {
  // Show the transcript paragraph
  const transcriptsDiv = document.getElementById('transcript_11labs')
  transcriptsDiv.style.display = 'block'

  fetch('/generate', {
    method: 'POST'
  })
    .then(response => response.text())
    .then(data => {
      response_text = data.response_text
      document.getElementById('transcript_11labs').innerHTML =
        'AI: ' + response_text

      setTimeout(() => playIntro(), 1200)
    })
}

// Function to play the intro audio
function playIntro () {
  const transcriptsDiv = document.getElementById('transcript_11labs')
  transcriptsDiv.style.display = 'block'
  // Make a POST request to the "/intro" route
  fetch('/intro', {
    method: 'POST'
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data, assuming 'data' is an object containing the 'response_text' and 'is_final' fields
      audioUrl = data.audioUrl
      csv_array = data.csv_array
      csv_array_audio = data.csv_array_audio
      userName = data.userName
      console.log(userName)
      //console.log(csv_array)

      playAudio('static/audio/' + audioUrl)
      document.getElementById('transcript_11labs').innerHTML =
        'AI: ' +
        'Welcome to the Ayn-Tycho corporation baseline test for interplanetary missions.'
      setTimeout(
        () =>
          (document.getElementById('transcript_11labs').innerHTML =
            'AI: ' + 'There are no wrong answers.'),
        4500
      )
      setTimeout(
        () =>
          (document.getElementById('transcript_11labs').innerHTML =
            'AI: ' +
            'Please respond naturally with simple word associations to what you hear and see to achieve your baseline.'),
        6000
      )
      setTimeout(
        () =>
          (document.getElementById('transcript_11labs').innerHTML =
            'AI: ' + 'You must speak clear and loud.'),
        10800
      ) 

      setTimeout(
        () =>
          (document.getElementById('transcript_11labs').innerHTML =
            'AI: ' + 'To initiate say "start"'),
        13400
      )

      for (let i = 1; i < csv_array.length; i++) {
        const [file_name, batch, tags, note] = csv_array[i]

        if (batch === 'b1') {
          vids_b1.push({ file_name, tags })
          //console.log(vids_b1)
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
          console.log(audio_b1)
        } else if (batch === 'b2') {
          audio_b2.push({ file_name, string })
        } else if (batch === 'b3') {
          audio_b3.push({ file_name, string })
        }
      }

      b1 = data.b1
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
      document.getElementById('transcript').innerHTML = 'You: ' + transcript

      // Check for silence or pauses in speech
      const lastResult = event.results[event.results.length - 1]
      if (lastResult.isFinal) {
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
            filename = vids_montage[0]
            playVideo(filename, 1000, false)

            setTimeout(() => playAudio('static/audio/00_stream.mp3'), 1500)

            setTimeout(
              () =>
                (document.getElementById('transcript_11labs').innerHTML =
                  'AI: ' + 'You see a stream'),
              1500
            )

            setTimeout(() => fetchAndPlayVideo(), 2000)

            setTimeout(
              () =>
                (document.getElementById('transcript_11labs').innerHTML =
                  'AI: ' + 'Is the stream warm or cold?'),
              2500
            )
            //fetchAndPlayVideo()
          }
        } else {
          if (b1) {
            if (inputField.value.trim() !== '') {
              recognition.stop()
              b1_index += 1
              playVideo(vids_montage[b1_index + 1], 1000, false)
              setTimeout(
                () => playAudio('static/audio/' + audio_b1[b1_index].file_name),
                1500
              )
              setTimeout(
                () =>
                  (document.getElementById('transcript_11labs').innerHTML =
                    'AI: ' + audio_b1[b1_index].string),
                1500
              )
              setTimeout(() => fetchAndPlayVideo(), 2000)
              console.log(b1_index)
              console.log(audio_b1.length)
              // console.log(b2)

              if (b1_index >= 3) {
                b1 = false
                b2 = true
              }
            }
          } else if (b2) {
            if (inputField.value.trim() !== '') {
              recognition.stop()
              //console.log('starting b2')
              playAudio('static/audio/' + audio_b2[b2_index].file_name)
              document.getElementById('transcript_11labs').innerHTML =
                'AI: ' + audio_b2[b2_index].string
              b2_index += 1
              if (b2_index >= 9) {
                b2 = false
                b3 = true
              }
            }
          } else if (b3) {
            //if (inputField.value.trim() !== '') {
              recognition.stop()
              //document.getElementById('transcript').style.display = 'none'
              if(document.getElementById('transcript_11labs').innerHTML.indexOf("feel") != -1 && document.getElementById('transcript').innerHTML.indexOf("sad") != -1) {
                playAudio('static/audio/sad.mp3')
                document.getElementById('transcript_11labs').innerHTML =
                  'AI: It\'s making you feel... sad?'
                  setTimeout(() => playAudio('static/audio/' + audio_b3[b3_index].file_name),3000)
                setTimeout(() => document.getElementById('transcript_11labs').innerHTML = 'AI: ' + audio_b3[b3_index].string, 3000)
                setTimeout(() => b3_index += 1, 3000)
              } else if(document.getElementById('transcript_11labs').innerHTML.indexOf("feel") != -1 && document.getElementById('transcript').innerHTML.indexOf("angry") != -1) {
                playAudio('static/audio/angry.mp3')
                document.getElementById('transcript_11labs').innerHTML =
                  'AI: Angry? Interesting...'
                setTimeout(() => recognition.stop(), 3000)
                setTimeout(() => playAudio('static/audio/' + audio_b3[b3_index].file_name),3000)
                setTimeout(() => document.getElementById('transcript_11labs').innerHTML = 'AI: ' + audio_b3[b3_index].string, 3000)
                setTimeout(() => b3_index += 1, 3000)
              } else if(document.getElementById('transcript_11labs').innerHTML.indexOf("feel") != -1 && document.getElementById('transcript').innerHTML.indexOf("happy") != -1) {
                playAudio('static/audio/happy.mp3')
                document.getElementById('transcript_11labs').innerHTML =
                  'AI: oh... happy?'
                  setTimeout(() => recognition.stop(), 3000)
                  setTimeout(() => playAudio('static/audio/' + audio_b3[b3_index].file_name),3000)
                setTimeout(() => document.getElementById('transcript_11labs').innerHTML = 'AI: ' + audio_b3[b3_index].string, 3000)
                setTimeout(() => b3_index += 1, 3000)
              } else if(document.getElementById('transcript_11labs').innerHTML.indexOf("feel") != -1 && document.getElementById('transcript').innerHTML.indexOf("don't know") != -1) {
                playAudio('static/audio/know.mp3')
                document.getElementById('transcript_11labs').innerHTML =
                  'AI: you don\'t know?'
                  setTimeout(() => recognition.stop(), 3000)
                setTimeout(() => playAudio('static/audio/' + audio_b3[b3_index].file_name),3000)
                setTimeout(() => document.getElementById('transcript_11labs').innerHTML = 'AI: ' + audio_b3[b3_index].string, 3000)
                setTimeout(() => b3_index += 1, 3000)
              } else if(document.getElementById('transcript_11labs').innerHTML.indexOf("feel") != -1 && document.getElementById('transcript').innerHTML.indexOf("scared") != -1) {
                playAudio('static/audio/scared_Really.mp3')
                document.getElementById('transcript_11labs').innerHTML =
                  'AI: Scared... really?'
                  setTimeout(() => recognition.stop(), 3000)
                  setTimeout(() => playAudio('static/audio/' + audio_b3[b3_index].file_name),3000)
                setTimeout(() => document.getElementById('transcript_11labs').innerHTML = 'AI: ' + audio_b3[b3_index].string, 3000)
                setTimeout(() => b3_index += 1, 3000)
              } else if(document.getElementById('transcript_11labs').innerHTML.indexOf("feel") != -1 && document.getElementById('transcript').innerHTML.indexOf("bored") != -1) {
                playAudio('static/audio/really1.mp3')
                document.getElementById('transcript_11labs').innerHTML =
                  'AI: mmmh... really?'
                  setTimeout(() => recognition.stop(), 3000)
                  setTimeout(() => playAudio('static/audio/' + audio_b3[b3_index].file_name),3000)
                  setTimeout(() => document.getElementById('transcript_11labs').innerHTML = 'AI: ' + audio_b3[b3_index].string, 3000)
                  setTimeout(() => b3_index += 1, 3000)
              } else if(document.getElementById('transcript_11labs').innerHTML.indexOf("feel") != -1 && inputField.value.trim() !== '') {
                playAudio('static/audio/mmh.mp3')
                document.getElementById('transcript_11labs').innerHTML =
                  'AI: mmmh...'
                setTimeout(() => recognition.stop(), 2000)
                setTimeout(() => playAudio('static/audio/' + audio_b3[b3_index].file_name),2000)
                setTimeout(() => document.getElementById('transcript_11labs').innerHTML = 'AI: ' + audio_b3[b3_index].string, 2000)
                setTimeout(() => b3_index += 1, 2000)
              } else {
                playAudio('static/audio/' + audio_b3[b3_index].file_name)
                document.getElementById('transcript_11labs').innerHTML =
                  'AI: ' + audio_b3[b3_index].string
                b3_index += 1
                console.log(
                  'b3_index',
                  b3_index,
                  'audio_b3.length',
                  audio_b3.length
                )
              }
            //}
          }
        }
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
