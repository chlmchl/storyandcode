function sendData () {
    const formData = new FormData(form)
  
    form.addEventListener('submit', function (event) {
      event.preventDefault()
    })
  
    fetch('/generate', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Handle the response data, assuming 'data' is an object containing the 'response_text' and 'is_final' fields
        const responseText = "Hello, " + data.response_text
        document.getElementById('transcript_11labs').innerHTML = "AI: " + responseText
  
        console.log(file)
  
      

      })
      .catch(error => {
        // Handle any errors that occurred during the AJAX request
        console.error('Error sending form data:', error)
  
        // Restart the recognition after an error occurs

      })
  }