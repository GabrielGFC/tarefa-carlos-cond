// src/components/Summary.tsx
import React, { useState, useMemo } from 'react';
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ComponentData } from '../types/Component';

interface Props {
  selectedParts: Record<string, ComponentData>;
  total: number;
  lang: 'pt' | 'en';
  onRemove: (category: string) => void;
  onCheckout: () => void;
}

export default function Summary({
  selectedParts,
  total,
  lang,
  onRemove,
  onCheckout,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);

  // Calcular compatibilidade CPU ↔ Placa-Mãe
  const compatibility = useMemo(() => {
    const cpu = selectedParts['CPU'];
    const mb  = selectedParts['Placa Mãe'] || selectedParts['Motherboard'];
    if (!cpu || !mb) return { ok: true, message: '' };
    if (cpu.socket === mb.socket_compatível) {
      return { ok: true, message: lang === 'pt' ? 'CPU e Placa-Mãe compatíveis' : 'CPU and Motherboard compatible' };
    }
    return {
      ok: false,
      message: lang === 'pt'
        ? `Incompatível: CPU (${cpu.socket}) ≠ MB (${mb.socket_compatível})`
        : `Incompatible: CPU (${cpu.socket}) ≠ MB (${mb.socket_compatível})`,
    };
  }, [selectedParts, lang]);

  const formatter = new Intl.NumberFormat(
    lang === 'pt' ? 'pt-BR' : 'en-US',
    { style: 'currency', currency: lang === 'pt' ? 'BRL' : 'USD' },
  );

  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Cabeçalho com toggle */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={700}>
          {lang === 'pt' ? 'Conta' : 'Summary'}
        </Typography>
        <IconButton size="small" onClick={toggleCollapse}>
          {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Stack>

      {/* Indicador de compatibilidade */}
      {!collapsed && compatibility.message && (
        <Typography
          variant="body2"
          fontWeight={600}
          color={compatibility.ok ? 'success.main' : 'error.main'}
          sx={{ mt: 1 }}
        >
          {compatibility.message}
        </Typography>
      )}

      <Collapse in={!collapsed} sx={{ flex: 1, minHeight: 0 }}>
        {/* Lista de itens */}
        <Box flexGrow={1} overflow="auto" pr={1} mt={1}>
          <List dense disablePadding>
            {Object.entries(selectedParts).map(([category, part]) => (
              <Box key={category}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => onRemove(category)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      src={part.image}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        noWrap
                        maxWidth={140}
                      >
                        {part.name}
                      </Typography>
                    }
                    secondary={formatter.format(part.price)}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Box>
            ))}
            {Object.keys(selectedParts).length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                mt={2}
              >
                {lang === 'pt'
                  ? 'Nenhuma peça selecionada'
                  : 'No parts selected'}
              </Typography>
            )}
          </List>
        </Box>

        {/* Total estimado */}
        <Divider sx={{ my: 1 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={700}>
            {lang === 'pt' ? 'Preço Estimado:' : 'Estimated Price:'}
          </Typography>
          <Typography variant="subtitle1" fontWeight={700} color="secondary">
            {formatter.format(total)}
          </Typography>
        </Stack>

        {/* Botão Pagar / Checkout */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onCheckout}
        >
          {lang === 'pt' ? 'Pagar' : 'Checkout'}
        </Button>
      </Collapse>
    </Box>
  );
}
