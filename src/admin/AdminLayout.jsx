import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, CalendarDays, Wrench, DollarSign, Image as ImageIcon, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import logo from "../assets/logo/logo.png"

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', path: '/admin/bookings', icon: CalendarDays },
  { name: 'Services', path: '/admin/services', icon: Wrench },
  { name: 'Packages', path: '/admin/pricing', icon: DollarSign },
  { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 self-start h-screen left-0 z-50 w-64 bg-black/95 lg:bg-transparent backdrop-blur-md border-r border-border-warm transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-5 border-b border-border-warm flex items-center justify-between">
            <img src={logo} alt="Down2Detail" className="h-8" />
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white"><X size={20} /></button>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
              >
                <link.icon size={18} />
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-border-warm">
            <div className="text-xs text-text-muted mb-3 px-4 truncate">{user?.email}</div>
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all w-full">
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30/80 backdrop-blur-lg border-b border-border-warm px-4 sm:px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white"><Menu size={22} /></button>
          <h1 className="font-heading text-lg font-semibold text-white">Admin Panel</h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
