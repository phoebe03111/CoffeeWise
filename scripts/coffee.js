const quizData = [
  {
    question: "Which item does not include caffeine?",
    a: "Coke",
    b: "Energy drinks",
    c: "Chocolate",
    d: "None of above, duh",
    correct: "d",
  },
  {
    question: "Which is not one of the health benefits of caffeine?",
    a: "Caffeine before exercise increases fat burn",
    b: "Caffeine can stimulate hair growth for balding men and women",
    c: "Caffeine consumption may lower blood pressure",
    d: "Caffeine may protect against Parkinson’s disease",
    correct: "c",
  },
  {
    question: "Which is not one of the harmful effects of caffeine?",
    a: "Caffeine causes more forceful heart contractions",
    b: "Caffeine consumption can lead to increased anxiety, depression, and the need for anxiety medication",
    c: "Caffeine accelerates aging of your skin",
    d: "Caffeine decreases stamina during exercise",
    correct: "d",
  },
  {
    question:
      "How much caffeine (per day) appears to be safe for most healthy adults",
    a: "400mg",
    b: "450mg",
    c: "500mg",
    d: "600mg",
    correct: "a",
  },
];

const quiz = document.getElementById("quiz");
const radioEl = document.querySelectorAll(".quiz__radio");
const optionsEl = document.querySelectorAll(".quiz__options");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  unSelectAnswer();
  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function unSelectAnswer() {
  radioEl.forEach((radioEl) => (radioEl.checked = false));
}

function selectAnswer() {
  let answer;

  radioEl.forEach((item) => {
    if (item.checked) {
      answer = item.id;
    }
  });

  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = selectAnswer();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
      submitBtn.style.backgroundColor = "green";
      submitBtn.innerText = "Correct!";
      setTimeout(() => {
        submitBtn.style.backgroundColor = `#6f4722`;
        submitBtn.innerText = "Submit";
      }, 1500);
    } else {
      submitBtn.style.backgroundColor = "rgb(165, 50, 50)";
      submitBtn.innerText = "Wrong!";

      // select the right answer (radio button checked)
      radioEl.forEach((btn) => {
        if (btn.id === quizData[currentQuiz].correct) {
          btn.checked = true;
        }
      });

      // add red color on correct answer
      optionsEl.forEach((item) => {
        if (item.htmlFor === quizData[currentQuiz].correct) {
          item.style.color = "rgb(165, 50, 50)";
          item.style.fontWeight = "bold";
        }
      });

      setTimeout(() => {
        submitBtn.style.backgroundColor = `#6f4722`;
        submitBtn.innerText = "Submit";
        optionsEl.forEach((item) => {
          item.style.color = "black";
          item.style.fontWeight = "normal";
        });
      }, 1500);
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      setTimeout(loadQuiz, 1500);
    } else {
      setTimeout(() => {
        quiz.innerHTML = `
          <h3 class='quiz__result'>You answered <span class='quiz__resultColor'>${score}/${quizData.length}</span> questions correctly </h3>
          <button onclick="location.reload()">Reload</button>
        `;
      }, 800);
    }
  }
});
