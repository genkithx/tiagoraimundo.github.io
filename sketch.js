let cursor_delay_element, cursor_element;
let current_x, current_y;
let target_x, target_y;

let currentSize = 60; // tamanho atual (animado)
let targetSize = 60;  // tamanho alvo
let isHovering = false;

function setup() {
  noCanvas();

  cursor_delay_element = select("#meu_cursor_delay");
  cursor_delay_element.show();

  cursor_element = select("#meu_cursor");
  cursor_element.show();

  current_x = mouseX;
  current_y = mouseY;

  // detetar hover em elementos interativos
  const hoverables = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
  hoverables.forEach(el => {
    el.addEventListener("mouseenter", () => isHovering = true);
    el.addEventListener("mouseleave", () => isHovering = false);
  });
}

function draw() {
  target_x = mouseX;
  target_y = mouseY;

  // Interpolação da posição do cursor delay
  const lerpAmount = 0.15;
  current_x = lerp(current_x, target_x, lerpAmount);
  current_y = lerp(current_y, target_y, lerpAmount);

  // Define o tamanho alvo com base no hover
  targetSize = isHovering ? 90 : 60;

  // Interpolação suave do tamanho
  currentSize = lerp(currentSize, targetSize, 0.1);

  // Atualiza visualmente o elemento
  cursor_delay_element.size(currentSize, currentSize);
  cursor_delay_element.style("border-radius", currentSize / 2 + "px");
  cursor_delay_element.position(current_x - currentSize / 2, current_y - currentSize / 2, "fixed");

  // cursor pontual (sem animação)
  const w = 7;
  const h = 7;
  cursor_element.size(w, h);
  cursor_element.style("border-radius", w / 2 + "px");
  cursor_element.position(target_x - w / 2, target_y - h / 2, "fixed");
}
