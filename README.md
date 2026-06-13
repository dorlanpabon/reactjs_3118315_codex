# SENA Evidencias

Aplicacion frontend en React.js para gestionar evidencias formativas. Permite registrar usuarios por rol, iniciar sesion como aprendiz o instructor, revisar cursos, subir evidencias, calificar entregas y consultar reportes.

## Que incluye

- Registro e inicio de sesion por rol: aprendiz o instructor.
- Dashboard para aprendices con metricas, cursos, actividades y evidencias.
- Dashboard para instructores con aprendices, evidencias pendientes y calificaciones.
- Ruta para subir evidencias desde el perfil de aprendiz.
- Ruta para calificar evidencias con rubrica, puntaje, estado y comentarios.
- Reportes con filtros visuales, grafica simple y resumen por curso.
- Datos simulados y persistencia temporal en `localStorage`.

## Probar sin conocimientos tecnicos

1. Instalar Node.js LTS desde [nodejs.org](https://nodejs.org/).
2. Descargar este proyecto desde GitHub con el boton `Code` y luego `Download ZIP`.
3. Descomprimir el archivo ZIP.
4. Abrir una terminal dentro de la carpeta del proyecto.
5. Ejecutar:

```bash
npm install
npm run dev
```

6. Abrir en el navegador la direccion que muestra la terminal. Normalmente es:

```text
http://localhost:5173
```

## Usuarios de prueba

Aprendiz:

```text
Correo: aprendiz@sena.edu.co
Contrasena: 123456
```

Instructor:

```text
Correo: instructor@sena.edu.co
Contrasena: 123456
```

Tambien se pueden crear usuarios nuevos desde la vista `Registro`.

## Como revisar la aplicacion

### Flujo de aprendiz

1. Iniciar sesion con el usuario aprendiz.
2. Revisar el dashboard principal.
3. Entrar a `Cursos` para ver cursos activos.
4. Entrar a `Actividades` para ver actividades disponibles.
5. Entrar a `Evidencias`.
6. Completar el formulario de subida con un nombre de archivo.
7. Confirmar que la evidencia queda en estado `Pendiente`.

### Flujo de instructor

1. Cerrar sesion.
2. Iniciar sesion con el usuario instructor.
3. Revisar el dashboard principal.
4. Entrar a `Evidencias`.
5. Hacer clic en `Calificar`.
6. Asignar puntajes en la rubrica.
7. Seleccionar estado: `Aprobado`, `Requiere ajustes` o `Rechazado`.
8. Escribir comentarios.
9. Guardar la calificacion.
10. Entrar a `Reportes` y revisar el resumen actualizado.

## Comandos utiles

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Validar reglas de codigo:

```bash
npm run lint
```

Generar version de produccion:

```bash
npm run build
```

Previsualizar version de produccion:

```bash
npm run preview
```

## Documentacion adicional

- [Guia de usuario](docs/guia-usuario.md)
- [Guia tecnica](docs/guia-tecnica.md)
- [Lista de verificacion](docs/checklist-pruebas.md)

## Estado del proyecto

Esta version es solo frontend. No tiene backend, base de datos real ni autenticacion segura. La informacion se guarda temporalmente en el navegador mediante `localStorage`, por lo que puede borrarse limpiando datos del sitio o usando otro navegador.
