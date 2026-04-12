import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase/config'

const statusColors = {
  Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  Confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Completed: 'bg-green-500/10 text-green-400 border-green-500/30',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await getDocs(collection(db, 'bookings'))
        const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        setStats({
          total: bookings.length,
          pending: bookings.filter(b => b.status === 'Pending').length,
          confirmed: bookings.filter(b => b.status === 'Confirmed').length,
          completed: bookings.filter(b => b.status === 'Completed').length,
          cancelled: bookings.filter(b => b.status === 'Cancelled').length,
        })

        const sorted = bookings.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        setRecentBookings(sorted.slice(0, 5))
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Bookings', value: stats.total, icon: CalendarDays, color: 'text-primary' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-400' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'text-blue-400' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-400' },
  ]

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-white mb-6">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl p-5 border border-border-warm/50"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="font-heading text-3xl font-bold text-white">{loading ? '—' : stat.value}</p>
            <p className="text-text-secondary text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link to="/admin/bookings" className="bg-card hover:bg-card-hover rounded-xl p-5 border border-border-warm/50 flex items-center justify-between transition-all group">
          <div>
            <p className="text-white font-semibold">Manage Bookings</p>
            <p className="text-text-muted text-sm">View and update booking statuses</p>
          </div>
          <ArrowRight size={18} className="text-text-muted group-hover:text-primary transition-colors" />
        </Link>
        <Link to="/admin/services" className="bg-card hover:bg-card-hover rounded-xl p-5 border border-border-warm/50 flex items-center justify-between transition-all group">
          <div>
            <p className="text-white font-semibold">Manage Services</p>
            <p className="text-text-muted text-sm">Edit or remove services</p>
          </div>
          <ArrowRight size={18} className="text-text-muted group-hover:text-primary transition-colors" />
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bg-card rounded-xl border border-border-warm/50 overflow-hidden">
        <div className="p-5 border-b border-border-warm flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-white">Recent Bookings</h3>
          <Link to="/admin/bookings" className="text-primary text-sm font-medium hover:text-primary-light transition-colors">View All</Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-text-muted">Loading...</div>
        ) : recentBookings.length === 0 ? (
          <div className="p-8 text-center text-text-muted">No bookings yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Service / Package</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b.id}>
                    <td className="text-white font-medium">{b.customerName}</td>
                    <td>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${b.bookingType === 'package' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                        {b.bookingType || 'service'}
                      </span>
                    </td>
                    <td className="text-text-secondary">{b.bookingType === 'package' ? (b.selectedPackage || '—') : (b.serviceName || '—')}</td>
                    <td className="text-text-secondary">{b.date}</td>
                    <td>
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[b.status] || 'text-text-secondary'}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
