let currentQuestion,
  score = 0;
const Quiz = document.querySelector(".TPquick-quiz");
const Question = Quiz.children;
const Questions = {};

getQuizData();
buildQuiz();

/* get quiz data from divs and spans */
function getQuizData() {
  for (i = 0; i < Question.length; i++) {
    if (Question[i].classList.contains("TPqq-question-" + (i + 1))) {
      Questions["question" + (i + 1)] = {
        theQuestion: Question[i].firstChild.innerText,
        theAnswer: Question[i].getElementsByClassName("TPqq-answer")[0]
          .innerText,
        theResponses: Array.from(
          Question[i].getElementsByClassName("TPqq-response"),
          x => x.innerText
        )
      };
    }
  }
}

/* build quiz block from questions data */
function buildQuiz() {
  /* build question blocks */
  for (let i = 0; i < Question.length; i++) {
    const Response = Question[i].getElementsByClassName("TPqq-response");
    for (let j = 0; j < Response.length; j++) {
      Response[j].innerHTML =
        `<button>` +
        Questions["question" + (i + 1)].theResponses[j] +
        `</button>`;
      Response[j].firstElementChild.addEventListener("click", verifyAnswer);
    }
  }
}

/* verify answer */
function verifyAnswer(e) {
  const selectedButton = e.target;
  if (selectedButton.parentElement.classList.contains("TPqq-answer1")) {
    score++;
    selectedButton.parentElement.classList = "TPqq-response";
    Array.from(
      selectedButton.parentElement.parentElement.children
    ).forEach(x => {
      x.classList.contains("TPqq-answer") ? (x.className = "TPqq-response") : x;
    });
    moveToNext(e);
  }
  if (selectedButton.parentElement.classList.contains("TPqq-answer2")) {
    score = score + 2;
    selectedButton.parentElement.className = "TPqq-response";
    Array.from(
      selectedButton.parentElement.parentElement.children
    ).forEach(x => {
      x.classList.contains("TPqq-answer") ? (x.className = "TPqq-response") : x;
    });
    moveToNext(e);
  }
  if (selectedButton.parentElement.classList.contains("TPqq-answer3")) {
    score = score + 3;
    selectedButton.parentElement.className = "TPqq-response";
    Array.from(
      selectedButton.parentElement.parentElement.children
    ).forEach(x => {
      x.classList.contains("TPqq-answer") ? (x.className = "TPqq-response") : x;
    });
    moveToNext(e);
  }
  if (selectedButton.parentElement.classList.contains("TPqq-answer4")) {
    score = score + 4;
    selectedButton.parentElement.className = "TPqq-response";
    Array.from(
      selectedButton.parentElement.parentElement.children
    ).forEach(x => {
      x.classList.contains("TPqq-answer") ? (x.className = "TPqq-response") : x;
    });
    moveToNext(e);
  } 
}

/* move to next question */
function moveToNext(e) {
  const selectedButton = e.target;
  if (
    selectedButton.parentElement.parentElement.classList.contains(
      "TPqq-last-question"
    )
  ) {
    showResults();
  } else {
    selectedButton.parentElement.parentElement.nextSibling.scrollIntoView(true);
  }
}

/* show results */
function showResults() {
  console.log("your score is: " + score);
  if (score > 7) {
    if (score > 11) {
      if (score > 15) {
        /* display high score message */
        document
          .querySelector(".TPqq-winning-message-1")
          .classList.toggle("TPqq-hidden");
        document.querySelector(".TPqq-winning-message-1").scrollIntoView(true);
        return;
      }
      /* display 2nd place */ document
        .querySelector(".TPqq-winning-message-2")
        .classList.toggle("TPqq-hidden");
      document.querySelector(".TPqq-winning-message-2").scrollIntoView(true);
      return;
    }
    /* display 3rd place message */
    document
      .querySelector(".TPqq-winning-message-3")
      .classList.toggle("TPqq-hidden");
    document.querySelector(".TPqq-winning-message-3").scrollIntoView(true);
  } else {
    /* display losing message */
    document
      .querySelector(".TPqq-winning-message-4")
      .classList.toggle("TPqq-hidden");
    document.querySelector(".TPqq-winning-message-4").scrollIntoView(true);
  }
}
