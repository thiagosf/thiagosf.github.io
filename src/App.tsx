import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/shell'
import {
  HeroPage,
  ExperiencePage,
  ProjectsPage,
  PlaygroundPage,
  ContactPage
} from './pages'

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AppShell>
    </Router>
  )
}

export default App
