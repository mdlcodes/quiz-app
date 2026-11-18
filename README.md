# Ang Qlet 🎓🐾

**Ang Qlet** is a gamified, cartoonish web development quiz application built with vanilla **HTML, CSS, and JavaScript**. Created as a hands-on frontend practice project, it focuses on dynamic DOM manipulation, responsive CSS layouts, and fetching structured quiz data from a local JSON file.

## ✨ Features
- **Gamified Cartoonish UI:** Bold typography (`Slackey` & `Palanquin Dark`), custom mascot branding, vibrant royal-blue gradients, and hard drop-shadows.
- **Dynamic JSON Question Bank:** Fetches multiple-choice questions and answers asynchronously from `questions.json`.
- **Interactive Answer Feedback:** Highlights selected answers in green (correct) or red (incorrect) while revealing the right answer.
- **Timed Challenge Mode:** Includes a 1-minute countdown per question with a `-1` point penalty if time runs out.
- **End-of-Quiz Summary:** Displays the final score alongside a detailed question-by-question breakdown of user answers.
- **Responsive Design:** Adapts cleanly across desktop, tablet, and mobile viewports.

## 🛠️ Tech Stack
- **HTML5** – Semantic screen-based structure
- **CSS3** – Native CSS nesting, CSS variables, Flexbox, CSS Grid, and `clamp()` responsive scaling
- **Vanilla JavaScript (ES6+)** – `fetch()` API, `async/await`, DOM manipulation, and timer intervals
- **JSON** – External question and answer dataset

## 📂 Project Structure
```text
ang-qlet/
├── images/
│   └── logo-mascot.png
├── index.html
├── style.css
├── script.js
├── questions.json
└── README.md