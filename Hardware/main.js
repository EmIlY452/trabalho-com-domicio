const components = ['ram', 'cpu', 'gpu', 'keyboard', 'mouse', 'display', 'fonte', 'hd'];
let score = 0;
let erros = 0; // Variável para contar os erros
const totalComponents = components.length;

function iniciarSessao() {
  // Desbloquear todas as imagens para uma nova sessão
  components.forEach(component => {
    const compElem = document.getElementById(component);
    compElem.draggable = true; // Tornar arrastável no início da sessão
    compElem.style.display = 'block'; // Garantir que a imagem esteja visível

    // Mostrar novamente a imagem se estiver oculta após uma tentativa de encaixe
    const encaixadaElem = document.getElementById(`${component}-encaixada`);
    encaixadaElem.style.display = 'none'; // Garantir que a imagem encaixada esteja oculta
  });

  // Ocultar a mensagem de sucesso e resetar o estilo dos slots
  document.getElementById('acerto').style.display = 'none';
  components.forEach(component => {
    const slotElem = document.getElementById(`${component}-slot`);
    slotElem.style.border = ''; // Resetar a borda dos slots
  });

  // Resetar a pontuação e contagem de erros
  score = 0;
  erros = 0; // Resetar a contagem de erros

  // Ocultar a mensagem de erro
  document.getElementById('erro').style.display = 'none';
}

components.forEach(component => {
  const compElem = document.getElementById(component);
  const slotElem = document.getElementById(`${component}-slot`);
  const encaixadaElem = document.getElementById(`${component}-encaixada`);

  // Adicionar evento para lidar com arrastar
  compElem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.id);
    if (component === 'ram') {
      compElem.style.transform = 'rotate(90deg)';
    }
  });

  // Adicionar evento para atualizar posição durante arrasto
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    if (data === compElem.id && component === 'ram') {
      const offsetX = e.clientX - compElem.clientHeight / 2;
      const offsetY = e.clientY - compElem.clientWidth / 2;
      compElem.style.position = 'absolute';
      compElem.style.left = `${offsetX}px`;
      compElem.style.top = `${offsetY}px`;
    }
  });

  compElem.addEventListener('dragend', (e) => {
    if (component === 'ram') {
      compElem.style.transform = ''; // Remover rotação após arrasto
    }
    compElem.style.position = ''; // Resetar a posição após arrastar
  });

  // Eventos para todos os componentes
  slotElem.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  slotElem.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    const draggedElem = document.getElementById(data);

    if (data === component) {
      compElem.style.display = 'none';
      encaixadaElem.style.display = 'block';
      slotElem.style.border = '2px dashed green'; // Indicação de sucesso
      score++;

      // Verificar se todos os componentes foram encaixados corretamente
      if (score === totalComponents) {
        document.getElementById('acerto').style.display = 'block';
      }

    } else {
      console.log('Erro: Imagem incorreta!');
      slotElem.style.border = '4px dashed red'; // Indicação de erro

      // Incrementar a contagem de erros e atualizar a mensagem de erro
      erros++;
      const erroSpan = document.getElementById('erro');
      erroSpan.textContent = `Você errou : ${erros} slot${erros > 1 ? 's' : ''} incorreto${erros > 1 ? 's' : ''}.`;
      erroSpan.style.display = 'block';

      // Tornar a imagem arrastada não arrastável após o erro
      draggedElem.draggable = false;

      if (data === 'ram') {
        draggedElem.style.transform = ''; // Remover rotação em caso de erro
      }
    }
  });
});

document.getElementById('reiniciar-btn').addEventListener('click', iniciarSessao);

// Iniciar a sessão ao carregar a página
window.onload = iniciarSessao;
