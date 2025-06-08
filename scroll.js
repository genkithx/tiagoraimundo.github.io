/*
Nome e Número de estudante
Tiago Pinto Raimundo 3220795

Data
08/06/2024

Nome do Exercício
Portfolio

Época de Avaliação Continua (durante as aulas)

Ano Letivo (3º, 2024-2025), 
Semestre (2º), 
Unidade Curricular (Laboratório de Projeto II), 
Curso (DGM), 
Escola (ESAD.CR), 
Docente (Marco Heleno).
*/

let scrollAmount = window.scrollY || 0;
let targetScroll = scrollAmount;
let isScrolling = false;

function allowNativeScroll(event) {
  let el = event.target;

  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    const canScrollX = el.scrollWidth > el.clientWidth && (style.overflowX === 'auto' || style.overflowX === 'scroll');
    const isTryingToScrollHorizontally = Math.abs(event.deltaX) > Math.abs(event.deltaY);

    if (canScrollX && isTryingToScrollHorizontally) {
      return true; // Permite o scroll horizontal nativo
    }

    el = el.parentElement;
  }

  return false;
}

window.addEventListener('wheel', function(event) {
  if (allowNativeScroll(event)) {
    return; // Deixa o scroll horizontal acontecer normalmente
  }

  event.preventDefault();

  targetScroll += event.deltaY;
  targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(smoothScroll);
  }
}, { passive: false });

function smoothScroll() {
  scrollAmount += (targetScroll - scrollAmount) * 0.05;
  window.scrollTo(0, scrollAmount);

  if (Math.abs(scrollAmount - targetScroll) > 0.5) {
    requestAnimationFrame(smoothScroll);
  } else {
    isScrolling = false;
  }
}
