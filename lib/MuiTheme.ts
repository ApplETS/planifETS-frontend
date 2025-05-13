import { createTheme } from '@mui/material/styles';

const baseOptions = {
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
};

export const darkTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(125, 144, 237, 1)', // Match --primary in dark theme
    },
    secondary: {
      main: 'rgba(64, 49, 78, 1)', // Match --secondary in dark theme
    },
    background: {
      default: 'rgba(76, 122, 76, 1)', // Match --background in dark theme
      paper: 'rgba(47, 43, 75, 1)',
    },
    text: {
      primary: 'rgba(240, 244, 255, 1)', // Match --foreground in dark theme
    },
  },
});

export const lightTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: 'light',
    primary: {
      main: 'hsl(220, 90%, 56%)',
    },
    secondary: {
      main: 'rgba(250, 250, 250, 1)',
    },
    background: {
      default: 'rgba(255, 255, 255, 1)',
      paper: 'rgba(255, 255, 255, 1)',
    },
    text: {
      primary: 'rgba(17, 17, 17, 1)', // Match --foreground in light theme
    },
  },
});
