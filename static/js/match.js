function getMatchingFileName (response, vidsArray) {
    const matchingFiles = []
    const wordsInResponse = response.toLowerCase().match(/\b\w+\b/g) || [] // Extract words from response
    // console.log(wordsInResponse);
  
    for (const item of vidsArray) {
      const tags = item.tags.toLowerCase().split(', ') // Convert tags to lowercase and split by comma
      const fileName = item.file_name
  
      for (const word of wordsInResponse) {
        if (tags.includes(word)) {
          // console.log('Found matching word : ' + word);
          matchingFiles.push(fileName)
          break // Break out of the inner loop once a match is found
        }
      }
    }
  
    // console.log('matching files : ' + matchingFiles)
    return matchingFiles
  }