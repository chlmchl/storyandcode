    // Function to open the popup window
    function openPopup() {
        const popupContent = `<!DOCTYPE html>
    <html>
  
    <head>
      <link rel="stylesheet" type="text/css" href="../static/css/popup.css" />
    </head>
  
    <main class="wrap">
    <section class="container">
      <div class="container__heading">
        <h2>Terms & Conditions</h2>
      </div>
      <div class="container__content">
        Please read the following agreement carefully before clicking on "Start Training." By proceeding with the application and clicking on the button, you are providing your explicit consent to the use of your data and granting access to your webcam, microphone, and computer for the purposes outlined below.
  
        <p><strong>1. Data Collection and Use:</strong></p>
      <p>During the AI Training Program, AYN-TYCHO Corp. (hereinafter referred to as "the Company") may collect and process certain personal information provided by you during the application process. This data may include but is not limited to your name, contact details, educational background, and professional experience. The Company will use this information solely for the purpose of evaluating your eligibility for the program and facilitating your participation.</p>
      <p><strong>2. Webcam and Microphone Access:</strong></p>
      <p>As part of the AI Training Program, you may be required to participate in video conference sessions, live assessments, or training exercises that involve the use of your webcam and microphone. By clicking on "Start Training," you grant the Company permission to access and use your webcam and microphone for these program-related activities.</p>
      <p><strong>3. Data Privacy and Security:</strong></p>
      <p>The Company is committed to ensuring the privacy and security of your data. Your personal information will be stored securely and treated in accordance with applicable data protection laws. The Company will not disclose or share your data with third parties without your explicit consent, except as required by law.</p>
      <p><strong>4. Recording and Monitoring:</strong></p>
      <p>Please be aware that certain program activities, such as video conference sessions, may be recorded for training, evaluation, or quality assurance purposes. The Company will ensure that any such recordings are used solely for internal purposes and in compliance with the applicable laws and regulations.
  </p>
      <p><strong>5. Revoking Consent:</strong></p>
      <p>You have the right to revoke your consent at any time during the AI Training Program. To do so, please contact the Company's designated data protection officer. However, please note that revoking consent may result in your inability to participate further in the program.
  </p>
      <p><strong>6. Compliance with Terms:</strong></p>
      <p>By clicking on "Start Training," you acknowledge that you have read, understood, and agreed to the terms of this Data Consent and Access Agreement. You also confirm that you have the necessary authority to provide consent on behalf of yourself and that you are at least 18 years of age or older.
  
      Please take a moment to review the terms of this agreement carefully before proceeding. If you do not agree with any part of this agreement, do not click on "Start Training," and your application will not be processed.
  
      If you have any questions or concerns regarding your data or access, please contact the Company's data protection officer at [contact email/phone number].
      </p>
      </div>
    </section>
  </main>`;
  
        // Open a new window with the popup content
        const popupWindow = window.open("", "PopupWindow", "width=600,height=400");
        popupWindow.document.write(popupContent);
        popupWindow.document.close();
      }
  
      // Add an event listener to the "Start Training" button
      const startTrainingBtn = document.getElementById("startTrainingBtn");
      startTrainingBtn.addEventListener("click", function () {
        openPopup();
      });