import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import toast from 'react-hot-toast'

const statusOptions = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

const statusColors = {
  Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  Confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Completed: 'bg-green-500/10 text-green-400 border-green-500/30',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    try {
      const snapshot = await getDocs(collection(db, 'bookings'))
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      setBookings(data)
    } catch (err) {
      console.error('Fetch bookings error:', err)
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: newStatus })
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))
      toast.success(`Status updated to ${newStatus}`)
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase()
    const matchSearch = b.customerName?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q) ||
      b.serviceName?.toLowerCase().includes(q) ||
      b.selectedPackage?.toLowerCase().includes(q) ||
      b.vehicleModel?.toLowerCase().includes(q)
    const matchStatus = filterStatus === 'All' || b.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-white mb-6">Bookings</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-card border border-border-warm rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder-text-muted focus:border-primary transition-all"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-card border border-border-warm rounded-lg pl-10 pr-8 py-2.5 text-white text-sm focus:border-primary transition-all appearance-none"
          >
            <option value="All">All Statuses</option>
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border-warm/50 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-text-muted">Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-text-muted">No bookings found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Service / Package</th>
                  <th>Vehicle</th>
                  <th>Model</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id}>
                    <td>
                      <div>
                        <p className="text-white font-medium">{b.customerName}</p>
                        <p className="text-text-muted text-xs">{b.email}</p>
                      </div>
                    </td>
                    <td className="text-text-secondary">
                      <a href={`tel:${b.phone}`} className="hover:text-primary transition-colors">{b.phone}</a>
                    </td>
                    <td>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${b.bookingType === 'package' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                        {b.bookingType || 'service'}
                      </span>
                    </td>
                    <td className="text-text-secondary">{b.bookingType === 'package' ? (b.selectedPackage || '—') : (b.serviceName || '—')}</td>
                    <td className="text-text-secondary">{b.vehicleType || '—'}</td>
                    <td className="text-text-secondary">{b.vehicleModel || '—'}</td>
                    <td className="text-text-secondary whitespace-nowrap">{b.date}</td>
                    <td className="text-text-secondary">{b.time}</td>
                    <td>
                      <select
                        value={b.status}
                        onChange={e => handleStatusChange(b.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border appearance-none cursor-pointer ${statusColors[b.status] || ''} bg-transparent`}
                      >
                        {statusOptions.map(s => <option key={s} value={s} className="bg-card text-white">{s}</option>)}
                      </select>
                    </td>
                    <td className="text-text-muted text-xs max-w-[150px] truncate">{b.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-text-muted text-xs mt-4">{filtered.length} booking{filtered.length !== 1 ? 's' : ''} found</p>
    </div>
  )
}
