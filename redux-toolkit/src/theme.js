import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c9587',
    },
    secondary: {
      main: '#F44336',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Dosis',
    subtitle1: {
      fontWeight: "bold",
      fontSize: "1.1rem"
    }
  },  
  overrides: {
    MuiFormHelperText: {
      root: {
        fontSize: "1em"
      },
    },
  },  
});

export default theme;
