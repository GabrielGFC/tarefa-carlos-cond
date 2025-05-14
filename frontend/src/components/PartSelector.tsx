import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, Tooltip, Box } from '@mui/material';
import { ComponentData } from '../types/Component';
import { translations } from '../config/constants';

interface Props {
  category: string;
  selectedParts: Record<string, ComponentData>;
  onSelect: (item: ComponentData) => void;
  lang: 'pt' | 'en';
}

export default function PartSelector({ category, selectedParts, onSelect, lang }: Props) {
  const [items, setItems] = useState<ComponentData[]>([]);
  const t = translations[lang];

  useEffect(() => {
    axios.get(`http://localhost:3001/api/components/${category.toLowerCase()}`)
      .then(res => {
        let data: ComponentData[] = res.data;
        if (category === 'Placa Mãe' && selectedParts['CPU']) {
          const socket = selectedParts['CPU'].socket;
          data = data.filter(item => item.socket_compatível === socket);
        }
        setItems(data);
      });
  }, [category, selectedParts]);

  return (
    <>
      <Typography variant="h6" gutterBottom>{t.choose} {category}</Typography>
      <Grid container spacing={2}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id || item.name}>
            <Tooltip title={item.socket || item.socket_compatível || ''}>
              <Card
                onClick={() => onSelect(item)}
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  border: selectedParts[category]?.name === item.name ? '2px solid #1976d2' : '1px solid #ccc',
                  '&:hover': { transform: 'scale(1.03)' }
                }}
              >
                <CardMedia component="img" height="160" image={item.image} alt={item.name} />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">R$ {item.price.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </>
  );
}