// src/App.tsx
import React, { useState } from 'react';
import {
    Box,
    Container,
    Stepper,
    Step,
    StepLabel,
    Button,
    Drawer,
    StepConnector,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import PowerIcon from '@mui/icons-material/Power';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import ThemeProvider from './theme/Provider';
import Header from './layout/Header';
import PartSelector from './components/PartSelector';
import { Summary } from './components/Summary';

import { categories, translations } from './config/constants';
import { ComponentData } from './types/Component';
import { StepIconProps } from '@mui/material/StepIcon';

// Ícones por categoria
const categoryIcons: Record<string, JSX.Element> = {
    CPU: <MemoryIcon />,
    Cooler: <AcUnitIcon />,
    'CPU Cooler': <AcUnitIcon />,
    'Placa Mãe': <DeveloperBoardIcon />,
    Motherboard: <DeveloperBoardIcon />,
    RAM: <MemoryIcon />,
    'Placa de vídeo': <VideogameAssetIcon />,
    GPU: <VideogameAssetIcon />,
    'HD/SSD': <StorageIcon />,
    'HDD/SSD': <StorageIcon />,
    Gabinete: <VideogameAssetIcon />,
    Case: <VideogameAssetIcon />,
    Fonte: <PowerIcon />,
    'Power Supply': <PowerIcon />,
};

// Conector gradiente do Stepper
const ColorConnector = styled(StepConnector)(({ theme }) => ({
    '& .MuiStepConnector-line': {
        border: 0,
        height: 3,
        borderRadius: 1,
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
}));

export default function App() {
    const [step, setStep] = useState(0);
    const [lang, setLang] = useState<'pt' | 'en'>('pt');
    const [selectedParts, setSelectedParts] = useState<Record<string, ComponentData>>({});
    const [showCart, setShowCart] = useState(false);

    const t = translations[lang];
    const currentCategories = categories[lang];

    // Mapeia ícones na ordem dos passos
    const stepIcons = currentCategories.map(label => categoryIcons[label] || <MemoryIcon />);

    // Ícone customizado no Stepper
    function StepIconComponent(props: StepIconProps) {
        const { active, completed, className, icon } = props;
        const idx = Number(icon) - 1;
        const IconElement = stepIcons[idx];
        return (
            <Box
                className={className}
                sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    bgcolor: active || completed ? 'primary.main' : 'grey.700',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: active ? 4 : 1,
                }}
            >
                {IconElement}
            </Box>
        );
    }

    const handleSelect = (item: ComponentData) =>
        setSelectedParts(prev => ({ ...prev, [currentCategories[step]]: item }));

    const handleRemove = (category: string) => {
        const copy = { ...selectedParts };
        delete copy[category];
        setSelectedParts(copy);
    };

    const total = Object.values(selectedParts).reduce(
        (acc, part) => acc + (part.price || 0),
        0
    );

    return (
        <ThemeProvider>
            <Header
                lang={lang}
                setLang={setLang}
                onToggleCart={() => setShowCart(open => !open)}
            />

            <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
                <Stepper
                    alternativeLabel
                    activeStep={step}
                    connector={<ColorConnector />}
                    sx={{ mb: 4 }}
                >
                    {currentCategories.map(label => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={StepIconComponent}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box display="flex" flexDirection="column" minHeight={0}>
                    <PartSelector
                        category={currentCategories[step]}
                        selectedParts={selectedParts}
                        onSelect={handleSelect}
                        lang={lang}
                    />

                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
                            {t.prev}
                        </Button>
                        <Button
                            variant="contained"
                            disabled={step === currentCategories.length - 1}
                            onClick={() => setStep(step + 1)}
                        >
                            {t.next}
                        </Button>
                    </Box>
                </Box>
            </Container>

            <Drawer
                anchor="right"
                open={showCart}
                onClose={() => setShowCart(false)}
                PaperProps={{ sx: { width: { xs: '100%', md: 380 } } }}
            >
                <Summary
                    selectedParts={selectedParts}
                    total={total}
                    lang={lang}
                    onRemove={handleRemove}
                    onCheckout={() => {
                        console.log('checkout');
                        setShowCart(false);
                    }}
                />
            </Drawer>
        </ThemeProvider>
    );
}
