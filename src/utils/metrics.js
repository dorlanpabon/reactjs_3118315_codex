export const statusClass = (status) =>
  status.toLowerCase().replaceAll(' ', '-')

export const average = (values) => {
  const valid = values.filter((value) => Number.isFinite(value))
  if (!valid.length) return 0
  return Math.round(valid.reduce((total, value) => total + value, 0) / valid.length)
}

export const learnerMetrics = ({ courses, evidences, session }) => {
  const own = evidences.filter((item) => item.learner === session?.name)
  return [
    { label: 'Cursos activos', value: courses.length, tone: 'green' },
    {
      label: 'Progreso promedio',
      value: `${average(courses.map((course) => course.progress))}%`,
      tone: 'blue',
    },
    { label: 'Evidencias enviadas', value: own.length, tone: 'yellow' },
    {
      label: 'Aprobadas',
      value: own.filter((item) => item.status === 'Aprobado').length,
      tone: 'green',
    },
  ]
}

export const instructorMetrics = ({ learners, evidences }) => [
  { label: 'Aprendices', value: learners.length, tone: 'green' },
  { label: 'Evidencias', value: evidences.length, tone: 'blue' },
  {
    label: 'Pendientes',
    value: evidences.filter((item) => item.status === 'Pendiente').length,
    tone: 'yellow',
  },
  {
    label: 'Aprobadas',
    value: evidences.filter((item) => item.status === 'Aprobado').length,
    tone: 'green',
  },
]

export const reportRows = (courses, evidences) =>
  courses.map((course) => {
    const items = evidences.filter((item) => item.courseId === course.id)
    return {
      program: course.program,
      course: course.name,
      submitted: items.length,
      pending: items.filter((item) => item.status === 'Pendiente').length,
      approved: items.filter((item) => item.status === 'Aprobado').length,
      averageScore: average(items.map((item) => item.score)),
    }
  })
