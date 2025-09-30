// script.js – Einfache Version für Finde den Sündenbock
let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

// DOM-Elemente
const questionSection = document.getElementById('question-section');
const factSection = document.getElementById('fact-section');
const factText = document.getElementById('fact-text');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const endscreen = document.getElementById('endscreen');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

console.log('Spiel wird initialisiert...');

// Fortschritt aktualisieren
function updateProgress() {
  const percent = (currentQuestion / questions.length) * 100;
  progressBar.innerHTML = `<div style="width:${percent}%"></div>`;
  
  // Update progress text
  const currentQuestionEl = document.getElementById('current-question');
  if (currentQuestionEl) {
    currentQuestionEl.textContent = currentQuestion;
  }
}

// Frage anzeigen
function showQuestion() {
  console.log('Zeige Frage:', currentQuestion);
  answered = false;
  updateProgress();
  factSection.hidden = true;
  endscreen.hidden = true;
  
  if (currentQuestion >= questions.length) {
    showEndscreen();
    return;
  }
  
  const q = questions[currentQuestion];
  
  questionSection.innerHTML = `
    <div class="question-text">${q.question}</div>
    <div class="options">
      ${q.options.map((opt, idx) => `
        <button class="option-btn" onclick="handleAnswer(${idx}, ${opt.isCorrect})">
          <img src="assets/${opt.image}" alt="${opt.label}">
          <span class="option-label">${opt.label}</span>
        </button>
      `).join('')}
    </div>
  `;
}

// Antwort verarbeiten
function handleAnswer(optionIndex, isCorrect) {
  if (answered) return;
  answered = true;
  
  console.log('Antwort:', optionIndex, 'Korrekt:', isCorrect);
  
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);
  
  const selectedBtn = buttons[optionIndex];
  
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    selectedBtn.innerHTML += '<img src="assets/icon_richtig.svg" class="result-icon" alt="Richtig">';
    score++;
    localStorage.setItem('suendenbock_score', score);
  } else {
    selectedBtn.classList.add('wrong');
    selectedBtn.innerHTML += '<img src="assets/icon_falsch.svg" class="result-icon" alt="Falsch">';
  }
  
  setTimeout(() => showFact(), 600);
}

// Fakten anzeigen
function showFact() {
  factSection.hidden = false;
  factText.textContent = questions[currentQuestion].fact;
  nextBtn.focus();
}

// Nächste Frage
nextBtn.addEventListener('click', () => {
  currentQuestion++;
  showQuestion();
});

// Endscreen anzeigen
function showEndscreen() {
  console.log('Zeige Endscreen, Score:', score);
  updateProgress();
  questionSection.innerHTML = '';
  factSection.hidden = true;
  endscreen.hidden = false;
  scoreText.textContent = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet!`;
  restartBtn.focus();
}

// Neustart
restartBtn.addEventListener('click', () => {
  score = 0;
  currentQuestion = 0;
  answered = false;
  localStorage.removeItem('suendenbock_score');
  showQuestion();
});

// Fragen laden und Spiel starten
console.log('Lade Fragen...');
fetch('./questions.json')
  .then(response => {
    console.log('Response Status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Fragen geladen:', data.length);
    questions = data;
    score = parseInt(localStorage.getItem('suendenbock_score')) || 0;
    
    // Update total questions display
    const totalQuestionsEl = document.getElementById('total-questions');
    if (totalQuestionsEl) {
      totalQuestionsEl.textContent = questions.length;
    }
    
    showQuestion();
  })
  .catch(error => {
    console.error('Fehler beim Laden:', error);
    questionSection.innerHTML = `
      <div style="text-align: center; padding: 2em;">
        <h2>Fehler beim Laden</h2>
        <p>Das Spiel konnte nicht geladen werden.</p>
        <button onclick="location.reload()">Neu laden</button>
      </div>
    `;
  });
