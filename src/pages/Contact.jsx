import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import SectionHeading from '../components/ui/SectionHeading'

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 438 483 8175',
    href: 'tel:+14384838175',
    desc: 'Call us anytime during business hours',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'down2detail.ca@gmail.com',
    href: 'mailto:down2detail.ca@gmail.com',
    desc: 'We respond within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: '4500 Bd Kimber, Saint-Hubert, QC J3Y 8K5',
    href: 'https://maps.google.com/?q=4500+Bd+Kimber+Saint-Hubert+QC+J3Y+8K5',
    desc: 'Serving Greater Montreal Area',
  },
  {
    icon: Clock,
    title: 'Hours',
    value: 'Mon – Sun: 8AM – 6PM',
    href: null,
    desc: 'Open 7 days a week',
  },
]

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        message: data.message,
      }, EMAILJS_PUBLIC_KEY)
      toast.success('Message sent! We\'ll get back to you shortly.')
      reset()
    } catch (err) {
      console.error('Contact form error:', err)
      toast.error('Failed to send. Please call us at 438-483-8175.')
    }
  }

  const inputClasses = 'w-full bg-card border border-border-warm rounded-lg px-4 py-3 text-white placeholder-text-muted text-sm transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20'

  return (
    <>
      <Helmet>
        <title>Contact Down2Detail | Auto Detailing in Montreal & Saint-Hubert</title>
        <meta name="description" content="Contact Down2Detail for professional auto detailing in Montreal & Saint-Hubert. Call +1 438 483 8175 or email us. Open 7 days a week." />
      </Helmet>

      <section className="pt-32 pb-16 page-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Get in Touch"
            title="Contact Us"
            description="Have questions? We'd love to hear from you. Reach out by phone, email, or fill out the form below."
          />
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-5 border border-border-warm/50 card-hover text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <info.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-1">{info.title}</h3>
                {info.href ? (
                  <a href={info.href} target={info.title === 'Location' ? '_blank' : undefined} rel="noopener noreferrer" className="text-primary text-sm font-medium hover:text-primary-light transition-colors">
                    {info.value}
                  </a>
                ) : (
                  <p className="text-primary text-sm font-medium">{info.value}</p>
                )}
                <p className="text-text-muted text-xs mt-1">{info.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Form + Map Grid */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare size={22} className="text-primary" />
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-2 block">Name *</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className={inputClasses}
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-2 block">Phone</label>
                    <input
                      type="tel"
                      placeholder="(438) 000-0000"
                      className={inputClasses}
                      {...register('phone')}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-2 block">Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={inputClasses}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                    })}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-2 block">Message *</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className={`${inputClasses} resize-none`}
                    {...register('message', { required: 'Message is required' })}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-black font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-border-warm">
                <p className="text-text-secondary text-sm mb-3">Follow us on social media:</p>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/down2detail.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-card hover:bg-card-hover px-4 py-2 rounded-lg text-text-secondary hover:text-primary transition-all text-sm">
                    <FaInstagram size={16} /> Instagram
                  </a>
                  <a href="https://www.facebook.com/people/Down2Detail/61577327687487/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-card hover:bg-card-hover px-4 py-2 rounded-lg text-text-secondary hover:text-primary transition-all text-sm">
                    <FaFacebookF size={16} /> Facebook
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full min-h-[400px]"
            >
              <h2 className="font-heading text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin size={22} className="text-primary" />
                Find Us
              </h2>
              <div className="rounded-2xl overflow-hidden border border-border-warm h-[calc(100%-3.5rem)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.4!2d-73.5051!3d45.5369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc904f0!2s4500+Bd+Kimber%2C+Saint-Hubert%2C+QC+J3Y+8K5!5e0!3m2!1sen!2sca!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Down2Detail location on Google Maps"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
