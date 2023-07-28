function sendData () {
    const formData = new FormData(form)
  
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      // Stop the recognition when the form is manually submitted
      recognition.stop()
      // Call the sendData function only when the user speaks (not generated audio)
      if (inputField.value.trim() !== '') {
        sendData()
      }
    })
  
    fetch('/generate', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Handle the response data, assuming 'data' is an object containing the 'response_text' and 'is_final' fields
        const responseText = data.response_text
        document.getElementById('transcript_11labs').innerHTML = responseText
  
        b1 = data.b1
        b2 = data.b2
        b3 = data.b3
  
        const matchingFiles = getMatchingFileName(responseText, vids_b1)
        file = matchingFiles[Math.random(0, matchingFiles.length() - 1)]
        console.log(file)
        fetchAndPlayVideo(file, 2000, true)
  
        // Check if the response is final and act accordingly
        if (data.is_final) {
          // Do something when the response is final, such as ending the recognition or resetting the form
          recognition.stop()
        }
        
        // Restart the recognition after the generated audio has finished streaming
        setTimeout(() => {
          recognition.start()
        }, 800)
      })
      .catch(error => {
        // Handle any errors that occurred during the AJAX request
        console.error('Error sending form data:', error)
  
        // Restart the recognition after an error occurs
        setTimeout(() => {
          recognition.start()
        }, 1000)
      })
  }