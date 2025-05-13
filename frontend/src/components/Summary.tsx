import React from 'react';
import { ComponentData } from '../types/Component';
import { translations } from '../config/constants';

interface SummaryProps {
  selectedParts: { [key: string]: ComponentData };
  total: number;
  lang: 'pt' | 'en';
}

export default function Summary({ selectedParts, total, lang }: SummaryProps) {
  const t = translations[lang];
  return (
    <aside className="summary">
      <h3>{t.summary}:</h3>
      <ul>
        {Object.entries(selectedParts).map(([cat, item]) => (
          <li key={cat}>{cat}: {item.name} - R$ {item.price.toFixed(2)}</li>
        ))}
      </ul>
      <h2>{t.total}: R$ {total.toFixed(2)}</h2>
    </aside>
  );
}