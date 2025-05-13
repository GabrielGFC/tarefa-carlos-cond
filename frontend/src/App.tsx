import React, { useState } from 'react';
import Header from './components/Header';
import StepperNav from './components/StepperNav';
import PartSelector from './components/PartSelector';
import Summary from './components/Summary';
import { categories, translations } from './config/constants';
import { ComponentData } from './types/Component';

export default function App() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<'pt' | 'en'>("pt");
  const [selectedParts, setSelectedParts] = useState<{ [key: string]: ComponentData }>({});
  const t = translations[lang];

  const handleSelect = (category: string, item: ComponentData) => {
    setSelectedParts(prev => ({ ...prev, [category]: item }));
  };

  const total = Object.values(selectedParts).reduce((acc, i) => acc + (i?.price || 0), 0);

  return (
    <div className="layout">
      <Header lang={lang} setLang={setLang} />
      <StepperNav step={step} categories={categories} />
      <div className="main">
        <div className="selector">
          <PartSelector
            category={categories[step]}
            selectedParts={selectedParts}
            onSelect={(item) => handleSelect(categories[step], item)}
            lang={lang}
          />
          <div className="buttons">
            <button disabled={step === 0} onClick={() => setStep(step - 1)}>{t.prev}</button>
            <button disabled={step === categories.length - 1} onClick={() => setStep(step + 1)}>{t.next}</button>
          </div>
        </div>
        <Summary selectedParts={selectedParts} total={total} lang={lang} />
      </div>
    </div>
  );
}