import { sendMessage, stopAll } from "./chat.js";
import { createNewChat, initHistory, clearAllChats } from "./history.js";

window.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const stopBtn = document.getElementById("stopBtn");
  const input = document.getElementById("userInput");
  const newChatBtn = document.getElementById("newChatBtn");
  const clearBtn = document.getElementById("clearHistoryBtn");

  // 🔒 Safety checks
  if (!sendBtn || !input || !newChatBtn) {
    console.error("❌ Required UI elements missing");
    return;
  }

  sendBtn.addEventListener("click", () => sendMessage("text"));

  if (stopBtn) {
    stopBtn.addEventListener("click", stopAll);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage("text");
    }
  });

  newChatBtn.addEventListener("click", createNewChat);

  if (clearBtn) {
    clearBtn.addEventListener("click", clearAllChats);
  }

  initHistory();
});
