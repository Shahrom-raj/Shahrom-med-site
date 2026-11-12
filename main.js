// Мобильное меню + AI + PDF viewer
document.addEventListener('DOMContentLoaded', () => {
  // Burger menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      burger.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.textContent = '☰';
      });
    });
  }

  // AI Chat
  initAIChat();

  // PDF Viewer buttons
  document.querySelectorAll('[data-open-pdf]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPdfViewer(btn.getAttribute('data-open-pdf'));
    });
  });
});

function initAIChat() {
  // Remove existing if any
  const oldBtn = document.getElementById('aiChatBtn');
  const oldPanel = document.getElementById('aiChatPanel');
  if (oldBtn) oldBtn.remove();
  if (oldPanel) oldPanel.remove();

  const btn = document.createElement('button');
  btn.className = 'ai-chat-btn';
  btn.id = 'aiChatBtn';
  btn.setAttribute('aria-label', 'Открыть ИИ-помощник');
  btn.innerHTML = '🤖';
  document.body.appendChild(btn);

  const panel = document.createElement('div');
  panel.className = 'ai-chat-panel';
  panel.id = 'aiChatPanel';
  panel.innerHTML = `
    <div class="ai-chat-header">
      <span>🤖 ИИ-помощник</span>
      <button id="aiChatClose" aria-label="Закрыть">✕</button>
    </div>
    <div class="ai-chat-body">
      <iframe 
        src="https://free.ai/embed/chat/" 
        title="AI Chat"
        allow="clipboard-write"
        loading="lazy">
      </iframe>
    </div>
    <div class="ai-chat-disclaimer">
      Общий ИИ-помощник. Не заменяет учебники и врача.<br>
      Для точных ответов по экзамену — откройте материалы сайта.
    </div>
  `;
  document.body.appendChild(panel);

  const closeBtn = document.getElementById('aiChatClose');

  btn.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.innerHTML = isOpen ? '✕' : '🤖';
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('open');
    btn.classList.remove('open');
    btn.innerHTML = '🤖';
  });
}

// PDF Viewer
function openPdfViewer(pdfUrl) {
  let modal = document.getElementById('pdfModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'pdfModal';
    modal.className = 'pdf-modal';
    modal.innerHTML = `
      <div class="pdf-modal-inner">
        <div class="pdf-modal-header">
          <span>Детская хирургия — вопросы 1–182</span>
          <button id="pdfModalClose" aria-label="Закрыть">✕</button>
        </div>
        <div class="pdf-modal-body">
          <iframe id="pdfFrame" src="" title="PDF Viewer"></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('pdfModalClose').addEventListener('click', () => {
      modal.classList.remove('open');
      document.getElementById('pdfFrame').src = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.getElementById('pdfFrame').src = '';
      }
    });
  }

  document.getElementById('pdfFrame').src = pdfUrl + '#toolbar=1&navpanes=0';
  modal.classList.add('open');
}
