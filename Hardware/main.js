
const components = ['ram', 'cpu', 'gpu', 'keyboard', 'mouse', 'display','fonte','hd'];

components.forEach(component => {
  const compElem = document.getElementById(component);
  const slotElem = document.getElementById(`${component}-slot`);
  const encaixadaElem = document.getElementById(`${component}-encaixada`);

  // Adicionar evento para lidar com arrastar
  compElem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.id);
    if (component === 'ram') {
      compElem.style.transform = 'rotate(90deg)'; // Girar ao iniciar o arrasto
    }
  });

  // Adicionar evento para atualizar posição durante arrasto
  document.addEventListener('dragover', (e) => {
    const data = e.dataTransfer.getData('text');
    if (data === component) {
      e.preventDefault();
      if (component === 'ram') {
        const offsetX = e.clientX - compElem.clientWidth / 2;
        const offsetY = e.clientY - compElem.clientHeight / 2;
        compElem.style.position = 'absolute';
        compElem.style.left = `${offsetX}px`;
        compElem.style.top = `${offsetY}px`;
      }
    }
  });

  compElem.addEventListener('dragend', (e) => {
    if (component === 'ram') {
      compElem.style.transform = ''; // Voltar à rotação original se não for solto no slot
      compElem.style.position = ''; // Resetar a posição após arrastar
    }
  });

  // Eventos para todos os componentes
  slotElem.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  slotElem.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');

    if (data === component) {
      compElem.style.display = 'none';
      encaixadaElem.style.display = 'block';
      slotElem.style.border = '2px dashed green'; // Indicação de sucesso
    } else {
      alert('Erro: Imagem incorreta!');
      slotElem.style.border = '2px dashed red'; // Indicação de erro
      if (component === 'ram') {
        compElem.style.transform = ''; // Voltar à rotação original em caso de erro
      }
    }
  });
});
function exibirResolucaoTela() {
  var largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  var resolucaoTexto = largura + " x " + altura;

  document.getElementById("resolucao-texto").textContent = resolucaoTexto;
}

// Chamar a função quando a página carregar
window.onload = exibirResolucaoTela;

// Chamar a função quando a janela for redimensionada
window.onresize = exibirResolucaoTela;