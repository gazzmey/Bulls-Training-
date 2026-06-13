// Bulls Training — scripts principales

document.addEventListener('DOMContentLoaded', () => {

  // Scroll suave al hacer clic en "Empieza hoy"
  const btnEmpiezaHoy = document.querySelector('.btn-primary[data-scroll="contacto"]');
  if (btnEmpiezaHoy) {
    btnEmpiezaHoy.addEventListener('click', () => {
      document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    });
  }

});
