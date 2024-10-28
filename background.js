import { io } from "https://cdn.jsdelivr.net/npm/socket.io-client@4.8.0/+esm";

const socket = io("http://192.168.1.3:3000");

socket.on("connect", () => {
  console.log("Conectado ao socket");
  keepAlive();
});

socket.on("barcode-received", (code) => {
  console.log("Código de barras recebido: ", code);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { barcode: code });
    }
  });
});

function keepAlive() {
  setInterval(() => {
    if (socket.connected) {
      socket.emit("ping", "mantendo a conexão");
    }
  }, 20000);
}
