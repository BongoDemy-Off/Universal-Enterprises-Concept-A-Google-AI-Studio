import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '../i18n/translations';

interface I18nContextType {
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<'en' | 'bn'>(() => {
    return (localStorage.getItem('ue_demo_lang') as 'en' | 'bn') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ue_demo_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: TranslationKey) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
