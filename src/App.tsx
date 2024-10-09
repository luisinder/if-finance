import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import { Home, FileText, Users, CreditCard, LogIn, LogOut } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Invoices from './components/Invoices'
import Suppliers from './components/Suppliers'
import Payments from './components/Payments'
import GlobalSearch from './components/GlobalSearch'
import Login from './components/Login'
import UserManagement from './components/UserManagement'

interface User {
  id: number
  username: string
  role: 'admin' | 'user'
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleGlobalSearch = (term: string, entities: string[]) => {
    console.log('Searching for:', term, 'in entities:', entities)
    // Implement actual search logic here
  }

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return <>{children}</>
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <nav className="bg-indigo-800 text-white w-64 space-y-6 py-7 px-2">
          <div className="text-2xl font-semibold text-center mb-6">IT Finance</div>
          {user && (
            <ul>
              <li>
                <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded">
                  <Home size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/invoices" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded">
                  <FileText size={20} />
                  <span>Facturas</span>
                </Link>
              </li>
              <li>
                <Link to="/suppliers" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded">
                  <Users size={20} />
                  <span>Proveedores</span>
                </Link>
              </li>
              <li>
                <Link to="/payments" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded">
                  <CreditCard size={20} />
                  <span>Pagos</span>
                </Link>
              </li>
              {user.role === 'admin' && (
                <li>
                  <Link to="/users" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded">
                    <Users size={20} />
                    <span>Gestión de Usuarios</span>
                  </Link>
                </li>
              )}
            </ul>
          )}
          <div className="mt-auto">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded w-full"
              >
                <LogOut size={20} />
                <span>Cerrar sesión</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded">
                <LogIn size={20} />
                <span>Iniciar sesión</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-10">
          {user && <GlobalSearch onSearch={handleGlobalSearch} />}
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
            <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            {user?.role === 'admin' && (
              <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
            )}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App