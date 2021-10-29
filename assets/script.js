//DOM Element Variables

var questionEl = document.getElementById("quiz-questions");
var choicesEl = document.getElementById("choices");
var responseEl = document.getElementById("response");
var startBtn = document.getElementById("start-button");
var submitBtn = document.getElementById("submit-score");
var timeEl = document.getElementById("time");
var initialsEl = document.getElementById("initials");
var currentQuestion;
var currentQuestionIndex = 0;

// The array of questions, choices and answers
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];

  //Timer Variables
var questionIndex = 0;
var time = questions.length * 15;
var currentTime;

// Function to start the game
function startQuiz() {

     //Runs the function to set the time intervals
     setTime();
    //Variable for the start screen
    var startScreenEl = document.getElementById("start-screen");

    console.log("this is my time inside startquiz:", time);
    //Hides the start screen
    startScreenEl.setAttribute("class","hidden");

    //Displays the questions and answers
    questionEl.removeAttribute("class");   

    //Runs the function to select new question
    newQuestion();
}

//Sets time interval in variable
function setTime() {
    currentTime = setInterval(function() {
    time--;
    timeEl.textContent = time;

    // Checks to see if the users time has run out
    if (time <= 0) {
            //Calls function to create and append image
            endQuiz();
        }
    }, 1000);
}


function newQuestion() {
    //Obtain first question from the questions array
    currentQuestion = questions[currentQuestionIndex];

    //Update h2 title with currentQuestion from the questions array
    var titleEl = document.getElementById("quiz-questions-title")
    titleEl.textContent = currentQuestion.title;

    //Clears old questions
    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
    //Creates a button for each of the question choices
        var multipleChoice = document.createElement("button");
        multipleChoice.setAttribute("class", "choices");
        multipleChoice.setAttribute("value", choice);

        multipleChoice.textContent = i + 1 + ". " + choice;

        //Creates an event listner for each button
        multipleChoice.onclick = chosenAnswer;
        
        //Displays the chosen answer on the page
        choicesEl.appendChild(multipleChoice);
});
}



//Function determines how to response to the selected response
function chosenAnswer() {
  console.log(this.value)
  console.log(questionIndex)
  console.log(questions[questionIndex].answer)
    //If wrong answer was selected, minus 15 seconds
        if (this.value !== questions[currentQuestionIndex].answer) {
        console.log(this.value)


    //time penalization
    time -=15;    

    //If correct answer selected, do not minus any time
    if (time < 0) {
        time = 0;
    }
    
    //Display the time on the page with any adjustments     
    timeEl.textContent = time;

    //Response if the answer is wrong
    responseEl.textContent = 'Wrong!';

    } else { 
    //Response if the answer is correct
    responseEl.textContent = "Correct!"
    }
    //Show whether the answer was correct/wrong for 1 second
    responseEl.setAttribute("class", "response");

    setTimeout(function(){
        responseEl.setAttribute("class", "response hidden");
    }, 1000);

    //Advance to the next question
    currentQuestionIndex++;

    //If there are no more questions, end the Quiz
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        newQuestion();
    }
}



//Function to end the game 
function endQuiz() {
     //Stops execution of action at set interval
     clearInterval(currentTime);

    //Hide Questions
    questionEl.setAttribute("class", "hidden")

    //Shows the end screen
    let endScreenEl = document.getElementById("game-over")
    // endScreenEl.setAttribute("game-over");
    endScreenEl.removeAttribute("class");

    //Shows the final score
    let finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
}

function saveHighscores() {
    //Obtain initials from input box
    var initials = initialsEl.value;

    //Ensure the box contains a value
    if (initials !== "") {
        //Request the saved scores from the local storage
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        //Format score for new Object
        var newScore = {
            score: time,
            initials: initials
        };

        //Save to local storage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        ///Redirects to the next page
        window.location.href = "scores.html"
    }
}


// Clicking "Start Quiz" button begins the quiz
startBtn.onclick = startQuiz

// user clicks button to submit initials
submitBtn.onclick = saveHighscores;

//Event key to save Highscore after selecting enter
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscores();
    }
}
