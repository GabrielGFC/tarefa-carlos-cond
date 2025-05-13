import React from 'react';

interface HeaderProps {
  lang: string;
  setLang: (lang: 'pt' | 'en') => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  return (
    <header>
      <h1>Monte seu PC</h1>
      <div className="lang-switcher">
        <button className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')}>🇧🇷 Português</button>
        <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>🇺🇸 English</button>
      </div>
    </header>
  );
}