// src/layout/ModeSwitch.tsx
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ModeSwitch() {
  // inicia pelo localStorage ou padrão “light”
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // sempre que mudar, atualiza html.classList + localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // alterna
  const toggle = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
   <></>
  );
}
