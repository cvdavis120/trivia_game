$("document").ready(function() {
  // // Page stuff
  $("#gameStart").click(function() {
    $(".game").removeAttr("hidden");
    $(".timer").removeAttr("hidden");
    $("#gameStart").hide();
    startClock();
    displayChange(0);
  });

  // GAME

  const questionArray = [
    "What is the collective name for a group of lions",
    "What kind of creature is a Portuguese man o' war?",
    "What type of animal is a Flemish giant?",
    "How many arms do most starfish have?",
    "Which adjective is used to describe a horse with two different colored patches, usually black and white?"
  ];

  const bigArrayofChoices = [
    ["A Squad", "A Pride", "A Pack"],
    ["A Dog", "A Crab", "A Jellyfish"],
    ["A Rabbit", "A Bird", "A Squid"],
    ["6", "5", "4"],
    ["Gossamer", "Cow", "Piebald."]
  ];

  const answerArray = ["1", "2", "0", "1", "2"];

  let gameDone = false;
  let correctCount = 0;
  let wrongCount = 0;
  let userAnswer = "";
  let userWins = 0;
  let questionCount = 0;
  let clockRunning = false;
  var intervalId;
  var time = 0;

  //moving the cards. one from another with the correct info displayed
  function displayChange(i) {
    $(".question").text(questionArray[i]);
    var ourChoice = bigArrayofChoices[i];
    var sillyCount = 0;
    ourChoice.forEach(function(n) {
      sillyCount++;
      $("#choice-" + sillyCount).text(n);
      $("#choice-" + sillyCount).removeAttr("checked");
    });
  }
  function gameEnd() {
    //points and stuff
    if (correctCount > wrongCount) {
      userWins++;
      $(".question").text("FINAL RESULTS: WINNER");
    } else {
      $(".question").text("FINAL RESULTS: LOSER");
    }
    //display
    gameDone = true;

    $("#choice-1").text("Correct: " + correctCount);
    $("#choice-2").text("Wrong: " + wrongCount);
    $("#choice-3").text("Total Wins: " + userWins);
    $(".submit").text("Reset");
    funTimer();
  }
  function loseEarly() {
    gameOver = true;
    $(".question").text("YOU RAN OUT OF TIME");
    $("#choice-1").text("Click to Reset");
    $("#choice-2").text("");
    $("#choice-3").text("");
    $(".submit").text("Reset");
    funTimer();
  }
  if (gameDone === true) {
    $(".submit").on("click", function() {
      gameReset();
    });
  }
  $(".submit").on("click", function() {
    if (userAnswer === "") return false;
    //record answers
    answerCheck(userAnswer);
    //display change
    if (questionCount != 4) {
      questionCount++;
      displayChange(questionCount);
      resetTimer();
      startClock();
    } else {
      gameEnd();
    }
  });

  $(".form-check-input").on("click", function() {
    userAnswer = "";
    console.log($(this).attr("value"));
    var answer = $(this).attr("value");
    userAnswer = answer;
  });
  function answerCheck(i) {
    var correctAnswer = answerArray[questionCount];
    if (i === correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  }

  function gameReset() {
    gameOver = false;
    resetTimer();
    startClock();
    displayChange(0);
    correctCount = 0;
    wrongCount = 0;
    userAnswer = "";
    questionCount = 0;
  }
  //TIMER

  function startClock() {
    if (!clockRunning) {
      intervalId = setInterval(count, 1000);
      clockRunning = true;
    }
  }
  function count() {
    //  TODO: increment time by 1, remember we cant use "this" here.
    time += 6;
    console.log(time);
    $(".progress-bar").attr("aria-valuenow", time);
    $(".progress-bar").attr("style", "width:" + time + "%");
    if (time > 100) {
      stopTimer();
      loseEarly();
    }
  }
  function stopTimer() {
    clearInterval(intervalId);
    clockRunning = false;
  }
  function resetTimer() {
    time = 0;
    stopTimer();
    $(".progress-bar").attr("aria-valuenow", "0");
    $(".progress-bar").attr("style", "0");
  }
  function funTimer() {
    resetTimer();

    var internalCount = 0;
    $(".progress-bar").attr("aria-valuenow", "100");
    $(".progress-bar").attr("style", "width: 100%");
    intervalId = setInterval(changing, 500);

    function changing() {
      var words = ["bg-success", "bg-info", "bg-warning", "bg-danger", ""];
      var neededClass =
        "progress-bar progress-bar-striped progress-bar-animated ";
      var moreWords = words[internalCount];
      if (internalCount === 5) {
        internalCount = 0;
      }
      $(".progress-bar").attr("class", neededClass + moreWords);
      internalCount++;
    }
  }
});
