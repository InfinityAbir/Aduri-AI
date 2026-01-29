// chat.js
import { sendToAI } from "./api.js";
import { chats, currentChatId, saveChats, renderHistory } from "./history.js";

/* ================= DOM ================= */
const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("userInput");
const micBtn = document.getElementById("micBtn");
const stopBtn = document.getElementById("stopBtn");

/* ================= STATE ================= */
let lastInputMode = "text";
let typingTimer = null;
let abortController = null;

/* ================= Helpers ================= */
function detectLanguage(text = "") {
  return /[\u0980-\u09FF]/.test(text) ? "bn" : "en";
}

/* ================= Typing Effect ================= */
function typeMessage(el, text, speed = 12) {
  let i = 0;
  el.innerHTML = "";

  typingTimer = setInterval(() => {
    el.innerHTML = marked.parse(text.slice(0, i));
    i++;
    messagesEl.scrollTop = messagesEl.scrollHeight;

    if (i > text.length) {
      clearInterval(typingTimer);
      typingTimer = null;
      showSend();
    }
  }, speed);
}

/* ================= Voice Output ================= */
function speak(text) {
  if (!window.speechSynthesis) return;

  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = detectLanguage(text) === "bn" ? "bn-BD" : "en-US";
  utter.rate = 1;
  utter.pitch = 1.1;

  utter.onend = showSend;
  speechSynthesis.speak(utter);
}

/* ================= UI State ================= */
function showStop() {
  stopBtn.style.display = "inline-block";
}

function showSend() {
  stopBtn.style.display = "none";
}

/* ================= STOP ================= */
export function stopAll() {
  speechSynthesis.cancel();

  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }

  if (abortController) {
    abortController.abort();
    abortController = null;
  }

  showSend();
}

/* ================= Render Message ================= */
export function renderMessage(msg, typing = false) {
  const div = document.createElement("div");
  div.className = `message ${msg.role}`;

  if (msg.role === "assistant") {
    const img = document.createElement("img");
    img.src = "assets/avatar.png";
    img.alt = "Aduri";

    const textEl = document.createElement("div");

    div.appendChild(img);
    div.appendChild(textEl);
    messagesEl.appendChild(div);

    showStop();

    typing
      ? typeMessage(textEl, msg.content)
      : (textEl.innerHTML = marked.parse(msg.content));

    if (lastInputMode === "voice") {
      speak(msg.content);
    }
  } else {
    div.textContent = msg.content;
    messagesEl.appendChild(div);
  }

  messagesEl.scrollTop = messagesEl.scrollHeight;
}

/* 🌍 expose */
window.renderMessage = renderMessage;

/* ================= SEND MESSAGE ================= */
export async function sendMessage(mode = "text") {
  const text = inputEl.value.trim();
  if (!text) return;

  lastInputMode = mode;
  inputEl.value = "";
  inputEl.focus();

  const chat = chats.find((c) => c.id === currentChatId);
  if (!chat) return;

  abortController = new AbortController();
  showStop();

  const userMsg = { role: "user", content: text };
  chat.messages.push(userMsg);
  renderMessage(userMsg);

  const typing = document.createElement("div");
  typing.className = "message assistant typing";
  typing.textContent = "Aduri is typing…";
  messagesEl.appendChild(typing);

  try {
    const res = await sendToAI(text, chat.messages, abortController.signal);
    typing.remove();

    const aiMsg = { role: "assistant", content: res.reply };
    chat.messages.push(aiMsg);
    renderMessage(aiMsg, true);

    if (chat.title === "New Chat") {
      chat.title = text.slice(0, 30);
    }

    saveChats();
    renderHistory();
  } catch (err) {
    typing.remove();
    if (err.name !== "AbortError") {
      renderMessage({
        role: "assistant",
        content: "⚠️ Aduri stopped responding.",
      });
    }
    showSend();
  }
}

/* ================= VOICE INPUT ================= */
if ("webkitSpeechRecognition" in window && micBtn) {
  const rec = new window.webkitSpeechRecognition();
  rec.continuous = false;
  rec.interimResults = false;

  micBtn.onclick = () => {
    rec.lang = detectLanguage(inputEl.value) === "bn" ? "bn-BD" : "en-US";
    micBtn.classList.add("listening");
    rec.start();
  };

  rec.onresult = (e) => {
    inputEl.value = e.results[0][0].transcript;
    sendMessage("voice");
  };

  rec.onend = () => micBtn.classList.remove("listening");
  rec.onerror = () => micBtn.classList.remove("listening");
}
