import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ComponentData } from '../types/Component';
import { translations } from '../config/constants';

interface PartSelectorProps {
  category: string;
  selectedParts: { [key: string]: ComponentData };
  onSelect: (item: ComponentData) => void;
  lang: 'pt' | 'en';
}

export default function PartSelector({ category, selectedParts, onSelect, lang }: PartSelectorProps) {
  const [items, setItems] = useState<ComponentData[]>([]);
  const t = translations[lang];

  useEffect(() => {
    axios.get(`http://localhost:3001/api/components/${category.toLowerCase()}`)
      .then(res => {
        let data = res.data;
        if (category === "Placa Mãe" && selectedParts["CPU"]) {
          const socket = selectedParts["CPU"].socket;
          data = data.filter((item: ComponentData) => item.socket_compatível === socket);
        }
        setItems(data);
      });
  }, [category, selectedParts]);

  return (
    <div>
      <h2>{t.choose} {category}</h2>
      <div className="grid">
        {items.map(item => (
          <div key={item.id} className="card" onClick={() => onSelect(item)}>
            <img src={item.image} alt={item.name} />
            <strong>{item.name}</strong>
            <p>R$ {item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}