/**
 * Roteador de SPA (Single Page Application)
 * Controla a exibição das seções, histórico e links ativos.
 */
function navigateTo(pageId) {
  // 1. Oculta todas as páginas ativas
  const pages = document.querySelectorAll('.page-view');
  pages.forEach(page => {
    page.classList.remove('active');
  });

  // 2. Exibe a seção de destino solicitada
  const targetPage = document.getElementById(`view-${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // 3. Atualiza o sublinhado/indicador ativo nos links do cabeçalho
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. Rola a página suavemente até o topo
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 5. Salva no histórico da URL via Hash (#home, #servicos, etc)
  if (window.location.hash !== `#${pageId}`) {
    history.pushState(null, null, `#${pageId}`);
  }
}

// Suporte aos botões de 'Avançar' e 'Voltar' do navegador
window.addEventListener('popstate', () => {
  const page = window.location.hash.replace('#', '') || 'home';
  navigateTo(page);
});

// Inicialização automática com base na rota da URL atual
document.addEventListener('DOMContentLoaded', () => {
  const initialPage = window.location.hash.replace('#', '') || 'home';
  navigateTo(initialPage);
});

