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
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // alterna
  const toggle = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <IconButton
      onClick={toggle}
      aria-label="Alternar tema"
      // agora estilado com classes Tailwind
      className="p-2 rounded focus:outline-none focus:ring-2
                 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
    >
      {theme === 'light' ? (
        <DarkModeIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      ) : (
        <LightModeIcon className="h-6 w-6 text-yellow-300 dark:text-yellow-400" />
      )}
    </IconButton>
  );
}
