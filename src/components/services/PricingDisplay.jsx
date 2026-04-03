import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'

export default function PricingDisplay({ price }) {
  // Call for Price
  if (!price) {
    return (
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wide hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
      >
        <Phone size={12} />
        Call for Price
      </Link>
    )
  }

  // Flat rate
  if (price.type === 'flat') {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
        <span className="price-mono text-primary text-sm">{price.amount}</span>
      </div>
    )
  }

  // Tiered pricing
  if (price.type === 'tiered') {
    return (
      <div className="space-y-1.5">
        {price.tiers.map((tier, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs"
          >
            <span className="text-white/50 truncate">{tier.label}</span>
            <span className="price-mono text-primary whitespace-nowrap font-semibold">{tier.price}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}
