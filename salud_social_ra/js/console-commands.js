// GUÍA DE ACCESO A DATOS - SALUD SOCIAL
// Ejecuta estos comandos en la Consola del Navegador (F12)

// ============================================
// 1. VER TODOS LOS USUARIOS
// ============================================
const usuarios = JSON.parse(localStorage.getItem('usuarios'));
console.log(usuarios);
console.table(usuarios);

// ============================================
// 2. VER UN USUARIO ESPECÍFICO
// ============================================
const usuarioId = usuarios[0].id;  // Primer usuario
const usuarioEspecifico = usuarios.find(u => u.id === usuarioId);
console.log(usuarioEspecifico);

// ============================================
// 3. VER TODOS LOS HÁBITOS DE TODOS LOS USUARIOS
// ============================================
usuarios.forEach(usuario => {
  console.log(`${usuario.nombre} - ${usuario.habitos.length} hábitos registrados`);
  usuario.habitos.forEach(habito => {
    console.log(`  📅 ${habito.fecha}: Ejercicio: ${habito.ejercicio}, Agua: ${habito.agua}, Sueño: ${habito.sueno}h`);
  });
});

// ============================================
// 4. VER METAS DE UN USUARIO
// ============================================
const usuario = usuarios[0];
if (usuario.metas) {
  console.log(`Metas de ${usuario.nombre}:`);
  console.log(`  🏃 Ejercicio: ${usuario.metas.ejercicio} minutos`);
  console.log(`  💧 Agua: ${usuario.metas.agua} litros`);
  console.log(`  😴 Sueño: ${usuario.metas.suenio} horas`);
}

// ============================================
// 5. CONTAR USUARIOS ACTIVOS (con datos)
// ============================================
const usuariosActivos = usuarios.filter(u => 
  (u.habitos && u.habitos.length > 0) || 
  (u.recordatorios && u.recordatorios.length > 0)
).length;
console.log(`Usuarios activos: ${usuariosActivos}`);

// ============================================
// 6. VER ESTADÍSTICAS GENERALES
// ============================================
const stats = {
  totalUsuarios: usuarios.length,
  totalHabitos: usuarios.reduce((sum, u) => sum + (u.habitos ? u.habitos.length : 0), 0),
  totalRecordatorios: usuarios.reduce((sum, u) => sum + (u.recordatorios ? u.recordatorios.length : 0), 0),
  totalPublicaciones: usuarios.reduce((sum, u) => sum + (u.publicaciones ? u.publicaciones.length : 0), 0),
  usuariosConMetas: usuarios.filter(u => u.metas && (u.metas.ejercicio || u.metas.agua || u.metas.suenio)).length
};
console.table(stats);

// ============================================
// 7. VER TODAS LAS PUBLICACIONES
// ============================================
usuarios.forEach(usuario => {
  if (usuario.publicaciones && usuario.publicaciones.length > 0) {
    usuario.publicaciones.forEach(pub => {
      console.log(`${usuario.nombre}: "${pub.texto.substring(0, 50)}..." (${pub.likes.length} likes)`);
    });
  }
});

// ============================================
// 8. VER RECORDATORIOS DE UN USUARIO
// ============================================
const usuarioConRecordatorios = usuarios.find(u => u.recordatorios && u.recordatorios.length > 0);
if (usuarioConRecordatorios) {
  console.log(`Recordatorios de ${usuarioConRecordatorios.nombre}:`);
  usuarioConRecordatorios.recordatorios.forEach(rec => {
    console.log(`  ⏰ ${rec.hora} - ${rec.nombre} (${rec.tipo})`);
  });
}

// ============================================
// 9. BUSCAR USUARIO POR EMAIL
// ============================================
function buscarPorEmail(email) {
  return usuarios.find(u => u.email === email);
}
const user = buscarPorEmail("ejemplo@email.com");
console.log(user);

// ============================================
// 10. OBTENER RESUMEN DE UN USUARIO
// ============================================
function resumenUsuario(usuarioId) {
  const user = usuarios.find(u => u.id === usuarioId);
  if (!user) return null;
  
  return {
    nombre: user.nombre,
    email: user.email,
    registroDesde: new Date(user.fechaRegistro).toLocaleDateString('es-ES'),
    habitosRegistrados: (user.habitos || []).length,
    recordatorios: (user.recordatorios || []).length,
    publicaciones: (user.publicaciones || []).length,
    tieneMetas: !!(user.metas && (user.metas.ejercicio || user.metas.agua || user.metas.suenio))
  };
}

console.table([resumenUsuario(usuarios[0].id)]);

// ============================================
// 11. EXPORTAR DATOS A JSON
// ============================================
function exportarDatos() {
  const datos = {
    usuarios: JSON.parse(localStorage.getItem('usuarios')),
    fechaExportacion: new Date().toLocaleString('es-ES'),
    version: '1.0'
  };
  
  const jsonString = JSON.stringify(datos, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `salud-social-backup-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

exportarDatos();  // Ejecutar para descargar

// ============================================
// 12. LIMPIAR UN USUARIO (ELIMINAR)
// ============================================
function eliminarUsuario(usuarioId) {
  const usuariosActualizados = usuarios.filter(u => u.id !== usuarioId);
  localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
  console.log('Usuario eliminado');
}

// eliminarUsuario(123456);  // Descomentar para usar

// ============================================
// 13. ACTUALIZAR USUARIO
// ============================================
function actualizarUsuario(usuarioId, datos) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  const index = usuarios.findIndex(u => u.id === usuarioId);
  
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...datos };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuario actualizado');
  }
}

// Ejemplo de uso:
// actualizarUsuario(usuarios[0].id, { ciudad: 'Barcelona', edad: 30 });

// ============================================
// 14. VER ACTIVIDAD POR DÍA
// ============================================
function actividadPorDia() {
  const actividad = {};
  
  usuarios.forEach(usuario => {
    (usuario.habitos || []).forEach(habito => {
      const fecha = new Date(habito.fecha).toLocaleDateString('es-ES');
      if (!actividad[fecha]) actividad[fecha] = 0;
      actividad[fecha]++;
    });
  });
  
  console.table(actividad);
}

actividadPorDia();

// ============================================
// 15. GENERAR REPORTE COMPLETO
// ============================================
function generarReporte() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  
  console.log('=== REPORTE GENERAL DE SALUD SOCIAL ===');
  console.log(`Fecha: ${new Date().toLocaleString('es-ES')}`);
  console.log(`Total de usuarios: ${usuarios.length}`);
  
  usuarios.forEach(user => {
    console.log(`\n📱 ${user.nombre}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Registro: ${new Date(user.fechaRegistro).toLocaleDateString('es-ES')}`);
    console.log(`   Hábitos: ${(user.habitos || []).length}`);
    console.log(`   Recordatorios: ${(user.recordatorios || []).length}`);
    console.log(`   Publicaciones: ${(user.publicaciones || []).length}`);
    
    if (user.metas) {
      console.log(`   Metas:`);
      console.log(`     - Ejercicio: ${user.metas.ejercicio} min`);
      console.log(`     - Agua: ${user.metas.agua} L`);
      console.log(`     - Sueño: ${user.metas.suenio} h`);
    }
  });
}

generarReporte();

// ============================================
// 16. RESETEAR TODOS LOS DATOS
// ============================================
function resetearTodo() {
  if (confirm('⚠️ ¿DESEAS ELIMINAR TODOS LOS DATOS?')) {
    localStorage.removeItem('usuarios');
    localStorage.removeItem('sesionActual');
    location.reload();
    console.log('Datos eliminados');
  }
}

// resetearTodo();  // Descomentar para usar

// ============================================
// ATAJOS ÚTILES
// ============================================

// Ver sesión actual
console.log(JSON.parse(localStorage.getItem('sesionActual')));

// Copiar tabla de usuarios a portapapeles
copy(usuarios);

// Ver size de datos almacenados
const size = new Blob([localStorage.getItem('usuarios')]).size;
console.log(`Tamaño de datos: ${(size / 1024).toFixed(2)} KB`);

// Limpiar consola
console.clear();

// ============================================
// TIPS Y TRUCOS
// ============================================
/*
1. Para ver los datos en tabla: console.table(datos)
2. Para expandir un objeto: console.dir(objeto)
3. Para medir tiempo: console.time(); ... console.timeEnd();
4. Para contar ocurrencias: console.count('etiqueta');
5. Para copiar al portapapeles: copy(variable)
6. Para abrir DevTools: F12 o Ctrl+Shift+I
7. Para ir al panel admin desde cualquier página: Ctrl+Shift+A
*/
