# Contributing to Finde den Sündenbock

Vielen Dank für dein Interesse am Projekt! 🎯

## 🚀 Quick Start

### Prerequisites
- Git
- Python 3 (für lokalen Server) oder Node.js
- Moderne Browser (Chrome, Firefox, Safari, Edge)

### Setup
```bash
# Repository klonen
git clone https://github.com/peschull/webgames.git
cd webgames

# Development Server starten
npm run start
# oder
python3 -m http.server 8000
```

Öffne http://localhost:8000 im Browser.

## 📝 How to Contribute

### 1. Content erweitern

#### Neue Frage hinzufügen
Bearbeite `questions.json`:

```javascript
{
  "question": "Deine neue politische Frage?",
  "options": [
    {
      "label": "Option 1",
      "image": "fig_konzernchef.svg",
      "isCorrect": false
    },
    {
      "label": "Option 2",
      "image": "fig_fluechtling.svg",
      "isCorrect": false
    },
    {
      "label": "Es gibt keinen einfachen Sündenbock",
      "image": "fig_suendenbock.svg",
      "isCorrect": true
    }
  ],
  "fact": "Erkläre hier die systemischen Ursachen des Problems..."
}
```

**Wichtig:**
- Immer `fig_suendenbock.svg` als korrekte Antwort
- Fakten sollten neutral und bildend sein
- Keine parteiische oder diskriminierende Sprache

#### Neue Charaktere hinzufügen
1. Erstelle SVG-Icon in `assets/` (60x60px empfohlen)
2. Verwende es in `questions.json`
3. Dokumentiere in `assets/placeholder_svg.txt`

### 2. Design anpassen

#### Theme ändern
Bearbeite `style.css`:

```css
:root {
  --primary-color: #b80000;    /* Zeitungs-Rot */
  --secondary-color: #f5f5f0;  /* Papier-Beige */
  --success-color: #27ae60;    /* Grün */
  --error-color: #e74c3c;      /* Rot */
}
```

#### Animationen hinzufügen
Bearbeite `animations.css` - achte auf `prefers-reduced-motion`.

### 3. Code-Änderungen

#### Branch erstellen
```bash
git checkout -b feature/deine-feature
```

#### Code-Style
- **JavaScript:** ES6+ Syntax
- **Kommentare:** Nur wenn nötig, auf Deutsch
- **Variablen:** camelCase
- **Funktionen:** Beschreibende Namen

#### Testen
```bash
# Manuelle Tests im Browser
npm run start

# Performance-Audit
npm run lighthouse
```

#### Commit
```bash
git add .
git commit -m "feat: Kurze Beschreibung"
# oder
git commit -m "fix: Kurze Beschreibung"
```

Commit-Präfixe:
- `feat:` - Neue Features
- `fix:` - Bugfixes
- `docs:` - Dokumentation
- `style:` - Formatierung
- `refactor:` - Code-Refactoring
- `test:` - Tests
- `chore:` - Build/Tools

### 4. Pull Request

1. Push zu GitHub:
```bash
git push origin feature/deine-feature
```

2. Erstelle PR auf GitHub
3. Beschreibe deine Änderungen
4. Warte auf Review

## 🎨 Design Guidelines

### Accessibility (WCAG 2.2 AAA)
- ✅ Kontrast mind. 4.5:1
- ✅ Fokus-Indikatoren sichtbar
- ✅ Keyboard-Navigation
- ✅ Screen Reader Labels
- ✅ Reduced Motion Support

### Performance
- ✅ Bundle < 50KB
- ✅ First Paint < 1s
- ✅ Lighthouse Score > 95

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🐛 Bug Reports

### Issue erstellen
1. Gehe zu [GitHub Issues](https://github.com/peschull/webgames/issues)
2. Klicke "New Issue"
3. Beschreibe:
   - **Was erwartet wurde**
   - **Was passiert ist**
   - **Schritte zum Reproduzieren**
   - **Browser/OS**
   - **Screenshots** (wenn möglich)

### Template
```markdown
**Beschreibung:**
[Kurze Beschreibung des Problems]

**Schritte:**
1. Gehe zu...
2. Klicke auf...
3. Siehe Fehler

**Erwartet:**
[Was sollte passieren]

**Aktuell:**
[Was passiert tatsächlich]

**Umgebung:**
- Browser: Chrome 120
- OS: Windows 11
- Version: 2.0
```

## 💡 Feature Requests

### Diskussion starten
1. Gehe zu [Discussions](https://github.com/peschull/webgames/discussions)
2. Kategorie "Ideas" wählen
3. Beschreibe:
   - **Problem/Bedarf**
   - **Lösungsvorschlag**
   - **Alternative Ansätze**
   - **Zusatzinformationen**

### Prioritäten
Siehe [Roadmap](README.md#-roadmap) für geplante Features.

## 📚 Resources

### Projekt-Dokumentation
- [README.md](README.md) - Hauptdokumentation
- [CHANGELOG.md](CHANGELOG.md) - Versionshistorie
- [TODO.md](TODO.md) - Offene Aufgaben

### Externe Links
- [MDN Web Docs](https://developer.mozilla.org/) - Web-Technologien
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG22/quickref/) - Accessibility
- [PWA Documentation](https://web.dev/progressive-web-apps/) - Progressive Web Apps

## 🤝 Code of Conduct

### Unsere Standards
- ✅ Respektvoller Umgang
- ✅ Konstruktive Kritik
- ✅ Fokus auf Sachlichkeit
- ✅ Inklusive Sprache

### Nicht akzeptabel
- ❌ Diskriminierung jeder Art
- ❌ Beleidigungen/Harassment
- ❌ Politische Instrumentalisierung
- ❌ Spam/Werbung

## 📄 Lizenz

Dieses Projekt steht unter der [MIT License](LICENSE).

### Was das bedeutet:
- ✅ Kostenlose Nutzung
- ✅ Änderungen erlaubt
- ✅ Kommerziell nutzbar
- ✅ Attribution erforderlich

## 🙏 Danke!

Jeder Beitrag zählt - ob Bug-Report, Feature-Idee oder Code!

**Mission: Demokratie durch kritisches Denken stärken!** 🎯
