import { useEffect, useState } from 'react'
import { api } from './api/client'
import { navItems } from './data/navItems'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import AuthPage from './components/AuthPage'
import DashboardSection from './components/sections/DashboardSection'
import CoursesSection from './components/sections/CoursesSection'
import BookStoreSection from './components/sections/BookStoreSection'
import RegistrationSection from './components/sections/RegistrationSection'
import PaymentSection from './components/sections/PaymentSection'
import TimetableSection from './components/sections/TimetableSection'
import ClubsSection from './components/sections/ClubsSection'
import AISection from './components/sections/AISection'
import MarketplaceSection from './components/sections/MarketplaceSection'
import SettingsSection from './components/sections/SettingsSection'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [year, setYear] = useState('FYBCS')
  const [dashboard, setDashboard] = useState(null)
  const [courses, setCourses] = useState([])
  const [resources, setResources] = useState([])
  const [summary, setSummary] = useState('')
  const [quiz, setQuiz] = useState([])
  const [theme, setTheme] = useState('dark')
  const [error, setError] = useState('')
  const [token, setToken] = useState(() => localStorage.getItem('studyhub_token'))
  const [authUser, setAuthUser] = useState(() => {
    const storedToken = localStorage.getItem('studyhub_token')
    return storedToken ? localStorage.getItem('studyhub_session_user') : null
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!token) {
      setAuthUser(null)
      return
    }

    const validateSession = async () => {
      try {
        const me = await api.me(token)
        setAuthUser(me.userId)
        setError('')
      } catch (err) {
        localStorage.removeItem('studyhub_token')
        localStorage.removeItem('studyhub_session_user')
        setToken(null)
        setAuthUser(null)
      }
    }

    validateSession()
  }, [token])

  useEffect(() => {
    if (!authUser) return

    const loadInitialData = async () => {
      try {
        const [dashData, coursesData, resourcesData] = await Promise.all([
          api.getDashboard(),
          api.getCourses(year),
          api.getResources(),
        ])
        setDashboard(dashData)
        setCourses(coursesData)
        setResources(resourcesData)
        setError('')
      } catch (err) {
        setError('Failed to load backend data. Check FastAPI server.')
        console.error(err)
      }
    }

    loadInitialData()
  }, [year, authUser])

  const handleAuthSuccess = (newToken, userId) => {
    localStorage.setItem('studyhub_token', newToken)
    localStorage.setItem('studyhub_session_user', userId)
    setToken(newToken)
    setAuthUser(userId)
  }

  const handleLogout = () => {
    if (token) {
      api.logout(token).catch(() => null)
    }
    localStorage.removeItem('studyhub_session_user')
    localStorage.removeItem('studyhub_token')
    setToken(null)
    setAuthUser(null)
    setActiveTab('dashboard')
  }

  const handleSummarize = async (text) => {
    try {
      const data = await api.summarize(text)
      setSummary(data.summary)
      setError('')
    } catch (err) {
      setError('AI summarizer is unavailable right now.')
      console.error(err)
    }
  }

  const handleQuiz = async (topic) => {
    try {
      const data = await api.generateQuiz(topic)
      setQuiz(data.questions)
      setError('')
    } catch (err) {
      setError('Quiz generator is unavailable right now.')
      console.error(err)
    }
  }

  const renderSection = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardSection dashboard={dashboard} />
      case 'courses':
        return <CoursesSection year={year} courses={courses} onYearChange={setYear} />
      case 'books':
        return <BookStoreSection resources={resources} />
      case 'registration':
        return <RegistrationSection />
      case 'payment':
        return <PaymentSection />
      case 'timetable':
        return <TimetableSection timetable={dashboard?.timetable ?? []} />
      case 'clubs':
        return <ClubsSection />
      case 'ai':
        return <AISection onSummarize={handleSummarize} onGenerateQuiz={handleQuiz} />
      case 'marketplace':
        return <MarketplaceSection />
      case 'settings':
        return (
          <SettingsSection
            theme={theme}
            onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          />
        )
      default:
        return <DashboardSection dashboard={dashboard} />
    }
  }

  if (!authUser) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />
  }

  return (
    <div className="app-shell">
      <Sidebar items={navItems} activeTab={activeTab} onSelect={setActiveTab} onLogout={handleLogout} />

      <main className="content">
        <Header dashboard={dashboard} />
        {error ? <p className="error">{error}</p> : null}
        {renderSection()}
        {activeTab === 'ai' && (
          <section className="panel-grid mt">
            <article className="card">
              <h3>Summary Output</h3>
              <p className="muted">{summary || 'No summary generated yet.'}</p>
            </article>
            <article className="card">
              <h3>Quiz Output</h3>
              {(quiz ?? []).length === 0 ? (
                <p className="muted">No quiz generated yet.</p>
              ) : (
                quiz.map((q, idx) => <p key={q}>{idx + 1}. {q}</p>)
              )}
            </article>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
