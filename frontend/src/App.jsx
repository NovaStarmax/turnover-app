import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import EmployeeProfile from './pages/EmployeeProfile'
import Administration from './pages/Administration'
import Layout from './components/layout/Layout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Page sans layout */}
        <Route path="/" element={<Login />} />

        {/* Pages avec layout — toutes imbriquées sous Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employee/:id" element={<EmployeeProfile />} />
          <Route path="/administration" element={<Administration />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}