import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#41434D',
            main: '#38373D',
            dark: '#2D2C31',
            contrastText: '#F1F0FA',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});
