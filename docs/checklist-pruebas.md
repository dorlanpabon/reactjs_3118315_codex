# Checklist de pruebas

Usar esta lista para revisar la entrega.

## Preparacion

- [ ] Ejecutar `npm install`.
- [ ] Ejecutar `npm run dev`.
- [ ] Abrir `http://localhost:5173`.
- [ ] Confirmar que carga la pantalla de inicio de sesion.

## Autenticacion

- [ ] Entrar con `aprendiz@sena.edu.co` y `123456`.
- [ ] Confirmar que abre el dashboard de aprendiz.
- [ ] Cerrar sesion.
- [ ] Entrar con `instructor@sena.edu.co` y `123456`.
- [ ] Confirmar que abre el dashboard de instructor.
- [ ] Crear un usuario nuevo desde `Registro`.
- [ ] Confirmar que redirige segun el rol elegido.

## Aprendiz

- [ ] Revisar metricas del dashboard.
- [ ] Abrir `Cursos`.
- [ ] Abrir `Actividades`.
- [ ] Abrir `Evidencias`.
- [ ] Subir una evidencia con nombre de archivo.
- [ ] Confirmar que aparece en la tabla.

## Instructor

- [ ] Revisar metricas del dashboard.
- [ ] Abrir `Aprendices`.
- [ ] Abrir `Evidencias`.
- [ ] Abrir una evidencia para calificar.
- [ ] Cambiar puntajes de la rubrica.
- [ ] Cambiar estado.
- [ ] Escribir comentarios.
- [ ] Guardar calificacion.
- [ ] Confirmar que vuelve a la lista de evidencias.

## Reportes

- [ ] Abrir `Reportes`.
- [ ] Revisar filtros visuales.
- [ ] Revisar grafica de entregas por curso.
- [ ] Revisar tabla resumen.
- [ ] Confirmar que las cifras reflejan evidencias calificadas.

## Validacion tecnica

- [ ] Ejecutar `npm run lint`.
- [ ] Ejecutar `npm run build`.
- [ ] Confirmar que ambos comandos terminan sin errores.
