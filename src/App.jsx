import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileUp,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
} from 'lucide-react'
import './App.css'
import {
  addEvidence,
  loginUser,
  registerUser,
  store,
  updateEvidence,
} from './services/storage'
import {
  instructorMetrics,
  learnerMetrics,
  reportRows,
  statusClass,
} from './utils/metrics'

const navigate = (path) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const useRoute = () => {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const sync = () => setPath(window.location.pathname)
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])
  return path
}

function MetricCard({ label, value, tone }) {
  return (
    <article className={`metric metric-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function Status({ value }) {
  return <span className={`status ${statusClass(value)}`}>{value}</span>
}

function AuthLayout({ type, onLogin, onRegister }) {
  const isRegister = type === 'registro'
  const [form, setForm] = useState({
    name: '',
    email: isRegister ? '' : 'aprendiz@sena.edu.co',
    password: isRegister ? '' : '123456',
    role: 'aprendiz',
    program: 'Analisis y desarrollo de software',
  })
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const result = isRegister ? registerUser(form) : loginUser(form)
    if (result.error) {
      setError(result.error)
      return
    }
    if (isRegister) onRegister(result.user)
    else onLogin(result.user)
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="brand-mark">
          <GraduationCap size={30} />
          <div>
            <strong>SENA Evidencias</strong>
            <span>Seguimiento y evaluacion formativa</span>
          </div>
        </div>
        <h1>{isRegister ? 'Registro de usuario' : 'Inicio de sesion'}</h1>
        <p>
          Gestiona cursos, entregas, calificaciones y reportes desde una
          interfaz preparada para integrarse con backend.
        </p>
      </section>

      <form className="auth-card" onSubmit={submit}>
        <h2>{isRegister ? 'Crear cuenta' : 'Acceder'}</h2>
        {isRegister && (
          <>
            <label>
              Nombre completo
          <input
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
            </label>
            <label>
              Rol
              <select
                value={form.role}
                onChange={(event) => setForm({ ...form, role: event.target.value })}
              >
                <option value="aprendiz">Aprendiz</option>
                <option value="instructor">Instructor</option>
              </select>
            </label>
            <label>
              Programa
          <input
            required
            autoComplete="organization"
            value={form.program}
            onChange={(event) =>
                  setForm({ ...form, program: event.target.value })
                }
              />
            </label>
          </>
        )}
        <label>
          Correo
          <input
            required
            autoComplete="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>
        <label>
          Contrasena
          <input
            required
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            minLength="6"
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit">
          {isRegister ? 'Registrarme' : 'Ingresar'}
        </button>
        <button
          className="link-button"
          type="button"
          onClick={() => navigate(isRegister ? '/login' : '/registro')}
        >
          {isRegister ? 'Ya tengo cuenta' : 'Crear una cuenta'}
        </button>
      </form>
    </main>
  )
}

const learnerNav = [
  ['Dashboard', '/aprendiz', LayoutDashboard],
  ['Cursos', '/aprendiz/cursos', BookOpen],
  ['Actividades', '/aprendiz/actividades', ClipboardCheck],
  ['Evidencias', '/aprendiz/evidencias', FileUp],
]

const instructorNav = [
  ['Dashboard', '/instructor', LayoutDashboard],
  ['Aprendices', '/instructor/aprendices', Users],
  ['Evidencias', '/instructor/evidencias', ClipboardCheck],
  ['Reportes', '/instructor/reportes', BarChart3],
]

function DashboardShell({ session, path, onLogout, children }) {
  const nav = session.role === 'instructor' ? instructorNav : learnerNav
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <GraduationCap />
          <span>SENA Evidencias</span>
        </div>
        <nav>
          {nav.map(([label, href, Icon]) => (
            <button
              className={path === href ? 'active' : ''}
              key={href}
              onClick={() => navigate(href)}
              type="button"
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <button className="icon-button" type="button" aria-label="Menu">
            <Menu size={20} />
          </button>
          <div>
            <strong>{session.name}</strong>
            <span>{session.role === 'instructor' ? 'Instructor' : 'Aprendiz'}</span>
          </div>
          <button className="ghost-button" type="button" onClick={onLogout}>
            <LogOut size={17} />
            Salir
          </button>
        </header>
        {children}
      </section>
    </div>
  )
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

function LearnerDashboard({ courses, activities, evidences, session }) {
  const metrics = learnerMetrics({ courses, evidences, session })
  const own = evidences.filter((item) => item.learner === session.name)
  return (
    <>
      <PageHeader
        title="Panel del aprendiz"
        subtitle="Resumen de cursos, actividades y estado de evidencias."
      />
      <section className="metrics-grid">
        {metrics.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>
      <section className="two-column">
        <CourseList courses={courses.slice(0, 2)} />
        <EvidenceTable items={own} compact />
      </section>
      <ActivityList activities={activities.slice(0, 4)} courses={courses} />
    </>
  )
}

function CourseList({ courses }) {
  return (
    <section className="panel">
      <h2>Cursos</h2>
      <div className="course-list">
        {courses.map((course) => (
          <article className="course-row" key={course.id}>
            <div>
              <strong>{course.name}</strong>
              <span>{course.instructor}</span>
            </div>
            <div className="progress">
              <span style={{ width: `${course.progress}%` }} />
            </div>
            <b>{course.progress}%</b>
          </article>
        ))}
      </div>
    </section>
  )
}

function ActivityList({ activities, courses }) {
  return (
    <section className="panel">
      <h2>Actividades</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Curso</th>
              <th>Fecha limite</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.title}</td>
                <td>{courses.find((course) => course.id === activity.courseId)?.name}</td>
                <td>{activity.dueDate}</td>
                <td>
                  <Status value={activity.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function UploadEvidence({ courses, activities, onUpload }) {
  const [courseId, setCourseId] = useState(courses[0]?.id || '')
  const available = activities.filter((item) => item.courseId === courseId)
  const [activityId, setActivityId] = useState(available[0]?.id || '')
  const [fileName, setFileName] = useState('')

  const submit = (event) => {
    event.preventDefault()
    onUpload({
      courseId,
      activityId: activityId || available[0]?.id,
      fileName,
    })
    setFileName('')
  }

  return (
    <section className="panel">
      <h2>Subir evidencia</h2>
      <form className="form-grid" onSubmit={submit}>
        <label>
          Curso
          <select
            value={courseId}
            onChange={(event) => {
              const nextCourse = event.target.value
              setCourseId(nextCourse)
              setActivityId(
                activities.find((item) => item.courseId === nextCourse)?.id || '',
              )
            }}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Actividad
          <select
            value={activityId}
            onChange={(event) => setActivityId(event.target.value)}
          >
            {available.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Archivo
          <input
            required
            placeholder="nombre-del-archivo.pdf"
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
          />
        </label>
        <button className="primary-button" type="submit">
          Enviar evidencia
        </button>
      </form>
    </section>
  )
}

function EvidenceTable({ items, compact = false }) {
  return (
    <section className="panel">
      <h2>Evidencias</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {!compact && <th>Aprendiz</th>}
              <th>Evidencia</th>
              <th>Curso</th>
              <th>Estado</th>
              <th>Puntaje</th>
              {!compact && <th>Accion</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {!compact && <td>{item.learner}</td>}
                <td>
                  <strong>{item.title}</strong>
                  <span className="muted-block">{item.fileName}</span>
                </td>
                <td>{item.course}</td>
                <td>
                  <Status value={item.status} />
                </td>
                <td>{item.score ?? 'Sin calificar'}</td>
                {!compact && (
                  <td>
                    <button
                      className="small-button"
                      type="button"
                      onClick={() => navigate(`/instructor/calificar/${item.id}`)}
                    >
                      Calificar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function InstructorDashboard({ learners, evidences }) {
  return (
    <>
      <PageHeader
        title="Panel del instructor"
        subtitle="Seguimiento de aprendices, entregas y pendientes de evaluacion."
      />
      <section className="metrics-grid">
        {instructorMetrics({ learners, evidences }).map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>
      <section className="two-column">
        <EvidenceTable
          items={evidences.filter((item) => item.status === 'Pendiente')}
          compact={false}
        />
        <LearnerList learners={learners.slice(0, 4)} />
      </section>
    </>
  )
}

function LearnerList({ learners }) {
  return (
    <section className="panel">
      <h2>Aprendices</h2>
      <div className="learner-list">
        {learners.map((learner) => (
          <article key={learner.id}>
            <div>
              <strong>{learner.name}</strong>
              <span>{learner.program}</span>
            </div>
            <b>{learner.progress}%</b>
          </article>
        ))}
      </div>
    </section>
  )
}

function GradingPage({ evidence, onSave }) {
  const [rubric, setRubric] = useState(evidence?.rubric || [])
  const [status, setStatus] = useState(evidence?.status || 'Pendiente')
  const [feedback, setFeedback] = useState(evidence?.feedback || '')

  if (!evidence) {
    return (
      <section className="panel">
        <h2>Evidencia no encontrada</h2>
        <button className="primary-button" onClick={() => navigate('/instructor/evidencias')}>
          Volver
        </button>
      </section>
    )
  }

  const score = Math.round(
    rubric.reduce((total, item) => total + Number(item.score || 0), 0) /
      rubric.length,
  )

  const submit = (event) => {
    event.preventDefault()
    onSave(evidence.id, { rubric, status, feedback, score })
    navigate('/instructor/evidencias')
  }

  return (
    <>
      <PageHeader
        title="Calificar evidencia"
        subtitle="Evalua criterios, registra comentarios y actualiza el estado."
      />
      <form className="grading-layout" onSubmit={submit}>
        <section className="panel">
          <h2>{evidence.title}</h2>
          <dl className="details-grid">
            <div>
              <dt>Aprendiz</dt>
              <dd>{evidence.learner}</dd>
            </div>
            <div>
              <dt>Curso</dt>
              <dd>{evidence.course}</dd>
            </div>
            <div>
              <dt>Archivo</dt>
              <dd>{evidence.fileName}</dd>
            </div>
            <div>
              <dt>Fecha</dt>
              <dd>{evidence.submittedAt}</dd>
            </div>
          </dl>
        </section>
        <section className="panel">
          <h2>Rubrica</h2>
          {rubric.map((item) => (
            <label key={item.id}>
              {item.name}
              <input
                max="100"
                min="0"
                type="number"
                value={item.score}
                onChange={(event) =>
                  setRubric(
                    rubric.map((row) =>
                      row.id === item.id
                        ? { ...row, score: Number(event.target.value) }
                        : row,
                    ),
                  )
                }
              />
            </label>
          ))}
          <label>
            Estado
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option>Pendiente</option>
              <option>Aprobado</option>
              <option>Requiere ajustes</option>
              <option>Rechazado</option>
            </select>
          </label>
          <label>
            Comentarios
            <textarea
              required
              rows="5"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
          </label>
          <div className="score-box">
            <span>Puntaje final</span>
            <strong>{score}</strong>
          </div>
          <button className="primary-button" type="submit">
            Guardar calificacion
          </button>
        </section>
      </form>
    </>
  )
}

function ReportsPage({ courses, evidences }) {
  const rows = reportRows(courses, evidences)
  const max = Math.max(...rows.map((row) => row.submitted), 1)
  return (
    <>
      <PageHeader
        title="Reportes"
        subtitle="Indicadores por programa, curso y estado de las evidencias."
      />
      <section className="filters">
        <label>
          Periodo
          <select>
            <option>Junio 2026</option>
            <option>Segundo trimestre 2026</option>
          </select>
        </label>
        <label>
          Programa
          <select>
            <option>Todos</option>
            <option>Analisis y desarrollo de software</option>
            <option>Gestion administrativa</option>
          </select>
        </label>
        <label>
          Estado
          <select>
            <option>Todos</option>
            <option>Pendiente</option>
            <option>Aprobado</option>
            <option>Requiere ajustes</option>
          </select>
        </label>
      </section>
      <section className="panel">
        <h2>Entregas por curso</h2>
        <div className="chart">
          {rows.map((row) => (
            <div className="chart-row" key={row.course}>
              <span>{row.course}</span>
              <div>
                <b style={{ width: `${(row.submitted / max) * 100}%` }} />
              </div>
              <strong>{row.submitted}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <h2>Resumen</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Programa</th>
                <th>Curso</th>
                <th>Enviadas</th>
                <th>Pendientes</th>
                <th>Aprobadas</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.course}>
                  <td>{row.program}</td>
                  <td>{row.course}</td>
                  <td>{row.submitted}</td>
                  <td>{row.pending}</td>
                  <td>{row.approved}</td>
                  <td>{row.averageScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function App() {
  const path = useRoute()
  const [session, setSession] = useState(store.getSession())
  const [evidences, setEvidences] = useState(store.getEvidences())
  const courses = store.courses
  const activities = store.activities
  const learners = store.learners

  const route = useMemo(() => path || '/login', [path])

  const enter = (user) => {
    setSession(user)
    navigate(user.role === 'instructor' ? '/instructor' : '/aprendiz')
  }

  const logout = () => {
    store.clearSession()
    setSession(null)
    navigate('/login')
  }

  const upload = (payload) => {
    const items = addEvidence(payload, session)
    setEvidences(items)
  }

  const saveGrade = (id, patch) => {
    const items = updateEvidence(id, patch)
    setEvidences(items)
  }

  if (!session || route === '/login' || route === '/registro') {
    return (
      <AuthLayout
        type={route.includes('registro') ? 'registro' : 'login'}
        onLogin={enter}
        onRegister={enter}
      />
    )
  }

  const content = (() => {
    if (route === '/aprendiz') {
      return (
        <LearnerDashboard
          activities={activities}
          courses={courses}
          evidences={evidences}
          session={session}
        />
      )
    }
    if (route === '/aprendiz/cursos') return <CourseList courses={courses} />
    if (route === '/aprendiz/actividades') {
      return <ActivityList activities={activities} courses={courses} />
    }
    if (route === '/aprendiz/evidencias') {
      return (
        <>
          <UploadEvidence
            activities={activities}
            courses={courses}
            onUpload={upload}
          />
          <EvidenceTable
            items={evidences.filter((item) => item.learner === session.name)}
            compact
          />
        </>
      )
    }
    if (route === '/instructor') {
      return <InstructorDashboard learners={learners} evidences={evidences} />
    }
    if (route === '/instructor/aprendices') return <LearnerList learners={learners} />
    if (route === '/instructor/evidencias') return <EvidenceTable items={evidences} />
    if (route.startsWith('/instructor/calificar/')) {
      const id = route.split('/').at(-1)
      return (
        <GradingPage
          evidence={evidences.find((item) => item.id === id)}
          onSave={saveGrade}
        />
      )
    }
    if (route === '/instructor/reportes') {
      return <ReportsPage courses={courses} evidences={evidences} />
    }
    return <LearnerDashboard activities={activities} courses={courses} evidences={evidences} session={session} />
  })()

  return (
    <DashboardShell session={session} path={route} onLogout={logout}>
      {content}
    </DashboardShell>
  )
}

export default App
