import { createTheme } from '@mui/material/styles'

const baseOptions = {
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
  palette: {
  },
}

export const darkTheme  = createTheme({ ...baseOptions, palette: { ...baseOptions.palette, mode: 'dark' } })
export const lightTheme = createTheme({ ...baseOptions, palette: { ...baseOptions.palette, mode: 'light' } })