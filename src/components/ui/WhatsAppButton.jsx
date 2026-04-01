import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phoneNumber = '14384838175'
  const message = encodeURIComponent('Hi! I\'d like to inquire about your auto detailing services.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 float-animation transition-colors duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  )
}
