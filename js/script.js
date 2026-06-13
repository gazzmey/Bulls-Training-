// Bulls Training — scripts principales

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll suave al hacer clic en "Empieza hoy" ──────────────────────────
  const btnEmpiezaHoy = document.querySelector('.btn-primary[data-scroll="contacto"]');
  if (btnEmpiezaHoy) {
    btnEmpiezaHoy.addEventListener('click', () => {
      document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── Menú hamburguesa ─────────────────────────────────────────────────────
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    // Abrir / cerrar
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar al hacer clic en cualquier enlace del menú
    navLinks.querySelectorAll('.nav-close').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Cerrar si se redimensiona a escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

});
