import React, { useState } from 'react';
import { Box, Container, Stepper, Step, StepLabel, Button, Typography, Paper } from '@mui/material';
import PartSelector from './components/PartSelector';
import Summary from './components/Summary';
import { categories, translations } from './config/constants';
import { ComponentData } from './types/Component';

export default function App() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [selectedParts, setSelectedParts] = useState<Record<string, ComponentData>>({});
  const t = translations[lang];

  const handleSelect = (item: ComponentData) => {
    setSelectedParts(prev => ({ ...prev, [categories[step]]: item }));
  };

  const handleRemove = (category: string) => {
    const copy = { ...selectedParts };
    delete copy[category];
    setSelectedParts(copy);
  };

  const total = Object.values(selectedParts).reduce((acc, part) => acc + (part?.price || 0), 0);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{t.title}</Typography>

      <Box mb={3}>
        <Button variant={lang === 'pt' ? 'contained' : 'outlined'} onClick={() => setLang('pt')}>🇧🇷 Português</Button>
        <Button sx={{ ml:1 }} variant={lang === 'en' ? 'contained' : 'outlined'} onClick={() => setLang('en')}>🇺🇸 English</Button>
      </Box>

      <Stepper activeStep={step} sx={{ mb:3 }}>
        {categories.map(label => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '2fr 1fr' }} gap={3}>
        <Box>
          <PartSelector category={categories[step]} selectedParts={selectedParts} onSelect={handleSelect} lang={lang}/>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button disabled={step === 0} onClick={() => setStep(step - 1)}>{t.prev}</Button>
            <Button disabled={step === categories.length - 1} onClick={() => setStep(step + 1)}>{t.next}</Button>
          </Box>
        </Box>
        <Paper elevation={3} sx={{ p:2, position:'sticky', top:20 }}>
          <Summary selectedParts={selectedParts} total={total} lang={lang} onRemove={handleRemove}/>
        </Paper>
      </Box>
    </Container>
  );
}