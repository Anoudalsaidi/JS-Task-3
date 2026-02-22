let userEmail = document.querySelector("#useremail");
let userPass = document.querySelector("#userpass");
let logbtn = document.querySelector("#logbtn");
let errMess = document.querySelector("#errMess");
let succMess = document.querySelector("#succMess");
let form = document.querySelector("form");
let logform = document.querySelector("#logform");

let QuestionsNum = document.querySelector("#questionsNum");
let strTestBtn = document.querySelector("#strTestBtn");
let testScreen = document.querySelector("#testScreen");
let testSection = document.querySelector("#test");

let logoutBtn = document.querySelector("#logoutBtn");

let cartona = "";
let questionsArray = [];

/* ==============================
   CHECK LOGIN WHEN PAGE LOADS
================================ */
window.addEventListener("load", function () {
    let isLogin = localStorage.getItem("Islogin");

    if (isLogin === "True") {
        logform.classList.add("d-none");
        testSection.classList.remove("d-none");
        logoutBtn.classList.remove("d-none"); 
    }
});

/* ==============================
   LOGIN
================================ */
logbtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (userEmail.value !== "aa@" || userPass.value !== "1234") {
        errMess.classList.remove("d-none");
        succMess.classList.add("d-none");
    } else {
        errMess.classList.add("d-none");
        succMess.classList.remove("d-none");

        localStorage.setItem("Islogin", "True");

        setTimeout(function () {
            logform.classList.add("d-none");
            testSection.classList.remove("d-none");
            logoutBtn.classList.remove("d-none");
        }, 1000);
    }
});

/* ==============================
   LOGOUT
================================ */
logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("Islogin");
    localStorage.removeItem("questions");
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("score");

    location.reload();
});

/* ==============================
   START TEST
================================ */
strTestBtn.addEventListener("click", function (e) {
    e.preventDefault();

    cartona = "";
    questionsArray = [];

    let num = Number(QuestionsNum.value);

    if (num <= 0 || isNaN(num)) {
        alert("Enter valid number");
        return;
    }

    for (let i = 1; i <= num; i++) {
        let num1 = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * 10);
        let correctAnswer = num1 + num2;

        questionsArray.push({
            num1: num1,
            num2: num2,
            correct: correctAnswer
        });

        cartona += `
            <div class="my-3">
                ${i}) ${num1} + ${num2} =
                <input type="number" class="form-control answer">
            </div>
        `;
    }

    cartona += `<button id="submitTest" class="btn btn-success mt-3">Submit</button>`;

    testScreen.innerHTML = cartona;

    // store questions
    localStorage.setItem("questions", JSON.stringify(questionsArray));
});

/* ==============================
   SUBMIT button
================================ */
testScreen.addEventListener("click", function (e) {

    if (e.target.id === "submitTest") {

        let answersInputs = document.querySelectorAll(".answer");
        let savedQuestions = JSON.parse(localStorage.getItem("questions"));

        let userAnswers = [];
        let score = 0;

        answersInputs.forEach((input, index) => {
            let userAnswer = Number(input.value);
            userAnswers.push(userAnswer);

            if (userAnswer === savedQuestions[index].correct) {
                score++;
            }
        });

        // store info
        localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
        localStorage.setItem("score", score);

        // display score:
        let finalScore = document.querySelector("#resultBox");
        finalScore.classList.remove("d-none");
        finalScore.innerText = `Your Score is ${score} / ${savedQuestions.length}`;
    }
});