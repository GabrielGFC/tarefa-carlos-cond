// src/layout/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Stack, IconButton, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModeSwitch from './ModeSwitch';

interface Props {
  lang: 'pt' | 'en';
  setLang: (l: 'pt' | 'en') => void;
  onToggleCart: () => void;
}

export default function Header({ lang, setLang, onToggleCart }: Props) {
  return (
    <AppBar position="sticky" color="transparent" elevation={0}
      sx={{ backdropFilter: 'blur(8px)', borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1}>
          <Box component="span" sx={{
            display: 'flex', alignItems: 'center', height: 48,
            '& svg': { height: '100%', width: 'auto' }
          }}>
            <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" fill="none">
              {/* Tela do computador */}
              <rect x="20" y="30" width="60" height="40" rx="5" fill="#4A90E2" />
              <rect x="30" y="38" width="45" height="4" fill="#fff" />
              <rect x="30" y="46" width="35" height="4" fill="#fff" />
              <circle cx="75" cy="62" r="3" fill="#7ED321" />

              {/* Base do computador */}
              <rect x="35" y="72" width="30" height="6" fill="#4A90E2" />
              <rect x="42" y="78" width="16" height="4" fill="#4A90E2" />

              {/* Texto */}
              <text x="100" y="65" fontFamily="Segoe UI, sans-serif" fontSize="28" fill="#2C3E50" fontWeight="bold">
                SeuComputador
              </text>
            </svg>
          </Box>

          <Button size="small" variant="outlined" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>
            {lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <ModeSwitch />
          <IconButton onClick={onToggleCart}>
            <ShoppingCartIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
