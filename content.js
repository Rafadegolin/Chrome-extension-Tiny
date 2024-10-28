window.addEventListener("load", () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.barcode) {
      console.log("Código recebido pelo script", message.barcode);
      // Seleciona o input pelo ID
      const inputElement = document.getElementById("produto"); // Usando o ID do input

      if (inputElement) {
        // Insere o texto no input
        inputElement.value = request.barcode;
        inputElement.dispatchEvent(new Event("input")); // Para notificar o evento de mudança

        // Simula o pressionamento da tecla 'Enter' para confirmar a busca
        const enterEvent = new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          keyCode: 13,
        });
        inputElement.dispatchEvent(enterEvent);

        // Após um pequeno atraso, simula o clique no botão para adicionar o produto
        setTimeout(() => {
          const addButton = document.getElementById("btnConfirmarItemPDV");
          if (addButton) {
            addButton.click();
          } else {
            console.error("Botão de adicionar produto não encontrado!");
          }
        }, 1000); // Aguarda 1 segundo antes de clicar no botão (pode ajustar o tempo se necessário)
      } else {
        console.error("Elemento de input não encontrado!");
      }
    }
  });
});
