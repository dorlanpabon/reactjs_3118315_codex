# Guia tecnica

## Stack

- React.js
- Vite.js
- JavaScript
- CSS nativo
- `lucide-react` para iconos
- `localStorage` para persistencia temporal

## Requisitos

- Node.js LTS recomendado.
- npm incluido con Node.js.

Verificar versiones:

```bash
node -v
npm -v
```

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicacion queda disponible normalmente en:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

El resultado se genera en la carpeta `dist`.

## Lint

```bash
npm run lint
```

## Estructura relevante

```text
src/
  App.jsx
  App.css
  index.css
  data/
    mockData.js
  services/
    storage.js
  utils/
    metrics.js
```

## Responsabilidades

`src/App.jsx`

- Define rutas internas.
- Renderiza login, registro, dashboards, evidencias, calificacion y reportes.
- Maneja estado de sesion y acciones principales.

`src/data/mockData.js`

- Contiene usuarios, cursos, actividades, aprendices y evidencias iniciales.

`src/services/storage.js`

- Lee y escribe datos en `localStorage`.
- Registra usuarios.
- Inicia sesion.
- Crea evidencias.
- Actualiza calificaciones.

`src/utils/metrics.js`

- Calcula metricas para aprendiz e instructor.
- Calcula reportes por curso.
- Normaliza clases de estados.

`src/App.css` e `src/index.css`

- Definen el sistema visual institucional.
- Contienen layout responsive, formularios, tablas, paneles, metricas y estados.

## Rutas disponibles

```text
/login
/registro
/aprendiz
/aprendiz/cursos
/aprendiz/actividades
/aprendiz/evidencias
/instructor
/instructor/aprendices
/instructor/evidencias
/instructor/calificar/:id
/instructor/reportes
```

La aplicacion usa History API y estado local, no usa `react-router-dom`.

## Integracion futura con backend

Puntos recomendados para conectar backend:

- Reemplazar funciones de `src/services/storage.js` por llamadas HTTP.
- Mantener la forma de datos usada por `App.jsx` para reducir cambios.
- Agregar autenticacion real con tokens.
- Mover usuarios, cursos, actividades, evidencias y rubricas a base de datos.
- Validar permisos por rol en backend.

## Limitaciones actuales

- No hay backend real.
- No hay seguridad real en login.
- Las contrasenas estan solo para demostracion.
- Los archivos no se suben realmente; se registra el nombre del archivo.
- Los datos viven en `localStorage`.
