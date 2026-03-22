# 🚀 Atalaya Studio – Backend API

Servidor backend desarrollado con **Node.js + Express** para recibir y validar los mensajes de contacto enviados desde la landing page de Atalaya Studio.

---

## 📌 Descripción del Proyecto

Este servidor expone una API REST que:

- Recibe los datos del formulario de contacto vía HTTP POST
- Valida los campos en el backend de forma independiente al frontend
- Responde con mensajes estructurados en JSON
- Registra cada petición entrante mediante un middleware de logs

---

## 🧱 Arquitectura del Proyecto

```
📁 atalaya-studio-backend
└── server.js
```

---

## 🛠 Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express | Framework HTTP para la API REST |
| CORS | Middleware para permitir peticiones desde el frontend |
| express.json() | Parseo del body en formato JSON |

---

## ⚙️ Funcionalidades Principales

### 📋 Middleware de logs

Registra en consola cada petición que llega al servidor con timestamp, método HTTP y ruta:

```
[2026-03-21T14:30:00.000Z] POST /contact
```

---

### ✅ Validación de datos (`validateContact`)

Función independiente que valida el body antes de procesar el contacto:

| Campo | Regla |
|---|---|
| `nombre` | No vacío |
| `correo` | No vacío y debe contener `@` |
| `mensaje` | No vacío |

Si hay errores, responde con `400` y el arreglo de mensajes. Si todo es válido, responde con `200`.

---

### 📬 Endpoint de contacto

```
POST /contact
```

**Body esperado (JSON):**

```json
{
  "nombre": "Carlos Ramírez",
  "correo": "carlos@email.com",
  "mensaje": "Me interesa cotizar un logo"
}
```

**Respuesta exitosa (`200`):**

```json
{
  "success": true,
  "message": "Mensaje recibido correctamente"
}
```

**Respuesta con errores (`400`):**

```json
{
  "success": false,
  "errors": ["El correo no es válido"]
}
```

---

### 🛡 Manejo de errores global

Middleware de error central que captura cualquier excepción no controlada y responde con `500`:

```json
{
  "success": false,
  "message": "Error interno del servidor"
}
```

---

## 🚀 Ejecución del Proyecto

### 1. Instalar dependencias

```bash
npm install express cors
```

### 2. Levantar el servidor

```bash
node server.js
```

### 3. Verificar que está corriendo

Abrir en el navegador o con Postman:

```
GET http://localhost:3000/
```

Respuesta esperada:

```json
{
  "message": "Servidor Atalaya funcionando 🚀",
  "status": "OK"
}
```

---

## 🌐 Endpoints Disponibles

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Health check del servidor |
| POST | `/contact` | Recibe y valida el formulario de contacto |

---

## 🔒 Seguridad Implementada

- Validación de campos en el backend, independiente del frontend
- CORS habilitado para permitir peticiones desde `localhost` durante desarrollo
- Manejo de errores centralizado para evitar exponer stack traces

---

## ⚠️ Consideraciones

- El servidor actualmente **no persiste los datos** en base de datos — el contacto se imprime en consola y se descarta. Está preparado para conectar una DB en el bloque `newContact`.
- CORS está configurado de forma abierta (`*`). En producción se debe restringir al dominio del frontend.

---

## 📈 Mejoras Futuras

- Conexión a base de datos (MongoDB o PostgreSQL)
- Variables de entorno con `dotenv` para el puerto y configuración
- Restricción de CORS al dominio de producción
- Rate limiting para prevenir spam en el endpoint de contacto
- Envío de email de confirmación con Nodemailer

---

## 👨‍💻 Autor

**Daniel Saraza**  
