function getMatchingFileName (vidsArray) {
    const matchingFiles = []
    const response = document.getElementById('transcript_11labs').innerHTML;
    const wordsInResponse = response.toLowerCase().match(/\b\w+\b/g) || [] // Extract words from response
    // console.log(wordsInResponse);
  
    for (const item of vidsArray) {
      const tags = item.tags.toLowerCase().split(', ') // Convert tags to lowercase and split by comma
      const randomVideoUrl = item.file_name
  
      for (const word of wordsInResponse) {
        if (tags.includes(word)) {
          //console.log('Found matching word : ' + word);
          matchingFiles.push(randomVideoUrl)
          break // Break out of the inner loop once a match is found
        }
      }
    }
  
    //console.log('matching files : ' + matchingFiles)
    return matchingFiles
  }