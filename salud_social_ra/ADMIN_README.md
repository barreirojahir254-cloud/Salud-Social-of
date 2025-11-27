# 🏥 Salud Social - Panel de Administración

## 📋 Descripción General

Panel de administración completo para gestionar la plataforma Salud Social. Permite visualizar, administrar y controlar todos los usuarios, hábitos, recordatorios, publicaciones y metas de la comunidad.

## 🔐 Acceso al Panel Admin

### Opción 1: Atajo de Teclado (Recomendado)
Desde cualquier página del sitio, presiona:
```
Ctrl + Shift + A
```

### Opción 2: URL Directa
Accede a: `admin.html`

### Opción 3: Información de Acceso
Accede a: `admin-info.html` (página con instrucciones)

## 💾 Ubicación de los Datos

Todos los datos se almacenan en **localStorage** del navegador:

```javascript
// Ver todos los usuarios
localStorage.getItem('usuarios')

// Ver sesión actual
localStorage.getItem('sesionActual')
```

### Cómo acceder desde la consola (F12):
```javascript
// En la consola del navegador:
console.log(JSON.parse(localStorage.getItem('usuarios')))
```

## 📊 Características del Panel

### 1. **Dashboard Principal**
- Total de usuarios registrados
- Cantidad de registros de hábitos
- Recordatorios activos
- Publicaciones comunitarias
- Usuarios con metas configuradas

### 2. **Gestión de Usuarios**
- Ver lista completa de usuarios
- Información personal (nombre, email, edad, ciudad)
- Fecha de registro
- Cantidad de registros
- Botones para:
  - 👁️ Ver detalles completos
  - 🗑️ Eliminar usuario y todos sus datos

### 3. **Hábitos Registrados**
- Ver todos los hábitos de todos los usuarios
- Filtro por usuario
- Detalles: alimentación, ejercicio, agua, sueño
- Búsqueda en tiempo real

### 4. **Recordatorios Activos**
- Lista de todos los recordatorios por usuario
- Tipo de recordatorio (medicamento, alimentación, agua, ejercicio, cita médica)
- Hora configurada
- Opción para eliminar recordatorios

### 5. **Publicaciones Comunitarias**
- Ver todas las publicaciones del feed
- Autor y fecha
- Cantidad de likes
- Vista previa del contenido
- Búsqueda de publicaciones

### 6. **Metas de Usuarios**
- Metas de ejercicio (minutos)
- Metas de agua (litros)
- Metas de sueño (horas)
- Fecha de última actualización

## 🛠️ Operaciones Disponibles

### Exportar Datos
Descarga un archivo JSON con todos los usuarios y sus datos:
```json
{
  "usuarios": [...],
  "fechaExportacion": "25/11/2025",
  "version": "1.0"
}
```

### Importar Datos
Carga un archivo JSON previamente exportado (para respaldar o restaurar datos).

### Limpiar Consola
Limpia la consola del navegador.

### Resetear Todo ⚠️
Elimina completamente todos los datos (requiere confirmación doble).

## 📱 Estructura de Datos

### Objeto Usuario
```javascript
{
  id: 1234567890,
  nombre: "Juan Pérez",
  email: "juan@example.com",
  password: "hashedPassword",
  edad: 25,
  ciudad: "Madrid",
  telefono: "123456789",
  intereses: "Fitness, nutrición",
  fechaRegistro: "2025-11-25T10:30:00.000Z",
  
  // Metas personales
  metas: {
    ejercicio: 30,
    agua: 2,
    suenio: 8,
    fecha: "2025-11-25T10:30:00.000Z"
  },
  
  // Hábitos registrados
  habitos: [
    {
      id: 9876543210,
      fecha: "2025-11-25T14:00:00.000Z",
      alimentacion: "Desayuno balanceado",
      ejercicio: "30 min caminata",
      agua: "1-2 litros",
      sueno: 8
    }
  ],
  
  // Recordatorios
  recordatorios: [
    {
      id: 5555555555,
      nombre: "Tomar agua",
      tipo: "Agua",
      hora: "12:00",
      nota: "Hidratación diaria",
      fecha: "2025-11-25T10:30:00.000Z"
    }
  ],
  
  // Publicaciones comunitarias
  publicaciones: [
    {
      id: 7777777777,
      texto: "Hoy completé mi primer maratón...",
      fecha: "2025-11-25T15:00:00.000Z",
      likes: ["usuarioId1", "usuarioId2"]
    }
  ],
  
  // Historial de eventos
  historial: [
    {
      titulo: "Actualización de perfil",
      descripcion: "Actualizaste tu perfil",
      fecha: "2025-11-25T10:30:00.000Z"
    }
  ]
}
```

## 🔍 Búsqueda y Filtros

Todos los tabs tienen búsqueda en tiempo real:
- Escribe en el campo de búsqueda
- Los resultados se filtran automáticamente
- Busca por nombre de usuario, email, contenido, etc.

## 📈 Estadísticas

El panel muestra en tiempo real:
- Cantidad de usuarios activos
- Total de registros de hábitos
- Recordatorios configurados
- Publicaciones comunitarias
- Usuarios que han establecido metas

## 🔒 Seguridad

**Nota importante:** Este es un panel local sin autenticación. En un entorno de producción, deberías:
1. Implementar autenticación de admin
2. Usar una base de datos real (Firebase, MongoDB, etc.)
3. Encriptar contraseñas
4. Registrar acciones administrativas
5. Implementar logs de auditoría

## 🚀 Uso Recomendado

### Para Desarrollo
1. Abre la consola (F12)
2. Presiona Ctrl + Shift + A para acceder al admin
3. Verifica que todos los datos se guardan correctamente

### Para Verificar Datos
```javascript
// En la consola:
const usuarios = JSON.parse(localStorage.getItem('usuarios'))
console.table(usuarios)  // Ver en tabla
usuarios.forEach(u => console.log(u.nombre, u.email))
```

### Para Exportar/Respaldar
1. Ve al panel admin
2. Haz clic en "Exportar Datos (JSON)"
3. Se descargará un archivo con todos los datos
4. Guárdalo como respaldo

### Para Restaurar Datos
1. Ve al panel admin
2. Haz clic en "Importar Datos"
3. Selecciona el archivo JSON guardado anteriormente

## 📝 Tablas del Panel

### Usuarios
| Columna | Descripción |
|---------|------------|
| ID | ID único del usuario |
| Nombre | Nombre completo |
| Email | Correo electrónico |
| Fecha Registro | Cuándo se registró |
| Registros | Cantidad de hábitos registrados |
| Metas | ✓ si tiene metas, ✗ si no |
| Acciones | Ver o eliminar |

### Hábitos
| Columna | Descripción |
|---------|------------|
| Usuario | Quién lo registró |
| Fecha | Cuándo se registró |
| Ejercicio | Actividad realizada |
| Agua | Cantidad de agua |
| Sueño | Horas de sueño |
| Acciones | Ver detalles |

### Recordatorios
| Columna | Descripción |
|---------|------------|
| Usuario | Quién creó el recordatorio |
| Nombre | Nombre del recordatorio |
| Tipo | Categoría (medicamento, alimento, etc) |
| Hora | Hora configurada |
| Nota | Notas adicionales |
| Acciones | Eliminar |

### Publicaciones
| Columna | Descripción |
|---------|------------|
| Usuario | Quien publicó |
| Contenido | Texto de la publicación |
| Fecha | Cuándo se publicó |
| Likes | Cantidad de likes |
| Acciones | Ver completo |

### Metas
| Columna | Descripción |
|---------|------------|
| Usuario | Quién estableció las metas |
| Ejercicio | Minutos por día |
| Agua | Litros por día |
| Sueño | Horas por noche |
| Última Actualización | Cuándo se modificó |
| Acciones | Ver detalles |

## ⌨️ Atajos de Teclado

| Atajo | Función |
|-------|---------|
| Ctrl + Shift + A | Ir a panel admin (desde cualquier página) |
| F12 | Abrir consola del navegador |

## 📞 Soporte

Para dudas sobre el panel:
1. Revisa los datos en la consola (F12)
2. Usa la opción "Exportar Datos" para verificar
3. Consulta la estructura de datos arriba

## 🎯 Próximas Mejoras Sugeridas

- [ ] Autenticación de admin
- [ ] Gráficos de estadísticas
- [ ] Filtros avanzados
- [ ] Edición de datos desde el panel
- [ ] Envío de notificaciones a usuarios
- [ ] Historial de cambios
- [ ] Reportes automáticos
- [ ] Copia de seguridad automática

---

**Última actualización:** 25 de Noviembre, 2025
**Versión:** 1.0
