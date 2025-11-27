# 🎯 GUÍA RÁPIDA: ADMINISTRACIÓN DE SALUD SOCIAL

## 🚀 ACCESO RÁPIDO AL PANEL ADMIN

### ⌨️ Atajo de Teclado (MÁS RÁPIDO)
Desde CUALQUIER PÁGINA:
```
Ctrl + Shift + A
```

### 🔗 URL Directa
```
https://tudominio.com/admin.html
```

### 📖 Página de Información
```
https://tudominio.com/admin-info.html
```

---

## 💾 DÓNDE SE GUARDAN LOS DATOS

**Ubicación:** localStorage del navegador

### Desde la Consola (F12)
```javascript
// Ver TODOS los usuarios
JSON.parse(localStorage.getItem('usuarios'))

// Ver sesión actual
JSON.parse(localStorage.getItem('sesionActual'))
```

### En el Panel Admin
Ve a la sección **"👥 Usuarios"** para ver:
- ✓ Todos los usuarios registrados
- ✓ Email y fecha de registro
- ✓ Cantidad de registros
- ✓ Botones para ver detalles o eliminar

---

## 📊 PANEL DE ADMIN - TABS DISPONIBLES

### 1️⃣ **Usuarios** 👥
- Ver todos los usuarios registrados
- Buscar por nombre o email
- Ver detalles completos
- Eliminar usuarios y sus datos

### 2️⃣ **Hábitos** 🏃
- Ver todos los hábitos registrados
- Por cada usuario
- Detalles: alimentación, ejercicio, agua, sueño
- Búsqueda en tiempo real

### 3️⃣ **Recordatorios** ⏰
- Todos los recordatorios activos
- Tipo: medicamento, alimento, agua, ejercicio, cita médica
- Hora configurada
- Opción para eliminar

### 4️⃣ **Publicaciones** 💬
- Feed completo de la comunidad
- Autor y fecha
- Cantidad de likes
- Ver contenido completo

### 5️⃣ **Metas** 🎯
- Metas establecidas por usuarios
- Ejercicio (minutos)
- Agua (litros)
- Sueño (horas)

---

## 🔧 OPERACIONES ADMINISTRATIVAS

### 📥 EXPORTAR DATOS
**Botón:** "📥 Exportar Datos (JSON)"

Descarga un archivo con:
- Todos los usuarios
- Todos los hábitos
- Todos los recordatorios
- Todas las publicaciones
- Todos los datos del sistema

💡 **Uso:** Hacer backups regulares

### 📤 IMPORTAR DATOS
**Botón:** "📤 Importar Datos"

Carga datos desde un archivo JSON exportado:
- Restaura datos de un backup
- Migra datos entre navegadores
- Recupera datos borrados

### 🧹 LIMPIAR CONSOLA
**Botón:** "🧹 Limpiar Consola"

Limpia el historial de la consola del navegador.

### ⚠️ RESETEAR TODO
**Botón:** "⚠️ Resetear Todo"

**¡CUIDADO!** Elimina TODOS los datos:
- ✗ Todos los usuarios
- ✗ Todos los hábitos
- ✗ Todos los recordatorios
- ✗ Todas las publicaciones
- ✗ Todas las metas

Requiere confirmación doble.

---

## 📈 ESTADÍSTICAS EN VIVO

El panel muestra automáticamente:

| Métrica | Descripción |
|---------|------------|
| 👥 Total de Usuarios | Cantidad de usuarios registrados |
| 🏃 Registros de Hábitos | Total de hábitos registrados |
| ⏰ Recordatorios Activos | Recordatorios creados |
| 💬 Publicaciones | Posts en la comunidad |
| 🎯 Usuarios con Metas | Cuántos tienen metas |

---

## 🔍 BUSCAR Y FILTRAR

Cada tab tiene un buscador:
1. Escribe en el campo "Buscar..."
2. Los resultados se filtran automáticamente
3. Funciona en tiempo real

**Ejemplos:**
- Buscar usuario: "Juan"
- Buscar email: "juan@email.com"
- Buscar publicación: "carrera"

---

## 👁️ VER DETALLES DE UN USUARIO

Botón: **"Ver"** en la columna Acciones

**Información que verás:**
- Datos personales completos
- Metas establecidas
- Estadísticas de actividad
- Intereses de salud

---

## 🗑️ ELIMINAR UN USUARIO

Botón: **"Eliminar"** en la columna Acciones

**Se eliminarán:**
- ✗ Perfil del usuario
- ✗ Todos sus hábitos
- ✗ Todos sus recordatorios
- ✗ Todas sus publicaciones
- ✗ Todos sus datos personales

⚠️ Requiere confirmación antes de eliminar.

---

## 📱 ESTRUCTURA DE DATOS

### Datos de un Usuario
```javascript
{
  id: 1234567890,
  nombre: "Juan Pérez",
  email: "juan@example.com",
  edad: 25,
  ciudad: "Madrid",
  telefono: "123456789",
  metas: {
    ejercicio: 30,    // minutos
    agua: 2,          // litros
    suenio: 8         // horas
  },
  habitos: [
    {
      fecha: "2025-11-25",
      alimentacion: "...",
      ejercicio: "...",
      agua: "...",
      suenio: 8
    }
  ],
  recordatorios: [
    {
      nombre: "Tomar agua",
      tipo: "Agua",
      hora: "12:00",
      nota: "..."
    }
  ],
  publicaciones: [
    {
      texto: "Mensaje...",
      fecha: "2025-11-25",
      likes: 5
    }
  ]
}
```

---

## 🖥️ ACCESO DESDE LA CONSOLA (F12)

### Copiar comandos útiles

```javascript
// Ver resumen de estadísticas
const usuarios = JSON.parse(localStorage.getItem('usuarios'));
console.log({
  totalUsuarios: usuarios.length,
  totalHabitos: usuarios.reduce((s,u) => s + (u.habitos?.length || 0), 0),
  totalRecordatorios: usuarios.reduce((s,u) => s + (u.recordatorios?.length || 0), 0),
  totalPublicaciones: usuarios.reduce((s,u) => s + (u.publicaciones?.length || 0), 0)
});

// Ver todos los usuarios en tabla
console.table(usuarios);

// Buscar usuario específico
usuarios.find(u => u.email === "juan@email.com");

// Exportar a CSV (copiar a Excel)
copy(usuarios);
```

---

## ✅ CHECKLIST DE ADMINISTRACIÓN

- [ ] Revisar panel admin semanalmente
- [ ] Exportar datos como backup
- [ ] Eliminar usuarios inactivos
- [ ] Verificar actividad de hábitos
- [ ] Moderar publicaciones ofensivas
- [ ] Responder comentarios de usuarios
- [ ] Analizar estadísticas de uso
- [ ] Guardar copias de seguridad

---

## 🆘 PROBLEMAS COMUNES

### P: No veo el botón de admin
**R:** Presiona Ctrl+Shift+A desde cualquier página

### P: Los datos desaparecieron
**R:** Abre DevTools (F12) y verifica localStorage

### P: Necesito restaurar datos
**R:** Importa el archivo JSON del backup en el admin

### P: ¿Dónde está la contraseña del admin?
**R:** Este panel no tiene contraseña. En producción, deberías añadirla.

---

## 🔐 NOTAS DE SEGURIDAD

⚠️ **Importante:**
- Este panel está en localStorage (navegador)
- No es seguro para producción
- Cualquiera que acceda a DevTools puede ver los datos
- Implementa autenticación en un servidor real

---

## 📞 AYUDA RÁPIDA

**Para más información, consulta:**
1. `ADMIN_README.md` - Documentación completa
2. `admin-info.html` - Página web de información
3. `js/console-commands.js` - Comandos útiles

---

**Última actualización:** 25 de Noviembre, 2025
**Panel Admin v1.0**
