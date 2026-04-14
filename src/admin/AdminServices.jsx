import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Loader2, DollarSign } from 'lucide-react'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import toast from 'react-hot-toast'
import { categories, services as servicesData } from '../data/servicesData'
import { useLang } from '../context/LanguageContext'
import { translations } from '../translations'

export default function AdminServices() {
  const { lang } = useLang();
  const t = translations[lang].adminServices;
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)

  useEffect(() => {
    async function fetchPricing() {
      try {
        const snap = await getDocs(collection(db, 'service_prices'))
        const fetched = {}
        snap.docs.forEach(d => {
          fetched[d.id] = d.data().pricing
        })
        setPrices(fetched)
      } catch (err) {
        console.error('Fetch error', err)
        toast.error(t.fetchError)
      } finally {
        setLoading(false)
      }
    }
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchPricing()
      } else {
        setLoading(false)
      }
    });
    
    return () => unsubscribe();
  }, [])

  const handleFlatChange = (serviceId, value) => {
    setPrices(prev => ({
      ...prev,
      [serviceId]: value
    }))
  }

  const handleTierChange = (serviceId, itemKey, value) => {
    setPrices(prev => {
      const currentServicePrices = prev[serviceId] || {}
      return {
        ...prev,
        [serviceId]: {
          ...(typeof currentServicePrices === 'object' ? currentServicePrices : {}),
          [itemKey]: value
        }
      }
    })
  }

  const handleSave = async (service) => {
    const auth = getAuth();
    if (!auth.currentUser) {
      console.error("Not authenticated — cannot save.");
      return;
    }
    const serviceId = service.id;
    let dataToSave = prices[serviceId];
    
    // If not edited in current session, extract its default to save for consistency
    if (dataToSave === undefined) {
      if (service.id === 'ceramic-coating') {
        dataToSave = {};
        if (service.pricingTiers) {
          service.pricingTiers.forEach(t => {
            const key = `tier_${t.level.replace(/\s+/g, '')}`;
            dataToSave[key] = t.price;
          });
        }
        if (service.additionalSurfaces) {
          service.additionalSurfaces.forEach(s => {
            const key = `surface_${s.surface.replace(/\s+/g, '')}`;
            dataToSave[key] = s.price;
          });
        }
      } else if (!service.price) {
        dataToSave = service.priceString || 'Contact for Quote';
      } else if (service.price.type === 'flat') {
        dataToSave = service.price.amount || service.priceString;
      } else if (service.price.type === 'tiered') {
        dataToSave = {}
        service.price.tiers.forEach(t => {
          dataToSave[t.label] = t.price
        })
      }
    }

    setSaving(serviceId)
    try {
      await setDoc(doc(db, 'service_prices', serviceId), { pricing: dataToSave }, { merge: true })
      toast.success(t.saved)
    } catch (err) {
      console.error(err)
      toast.error(t.saveError)
    } finally {
      setSaving(null)
    }
  }

  const inputClasses = 'w-full bg-black/50 border border-border-warm rounded-lg px-4 py-2.5 text-white text-sm placeholder-text-muted focus:border-primary transition-all shadow-inner'

  if (loading) {
    return (
      <div className="py-24 flex flex-col justify-center items-center gap-4">
        <Loader2 size={36} className="text-primary animate-spin" />
        <p className="text-text-muted text-sm animate-pulse">Loading pricing data...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 p-6 bg-card rounded-2xl border border-border-warm/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white mb-1">{t.title}</h2>
          <p className="text-text-muted text-sm">{t.subtitle}</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg flex items-center gap-2 border border-primary/20 shrink-0 self-start md:self-auto">
          <DollarSign size={18} />
          <span className="font-semibold text-sm">{t.overriddenBadge}</span>
        </div>
      </div>

      <div className="space-y-12">
        {categories.map(cat => {
          const catServices = servicesData[cat.id] || []
          if (!catServices.length) return null

          return (
            <div key={cat.id} className="relative">
              <h3 className="font-heading text-xl font-bold text-white tracking-wide mb-6 pb-2 border-b border-border-warm/30 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                {cat.label}
              </h3>
              
              <div className="grid lg:grid-cols-2 gap-5">
                {catServices.map(service => {
                  const isCeramic = service.id === 'ceramic-coating';
                  const isTiered = service.price && service.price.type === 'tiered';
                  
                  return (
                    <motion.div 
                      key={service.id} 
                      layout 
                      className="bg-card border border-border-warm/50 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/30 transition-colors shadow-lg"
                    >
                      <div className="mb-5 border-b border-white/5 pb-4">
                        <h4 className="font-heading text-white font-semibold text-lg mb-1.5">{service.name}</h4>
                        <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{service.shortDescription}</p>
                      </div>

                      <div className="space-y-4 mb-6 flex-1">
                        {isCeramic ? (
                          <div className="space-y-4">
                            {service.pricingTiers && service.pricingTiers.length > 0 && (
                              <div className="space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Tiers</label>
                                {service.pricingTiers.map((tier, idx) => {
                                  const key = `tier_${tier.level.replace(/\s+/g, '')}`;
                                  const val = (prices[service.id] && typeof prices[service.id] === 'object') 
                                    ? prices[service.id][key] 
                                    : undefined;
                                  const displayVal = val !== undefined ? val : tier.price;
                                  
                                  return (
                                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pb-3 sm:pb-0 last:pb-0 border-b border-white/5 sm:border-0 last:border-0">
                                      <div className="sm:w-1/2">
                                        <label className="text-xs font-medium text-text-secondary block line-clamp-1">{tier.level}</label>
                                        {tier.durability && <span className="text-[10px] text-text-muted">{tier.durability}</span>}
                                      </div>
                                      <div className="sm:w-1/2">
                                        <input 
                                          type="text" 
                                          className={`${inputClasses} py-2`}
                                          placeholder={tier.price}
                                          value={displayVal || ''}
                                          onChange={(e) => handleTierChange(service.id, key, e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                            {service.additionalSurfaces && service.additionalSurfaces.length > 0 && (
                              <div className="space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Additional Surfaces</label>
                                {service.additionalSurfaces.map((surfaceObj, idx) => {
                                  const key = `surface_${surfaceObj.surface.replace(/\s+/g, '')}`;
                                  const val = (prices[service.id] && typeof prices[service.id] === 'object') 
                                    ? prices[service.id][key] 
                                    : undefined;
                                  const displayVal = val !== undefined ? val : surfaceObj.price;
                                  
                                  return (
                                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pb-3 sm:pb-0 last:pb-0 border-b border-white/5 sm:border-0 last:border-0">
                                      <div className="sm:w-1/2">
                                        <label className="text-xs font-medium text-text-secondary block line-clamp-1">{surfaceObj.surface}</label>
                                        {surfaceObj.durability && <span className="text-[10px] text-text-muted">{surfaceObj.durability}</span>}
                                      </div>
                                      <div className="sm:w-1/2">
                                        <input 
                                          type="text" 
                                          className={`${inputClasses} py-2`}
                                          placeholder={surfaceObj.price}
                                          value={displayVal || ''}
                                          onChange={(e) => handleTierChange(service.id, key, e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        ) : isTiered ? (
                          <div className="space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">{t.tiersLabel}</label>
                            {service.price.tiers.map((tier, idx) => {
                              const val = (prices[service.id] && typeof prices[service.id] === 'object') 
                                ? prices[service.id][tier.label] 
                                : undefined;
                              const displayVal = val !== undefined ? val : tier.price;
                              return (
                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pb-3 sm:pb-0 last:pb-0 border-b border-white/5 sm:border-0 last:border-0">
                                  <label className="text-xs font-medium text-text-secondary sm:w-1/2 line-clamp-1">{tier.label}</label>
                                  <div className="sm:w-1/2">
                                    <input 
                                      type="text" 
                                      className={`${inputClasses} py-2`}
                                      placeholder={tier.price}
                                      value={displayVal || ''}
                                      onChange={(e) => handleTierChange(service.id, tier.label, e.target.value)}
                                    />
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">{t.pricingLabel}</label>
                            <input 
                              type="text" 
                              className={inputClasses}
                              placeholder={(!service.price ? (service.priceString || 'Contact for Quote') : t.placeholderFormat)}
                              value={
                                typeof prices[service.id] === 'string' 
                                  ? prices[service.id] 
                                  : (!service.price ? (service.priceString || 'Contact for Quote') : (service.price.amount || service.priceString || ''))
                              }
                              onChange={(e) => handleFlatChange(service.id, e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={() => handleSave(service)}
                        disabled={saving === service.id}
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-semibold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(var(--color-primary),0.1)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.2)] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {saving === service.id ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving === service.id ? t.savingBtn : t.saveBtn}
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
