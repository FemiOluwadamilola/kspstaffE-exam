const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

//  fetch('http:5000/api/admin/questions')
//  .then( res => res.json())
// .then(quizData => console.log(quizData))
// console.log(quizData);

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit');
const modalbox = document.getElementById('myModal');
const popUp = document.querySelector(".pop-notification");
const cancelPopBtn = document.querySelector('.cancel-pop');

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()

        } else {
            quiz.innerHTML = `
                 <h2>congradulations you've successfully completed the Exam. please click on the submit button below to get your exam score!</h2>
                <button onclick="quizScore()">submit</button>
            `;
        }
    }
})


const quizScore = () => {
     quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button onclick="location.assign('/logout')">logout</button>
     `;
}

// countdown timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    const time = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(time);
            window.alert('Oops sorry your examination time is up!!!');
            window.location.assign('/logout');
        }
    }, 1000);
}


cancelPopBtn.addEventListener('click', function(e){
    popUp.style.display = 'none';
      var fiveMinutes = 1500 * 1,
      display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
    e.preventDefault()
})


window.onload = function () {
    var fiveMinutes = 1500 * 1,
        display = document.querySelector('#time');
    // startTimer(fiveMinutes, display);

};
