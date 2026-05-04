// The quiz uses the questions array from data/questions.js.
// This object stores only the current session state.
const quizState = {
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswers: [],
  detectedMisconceptions: [],
  teacherMisconceptionCounts: {}
};

const AI_FEEDBACK_TIMEOUT_MS = 5000;

const screens = {
  start: document.getElementById("startScreen"),
  quiz: document.getElementById("quizScreen"),
  results: document.getElementById("resultsScreen"),
  dashboard: document.getElementById("dashboardScreen")
};

const startButton = document.getElementById("startButton");
const dashboardButton = document.getElementById("dashboardButton");
const resultsDashboardButton = document.getElementById("resultsDashboardButton");
const backToQuizButton = document.getElementById("backToQuizButton");
const restartButton = document.getElementById("restartButton");
const nextButton = document.getElementById("nextButton");
const aiFeedbackToggle = document.getElementById("aiFeedbackToggle");

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const feedbackPanel = document.getElementById("feedbackPanel");
const feedbackLabel = document.getElementById("feedbackLabel");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");
const counterExampleBox = document.getElementById("counterExampleBox");
const counterExampleText = document.getElementById("counterExampleText");
const finalScore = document.getElementById("finalScore");
const studentSummary = document.getElementById("studentSummary");
const dashboardContent = document.getElementById("dashboardContent");

function getQuestionBankError() {
  if (typeof questions === "undefined") {
    return "The question bank could not be found. Check that data/questions.js is loaded before script.js.";
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return "The question bank is empty. Add at least one question to data/questions.js.";
  }

  for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
    const question = questions[questionIndex];

    if (!question.text) {
      return "Question " + (questionIndex + 1) + " is missing its question text.";
    }

    if (!Array.isArray(question.options) || question.options.length === 0) {
      return "Question " + (questionIndex + 1) + " needs at least one answer option.";
    }

    let correctAnswerCount = 0;

    for (let optionIndex = 0; optionIndex < question.options.length; optionIndex++) {
      const option = question.options[optionIndex];
      const answerNumber = "Question " + (questionIndex + 1) + ", answer " + (optionIndex + 1);

      if (!option.text) {
        return answerNumber + " is missing answer text.";
      }

      if (!option.feedback) {
        return answerNumber + " is missing feedback.";
      }

      if (option.correct) {
        correctAnswerCount = correctAnswerCount + 1;
      } else if (!option.misconception || !option.counterExample) {
        return answerNumber + " needs a misconception and counter-example.";
      }
    }

    if (correctAnswerCount !== 1) {
      return "Question " + (questionIndex + 1) + " should have exactly one correct answer.";
    }
  }

  return "";
}

function showQuestionBankError(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.style.color = "#b42318";
  errorMessage.style.fontWeight = "700";
  startButton.insertAdjacentElement("beforebegin", errorMessage);
  startButton.disabled = true;
}

function showScreen(screenName) {
  // Hide all screens, then show the one requested.
  Object.values(screens).forEach(function (screen) {
    screen.classList.remove("active");
  });

  screens[screenName].classList.add("active");
}

function startQuiz() {
  const questionBankError = getQuestionBankError();

  if (questionBankError) {
    return;
  }

  quizState.currentQuestionIndex = 0;
  quizState.score = 0;
  quizState.selectedAnswers = [];
  quizState.detectedMisconceptions = [];

  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[quizState.currentQuestionIndex];

  progressText.textContent = "Question " + (quizState.currentQuestionIndex + 1) + " of " + questions.length;
  scoreText.textContent = "Score: " + quizState.score;
  questionText.textContent = question.text;
  answerOptions.innerHTML = "";

  feedbackPanel.classList.add("hidden");
  feedbackPanel.classList.remove("correct-feedback", "wrong-feedback");

  question.options.forEach(function (option, optionIndex) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = option.text;
    button.addEventListener("click", function () {
      chooseAnswer(option, optionIndex);
    });

    answerOptions.appendChild(button);
  });
}

function chooseAnswer(option, optionIndex) {
  const question = questions[quizState.currentQuestionIndex];
  const buttons = answerOptions.querySelectorAll(".answer-button");

  // Stop students from answering the same question twice.
  buttons.forEach(function (button) {
    button.disabled = true;
  });

  quizState.selectedAnswers.push({
    question: question.text,
    answer: option.text,
    correct: option.correct,
    misconception: option.misconception || null
  });

  if (option.correct) {
    quizState.score = quizState.score + 1;
    buttons[optionIndex].classList.add("correct");
    showCorrectFeedback(option);
  } else {
    buttons[optionIndex].classList.add("wrong");
    markCorrectOption(question, buttons);
    recordMisconception(option);
    showWrongFeedback(option);
  }

  scoreText.textContent = "Score: " + quizState.score;
}

function markCorrectOption(question, buttons) {
  question.options.forEach(function (option, index) {
    if (option.correct) {
      buttons[index].classList.add("correct");
    }
  });
}

function getCorrectAnswerText(question) {
  const correctOption = question.options.find(function (option) {
    return option.correct;
  });

  return correctOption ? correctOption.text : "";
}

function recordMisconception(option) {
  const misconceptionName = option.misconception;

  if (!misconceptionName) {
    return;
  }

  quizState.detectedMisconceptions.push({
    name: misconceptionName,
    explanation: option.feedback,
    counterExample: option.counterExample
  });

  if (!quizState.teacherMisconceptionCounts[misconceptionName]) {
    quizState.teacherMisconceptionCounts[misconceptionName] = 0;
  }

  quizState.teacherMisconceptionCounts[misconceptionName] =
    quizState.teacherMisconceptionCounts[misconceptionName] + 1;
}

function showCorrectFeedback(option) {
  feedbackPanel.classList.remove("hidden");
  feedbackPanel.classList.add("correct-feedback");
  feedbackLabel.textContent = "Correct";
  feedbackTitle.textContent = "Good reasoning";
  feedbackText.textContent = option.feedback;
  counterExampleBox.classList.add("hidden");
  updateNextButtonText();
}

function showWrongFeedback(option) {
  const question = questions[quizState.currentQuestionIndex];

  feedbackPanel.classList.remove("hidden");
  feedbackPanel.classList.add("wrong-feedback");
  feedbackLabel.textContent = "Misconception detected";
  feedbackTitle.textContent = option.misconception;
  feedbackText.textContent = option.feedback;
  counterExampleText.textContent = option.counterExample;
  counterExampleBox.classList.remove("hidden");
  updateNextButtonText();

  if (aiFeedbackToggle.checked) {
    addAiFeedback(question, option);
  }
}

async function addAiFeedback(question, option) {
  const controller = new AbortController();
  const timeoutId = setTimeout(function () {
    controller.abort();
  }, AI_FEEDBACK_TIMEOUT_MS);

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify({
        question: question.text,
        selectedAnswer: option.text,
        correctAnswer: getCorrectAnswerText(question),
        misconception: option.misconception,
        existingFeedback: option.feedback,
        studentAgeRange: "11-16"
      })
    });

    if (!response.ok) {
      throw new Error("AI feedback request failed.");
    }

    const data = await response.json();

    if (!data.explanation || !data.followUpQuestion) {
      throw new Error("AI feedback response was incomplete.");
    }

    feedbackText.textContent =
      data.explanation + " Follow-up question: " + data.followUpQuestion;
  } catch (error) {
    console.warn("Using prewritten feedback because AI feedback was unavailable.", error);
  } finally {
    clearTimeout(timeoutId);
  }
}

function updateNextButtonText() {
  const isLastQuestion = quizState.currentQuestionIndex === questions.length - 1;
  nextButton.textContent = isLastQuestion ? "See results" : "Next question";
}

function goToNextQuestion() {
  const isLastQuestion = quizState.currentQuestionIndex === questions.length - 1;

  if (isLastQuestion) {
    renderResults();
    showScreen("results");
    return;
  }

  quizState.currentQuestionIndex = quizState.currentQuestionIndex + 1;
  renderQuestion();
}

function renderResults() {
  finalScore.textContent = "You scored " + quizState.score + " out of " + questions.length + ".";
  studentSummary.innerHTML = "";

  if (quizState.detectedMisconceptions.length === 0) {
    studentSummary.innerHTML = "<p>No misconceptions were detected in this attempt.</p>";
    return;
  }

  const groupedMisconceptions = groupStudentMisconceptions();

  Object.keys(groupedMisconceptions).forEach(function (name) {
    const item = groupedMisconceptions[name];
    const summaryItem = document.createElement("article");
    summaryItem.className = "summary-item";
    summaryItem.innerHTML =
      "<h3>" + name + " <span class=\"count-badge\">" + item.count + "</span></h3>" +
      "<p>" + item.explanation + "</p>" +
      "<p><strong>Try this counter-example:</strong> " + item.counterExample + "</p>";

    studentSummary.appendChild(summaryItem);
  });
}

function groupStudentMisconceptions() {
  const grouped = {};

  quizState.detectedMisconceptions.forEach(function (misconception) {
    if (!grouped[misconception.name]) {
      grouped[misconception.name] = {
        count: 0,
        explanation: misconception.explanation,
        counterExample: misconception.counterExample
      };
    }

    grouped[misconception.name].count = grouped[misconception.name].count + 1;
  });

  return grouped;
}

function renderDashboard() {
  dashboardContent.innerHTML = "";

  const misconceptionNames = Object.keys(quizState.teacherMisconceptionCounts);

  if (misconceptionNames.length === 0) {
    dashboardContent.innerHTML = "<p>No misconceptions have been detected yet. Ask a student to complete the quiz first.</p>";
    return;
  }

  misconceptionNames.sort(function (firstName, secondName) {
    return quizState.teacherMisconceptionCounts[secondName] - quizState.teacherMisconceptionCounts[firstName];
  });

  misconceptionNames.forEach(function (name) {
    const count = quizState.teacherMisconceptionCounts[name];
    const dashboardItem = document.createElement("article");
    dashboardItem.className = "dashboard-item";
    dashboardItem.innerHTML =
      "<h3>" + name + " <span class=\"count-badge\">" + count + "</span></h3>" +
      "<p>Detected " + count + " time" + (count === 1 ? "" : "s") + " in this session.</p>";

    dashboardContent.appendChild(dashboardItem);
  });
}

function openDashboard() {
  renderDashboard();
  showScreen("dashboard");
}

function goBackFromDashboard() {
  if (quizState.selectedAnswers.length === questions.length) {
    showScreen("results");
  } else if (quizState.selectedAnswers.length > 0) {
    showScreen("quiz");
  } else {
    showScreen("start");
  }
}

const questionBankError = getQuestionBankError();

if (questionBankError) {
  showQuestionBankError(questionBankError);
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", goToNextQuestion);
dashboardButton.addEventListener("click", openDashboard);
resultsDashboardButton.addEventListener("click", openDashboard);
backToQuizButton.addEventListener("click", goBackFromDashboard);
