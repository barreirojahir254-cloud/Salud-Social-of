// Sistema de autenticación con localStorage

// Registrar nuevo usuario
function registrarUsuario(email, password, nombre) {
    // Validar que no esté vacío
    if (!email || !password || !nombre) {
        return { success: false, message: 'Todos los campos son requeridos' };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: 'Email no válido' };
    }

    // Validar que la contraseña tenga mínimo 6 caracteres
    if (password.length < 6) {
        return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }

    // Obtener usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar que el email no esté registrado
    if (usuarios.find(u => u.email === email)) {
        return { success: false, message: 'Este email ya está registrado' };
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre,
        email: email,
        password: password,
        fechaRegistro: new Date().toISOString()
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    return { success: true, message: 'Usuario registrado exitosamente' };
}

// Iniciar sesión
function iniciarSesion(email, password) {
    if (!email || !password) {
        return { success: false, message: 'Email y contraseña son requeridos' };
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (!usuario) {
        return { success: false, message: 'Email o contraseña incorrectos' };
    }

    // Guardar sesión
    const sesion = {
        usuarioId: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        fechaLogin: new Date().toISOString()
    };

    localStorage.setItem('sesionActual', JSON.stringify(sesion));

    return { success: true, message: 'Sesión iniciada', usuario: usuario };
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('sesionActual');
    return { success: true, message: 'Sesión cerrada' };
}

// Verificar si el usuario está autenticado
function estaAutenticado() {
    return localStorage.getItem('sesionActual') !== null;
}

// Obtener usuario actual
function obtenerUsuarioActual() {
    const sesion = localStorage.getItem('sesionActual');
    return sesion ? JSON.parse(sesion) : null;
}

// Actualizar perfil del usuario
function actualizarPerfil(nombreCompleto, telefono, ciudad, intereses) {
    const sesion = obtenerUsuarioActual();
    
    if (!sesion) {
        return { success: false, message: 'No hay sesión activa' };
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioIndex = usuarios.findIndex(u => u.id === sesion.usuarioId);

    if (usuarioIndex === -1) {
        return { success: false, message: 'Usuario no encontrado' };
    }

    usuarios[usuarioIndex].nombreCompleto = nombreCompleto;
    usuarios[usuarioIndex].telefono = telefono;
    usuarios[usuarioIndex].ciudad = ciudad;
    usuarios[usuarioIndex].intereses = intereses;

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Actualizar sesión
    sesion.nombre = nombreCompleto;
    localStorage.setItem('sesionActual', JSON.stringify(sesion));

    return { success: true, message: 'Perfil actualizado' };
}

// Redirigir si no está autenticado
function verificarAutenticacion() {
    if (!estaAutenticado()) {
        window.location.href = 'iniciar_sesion.html';
    }
}

// Redirigir si ya está autenticado
function verificarNoAutenticado() {
    if (estaAutenticado()) {
        window.location.href = 'index.html';
    }
}

// Actualizar barra de navegación dinámicamente
function actualizarNavegacionDinamica() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Eliminar botón de "Iniciar Sesión" si existe
    const botonLoginAnterior = nav.querySelector('[data-auth-button]');
    if (botonLoginAnterior) {
        botonLoginAnterior.remove();
    }

    const usuarioActual = obtenerUsuarioActual();

    if (usuarioActual) {
        // Usuario autenticado - agregar botón de cerrar sesión
        const botonCerrar = document.createElement('a');
        botonCerrar.href = '#';
        botonCerrar.setAttribute('data-auth-button', 'true');
        botonCerrar.textContent = `👤 ${usuarioActual.nombre}`;
        botonCerrar.style.color = 'white';
        botonCerrar.style.textDecoration = 'none';
        botonCerrar.style.marginLeft = 'auto';
        botonCerrar.style.fontWeight = 'bold';
        botonCerrar.style.display = 'flex';
        botonCerrar.style.alignItems = 'center';
        botonCerrar.style.gap = '10px';
        botonCerrar.style.paddingRight = '20px';

        botonCerrar.onclick = function(e) {
            e.preventDefault();
            if (confirm('¿Deseas cerrar sesión?')) {
                cerrarSesion();
                location.reload();
            }
        };

        nav.appendChild(botonCerrar);
    } else {
        // Usuario no autenticado - mostrar "Iniciar Sesión" en el menú
        let botonLogin = nav.querySelector('a[href="iniciar_sesion.html"]');
        if (!botonLogin) {
            botonLogin = document.createElement('a');
            botonLogin.href = 'iniciar_sesion.html';
            botonLogin.setAttribute('data-auth-button', 'true');
            botonLogin.textContent = 'Iniciar Sesión';
            botonLogin.style.marginLeft = 'auto';
            botonLogin.style.paddingRight = '20px';
            nav.appendChild(botonLogin);
        }
    }
}

// Inicializar navegación en cada página
window.addEventListener('load', actualizarNavegacionDinamica);

// Crear estructura HTML de navegación mejorada
function crearNavegacionCompleta() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Verificar si ya tiene la estructura completa
    if (nav.classList.contains('nav-completa')) return;

    nav.classList.add('nav-completa');

    const usuarioActual = obtenerUsuarioActual();
    const enlacesBasicos = ['Inicio', 'Contacto'];
    const enlacesAutenticados = ['Especialistas', 'Eventos', 'Hábitos Saludables', 'Recordatorios', 'Reportes', 'Comunidad', 'Personalización'];

    // Limpiar nav anterior
    nav.innerHTML = '';

    // Agregar enlaces básicos
    enlacesBasicos.forEach(enlace => {
        const a = document.createElement('a');
        const url = enlace.toLowerCase() === 'inicio' ? 'index.html' : 'contacto.html';
        a.href = url;
        a.textContent = enlace;
        nav.appendChild(a);
    });

    // Agregar enlaces de autenticados si está logueado
    if (usuarioActual) {
        enlacesAutenticados.forEach(enlace => {
            const a = document.createElement('a');
            const urlMap = {
                'Especialistas': 'especialistas.html',
                'Eventos': 'eventos.html',
                'Hábitos Saludables': 'habitos_saludables.html',
                'Recordatorios': 'recordatorios.html',
                'Reportes': 'reportes.html',
                'Comunidad': 'comunidad.html',
                'Personalización': 'personalizacion.html'
            };
            a.href = urlMap[enlace] || '#';
            a.textContent = enlace;
            nav.appendChild(a);
        });
    }

    // Agregar botón de usuario o login
    const botonUsuario = document.createElement('a');
    botonUsuario.setAttribute('data-auth-button', 'true');
    botonUsuario.style.marginLeft = 'auto';
    
    if (usuarioActual) {
        botonUsuario.href = '#';
        botonUsuario.innerHTML = `👤 ${usuarioActual.nombre} | <span style="cursor: pointer; color: #ffcccc;">Cerrar</span>`;
        botonUsuario.onclick = function(e) {
            e.preventDefault();
            if (confirm('¿Deseas cerrar sesión?')) {
                cerrarSesion();
                location.reload();
            }
        };
    } else {
        botonUsuario.href = 'iniciar_sesion.html';
        botonUsuario.textContent = '🔐 Iniciar Sesión';
    }

    nav.appendChild(botonUsuario);
}
