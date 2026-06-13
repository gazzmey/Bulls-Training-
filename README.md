# Documentación del Proyecto: Bulls Training Platform

Este documento detalla el diseño, la arquitectura y el funcionamiento del sistema de ticketing digital y panel administrativo desarrollado para el gimnasio **Bulls Training**.

---

## 📁 Estructura del Proyecto

El código está estructurado de forma modular y separada para facilitar el mantenimiento y la futura integración con un backend real.

```
proyecto bull/
├── index.html            # Landing page principal (Lobby)
├── login.html            # Formulario de inicio de sesión y registro
├── ticket.html           # Vista y generación de entrada digital del usuario
├── admin.html            # Panel de control de administración
├── css/
│   ├── style.css         # Estilos globales y del sitio principal (Responsive)
│   └── admin.css         # Estilos exclusivos del panel administrativo
├── js/
│   └── script.js         # Scripts globales y lógica de la barra de navegación
└── img/
    ├── images.jfif       # Logotipo oficial del gimnasio (Favicon & logos)
    └── (otras imágenes)  # Recursos visuales del gimnasio
```

---

## 👥 Roles de Usuario y Simulación de Sesión

Para efectos de demostración frente al cliente, la plataforma utiliza `localStorage` para persistir el estado de la sesión de manera simulada.

### 1. Rol: Administrador (`admin`)
*   **Credenciales Demo**:
    *   **Email**: `admin@bulls.cl`
    *   **Contraseña**: `admin123`
*   **Flujo**:
    *   Al ingresar con estas credenciales en `login.html`, se le asigna el rol `admin`.
    *   Es redirigido automáticamente al Panel Administrativo (`admin.html`).
    *   En la página principal (`index.html`), se le habilita un botón exclusivo de acceso directo **"Panel Admin"** tanto en el menú de escritorio como en el móvil.

### 2. Rol: Cliente/Usuario (`usuario`)
*   **Credenciales Demo**:
    *   **Email**: Cualquier correo (ej: `cliente@correo.cl`)
    *   **Contraseña**: Cualquier combinación de 6 o más caracteres.
*   **Flujo**:
    *   Se le asigna el rol `usuario`.
    *   Es redirigido a la pantalla de entradas (`ticket.html`) para visualizar su ticket y su **Código QR** correspondiente.
    *   En la página principal, visualiza su nombre y avatar en la barra de navegación, pero sin accesos administrativos.

---

## 🔄 Flujo Completo de la Aplicación

1. **Lobby (`index.html`)**: El usuario navega por la página y decide comprar entradas para un evento.
2. **Autenticación (`login.html`)**:
   - Si inicia sesión como **`admin@bulls.cl` / `admin123`**, el sistema lo guarda como administrador en `localStorage` y lo redirige a `admin.html`.
   - Si inicia sesión con cualquier otra cuenta, se le registra como usuario común y se le redirige a `ticket.html`.
3. **Panel Admin (`admin.html`)**: El administrador gestiona los eventos y valida las entradas con el simulador de escáner QR. Puede volver al Lobby en cualquier momento mediante el botón "Ver Lobby" en la barra lateral.
4. **Mi Entrada (`ticket.html`)**: El cliente ve su entrada con sus datos personales y el código QR generado automáticamente. Puede volver a la página principal haciendo clic en "Volver al inicio".

---

## 🖥️ Módulos e Interfaces

### 1. Página Principal (`index.html`)
*   **Navbar Adaptable**: Cambia dinámicamente. Si el usuario no ha iniciado sesión, muestra "Iniciar sesión". Si ya tiene sesión activa, dibuja su inicial como avatar, su primer nombre, un botón para cerrar sesión, y condicionalmente el botón **"Panel Admin"** si es administrador.
*   Sección Eventos: Presenta las veladas de boxeo con barras de progreso dinámicas sobre la disponibilidad de tickets restantes.

### 2. Acceso Unificado (`login.html`)
*   **Diseño Split**: Una sección lateral con imagen de marca oscura y la otra con los formularios interactivos de Login/Registro.
*   **Registro**: Captura datos reales (Nombre, RUT chileno, Teléfono, Correo) para simular la generación del ticket.

### 3. Entrada Digital (`ticket.html`)
*   **Generador QR integrado**: Utiliza la librería `qrcode.min.js` para crear un código QR dinámico que codifica en tiempo real los datos del comprador (`Nombre`, `RUT`, `ID de Ticket`, `Evento`, `Asiento`).

### 4. Panel Administrativo (`admin.html`)
*   **Control de Acceso**: Si se intenta ingresar a la URL sin haber iniciado sesión como administrador, el sistema realiza una redirección automática a `login.html`.
*   **Pestañas del Dashboard**:
    1.  **Dashboard**: Métricas clave en tarjetas dinámicas (Ingresos, Entradas vendidas, etc.) y tablas de eventos.
    2.  **Eventos**: Permite simular el alta de un nuevo evento a través de un modal.
    3.  **Entradas**: Listado detallado de todas las compras simuladas.
    4.  **Scanner QR**: Simulador integrado con dos flujos:
        *   *Escaneo Válido*: Despliega los datos exactos del titular (`Carlos Rojas`, `RUT`, etc.) con un indicador en verde.
        *   *Escaneo Inválido*: Muestra alerta roja por ticket duplicado o inválido.

---

## 🚀 Hoja de Ruta para Integración de Base de Datos Real

Cuando el gimnasio decida avanzar de la simulación a un entorno de producción, este es el plan recomendado:

### ⚙️ 1. Base de Datos Relacional (Ej: MySQL)
Se requerirán 3 tablas principales para la persistencia real:

- **USUARIOS**: `id`, `nombre`, `email`, `password_hash` (encriptado con bcrypt), `rut`, `telefono`, `rol` ("admin" o "usuario").
- **EVENTOS**: `id`, `nombre`, `fecha`, `hora`, `precio`, `capacidad`.
- **ENTRADAS**: `id`, `ticket_codigo` (ej: "BT-2026-XXXX"), `usuario_id` (llave foránea), `evento_id` (llave foránea), `asiento`, `estado` ("valido", "usado", "cancelado"), `fecha_compra`.

### 🔐 2. Backend (Node.js/Express, PHP o Python)
*   **Servicio de Autenticación**: Reemplazar la validación del `login.html` con un endpoint que verifique el hash de la contraseña y devuelva un Token de Sesión seguro (JWT).
*   **API de Validación del QR**: El simulador de escáner en el Panel Admin consumirá un endpoint tipo `POST /api/tickets/verify` enviando el código leído. El servidor marcará en la base de datos la entrada como `usada` para prevenir duplicados.
