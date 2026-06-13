# Guia de usuario

Esta guia explica como probar la aplicacion sin conocer React ni programacion.

## Objetivo

La aplicacion simula una plataforma para que:

- Los aprendices revisen cursos y actividades.
- Los aprendices suban evidencias.
- Los instructores revisen entregas.
- Los instructores califiquen evidencias con rubrica.
- Los instructores consulten reportes.

## Pantallas principales

### Inicio de sesion

Permite ingresar con un correo y contrasena. Hay dos usuarios de prueba:

- Aprendiz: `aprendiz@sena.edu.co` / `123456`
- Instructor: `instructor@sena.edu.co` / `123456`

### Registro

Permite crear una cuenta nueva. El usuario debe seleccionar si sera `Aprendiz` o `Instructor`.

Despues del registro, la aplicacion abre automaticamente el dashboard correspondiente al rol seleccionado.

### Dashboard del aprendiz

Muestra:

- Cursos activos.
- Progreso promedio.
- Evidencias enviadas.
- Evidencias aprobadas.
- Cursos recientes.
- Evidencias del aprendiz.
- Actividades disponibles.

### Cursos del aprendiz

Muestra los cursos disponibles con instructor y progreso.

### Actividades del aprendiz

Muestra actividades, fecha limite, curso asociado y estado.

### Evidencias del aprendiz

Permite simular la entrega de una evidencia. Para probar:

1. Seleccionar un curso.
2. Seleccionar una actividad.
3. Escribir un nombre de archivo, por ejemplo `mi-evidencia.pdf`.
4. Presionar `Enviar evidencia`.
5. Revisar que la evidencia aparece en la tabla.

### Dashboard del instructor

Muestra:

- Total de aprendices.
- Total de evidencias.
- Evidencias pendientes.
- Evidencias aprobadas.
- Cola de evaluacion.
- Lista de aprendices.

### Evidencias del instructor

Muestra todas las evidencias enviadas. Desde esta tabla se puede abrir la vista de calificacion.

### Calificar evidencia

Permite:

- Revisar aprendiz, curso, archivo y fecha.
- Asignar puntajes de 0 a 100 por criterio.
- Cambiar el estado de la evidencia.
- Escribir comentarios.
- Guardar la calificacion.

### Reportes

Muestra filtros visuales, entregas por curso y resumen por programa. Los datos cambian cuando se califican evidencias.

## Datos guardados

Los datos se guardan en el navegador. Si se quiere reiniciar la prueba:

1. Abrir herramientas del navegador.
2. Ir a almacenamiento o datos del sitio.
3. Borrar `localStorage`.
4. Recargar la pagina.

Otra forma simple es abrir la aplicacion en modo incognito.
