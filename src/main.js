import './style.css';

const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const confirmModalBtn = document.getElementById('confirm-modal');
const modal = document.getElementById('modal-confirmacao');

let previousActiveElement;

function openModal() {
  previousActiveElement = document.activeElement;
  modal.removeAttribute('hidden');
  closeModalBtn.focus();
  document.addEventListener('keydown', handleTrapFocus);
}

function closeModal() {
  modal.setAttribute('hidden', 'true');
  document.removeEventListener('keydown', handleTrapFocus);
  if (previousActiveElement) {
    previousActiveElement.focus();
  }
}

function handleTrapFocus(event) {
  if (event.key === 'Escape') {
    closeModal();
    return;
  }

  if (event.key === 'Tab') {
    const focusables = modal.querySelectorAll('button');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
confirmModalBtn.addEventListener('click', closeModal);