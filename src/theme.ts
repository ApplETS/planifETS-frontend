import { createTheme } from '@mui/material/styles';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme?.colors;

if (!colors) {
  throw new Error('Tailwind colors not found in config');
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.buttonTags,
    },
    secondary: {
      main: colors.navbarButtonHover,
    },
    error: {
      main: colors.failedCourseTag,
    },
    warning: {
      main: colors.inProgressCourseTag,
    },
    success: {
      main: colors.completedCourseTag,
    },
    background: {
      default: colors.background,
      paper: colors.courseSidebar,
    },
    text: {
      primary: colors.textDarkBackground,
      secondary: colors.searchbar,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'dark',
    // Default MUI colors
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export { darkTheme, lightTheme };
