//Object holding questions
var questionBank = [
    q1 = {
        question: "Which state in the US has the most ski resorts?",
        options: ["Colorado", "New York", "Utah", "New Hampshire"],
        answer: "New York",
        image: "assets/images/newyork.jpg",
    },

    q2 = {
        question: "When was the first snow making machine invented?",
        options: ["1963", "1941", "1950", "1972"],
        answer: "1950",
        image: "assets/images/snow-making.jpg",
    },

    q3 = {
        question: "What is Shane McConkey's alter-ego?",
        options: ["Flipper", "McCloudy", "Shane the Plane", "Saucer Boy"],
        answer: "Saucer Boy",
        image: "assets/images/saucer-boy.gif",
    },

    q4 = {
        question: "Which resort has the highest elevation in the US?",
        options: ["Silverton Mountain", "Arapahoe Basin", "Telluride", "Loveland"],
        answer: "Silverton Mountain",
        image: "assets/images/silverton.jpg",
    },

    q5 = {
        question: "Which resort has the highest average annual snowfall??",
        options: ["Mt Baker, WA", "Sugar Bowl, CA", "Brighton, UT", "Alyeska, AK"],
        answer: "Alyeska, AK",
        image: "assets/images/powder.gif",
    },

    q6 = {
        question: "Which mountain has the longest run?",
        options: ["Chamonix, France", "Zermatt, Switzerland", "Alpe d’Huez, France", "Revelstoke, Canada"],
        answer: "Chamonix, France",
        image: "assets/images/chamonix.jpg",
    },

    q7 = {
        question: "Which of the following companies have been in business the longest?",
        options: ["Volkl", "Fischer", "K2", "Rossignol"],
        answer: "Rossignol",
        image: "assets/images/rossignol.jpg",
    },

    q8 = {
        question: "Which skier gave a shout out to The Wu-Tang Clan on live TV during the olympics?",
        options: ["Henrik Harlaut", "Russ Henshaw", "Bobby Brown", "James Woods"],
        answer: "Henrik Harlaut",
        image: "assets/images/henrik.gif",
    }
];

//Variable to hold index of questionBank array
var index = 0;

//Holds chosen question
var current = {};

//Variable for wins, losses, and no answer
var wins = 0;
var losses = 0;
var noanswer = 0;

//Function to generate questions
function generateQuestion(x) {
    current.question = x.question;
    current.options = x.options;
    current.answer = x.answer;
    current.image = x.image;
    longTimer.reset();
    longTimer.start();
    displayQuestionHTML();
}

//Function to dynamically update HTML for each question asked
function displayQuestionHTML() {
    $("#timer-div").show();
    $("#options-div").show();
    $("#question-div").text(current.question);
    $("#option1-div").text(current.options[0]);
    $("#option2-div").text(current.options[1]);
    $("#option3-div").text(current.options[2]);
    $("#option4-div").text(current.options[3]);
    $("#correct-answer").hide();
    $("#image").hide();
    $("#image").attr("src", "");
    longTimer.reset();
    longTimer.start();
}

//Variable that holds our setInterval that runs the timer
var intervalId;

//Main timer object
var clockRunning = false;
var longTimer = {

    time: 30,

    reset: function () {
        longTimer.time = 30;
        $("#timer-div").show();
        $("#timer-div").text("Time remaining: " + longTimer.time + " seconds");
    },

    hide: function () {
        $("#timer-div").hide();
    },

    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(longTimer.count, 1000);
            clockRunning = true;
            $("#timer-div").show();
        }
    },

    count: function () {
        longTimer.time--
            $("#timer-div").text("Time remaining: " + longTimer.time + " seconds");
        if (longTimer.time == 0) {
            noanswer++;
            index++;
            displayTimeUp();
        }
    },

    stop: function () {
        clearInterval(intervalId);
        clockRunning = false;
    },
}

//Create 5 second timer for in between questions
function fiveSecondTimeout() {
    setTimeout(function () {
        generateQuestion(questionBank[index]);
    }, 5000);
}

//Function to update correct answer display
function displayAnswerHTML() {
    longTimer.hide();
    $("#options-div").hide();
    $("#correct-answer").show();
    $("#image").attr("src", current.image).addClass("image");
    $("#image").show();
    fiveSecondTimeout();
}

//Function to display a win
function displayWin() {
    displayAnswerHTML();
    $("#question-div").text("Correct!")
    $("#correct-answer").text("");
    if ((wins + losses + noanswer) == 8) {
        gameEnd();
    };
}

//Function to display a loss
function displayLoss() {
    displayAnswerHTML();
    $("#question-div").text("Incorrect!");
    $("#correct-answer").text("The correct answer was " + current.answer);
    if ((wins + losses + noanswer) == 8) {
        gameEnd();
    };
}

//Function to display if time is up
function displayTimeUp() {
    displayAnswerHTML();
    $("#question-div").text("Out of Time!");
    $("#correct-answer").text("The correct answer was " + current.answer);
    if ((wins + losses + noanswer) == 8) {
        gameEnd();
    };
}

//Function to change page once all questions have been answered
function gameEnd() {
    setTimeout(function () {
        $("#question-div").text("Game Over");
        $("#question-div").append("<br> Correct Answers: " + wins);
        $("#question-div").append("<br> Wrong Answers: " + losses);
        $("#question-div").append("<br> Not Answered: " + noanswer);
        $("#correct-answer").empty();
        $("#image").hide();
        $("#reset-btn").show();
        longTimer.stop();
    }, 5000);
}

//Create reset function
function resetGame() {
    $("#reset-btn").hide();
    $("#question-div").empty();
    $("#start-btn").show();
    wins = 0;
    losses = 0;
    noanswer = 0;
    index = 0;
}

//Create start game function
function startGame() {
    $("#start-btn").hide();
    longTimer.reset();
    longTimer.start();
    generateQuestion(questionBank[index]);
}

$(document).ready(function () {

    $("#reset-btn").hide();
    $("#image").hide();
    $("#options-div").hide();

    //Determine if guess is correct
    $("#option1-div").click(function () {
        if (current.options[0] === current.answer) {
            wins++;
            index++;
            displayWin();
        } else {
            losses++;
            index++;
            displayLoss();
        }
    });
    $("#option2-div").click(function () {
        if (current.options[1] === current.answer) {
            wins++;
            index++;
            displayWin();
        } else {
            losses++;
            index++;
            displayLoss();
        }
    });
    $("#option3-div").click(function () {
        if (current.options[2] === current.answer) {
            wins++;
            index++;
            displayWin();
        } else {
            losses++;
            index++;
            displayLoss();
        }
    });
    $("#option4-div").click(function () {
        if (current.options[3] === current.answer) {
            wins++;
            index++;
            displayWin();
        } else {
            losses++;
            index++;
            displayLoss();
        }
    });

    //Call start function with start button
    $("#start-btn").click(function () {
        startGame();
    })
    //Call reset function with reset button
    $("#reset-btn").click(function () {
        resetGame();
    })
});