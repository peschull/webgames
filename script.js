// script.js – Erweiterte Logik für Finde den Sündenbock
class SuendenbockGame {
  constructor() {
    this.questions = [];
    this.current = 0;
    this.score = 0;
    this.answered = false;
    this.startTime = null;
    this.gameStats = {
      questionsAnswered: 0,
      correctAnswers: 0,
      timeSpent: 0,
      hintsUsed: 0
    };
    
    this.elements = {
      questionSection: document.getElementById('question-section'),
      factSection: document.getElementById('fact-section'),
      factText: document.getElementById('fact-text'),
      nextBtn: document.getElementById('next-btn'),
      progressBar: document.getElementById('progress-bar'),
      progressText: document.getElementById('progress-text'),
      currentQuestion: document.getElementById('current-question'),
      totalQuestions: document.getElementById('total-questions'),
      endscreen: document.getElementById('endscreen'),
      scoreText: document.getElementById('score-text'),
      scoreNumber: document.getElementById('score-number'),
      scoreMessage: document.getElementById('score-message'),
      restartBtn: document.getElementById('restart-btn'),
      shareBtn: document.getElementById('share-btn'),
      loading: document.getElementById('loading'),
      toastContainer: document.getElementById('toast-container')
    };
    
    this.init();
  }
  
  async init() {
    this.showLoading(true);
    await this.loadQuestions();
    this.setupEventListeners();
    this.loadGameState();
    this.startGame();
    this.showLoading(false);
  }
  
  showLoading(show) {
    this.elements.loading.hidden = !show;
  }
  
  async loadQuestions() {
    try {
      const response = await fetch('questions.json');
      if (!response.ok) throw new Error('Fragen konnten nicht geladen werden');
      this.questions = await response.json();
      this.elements.totalQuestions.textContent = this.questions.length;
    } catch (error) {
      this.showToast('Fehler beim Laden der Fragen', 'error');
      console.error('Fehler:', error);
    }
  }

  
  setupEventListeners() {
    this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
    this.elements.restartBtn.addEventListener('click', () => this.restartGame());
    this.elements.shareBtn.addEventListener('click', () => this.shareResult());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement.classList.contains('option-btn') && !this.answered) {
          e.preventDefault();
          document.activeElement.click();
        }
      }
    });
    
    // PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.showInstallPrompt(e);
    });
  }
  
  loadGameState() {
    const savedState = localStorage.getItem('suendenbock_state');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.score = state.score || 0;
      this.gameStats = { ...this.gameStats, ...state.stats };
    }
  }
  
  saveGameState() {
    const state = {
      score: this.score,
      stats: this.gameStats,
      timestamp: Date.now()
    };
    localStorage.setItem('suendenbock_state', JSON.stringify(state));
  }
  
  startGame() {
    this.startTime = Date.now();
    this.current = 0;
    this.answered = false;
    this.showQuestion();
  }

  updateProgress() {
    const percent = ((this.current) / this.questions.length) * 100;
    this.elements.progressBar.style.width = `${percent}%`;
    this.elements.progressBar.setAttribute('aria-valuenow', percent);
    this.elements.currentQuestion.textContent = this.current + 1;
  }

  showQuestion() {
    this.answered = false;
    this.updateProgress();
    this.elements.factSection.hidden = true;
    this.elements.endscreen.hidden = true;
    this.elements.questionSection.innerHTML = '';
    
    if (this.current >= this.questions.length) {
      this.showEndscreen();
      return;
    }
    
    const q = this.questions[this.current];
    const questionHTML = `
      <div class="question-header">
        <div class="question-number">Frage ${this.current + 1}</div>
        <h2 class="question-text" role="heading" aria-level="2">${q.question}</h2>
      </div>
      <div class="options" role="radiogroup" aria-label="Antwortoptionen">
        ${q.options.map((opt, idx) => `
          <button class="option-btn" 
                  type="button" 
                  role="radio" 
                  aria-checked="false"
                  tabindex="${idx === 0 ? '0' : '-1'}"
                  aria-label="Option ${idx + 1}: ${opt.label}"
                  data-index="${idx}">
            <div class="option-content">
              <img src="/assets/${opt.image}" alt="${opt.label}" draggable="false">
              <span class="option-label">${opt.label}</span>
            </div>
          </button>
        `).join('')}
      </div>
    `;
    
    this.elements.questionSection.innerHTML = questionHTML;
    this.setupQuestionEventListeners();
    
    // Focus first option
    const firstOption = this.elements.questionSection.querySelector('.option-btn');
    if (firstOption) firstOption.focus();
  }

  
  setupQuestionEventListeners() {
    const options = this.elements.questionSection.querySelectorAll('.option-btn');
    options.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const optionIndex = parseInt(btn.getAttribute('data-index'));
        const isCorrect = this.questions[this.current].options[optionIndex].isCorrect;
        this.handleAnswer(btn, isCorrect, optionIndex);
      });
      
      btn.addEventListener('keydown', (e) => {
        // Arrow key navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = options[(idx + 1) % options.length];
          next.focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = options[(idx - 1 + options.length) % options.length];
          prev.focus();
        }
      });
    });
  }

  handleAnswer(btn, isCorrect, optionIndex) {
    if (this.answered) return;
    this.answered = true;
    this.gameStats.questionsAnswered++;
    
    // Update radio button states
    const options = this.elements.questionSection.querySelectorAll('.option-btn');
    options.forEach((b, i) => {
      b.setAttribute('aria-disabled', 'true');
      b.setAttribute('tabindex', '-1');
      if (i === optionIndex) {
        b.setAttribute('aria-checked', 'true');
      }
    });
    
    // Animation & Icon
    if (isCorrect) {
      btn.classList.add('correct');
      btn.querySelector('.option-content').innerHTML += 
        '<img src="/assets/icon_richtig.svg" class="result-icon" alt="Richtig" aria-hidden="true">';
      this.score++;
      this.gameStats.correctAnswers++;
      this.showToast('Richtige Antwort!', 'success');
    } else {
      btn.classList.add('wrong');
      btn.querySelector('.option-content').innerHTML += 
        '<img src="/assets/icon_falsch.svg" class="result-icon" alt="Falsch" aria-hidden="true">';
      this.showToast('Das war leider falsch.', 'info');
    }
    
    this.saveGameState();
    
    // Show fact after animation
    setTimeout(() => {
      this.showFact(isCorrect);
    }, 800);
  }

  showFact(isCorrect) {
    this.elements.factSection.hidden = false;
    this.elements.factText.textContent = this.questions[this.current].fact;
    this.elements.nextBtn.focus();
    
    // Scroll to fact section
    this.elements.factSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest' 
    });
  }

  nextQuestion() {
    this.current++;
    this.showQuestion();
  }

  
  showEndscreen() {
    this.gameStats.timeSpent = Date.now() - this.startTime;
    this.updateProgress();
    this.elements.questionSection.innerHTML = '';
    this.elements.factSection.hidden = true;
    this.elements.endscreen.hidden = false;
    
    // Score calculation and messages
    const percentage = Math.round((this.score / this.questions.length) * 100);
    this.elements.scoreNumber.textContent = this.score;
    this.elements.scoreText.textContent = `Du hast ${this.score} von ${this.questions.length} Sündenböcken entlarvt!`;
    
    // Dynamic end message based on score
    let message = '';
    if (percentage === 100) {
      message = '🎉 Perfekt! Du durchschaust alle Sündenbock-Mechanismen!';
    } else if (percentage >= 80) {
      message = '👏 Sehr gut! Du erkennst die meisten Schuldzuweisungen.';
    } else if (percentage >= 60) {
      message = '👍 Nicht schlecht! Du hinterfragst bereits kritisch.';
    } else if (percentage >= 40) {
      message = '🤔 Da ist noch Luft nach oben. Sündenbock-Narrative sind tückisch!';
    } else {
      message = '💡 Zeit zum Lernen! Sündenböcke sind selten die wahren Schuldigen.';
    }
    
    this.elements.scoreMessage.textContent = message;
    this.elements.restartBtn.focus();
    
    // Analytics (privacy-friendly)
    this.trackGameCompletion();
  }

  restartGame() {
    this.score = 0;
    this.current = 0;
    this.answered = false;
    this.gameStats = {
      questionsAnswered: 0,
      correctAnswers: 0,
      timeSpent: 0,
      hintsUsed: 0
    };
    localStorage.removeItem('suendenbock_state');
    this.startGame();
  }

  shareResult() {
    const percentage = Math.round((this.score / this.questions.length) * 100);
    const text = `Ich habe ${this.score}/${this.questions.length} Sündenböcke entlarvt! 🎯 Spiele auch: `;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Finde den Sündenbock',
        text: text,
        url: url
      }).catch(() => this.fallbackShare(text + url));
    } else {
      this.fallbackShare(text + url);
    }
  }

  fallbackShare(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('Link kopiert!', 'success');
      });
    } else {
      // Legacy fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showToast('Link kopiert!', 'success');
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    
    this.elements.toastContainer.appendChild(toast);
    
    // Animation
    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });
    
    // Auto remove
    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => {
        if (toast.parentNode) {
          this.elements.toastContainer.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  showInstallPrompt(e) {
    // Show custom install UI
    const installBanner = document.createElement('div');
    installBanner.className = 'install-banner';
    installBanner.innerHTML = `
      <div class="install-content">
        <span>📱 App installieren für bessere Erfahrung</span>
        <button id="install-btn" class="install-btn">Installieren</button>
        <button id="dismiss-btn" class="dismiss-btn" aria-label="Schließen">×</button>
      </div>
    `;
    
    document.body.appendChild(installBanner);
    
    document.getElementById('install-btn').addEventListener('click', () => {
      e.prompt();
      e.userChoice.then(() => {
        document.body.removeChild(installBanner);
      });
    });
    
    document.getElementById('dismiss-btn').addEventListener('click', () => {
      document.body.removeChild(installBanner);
    });
  }

  trackGameCompletion() {
    // Privacy-friendly analytics (no external services)
    const stats = {
      score: this.score,
      totalQuestions: this.questions.length,
      timeSpent: this.gameStats.timeSpent,
      timestamp: Date.now()
    };
    
    // Store locally for potential future features
    const history = JSON.parse(localStorage.getItem('suendenbock_history') || '[]');
    history.push(stats);
    
    // Keep only last 10 games
    if (history.length > 10) {
      history.splice(0, history.length - 10);
    }
    
    localStorage.setItem('suendenbock_history', JSON.stringify(history));
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SuendenbockGame();
});

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
