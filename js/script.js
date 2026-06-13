// Bulls Training — scripts principales

document.addEventListener('DOMContentLoaded', () => {

  // ── Estado de sesión en nav ───────────────────────────────────────────
  const user = JSON.parse(localStorage.getItem('bt_user') || 'null');
  const loginBtn = document.getElementById('navLoginBtn');
  const userEl   = document.getElementById('navUser');
  const avatarEl = document.getElementById('navAvatar');
  const nameEl   = document.getElementById('navUserName');

  if (user && loginBtn && userEl) {
    loginBtn.style.display = 'none';
    userEl.style.display   = 'flex';
    if (avatarEl) avatarEl.textContent = user.nombre.charAt(0).toUpperCase();
    if (nameEl)   nameEl.textContent   = user.nombre.split(' ')[0];
  }

  // ── Scroll suave al hacer clic en "Empieza hoy" ───────────────────────
  const btnEmpiezaHoy = document.querySelector('.btn-primary[data-scroll="contacto"]');
  if (btnEmpiezaHoy) {
    btnEmpiezaHoy.addEventListener('click', () => {
      document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── Menú hamburguesa ─────────────────────────────────────────────────
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav-close').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

});

// ── Cerrar sesión ─────────────────────────────────────────────────────
function cerrarSesion() {
  localStorage.removeItem('bt_user');
  localStorage.removeItem('bt_evento');
  window.location.reload();
}
