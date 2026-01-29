# 🤖 Aduri AI

**Aduri AI** is a modern, bilingual (Bangla 🇧🇩 + English 🇺🇸) AI assistant designed with a clean UI and real-world usability in mind.  
It supports **text and voice interaction**, maintains **chat history**, and delivers a smooth, ChatGPT-like experience using a lightweight web stack.

Aduri is built to feel **professional, responsive, and human**, not like a demo chatbot.

---

## ✨ Features

### 🧠 Intelligent Chat
- Context-aware multi-turn conversations
- Chat history stored locally (per session)
- Markdown-rendered AI responses

### 🎤 Voice + Text Interaction
- **Text input → Text reply**
- **Voice input → Voice reply**
- Automatic language detection (Bangla / English)
- Female voice output using Web Speech API

### 🎧 Voice Experience
- Modern mic button with animated “listening” state
- Smooth start/stop behavior
- Instant voice cut using Stop button (⏹)

### 🛑 Control & Safety
- Stop AI response anytime (like ChatGPT)
- Clear all chat history with confirmation
- No accidental data loss

### 🎨 Modern UI
- Dark-mode first design
- Sidebar chat history
- Smooth animations and transitions
- Responsive layout

---

## 🛠️ Tech Stack

### Frontend
- **HTML5**
- **CSS3** (custom, no framework)
- **Vanilla JavaScript (ES Modules)**
- **Web Speech API**
  - `webkitSpeechRecognition`
  - `speechSynthesis`
- **Marked.js** for Markdown rendering

### Backend
- **Node.js**
- **Express.js**
- **Groq API** (LLM backend)

### Storage
- `localStorage` (chat history)

---

## 📁 Project Structure

    ```text
    ADURI-AI/
    │
    ├── ADURI-UI/
    │   ├── index.html
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   ├── app.js
    │   │   ├── chat.js
    │   │   ├── api.js
    │   │   ├── history.js
    │   │   └── utils/
    │   └── assets/
    │       └── avatar.png
    │
    ├── ADURI-SERVER/
    │   ├── server.js
    │   ├── aiService.js
    │   └── routes/
    │
    └── README.md
---
## 🚀 Getting Started
### 1️⃣ Clone the repository
    git clone https://github.com/your-username/aduri-ai.git
    cd aduri-ai
### 2️⃣ Setup Backend
    cd ADURI-SERVER
    npm install
Create a .env file:

    GROQ_API_KEY=your_api_key_here
    PORT=3000
Run the server:
    
    npm start
### 3️⃣ Run Frontend
Simply open:
    
    ADURI-UI/index.html
in a modern browser (Chrome recommended for voice features).

## 🎤 Voice Requirements

- Chrome / Edge recommended
- Microphone permission required
- HTTPS required for voice on deployed environments


## 🔐 Privacy Notes

- No chat data is uploaded or stored remotely
- All chat history lives in browser localStorage
- Microphone is used only when user clicks mic

## 📌 Future Enhancements

- Streaming responses (token-by-token)
- Regenerate response button
- Voice intensity visualization
- User-selectable voice styles
- Account-based chat sync

## 👨‍💻 Author

**Abir**  
Computer Science & Engineering Student  
Focused on building practical, production-quality systems.

