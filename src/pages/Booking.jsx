import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CalendarDays, Clock, User, Phone, Mail, FileText, Car, AlertCircle } from 'lucide-react'
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import emailjs from '@emailjs/browser'
import SectionHeading from '../components/ui/SectionHeading'

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

const vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Van']

const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM',
]

const fallbackServices = [
  { id: '1', name: 'Exterior Detailing' },
  { id: '2', name: 'Interior Detailing' },
  { id: '3', name: 'Paint Correction' },
  { id: '4', name: 'Ceramic Coating' },
]

export default function Booking() {
  const [searchParams] = useSearchParams()
  const [services, setServices] = useState(fallbackServices)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const preselectedService = searchParams.get('service') || ''

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customerName: '',
      phone: '',
      email: '',
      vehicleType: '',
      serviceName: preselectedService,
      date: '',
      time: '',
      notes: '',
    },
  })

  const selectedService = watch('serviceName')
  const isCeramicCoating = selectedService?.toLowerCase().includes('ceramic')

  useEffect(() => {
    async function fetchServices() {
      try {
        const q = query(collection(db, 'services'), where('isActive', '==', true))
        const snapshot = await getDocs(q)
        if (!snapshot.empty) {
          setServices(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })))
        }
      } catch (err) {
        console.log('Using fallback services for dropdown')
      }
    }
    fetchServices()
  }, [])

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      // Save to Firestore
      await addDoc(collection(db, 'bookings'), {
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        vehicleType: data.vehicleType,
        serviceName: data.serviceName,
        date: data.date,
        time: data.time,
        notes: data.notes || '',
        status: 'Pending',
        createdAt: Timestamp.now(),
      })

      // Send EmailJS notification
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          customer_name: data.customerName,
          customer_phone: data.phone,
          customer_email: data.email,
          vehicle_type: data.vehicleType,
          service_name: data.serviceName,
          booking_date: data.date,
          booking_time: data.time,
          notes: data.notes || 'None',
        }, EMAILJS_PUBLIC_KEY)
      } catch (emailErr) {
        console.log('EmailJS notification skipped:', emailErr.message)
      }

      toast.success('Booking submitted successfully! We\'ll contact you shortly to confirm.')
      setSubmitted(true)
      reset()
    } catch (err) {
      console.error('Booking error:', err)
      toast.error('Something went wrong. Please try calling us at 438-483-8175.')
    } finally {
      setSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  const inputClasses = 'w-full bg-card border border-border-warm rounded-lg px-4 py-3 text-white placeholder-text-muted text-sm transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20'
  const labelClasses = 'flex items-center gap-2 text-sm font-medium text-text-secondary mb-2'

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Booking Confirmed | Down2Detail</title>
        </Helmet>
        <div className="min-h-screen page-gradient flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarDays size={36} className="text-primary" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-white mb-4">Booking Received!</h1>
            <p className="text-text-secondary mb-8">
              Thank you for choosing Down2Detail. We'll call you shortly to confirm your appointment.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-primary hover:bg-primary-dark text-black font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Book Another Service
            </button>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Book Auto Detailing in Montreal & Saint-Hubert | Down2Detail</title>
        <meta name="description" content="Book your professional auto detailing appointment with Down2Detail. Serving Montreal, Saint-Hubert & the Greater Montreal Area. Easy online booking." />
      </Helmet>

      <section className="pt-32 pb-20 page-gradient min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Book an Appointment"
            title="Schedule Your Detailing"
            description="Fill out the form below and we'll get back to you to confirm your booking."
          />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card/50 border border-border-warm rounded-2xl p-6 md:p-8 space-y-6"
          >
            {/* Name & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  <User size={14} /> Full Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={inputClasses}
                  {...register('customerName', { required: 'Name is required' })}
                />
                {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName.message}</p>}
              </div>
              <div>
                <label className={labelClasses}>
                  <Phone size={14} /> Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="(438) 000-0000"
                  className={inputClasses}
                  {...register('phone', { required: 'Phone is required' })}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Email & Vehicle Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  <Mail size={14} /> Email *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={inputClasses}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                  })}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelClasses}>
                  <Car size={14} /> Vehicle Type *
                </label>
                <select
                  className={inputClasses}
                  {...register('vehicleType', { required: 'Vehicle type is required' })}
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.vehicleType && <p className="text-red-400 text-xs mt-1">{errors.vehicleType.message}</p>}
              </div>
            </div>

            {/* Service */}
            <div>
              <label className={labelClasses}>
                <FileText size={14} /> Service *
              </label>
              <select
                className={inputClasses}
                {...register('serviceName', { required: 'Please select a service' })}
              >
                <option value="">Select a service</option>
                {services.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
              {errors.serviceName && <p className="text-red-400 text-xs mt-1">{errors.serviceName.message}</p>}
              {isCeramicCoating && (
                <div className="flex items-start gap-2 mt-2 bg-primary/10 border border-primary/20 rounded-lg p-3">
                  <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-primary text-xs">
                    Contact for pricing — Ceramic coating pricing varies based on vehicle size and condition. We'll provide a custom quote after inspection.
                  </p>
                </div>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  <CalendarDays size={14} /> Preferred Date *
                </label>
                <input
                  type="date"
                  min={today}
                  className={inputClasses}
                  {...register('date', { required: 'Date is required' })}
                />
                {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <label className={labelClasses}>
                  <Clock size={14} /> Preferred Time *
                </label>
                <select
                  className={inputClasses}
                  {...register('time', { required: 'Time is required' })}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time.message}</p>}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className={labelClasses}>
                <FileText size={14} /> Additional Notes (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Any special requests or details about your vehicle..."
                className={`${inputClasses} resize-none`}
                {...register('notes')}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg transition-all duration-300 text-base flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CalendarDays size={18} />
                  Submit Booking
                </>
              )}
            </button>

            <p className="text-text-muted text-xs text-center">
              We'll contact you within 24 hours to confirm your appointment.
            </p>
          </motion.form>
        </div>
      </section>
    </>
  )
}
