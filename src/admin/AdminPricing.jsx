import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RotateCcw, DollarSign, Loader2 } from 'lucide-react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { defaultPrices } from '../data/defaultPrices'
import toast from 'react-hot-toast'

// Package display config — maps internal keys to labels and groups
const packageGroups = [
  {
    title: 'Exterior & Interior Detail',
    packages: [
      { key: 'essential', label: 'Essential', vehicles: ['sedan', 'midSuv', 'truck'] },
      { key: 'signature', label: 'Signature', vehicles: ['sedan', 'midSuv', 'truck'] },
      { key: 'elite', label: 'Elite', vehicles: ['sedan', 'midSuv', 'truck'] },
    ],
  },
  {
    title: 'Paint Polish & Protection',
    packages: [
      { key: 'silver', label: 'Silver', vehicles: ['sedan', 'midSuv', 'truck'] },
      { key: 'gold', label: 'Gold', vehicles: ['sedan', 'midSuv', 'truck'] },
      { key: 'platinum', label: 'Platinum', vehicles: ['sedan', 'midSuv', 'truck'] },
      { key: 'diamond', label: 'Diamond', vehicles: ['sedan', 'midSuv', 'truck'] },
    ],
  },
  {
    title: 'Monthly Plans',
    packages: [
      { key: 'monthlyRefresh', label: 'Monthly Refresh', vehicles: ['sedanCoupeXover', 'compactMidSuv', 'fullSizePickup'] },
      { key: 'ceramicRefresh', label: 'Ceramic Refresh', vehicles: ['sedanCoupeXover', 'compactMidSuv', 'fullSizePickup'] },
    ],
  },
]

const vehicleLabels = {
  sedan: 'Sedan',
  midSuv: 'Mid SUV',
  truck: 'Truck',
  sedanCoupeXover: 'Sedan / Coupe',
  compactMidSuv: 'Compact / Mid SUV',
  fullSizePickup: 'Full-Size / Pickup',
}

export default function AdminPricing() {
  const [prices, setPrices] = useState({})
  const [originalPrices, setOriginalPrices] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dirtyKeys, setDirtyKeys] = useState(new Set())

  useEffect(() => {
    fetchPrices()
  }, [])

  async function fetchPrices() {
    try {
      // Start with defaults
      const merged = JSON.parse(JSON.stringify(defaultPrices))

      // Overlay Firestore values
      for (const group of packageGroups) {
        for (const pkg of group.packages) {
          try {
            const snap = await getDoc(doc(db, 'packages', pkg.key))
            if (snap.exists()) {
              merged[pkg.key] = { ...merged[pkg.key], ...snap.data() }
            }
          } catch (e) {
            // Use default if fetch fails
          }
        }
      }

      setPrices(merged)
      setOriginalPrices(JSON.parse(JSON.stringify(merged)))
    } catch (err) {
      console.error('Failed to fetch prices:', err)
      setPrices(JSON.parse(JSON.stringify(defaultPrices)))
      setOriginalPrices(JSON.parse(JSON.stringify(defaultPrices)))
    } finally {
      setLoading(false)
    }
  }

  function handlePriceChange(pkgKey, vehicleKey, value) {
    // Allow only numbers and decimal point
    const cleaned = value.replace(/[^0-9.]/g, '')
    setPrices(prev => ({
      ...prev,
      [pkgKey]: { ...prev[pkgKey], [vehicleKey]: cleaned },
    }))
    setDirtyKeys(prev => new Set(prev).add(pkgKey))
  }

  function handleReset(pkgKey) {
    setPrices(prev => ({
      ...prev,
      [pkgKey]: { ...originalPrices[pkgKey] },
    }))
    setDirtyKeys(prev => {
      const next = new Set(prev)
      next.delete(pkgKey)
      return next
    })
  }

  async function handleSave(pkgKey) {
    setSaving(true)
    try {
      const data = {}
      const pkg = prices[pkgKey]
      for (const [k, v] of Object.entries(pkg)) {
        data[k] = Number(v) || 0
      }
      await setDoc(doc(db, 'packages', pkgKey), data)
      setOriginalPrices(prev => ({
        ...prev,
        [pkgKey]: { ...data },
      }))
      setDirtyKeys(prev => {
        const next = new Set(prev)
        next.delete(pkgKey)
        return next
      })
      toast.success(`${pkgKey} prices saved!`)
    } catch (err) {
      console.error('Save error:', err)
      toast.error('Failed to save prices')
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveAll() {
    if (dirtyKeys.size === 0) {
      toast('No changes to save', { icon: 'ℹ️' })
      return
    }
    setSaving(true)
    try {
      for (const pkgKey of dirtyKeys) {
        const data = {}
        const pkg = prices[pkgKey]
        for (const [k, v] of Object.entries(pkg)) {
          data[k] = Number(v) || 0
        }
        await setDoc(doc(db, 'packages', pkgKey), data)
      }
      setOriginalPrices(JSON.parse(JSON.stringify(prices)))
      setDirtyKeys(new Set())
      toast.success(`All prices saved! (${dirtyKeys.size} packages updated)`)
    } catch (err) {
      toast.error('Failed to save some prices')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Package Pricing</h2>
          <p className="text-text-muted text-sm mt-1">Edit prices for all packages. Changes are reflected on the public site immediately after saving.</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving || dirtyKeys.size === 0}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-40 text-black font-semibold px-5 py-2.5 rounded-lg transition-all text-sm"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save All Changes {dirtyKeys.size > 0 && `(${dirtyKeys.size})`}
        </button>
      </div>

      <div className="space-y-8">
        {packageGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.08 }}
          >
            <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign size={18} className="text-primary" />
              {group.title}
            </h3>

            <div className="bg-card rounded-xl border border-border-warm/50 overflow-hidden">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Package</th>
                    {group.packages[0].vehicles.map(v => (
                      <th key={v}>{vehicleLabels[v]}</th>
                    ))}
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {group.packages.map(pkg => {
                    const isDirty = dirtyKeys.has(pkg.key)
                    return (
                      <tr key={pkg.key}>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{pkg.label}</span>
                            {isDirty && (
                              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" title="Unsaved changes" />
                            )}
                          </div>
                        </td>
                        {pkg.vehicles.map(v => (
                          <td key={v}>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                              <input
                                type="text"
                                inputMode="decimal"
                                value={prices[pkg.key]?.[v] ?? ''}
                                onChange={e => handlePriceChange(pkg.key, v, e.target.value)}
                                className="w-full bg-black/50 border border-border-warm rounded-lg pl-7 pr-3 py-2 text-white text-sm font-mono focus:border-primary transition-all"
                              />
                            </div>
                          </td>
                        ))}
                        <td>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleReset(pkg.key)}
                              disabled={!isDirty}
                              className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 disabled:opacity-30 transition-all"
                              title="Reset"
                            >
                              <RotateCcw size={14} />
                            </button>
                            <button
                              onClick={() => handleSave(pkg.key)}
                              disabled={saving || !isDirty}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-30 transition-all"
                            >
                              <Save size={13} /> Save
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info notice */}
      <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
        <DollarSign size={18} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-400 text-sm font-medium">How pricing works</p>
          <p className="text-text-muted text-xs mt-1 leading-relaxed">
            Prices saved here are stored in Firestore and immediately shown on the public packages pages.
            If a price is not set in Firestore, the built-in default price is used as a fallback.
          </p>
        </div>
      </div>
    </div>
  )
}
