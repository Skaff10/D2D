import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Down2Detail</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      <div className="min-h-screen page-gradient flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          <h1 className="font-heading text-8xl md:text-9xl font-black text-gradient mb-4">404</h1>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8 text-lg">
            Looks like this page drove off. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              <Home size={18} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-primary text-white font-medium px-6 py-3 rounded-lg transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
