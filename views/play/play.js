// DOM elements
const dom_start = document.querySelector("#start");
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#score");
const dom_scoreContainer = document.querySelector("#scoreContainer");

let questions = loadQuestions();
let runningQuestionIndex = 0;
let score = 0;

dom_start.addEventListener("click", onStart);

function hide(element) {
  if (!element) return;
  element.style.display = "none";
}

function show(element) {
  if (!element) return;
  element.style.display = "block";
}

function onStart() {
  questions = loadQuestions();
  runningQuestionIndex = 0;
  score = 0;

  renderQuestion();

  hide(dom_start);
  hide(dom_score);
  show(dom_quiz);
}

function renderQuestion() {
  const currentQuestion = questions[runningQuestionIndex];
  if (!currentQuestion) return;

  dom_question.textContent = currentQuestion.title;
  dom_choiceA.textContent = currentQuestion.choiceA;
  dom_choiceB.textContent = currentQuestion.choiceB;
  dom_choiceC.textContent = currentQuestion.choiceC;
  dom_choiceD.textContent = currentQuestion.choiceD;
}

function onPlayerSubmit(answer) {
  const currentQuestion = questions[runningQuestionIndex];
  if (!currentQuestion) return;

  if (answer === currentQuestion.correct) {
    score++;
  }

  if (runningQuestionIndex < questions.length - 1) {
    runningQuestionIndex++;
    renderQuestion();
  } else {
    renderSCore();
    hide(dom_quiz);
    show(dom_score);
  }
}

function renderSCore() {
  const scorePerCent = Math.round((score / questions.length) * 100);

  let emoji = "😡";
  if (scorePerCent > 80) {
    emoji = "😄";
  } else if (scorePerCent > 60) {
    emoji = "😊";
  } else if (scorePerCent > 40) {
    emoji = "😐";
  } else if (scorePerCent > 20) {
    emoji = "😕";
  }

  dom_scoreContainer.innerHTML = `
    <div>HUMMM ! ${scorePerCent}%</div>
    <div style="font-size: 80px; margin-top: 10px;">${emoji}</div>
  `;
}

// initial state
show(dom_start);
hide(dom_quiz);
hide(dom_score);


