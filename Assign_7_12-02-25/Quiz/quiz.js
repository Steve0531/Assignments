"use strict";
// Quiz class to handle the quiz logic
class Quiz {
    constructor(questions) {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = questions;
    }
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    checkAnswer(answer) {
        if (this.getCurrentQuestion().correctAnswer === answer) {
            this.score++;
        }
    }
    nextQuestion() {
        this.currentQuestionIndex++;
        return this.currentQuestionIndex < this.questions.length;
    }
    getScore() {
        return this.score;
    }
    getCurrentQuestionIndex() {
        return this.currentQuestionIndex;
    }
    getTotalQuestions() {
        return this.questions.length;
    }
}
// Sample questions for the quiz
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "Which language is used for web development?",
        choices: ["Python", "Java", "JavaScript", "C++"],
        correctAnswer: "JavaScript"
    }
];
// Create an instance of Quiz
const quiz = new Quiz(questions);
// Get UI elements
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices-container");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");
// Load the current question into the UI
function loadQuestion() {
    if (quiz.getCurrentQuestionIndex() >= quiz.getTotalQuestions()) {
        endQuiz();
        return;
    }
    const currentQuestion = quiz.getCurrentQuestion();
    questionText.textContent = currentQuestion.question;
    choicesContainer.innerHTML = ""; // Clear previous choices
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("choice-button");
        button.onclick = () => {
            quiz.checkAnswer(choice);
            updateScore();
            disableChoices();
            setTimeout(() => {
                if (quiz.nextQuestion()) {
                    loadQuestion();
                }
                else {
                    endQuiz();
                }
            }, 1000); // ✅ Automatically move to the next question after 1 second
        };
        choicesContainer.appendChild(button);
    });
}
// Update score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${quiz.getScore()}`;
}
// Disable choices after selecting an answer
function disableChoices() {
    const buttons = document.querySelectorAll(".choice-button");
    buttons.forEach(button => {
        button.disabled = true;
    });
}
// Function to handle end of quiz
function endQuiz() {
    questionText.textContent = "Quiz Completed!";
    choicesContainer.innerHTML = "";
    nextBtn.style.display = "none"; // ✅ Hide Next button at the final screen
    scoreDisplay.textContent = `Final Score: ${quiz.getScore()} / ${quiz.getTotalQuestions()}`;
}
// ✅ Ensure the score is visible from the start
scoreDisplay.style.display = "block";
scoreDisplay.textContent = `Score: ${quiz.getScore()}`;
// ✅ Ensure the Next button is always visible (except on the final screen)
nextBtn.style.display = "block";
// Initialize the quiz by loading the first question
loadQuestion();
