const API_URL = "http://localhost:3000/chat";

export async function sendToAI(message, chatId) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, chatId }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Backend error:", data);
    throw new Error(data.details || "Server error");
  }

  return data;
}
