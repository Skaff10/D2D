import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import toast from 'react-hot-toast'

const emptyService = { name: '', description: '', price: '', duration: '', isActive: true }

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyService)

  useEffect(() => { fetchServices() }, [])

  async function fetchServices() {
    try {
      const snapshot = await getDocs(collection(db, 'services'))
      setServices(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('Fetch services error:', err)
    } finally {
      setLoading(false)
    }
  }

  const openAdd = () => {
    setEditing(null)
    setForm(emptyService)
    setShowForm(true)
  }

  const openEdit = (service) => {
    setEditing(service.id)
    setForm({ name: service.name, description: service.description, price: service.price, duration: service.duration || '', isActive: service.isActive !== false })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Service name required'); return }
    try {
      if (editing) {
        await updateDoc(doc(db, 'services', editing), form)
        setServices(prev => prev.map(s => s.id === editing ? { ...s, ...form } : s))
        toast.success('Service updated')
      } else {
        const docRef = await addDoc(collection(db, 'services'), form)
        setServices(prev => [...prev, { id: docRef.id, ...form }])
        toast.success('Service added')
      }
      setShowForm(false)
      setEditing(null)
      setForm(emptyService)
    } catch (err) {
      toast.error('Failed to save service')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service? This action cannot be undone.')) return
    try {
      await deleteDoc(doc(db, 'services', id))
      setServices(prev => prev.filter(s => s.id !== id))
      toast.success('Service deleted')
    } catch (err) {
      toast.error('Failed to delete service')
    }
  }

  const inputClasses = 'w-full bg-black/50 border border-border-warm rounded-lg px-4 py-2.5 text-white text-sm placeholder-text-muted focus:border-primary transition-all'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-white">Services</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-black font-semibold px-4 py-2.5 rounded-lg transition-all text-sm">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border-warm rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading text-lg font-bold text-white">{editing ? 'Edit Service' : 'Add Service'}</h3>
                <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-white"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1.5 block">Name *</label>
                  <input className={inputClasses} placeholder="e.g. Paint Correction" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1.5 block">Description</label>
                  <textarea className={`${inputClasses} resize-none`} rows={3} placeholder="Service description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">Price</label>
                    <input className={inputClasses} placeholder="e.g. $749.99" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">Duration</label>
                    <input className={inputClasses} placeholder="e.g. 2-3 hours" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-primary" />
                  <span className="text-sm text-text-secondary">Active (visible on website)</span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-semibold py-2.5 rounded-lg transition-all text-sm">
                    <Save size={16} /> {editing ? 'Update' : 'Add'} Service
                  </button>
                  <button onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-border-warm rounded-lg text-text-secondary hover:text-white transition-all text-sm">Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services List */}
      {loading ? (
        <div className="text-center text-text-muted py-12">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="bg-card rounded-xl border border-border-warm/50 p-12 text-center">
          <p className="text-text-muted mb-4">No services yet. Add your first service to get started.</p>
          <button onClick={openAdd} className="text-primary font-medium text-sm hover:text-primary-light">+ Add Service</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {services.map(service => (
            <motion.div key={service.id} layout className="bg-card rounded-xl p-5 border border-border-warm/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-heading text-base font-bold text-white">{service.name}</h3>
                  {!service.isActive && <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">Inactive</span>}
                </div>
                <p className="text-text-secondary text-sm line-clamp-1 mb-1">{service.description || 'No description'}</p>
                <div className="flex gap-4 text-xs text-text-muted">
                  <span>Price: {service.price || '—'}</span>
                  <span>Duration: {service.duration || '—'}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(service)} className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-all text-sm">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(service.id)} className="flex items-center gap-1.5 px-3 py-2 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 transition-all text-sm">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
