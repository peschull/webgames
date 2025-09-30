# TODO - Finde den Sündenbock

Geplante Features und Verbesserungen, priorisiert nach Dringlichkeit und Impact.

## 🔥 High Priority (v2.1)

### 🌐 Mehrsprachigkeit
- [ ] i18n-Framework integrieren (z.B. i18next)
- [ ] Sprachdateien erstellen (EN, FR, ES)
- [ ] UI-Strings extrahieren
- [ ] Fragen übersetzen
- [ ] Sprach-Umschalter in UI
- [ ] Browser-Sprache automatisch erkennen
- [ ] RTL-Support prüfen (für zukünftige Sprachen)

**Aufwand:** 2-3 Tage  
**Impact:** Hoch - Internationale Reichweite

### 📊 Statistik-Dashboard
- [ ] Anonyme Datensammlung implementieren
- [ ] Chart-Library evaluieren (Chart.js vs. D3.js)
- [ ] Dashboard-UI designen
- [ ] Metriken definieren:
  - [ ] Durchschnittliche Erfolgsquote
  - [ ] Häufigste Fehler pro Frage
  - [ ] Zeitliche Entwicklung
  - [ ] Vergleich mit Durchschnitt
- [ ] Export-Funktion (JSON/CSV)
- [ ] Datenschutz-Hinweis

**Aufwand:** 3-4 Tage  
**Impact:** Mittel - Lerneffekt erhöhen

### 🎧 Audio-Modus
- [ ] Web Speech API evaluieren
- [ ] Text-to-Speech für Fragen
- [ ] Audio-Feedback für Antworten
- [ ] Lautstärke-Kontrolle
- [ ] Sprach-Auswahl (wenn mehrere Stimmen)
- [ ] Fallback für nicht unterstützte Browser
- [ ] Accessibility-Tests mit Screen Reader

**Aufwand:** 2-3 Tage  
**Impact:** Hoch - Barrierefreiheit

### 🔔 Push-Notifications
- [ ] Service Worker erweitern
- [ ] Notification API implementieren
- [ ] Permission-Request UX
- [ ] Benachrichtigungs-Typen:
  - [ ] Täglicher Denkanstoß
  - [ ] Neue Frage verfügbar
  - [ ] Streak-Reminder
- [ ] Opt-in/out Settings
- [ ] Notification-Scheduling
- [ ] Safari/iOS Workaround prüfen

**Aufwand:** 2-3 Tage  
**Impact:** Mittel - User Engagement

## 📈 Medium Priority (v2.5)

### 🎨 UI/UX Verbesserungen
- [ ] Onboarding-Tutorial
- [ ] Tooltips für erste Benutzung
- [ ] Konfetti-Animation bei Perfect Score
- [ ] Sound-Effekte (optional, mit Mute-Button)
- [ ] Dark Mode Toggle (automatisch + manuell)
- [ ] Animations-Einstellungen
- [ ] Custom Themes

**Aufwand:** 2-3 Tage  
**Impact:** Mittel - User Experience

### 📱 Mobile Optimierungen
- [ ] Swipe-Gesten für Navigation
- [ ] Touch-Feedback verbessern
- [ ] iOS Safari Bugs fixen
- [ ] Android Performance testen
- [ ] Vibration API für Feedback
- [ ] Landscape-Modus optimieren

**Aufwand:** 1-2 Tage  
**Impact:** Mittel - Mobile UX

### 🔍 Erweiterte Features
- [ ] Suchfunktion für Fragen
- [ ] Filterung nach Themen
- [ ] Favoriten-System
- [ ] Notizen zu Fragen
- [ ] Teilen einzelner Fragen
- [ ] QR-Code Generator

**Aufwand:** 2-3 Tage  
**Impact:** Mittel - Power Users

### 🧪 Testing & QA
- [ ] Unit Tests (Jest)
- [ ] E2E Tests (Playwright/Cypress)
- [ ] Accessibility Tests (WAVE, axe)
- [ ] Performance Tests (Lighthouse CI)
- [ ] Cross-Browser Tests (BrowserStack)
- [ ] Load Testing
- [ ] Security Audit

**Aufwand:** 3-5 Tage  
**Impact:** Hoch - Qualität & Stabilität

## 🚀 Low Priority (v3.0)

### 🤖 AI-Integration
- [ ] API-Key Management
- [ ] ChatGPT/Claude Integration
- [ ] Fragen-Generator
- [ ] Fact-Checking API
- [ ] Kontext-Awareness (aktuelle News)
- [ ] Qualitätskontrolle
- [ ] Rate-Limiting
- [ ] Kosten-Management

**Aufwand:** 5-7 Tage  
**Impact:** Hoch - Innovation

### 👥 Multiplayer
- [ ] Backend-Architektur (Node.js/Deno)
- [ ] WebSocket-Verbindung
- [ ] Echtzeit-Sync
- [ ] Raum-System
- [ ] Chat-Funktion
- [ ] Moderations-Tools
- [ ] Leaderboards
- [ ] Matchmaking

**Aufwand:** 10-15 Tage  
**Impact:** Sehr hoch - Community

### 📚 Lernpfade
- [ ] Themen-Kategorien definieren
- [ ] Schwierigkeits-Levels
- [ ] Fortschritts-Tracking
- [ ] Lern-Ziele
- [ ] Quizze erstellen
- [ ] Zertifikate
- [ ] Gamification-Elemente

**Aufwand:** 5-7 Tage  
**Impact:** Hoch - Bildungswert

### 🎮 Gamification
- [ ] Achievement-System
- [ ] Badges designen
- [ ] Punkte-System
- [ ] Streak-Counter
- [ ] Daily Challenges
- [ ] Seasonal Events
- [ ] Unlockables
- [ ] Social Features (teilen, vergleichen)

**Aufwand:** 4-6 Tage  
**Impact:** Mittel - Motivation

## 🔧 Technical Debt

### Code Quality
- [ ] TypeScript Migration
- [ ] Code-Splitting
- [ ] Tree-Shaking optimieren
- [ ] Bundle Size reduzieren
- [ ] Critical CSS extrahieren
- [ ] Lazy Loading für Bilder
- [ ] Code Review Prozess

**Aufwand:** 3-5 Tage  
**Impact:** Mittel - Wartbarkeit

### Performance
- [ ] Image Optimization (WebP, AVIF)
- [ ] CDN Integration
- [ ] Caching-Strategie
- [ ] Prefetching
- [ ] Resource Hints
- [ ] Lighthouse Score 100/100
- [ ] Core Web Vitals optimieren

**Aufwand:** 2-3 Tage  
**Impact:** Mittel - User Experience

### Infrastructure
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Auto-Deploy zu Netlify/Vercel
- [ ] Preview Deployments
- [ ] Automated Tests in CI
- [ ] Dependency Updates (Dependabot)
- [ ] Security Scanning
- [ ] Monitoring & Analytics

**Aufwand:** 2-3 Tage  
**Impact:** Mittel - Developer Experience

## 📦 Content

### Neue Fragen
- [ ] Mindestens 12 Fragen (total 20+)
- [ ] Themen diversifizieren:
  - [ ] Wirtschaft
  - [ ] Umwelt
  - [ ] Soziales
  - [ ] Migration
  - [ ] Digitalisierung
  - [ ] Gesundheit
- [ ] Fact-Checking mit Quellen
- [ ] Neutrale Formulierung prüfen

**Aufwand:** 2-3 Tage  
**Impact:** Hoch - Content-Qualität

### Neue Charaktere
- [ ] Weitere Archetypen designen
- [ ] SVG-Icons erstellen
- [ ] Barrierefreie Alt-Texte
- [ ] Diversität berücksichtigen

**Aufwand:** 1-2 Tage  
**Impact:** Mittel - Vielfalt

## 📝 Documentation

### Developer Docs
- [x] CONTRIBUTING.md
- [x] CHANGELOG.md
- [x] TODO.md
- [ ] API Documentation (wenn Backend)
- [ ] Architecture Decision Records (ADR)
- [ ] Code Comments verbessern
- [ ] JSDoc für Funktionen

**Aufwand:** 1-2 Tage  
**Impact:** Mittel - Onboarding

### User Docs
- [ ] FAQ-Seite
- [ ] Hilfe-Bereich in App
- [ ] Video-Tutorial
- [ ] Pädagogischer Leitfaden
- [ ] Presskit

**Aufwand:** 2-3 Tage  
**Impact:** Mittel - Adoption

## 🐛 Known Issues

### Bugs
- [ ] Safari iOS: Service Worker nicht immer aktiv
- [ ] Firefox: Focus-Styles manchmal inkonsistent
- [ ] Edge: Animations können ruckeln
- [ ] Mobile: Keyboard verschiebt Layout

### Technical Issues
- [ ] localStorage kann in Private Mode fehlschlagen
- [ ] Web Share API nicht überall verfügbar
- [ ] Alte Browser-Support prüfen

## 💡 Ideas (Backlog)

- Browser-Extension für Nachrichten-Seiten
- WordPress/Moodle Plugin
- Offline-Mode mit Download-Button
- Export als PDF
- Druckbare Worksheets
- Teacher Dashboard
- Classroom Mode (Multiplayer ohne Account)
- Integration in Social Media
- Newsletter mit wöchentlichen Fragen
- Podcast/YouTube-Kanal
- Merchandise (T-Shirts mit Icons)

---

## 🎯 Priorisierung

**Nächste Schritte:**
1. 🌐 Mehrsprachigkeit (EN) - größte Reichweite
2. 🎧 Audio-Modus - Accessibility
3. 📊 Statistik-Dashboard - Lerneffekt
4. 🔔 Push-Notifications - Engagement

**Contributor gesucht für:**
- 🌐 Übersetzungen (native speakers)
- 🎨 Design/UX
- 🧪 Testing
- 📝 Content (neue Fragen)

---

**Letzte Aktualisierung:** 2024-01-XX  
**Version:** 2.0.0

---

**🎯 Mission: Demokratie durch kritisches Denken stärken!**
