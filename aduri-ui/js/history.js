// history.js
const STORAGE_KEY = "aduri_chats";

/* ================= Global State ================= */
export let chats = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
export let currentChatId = null;

/* ================= Persistence ================= */
export function saveChats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

/* ================= Clear Messages (LOCAL) ================= */
function clearMessagesUI() {
  const messagesEl = document.getElementById("messages");
  if (messagesEl) messagesEl.innerHTML = "";
}

/* ================= Create New Chat ================= */
export function createNewChat() {
  currentChatId = Date.now().toString();

  chats.unshift({
    id: currentChatId,
    title: "New Chat",
    messages: [],
  });

  saveChats();
  renderHistory();
  clearMessagesUI();
}

/* ================= Render History ================= */
export function renderHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;

  list.innerHTML = "";

  chats.forEach((chat) => {
    const li = document.createElement("li");
    li.textContent = chat.title;
    li.className = chat.id === currentChatId ? "active" : "";
    li.onclick = () => loadChat(chat.id);
    list.appendChild(li);
  });
}

/* ================= Load Chat ================= */
export function loadChat(id) {
  currentChatId = id;
  clearMessagesUI();

  const chat = chats.find((c) => c.id === id);
  if (!chat) return;

  chat.messages.forEach((msg) => {
    window.renderMessage(msg);
  });

  renderHistory();
}

/* ================= Init ================= */
export function initHistory() {
  if (chats.length === 0) {
    createNewChat();
  } else {
    currentChatId = chats[0].id;
    loadChat(currentChatId);
  }
}
export function clearAllChats() {
  const ok = confirm("This will delete all chat history. Continue?");
  if (!ok) return;

  localStorage.removeItem("aduri_chats");
  location.reload(); // clean reset
}
