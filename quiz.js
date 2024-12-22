const statement = document.getElementById("statement");
const optionButtons = document.querySelector("#options").children;
const nextQuestionButton = document.getElementById("next-question-button");
const explanation = document.getElementById("explanation");
const guessedQuestions = document.querySelector(".guessed-questions");
const allQuestions = document.querySelector(".all-questions");

let rightGuesses = 0;
let allGuesses = 0;

function disable(button) {
  button.disabled = true;
}

function enable(button) {
  button.disabled = false;
}

disable(nextQuestionButton);

let guess;
let questionNumber = 1;

const facts = [
  {
    statement: "Правда ли, что любимое число Андрея - 17?",
    answer: true,
    explanation: "Это правда, хотя он не помнит об этом.",
  },
  {
    statement: "Правда ли, что любимая еда Андрея - это мясо по-французски?",
    answer: false,
    explanation: "На самом деле любимая Андрея - это уксус.",
  },
  {
    statement:
      "Правда ли, что Андрей умеет радоваться при любых обстоятельствах?",
    answer: false,
    explanation: "Это неправда.",
  },
  {
    statement: "Правда ли, что Андрей - полиглот (владеет 5 и больше языками)?",
    answer: true,
    explanation:
      "Это правда. Он знает русский, украинский, английский, иврит, C++, JavaScript, Python и др.",
  },
  {
    statement: "Правда ли, что Андрей?",
    answer: true,
    explanation: "Это правда.",
  },
];

let fact = facts[questionNumber - 1];

statement.textContent = fact.statement;

function isCorrect(guessString) {
  return guessString === fact.answer.toString();
}

for (let button of optionButtons) {
  button.addEventListener("click", () => {
    explanation.textContent = fact.explanation;
    explanation.classList.add("text-decoration");
    for (let otherButton of optionButtons) {
      disable(otherButton);
    }

    if (isCorrect(button.value)) {
      button.classList.add("correct");

      rightGuesses += 1;
      guessedQuestions.innerText = rightGuesses;
      allGuesses += 1;
      allQuestions.innerText = allGuesses;
    } else {
      button.classList.add("incorrect");
      allGuesses += 1;
      allQuestions.innerText = allGuesses;
    }

    enable(nextQuestionButton);

    if (questionNumber === facts.length) {
      nextQuestionButton.disabled = true;
      nextQuestionButton.innerText = "Больше вопросов нет!";
    }
  });
}

nextQuestionButton.addEventListener("click", () => {
  fact = facts[questionNumber];

  statement.textContent = fact?.statement;

  for (let otherButton of optionButtons) {
    enable(otherButton);
    otherButton.classList.remove("incorrect");
    otherButton.classList.remove("correct");
  }

  explanation.textContent = "";
  explanation.classList.remove("text-decoration");

  questionNumber += 1;
});
