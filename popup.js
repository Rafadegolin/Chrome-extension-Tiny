document.getElementById("insertButton").addEventListener("click", () => {
  const text = document.getElementById("inputText").value;

  // Envia uma mensagem para o script de conteúdo
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { text: text });
  });
});
