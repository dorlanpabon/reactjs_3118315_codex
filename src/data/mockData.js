export const seedUsers = [
  {
    id: 'usr-1',
    name: 'Laura Mendoza',
    email: 'aprendiz@sena.edu.co',
    password: '123456',
    role: 'aprendiz',
    program: 'Analisis y desarrollo de software',
  },
  {
    id: 'usr-2',
    name: 'Carlos Rojas',
    email: 'instructor@sena.edu.co',
    password: '123456',
    role: 'instructor',
    program: 'Analisis y desarrollo de software',
  },
]

export const seedCourses = [
  {
    id: 'cur-1',
    name: 'React.js para interfaces dinamicas',
    program: 'Analisis y desarrollo de software',
    instructor: 'Carlos Rojas',
    progress: 72,
    activities: 6,
  },
  {
    id: 'cur-2',
    name: 'Bases de datos para aplicaciones web',
    program: 'Analisis y desarrollo de software',
    instructor: 'Marta Beltran',
    progress: 48,
    activities: 5,
  },
  {
    id: 'cur-3',
    name: 'Gestion de proyectos formativos',
    program: 'Gestion administrativa',
    instructor: 'Carlos Rojas',
    progress: 61,
    activities: 4,
  },
]

export const seedActivities = [
  {
    id: 'act-1',
    courseId: 'cur-1',
    title: 'GA7-220501096-AA1-EV01: componente React',
    dueDate: '2026-06-21',
    status: 'Abierta',
  },
  {
    id: 'act-2',
    courseId: 'cur-1',
    title: 'GA7-220501096-AA2-EV02: consumo de datos',
    dueDate: '2026-06-28',
    status: 'Abierta',
  },
  {
    id: 'act-3',
    courseId: 'cur-2',
    title: 'Modelo entidad relacion del proyecto',
    dueDate: '2026-06-24',
    status: 'Pendiente',
  },
  {
    id: 'act-4',
    courseId: 'cur-3',
    title: 'Plan de seguimiento de evidencias',
    dueDate: '2026-06-30',
    status: 'Abierta',
  },
]

export const seedLearners = [
  {
    id: 'apr-1',
    name: 'Laura Mendoza',
    document: '1012456789',
    program: 'Analisis y desarrollo de software',
    email: 'aprendiz@sena.edu.co',
    progress: 72,
  },
  {
    id: 'apr-2',
    name: 'Juan Camilo Torres',
    document: '1033344556',
    program: 'Analisis y desarrollo de software',
    email: 'juan.torres@sena.edu.co',
    progress: 64,
  },
  {
    id: 'apr-3',
    name: 'Natalia Suarez',
    document: '1009988776',
    program: 'Gestion administrativa',
    email: 'natalia.suarez@sena.edu.co',
    progress: 81,
  },
]

export const seedEvidences = [
  {
    id: 'ev-1',
    learnerId: 'apr-1',
    learner: 'Laura Mendoza',
    courseId: 'cur-1',
    course: 'React.js para interfaces dinamicas',
    activityId: 'act-1',
    title: 'Componente React funcional',
    fileName: 'componente-react.zip',
    submittedAt: '2026-06-10',
    status: 'Pendiente',
    score: null,
    feedback: '',
    rubric: [
      { id: 'r1', name: 'Cumplimiento tecnico', score: 0 },
      { id: 'r2', name: 'Buenas practicas', score: 0 },
      { id: 'r3', name: 'Documentacion', score: 0 },
    ],
  },
  {
    id: 'ev-2',
    learnerId: 'apr-2',
    learner: 'Juan Camilo Torres',
    courseId: 'cur-2',
    course: 'Bases de datos para aplicaciones web',
    activityId: 'act-3',
    title: 'Modelo entidad relacion',
    fileName: 'modelo-er.pdf',
    submittedAt: '2026-06-09',
    status: 'Aprobado',
    score: 92,
    feedback: 'Buen modelo, relaciones bien justificadas.',
    rubric: [
      { id: 'r1', name: 'Cumplimiento tecnico', score: 95 },
      { id: 'r2', name: 'Buenas practicas', score: 90 },
      { id: 'r3', name: 'Documentacion', score: 91 },
    ],
  },
  {
    id: 'ev-3',
    learnerId: 'apr-3',
    learner: 'Natalia Suarez',
    courseId: 'cur-3',
    course: 'Gestion de proyectos formativos',
    activityId: 'act-4',
    title: 'Plan de seguimiento',
    fileName: 'plan-seguimiento.docx',
    submittedAt: '2026-06-08',
    status: 'Requiere ajustes',
    score: 68,
    feedback: 'Falta precisar criterios de aceptacion.',
    rubric: [
      { id: 'r1', name: 'Cumplimiento tecnico', score: 65 },
      { id: 'r2', name: 'Buenas practicas', score: 70 },
      { id: 'r3', name: 'Documentacion', score: 69 },
    ],
  },
]
