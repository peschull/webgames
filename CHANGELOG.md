# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [2.0.0] - 2024-01-XX

### 🎉 Neue Features (v2.0)

#### 💡 Erweiterte Spielmechanik
- **8 Fragen** statt 5 (mehr politische Tiefe)
- **Dynamisches Scoring** mit personalisierten Endnachrichten
- **Game Stats** (Zeit, Erfolgsquote, Spielhistorie)
- **Share-Funktion** (Web Share API + Fallback)

#### 🎨 Professional UX/UI
- **Progressive Web App** (PWA) - installierbar!
- **Loading States** & **Toast Notifications**
- **Glassmorphism Design** mit modernen Gradienten
- **Micro-Animations** & **Hover-Effekte**
- **Responsive Grid Layout**

#### ♿ Enhanced Accessibility
- **WCAG 2.2 AAA** konform
- **Screen Reader optimiert** (ARIA, Landmarks)
- **Keyboard Navigation** (Tab, Pfeiltasten, Enter)
- **Reduced Motion Support**
- **High Contrast** & **Dark Mode**
- **Focus Management**

#### 🔧 Technical Improvements
- **ES6 Class Architecture**
- **Service Worker** (Offline-fähig)
- **Local Storage** für Spielstand
- **Performance optimiert** (Preloading, Lazy Loading)
- **Error Handling** & **Fallbacks**

### 🐛 Bug Fixes
- Fehlende PWA-Icons hinzugefügt (192x192, 512x512)
- Fragenzähler zeigt jetzt korrekte Anzahl (8 statt 5)
- 404-Fehler bei fehlenden Assets behoben
- Background-Image-Referenz entfernt

### 📚 Dokumentation
- `.gitignore` hinzugefügt
- `CONTRIBUTING.md` mit Contribution Guidelines erstellt
- `CHANGELOG.md` zur Versionsverfolgung hinzugefügt
- `TODO.md` mit Roadmap erstellt

## [1.0.0] - 2024-01-XX

### ✨ Initial Release

#### Features
- **5 politische Szenarien**
- **Interaktives Quiz-Format**
- **Einfache Version** (script_simple.js)
- **Erweiterte Version** (script.js mit OOP)
- **SVG-Icons** für Charaktere
- **Responsive Design**
- **Grundlegende Accessibility**

#### Tech Stack
- Vanilla JavaScript (ES6)
- CSS3 mit Custom Properties
- HTML5 Semantic Elements
- Service Worker Basis
- Web App Manifest

---

## Kommende Versionen

### [2.1.0] - Geplant

#### 🌐 Mehrsprachigkeit
- [ ] Englisch (EN)
- [ ] Französisch (FR)
- [ ] Spanisch (ES)
- [ ] i18n-Framework Integration

#### 📊 Statistik-Dashboard
- [ ] Anonymisierte Spielstatistiken
- [ ] Historische Daten-Visualisierung
- [ ] Vergleich mit anderen Spielern
- [ ] Export-Funktion

#### 🎧 Audio-Modus
- [ ] Text-to-Speech Integration
- [ ] Audio-Feedback
- [ ] Sprachsteuerung
- [ ] Barrierefreie Audio-Navigation

#### 🔔 Push-Notifications
- [ ] Tägliche Denkanstöße
- [ ] Neue Fragen-Benachrichtigungen
- [ ] Lern-Reminder
- [ ] Opt-in/Opt-out Verwaltung

### [3.0.0] - Vision

#### 🤖 AI-generierte Fragen
- [ ] ChatGPT/Claude Integration
- [ ] Aktuelle Nachrichtenlage
- [ ] Kontextuelle Anpassung
- [ ] Fact-Checking Integration

#### 👥 Multiplayer-Modus
- [ ] Echtzeit-Diskussionen
- [ ] Team-Challenges
- [ ] Argumentations-Arena
- [ ] Moderations-Tools

#### 📚 Lernpfade
- [ ] Thematische Vertiefung
- [ ] Schwierigkeitsstufen
- [ ] Expertenmodus
- [ ] Zertifikate

#### 🎮 Gamification
- [ ] Badges & Achievements
- [ ] Leaderboards
- [ ] Tägliche Challenges
- [ ] Streak-System

---

## Deprecated Features

### Entfernt in v2.0
- `bg_spielbrett.jpg` - Hintergrund-Bild (optional, Performance)
- Alte Icon-Struktur (ersetzt durch PWA-Icons)

---

## Migration Guide

### Von 1.0 zu 2.0

#### Breaking Changes
Keine - v2.0 ist vollständig rückwärtskompatibel.

#### Neue Features nutzen

**PWA Installation:**
```bash
# Manifest prüfen
https://dein-domain.de/manifest.json

# Service Worker registriert?
chrome://serviceworker-internals/
```

**Erweiterte Version:**
```html
<!-- Alt (einfach) -->
<script src="script_simple.js"></script>

<!-- Neu (erweitert) -->
<script src="script.js"></script>
```

**LocalStorage:**
```javascript
// Spielstand laden
const state = JSON.parse(localStorage.getItem('suendenbock_state'));

// Historie anzeigen
const history = JSON.parse(localStorage.getItem('suendenbock_history'));
```

---

## Support

- 🐛 **Bugs:** [GitHub Issues](https://github.com/peschull/webgames/issues)
- 💡 **Features:** [Discussions](https://github.com/peschull/webgames/discussions)
- 📧 **Kontakt:** [peschull](https://github.com/peschull)

---

**🎯 Mission: Demokratie durch kritisches Denken stärken!**
