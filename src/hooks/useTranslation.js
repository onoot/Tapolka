import { useCallback } from 'react';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const translations = {
  ru,
  en
};

const availableLanguages = Object.keys(translations);

export const useTranslation = (telegramLanguage = null) => {
  const getInitialLanguage = () => {
    // Проверяем сохраненный язык
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }

    // Проверяем язык из Telegram
    if (telegramLanguage) {
      const langCode = telegramLanguage.split('-')[0].toLowerCase();
      if (availableLanguages.includes(langCode)) {
        return langCode;
      }
    }

    // Возвращаем английский как язык по умолчанию
    return 'en';
  };

  const currentLanguage = getInitialLanguage();

  const t = useCallback((key) => {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    return translation || key;
  }, [currentLanguage]);

  const setLanguage = (lang) => {
    if (availableLanguages.includes(lang)) {
      localStorage.setItem('language', lang);
      window.location.reload();
    }
  };

  return { t, setLanguage, currentLanguage };
}; 