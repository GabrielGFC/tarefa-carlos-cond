import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { ComponentData } from '../types/Component';
import { translations } from '../config/constants';

interface Props {
  category: string;
  selectedParts: Record<string, ComponentData>;
  onSelect: (item: ComponentData) => void;
  lang: 'pt' | 'en';
}

export default function PartSelector({
  category,
  selectedParts,
  onSelect,
  lang,
}: Props) {
  const [items, setItems] = useState<ComponentData[]>([]);
  const t = translations[lang];

  // ──────────────────────────────── fetch + compatibilidade
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/components/${category.toLowerCase()}`)
      .then((res) => {
        let data: ComponentData[] = res.data;
        if (category === 'Placa Mãe' && selectedParts['CPU']) {
          const socket = selectedParts['CPU'].socket;
          data = data.filter((item) => item.socket_compatível === socket);
        }
        setItems(data);
      });
  }, [category, selectedParts]);

  // ──────────────────────────────── render
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t.choose} {category}
      </Typography>

      <Box
        sx={{
          maxHeight: 'calc(100vh - 280px)',
          overflowY: 'auto',
          pr: 1,
        }}
      >
        {items.map((item) => {
          const isSelected = selectedParts[category]?.id === item.id;

          return (
            <Tooltip
              key={item.id || item.name}
              title={item.socket || item.socket_compatível || ''}
            >
              <Card
                variant="outlined"
                sx={{
                  mb: 1.5,
                  borderRadius: 2,
                  bgcolor: isSelected ? 'primary.lighter' : 'background.paper',
                  '&:hover': { boxShadow: 3 },
                  transition: 'all .2s',
                }}
              >
                <CardActionArea
                  onClick={() => onSelect(item)}
                  sx={{ display: 'flex', alignItems: 'center', py: 1 }}
                >
                  {/* mini-thumb */}
                  <CardMedia
                    component="img"
                    image={item.image}
                    loading="lazy"
                    alt={item.name}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 1,
                      ml: 1,
                    }}
                  />

                  {/* infos */}
                  <CardContent sx={{ flexGrow: 1, py: 0, px: 2 }}>
                    <Stack spacing={0.2}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        noWrap
                        maxWidth={280}
                      >
                        {item.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {item.brand ?? item.socket}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        color="secondary.main"
                        fontWeight={700}
                      >
                        {item.price.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US', {
                          style: 'currency',
                          currency: lang === 'pt' ? 'BRL' : 'USD',
                        })}
                      </Typography>
                    </Stack>
                  </CardContent>

                  {/* ação à direita */}
                  <IconButton
                    sx={{ mr: 1 }}
                    color={isSelected ? 'error' : 'primary'}
                  >
                    {isSelected ? <DeleteIcon /> : <AddIcon />}
                  </IconButton>
                </CardActionArea>
              </Card>
            </Tooltip>
          );
        })}
      </Box>
    </>
  );
}
