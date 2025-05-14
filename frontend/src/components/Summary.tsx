import React from 'react';
import { Typography, List, ListItem, ListItemText, IconButton, Divider, Avatar, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ComponentData } from '../types/Component';
import { translations } from '../config/constants';

interface Props {
  selectedParts: Record<string, ComponentData>;
  total: number;
  lang: 'pt' | 'en';
  onRemove: (category: string) => void;
}

export default function Summary({ selectedParts, total, lang, onRemove }: Props) {
  const t = translations[lang];
  return (
    <>
      <Typography variant="h6" gutterBottom>{t.summary}</Typography>
      <List dense>
        {Object.entries(selectedParts).map(([cat, item]) => (
          <React.Fragment key={cat}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onRemove(cat)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar variant="rounded" src={item.image} sx={{ width:40, height:40 }} />
                <ListItemText primary={`${cat}: ${item.name}`} secondary={`R$ ${item.price.toFixed(2)}`} />
              </Stack>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Typography variant="h5" mt={2}>{t.total}: R$ {total.toFixed(2)}</Typography>
    </>
  );
}