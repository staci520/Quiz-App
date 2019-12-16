// Define variables
let currentQuestionNumber = 0;
let totalNumberOfQuestions = STORE.length;
let totalScore = 0;

// When a user clicks on start quiz button - called from handleQuizApp()
function startQuiz() {

  // JQuery selector and event handler for when user clicks on the 'Start' button
  // The start section in HTML '<section class="start-section">' will be hidden and the
  // quiz section in HTML '<section class="quiz-section">' will be shown
  // Then display the question by invoking questionDisplay() function
  $('#startQuizButton').on('click', (event) => {
    $('.start-section').hide();
    $('.next-button').hide();
    $('.quiz-section').show()
    questionDisplay();
  });

  // JQuery selector and event handler for when user clicks on the radio button in the 'quiz-section'
  // When user clicks on answer (radio button), store answer (0-3) to variable 'userAnswer'
  $('#submitButton').on('click', (event) => {
    // We don't want the default 'submit' action to take place in the form because it will
    // produce undesirable behavior
    event.preventDefault();

    // Invoke function that handles the submit button click
    handleSubmitButton();
  })

  // JQuery selector and event handler for the 'Next' button
  // When the user clicks on 'Next', the results section will be hidden
  $('#nextButton').on('click', (event) => {
    // We don't want the default 'submit' action to take place in the form because it will
    // produce undesirable behavior
    event.preventDefault();
  
    // Invoke function that handles the next button click
    handleNextButton()
  });

}

// Display quiz questions and question number
function questionDisplay() {

  //$('#option1').focus()

  // Updates question text with value from STORE
  $('#question').text(STORE[currentQuestionNumber].questionText);

  // Displays the number of the current question
  $('#questionNumberDisplay').text("Question " + (currentQuestionNumber + 1) + " of " + totalNumberOfQuestions);

}

// Handle the submit button
function handleSubmitButton() {
    
    // Store value from user's selection to a variable
    let userAnswer = $("input[class='optionRadio']:checked").val();

    // Check to make sure the user has answered the question
    if (typeof userAnswer === 'undefined') {
      alert("You must make a choice!");
      return;
    }
    
    // Based on the user's answer, use JQuery selector to change #resultText in '<result-section>' in HTML
    // show 'result text' from array of objects in STORE
    if (userAnswer === "3") {
      $('#resultText').text(STORE[currentQuestionNumber].result3Text);
    } else if (userAnswer === "2") {
      $('#resultText').text(STORE[currentQuestionNumber].result2Text);
    } else if (userAnswer === "1" || "0") {
      $('#resultText').text(STORE[currentQuestionNumber].result1Text);
    }
  
    // Show score
    $('#scoreTotalText').text("Score: " + userAnswer);
    $('.result-section').show();
  
    $("input[type=radio]").attr('disabled', true);
  
    $('#submitButton').hide()
    $('#nextButton').show()

}


// Display the final section after the quiz has been completed - called in handleNextButton() if the user
// clicked on 'Next' button and they were on the last question
function finalSectionDisplay() {
  $('.quiz-section').hide();
  $('.final-section').show();
}

// When user clicks on next button, we're going to the next question so we need to
// uncheck the radio buttons and make sure they're enabled
function handleNextButton() {

  // Hide the results section
  $('.result-section').hide();

  // Increment the question number by 1
   currentQuestionNumber++

  $("input[type=radio]").prop('checked', false);
  $("input[type=radio]").attr('disabled', false);
  $("#nextButton").hide()
  $("#submitButton").show()

  // If the current question number is less than the length of the STORE array, display the question,
  // otherwise display the final 
  if (currentQuestionNumber < STORE.length) {
    questionDisplay()

  } else {
    finalSectionDisplay();
  }
}

// Restart the quiz
function restartQuiz() {
  $('body').on('click', '#restartQuiz', (event) => {
    currentQuestionNumber = 0;
    totalScore = 0;
    $('.final-section').hide()
    $('.quiz-section').show()
    $("input[type=radio]").prop('checked', false);
    $("input[type=radio]").attr('disabled', false);
    questionDisplay();
  });
}

// Invoked as the first function
function handleQuizApp() {
  startQuiz();
  restartQuiz();
}

// Run the app by invoking handleQuizApp() function which starts the quiz
$(handleQuizApp);