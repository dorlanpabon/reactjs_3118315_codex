import {
  seedActivities,
  seedCourses,
  seedEvidences,
  seedLearners,
  seedUsers,
} from '../data/mockData'

const keys = {
  users: 'senaEvidenceUsers',
  session: 'senaEvidenceSession',
  evidences: 'senaEvidenceItems',
}

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export const store = {
  courses: seedCourses,
  activities: seedActivities,
  learners: seedLearners,
  getUsers: () => read(keys.users, seedUsers),
  saveUsers: (users) => write(keys.users, users),
  getSession: () => read(keys.session, null),
  saveSession: (session) => write(keys.session, session),
  clearSession: () => localStorage.removeItem(keys.session),
  getEvidences: () => read(keys.evidences, seedEvidences),
  saveEvidences: (items) => write(keys.evidences, items),
}

export const registerUser = (payload) => {
  const users = store.getUsers()
  const exists = users.some((user) => user.email === payload.email)
  if (exists) return { error: 'El correo ya esta registrado.' }

  const user = {
    id: crypto.randomUUID(),
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: payload.role,
    program: payload.program,
  }
  store.saveUsers([...users, user])
  store.saveSession(user)
  return { user }
}

export const loginUser = ({ email, password }) => {
  const user = store
    .getUsers()
    .find((item) => item.email === email && item.password === password)
  if (!user) return { error: 'Credenciales invalidas.' }

  store.saveSession(user)
  return { user }
}

export const addEvidence = (payload, session) => {
  const course = store.courses.find((item) => item.id === payload.courseId)
  const activity = store.activities.find((item) => item.id === payload.activityId)
  const learner = store.learners.find((item) => item.email === session.email)

  const evidence = {
    id: crypto.randomUUID(),
    learnerId: learner?.id || session.id,
    learner: session.name,
    courseId: course.id,
    course: course.name,
    activityId: activity.id,
    title: activity.title,
    fileName: payload.fileName || 'evidencia.pdf',
    submittedAt: new Date().toISOString().slice(0, 10),
    status: 'Pendiente',
    score: null,
    feedback: '',
    rubric: [
      { id: 'r1', name: 'Cumplimiento tecnico', score: 0 },
      { id: 'r2', name: 'Buenas practicas', score: 0 },
      { id: 'r3', name: 'Documentacion', score: 0 },
    ],
  }

  return store.saveEvidences([evidence, ...store.getEvidences()])
}

export const updateEvidence = (id, patch) => {
  const items = store.getEvidences().map((item) =>
    item.id === id ? { ...item, ...patch } : item,
  )
  return store.saveEvidences(items)
}
