// src/components/PartItem.tsx
import {
  Card, CardActionArea, CardMedia, Box, Typography, IconButton
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { ComponentData } from '../types/Component';

interface Props {
  part: ComponentData;
  selected?: boolean;
  onSelect: () => void;
}

export default function PartItem({ part, selected, onSelect }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1.5,
        px: 1,
        borderRadius: 2,
        bgcolor: selected ? 'primary.light' : 'background.paper',
        transition: '0.2s',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <CardActionArea
        onClick={onSelect}
        sx={{ display: 'flex', alignItems: 'center', py: 1 }}
      >
        {/* thumb */}
        <CardMedia
          component="img"
          image={part.imageUrl}
          alt={part.name}
          sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
        />

        {/* info */}
        <Box flexGrow={1} mx={2}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            noWrap
            maxWidth={280}
          >
            {part.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {part.brand ?? part.socket}
          </Typography>
          <Typography variant="subtitle2" color="secondary.main">
            {part.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Typography>
        </Box>

        {/* ação */}
        <IconButton color={selected ? 'error' : 'primary'}>
          {selected ? <DeleteIcon /> : <AddCircleIcon />}
        </IconButton>
      </CardActionArea>
    </Card>
  );
}
