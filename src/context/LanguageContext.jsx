import { createContext, useContext, useState } from 'react'

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en')

  const toggle = () => setLang(prev => prev === 'en' ? 'fr' : 'en')

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
