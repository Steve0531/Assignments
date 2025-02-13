interface IQuestion {
    question: string;
    choices: string[];
    correctAnswer: string;
}


class Quiz {
    private questions: IQuestion[];
    private currentQuestionIndex: number = 0;
    private score: number = 0;

    constructor(questions: IQuestion[]) {
        this.questions = questions;
    }

    getCurrentQuestion(): IQuestion {
        return this.questions[this.currentQuestionIndex];
    }

    checkAnswer(answer: string): void {
        if (this.getCurrentQuestion().correctAnswer === answer) {
            this.score++;
        }
    }

    nextQuestion(): boolean {
        this.currentQuestionIndex++;
        return this.currentQuestionIndex < this.questions.length;
    }

    getScore(): number {
        return this.score;
    }

    getCurrentQuestionIndex(): number {
        return this.currentQuestionIndex;
    }

    getTotalQuestions(): number {
        return this.questions.length;
    }
}

const questions: IQuestion[] = [
    {
        question: "What is the capital of Maharashtra?",
        choices: ["Mumbai", "Pune", "Nashik", "Nagpur"],
        correctAnswer: "Mumbai"
    },
    {
        question: "Which is our national Animal?",
        choices: ["Tiger", "Elephant", "Lion", "Monkey"],
        correctAnswer: "Lion"
    },
    {
        question: "When is Valentines day celebrated?",
        choices: ["12 October", "14 Feb", "15 December", "5 June"],
        correctAnswer: "14 Feb"
    }
];

const quiz = new Quiz(questions);

const questionText = document.getElementById("question-text") as HTMLHeadingElement;
const choicesContainer = document.getElementById("choices-container") as HTMLDivElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
const scoreDisplay = document.getElementById("score-display") as HTMLHeadingElement;


function loadQuestion(): void {
    if (quiz.getCurrentQuestionIndex() >= quiz.getTotalQuestions()) {
        endQuiz();
        return;
    }

    const currentQuestion = quiz.getCurrentQuestion();
    questionText.textContent = currentQuestion.question;

    choicesContainer.innerHTML = ""; 

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
                } else {
                    endQuiz();
                }
            }, 3000); 
        };
        choicesContainer.appendChild(button);
    });
}

function updateScore(): void {
    scoreDisplay.textContent = `Score: ${quiz.getScore()}`;
}

function disableChoices(): void {
    const buttons = document.querySelectorAll(".choice-button");
    buttons.forEach(button => {
        (button as HTMLButtonElement).disabled = true;
    });
}

function endQuiz(): void {
    questionText.textContent = "Quiz Completed!";
    choicesContainer.innerHTML = "";
    nextBtn.style.display = "none"; 
    scoreDisplay.textContent = `Final Score: ${quiz.getScore()} / ${quiz.getTotalQuestions()}`;
}

scoreDisplay.style.display = "block";
scoreDisplay.textContent = `Score: ${quiz.getScore()}`;


nextBtn.style.display = "block";

loadQuestion();
