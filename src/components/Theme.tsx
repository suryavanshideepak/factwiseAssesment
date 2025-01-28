import { createTheme, Theme } from "@mui/material/styles";

const baseTheme = {
    typography: {
        fontFamily:'"Roboto", "Helvetica", "Arial",  "sans-serif" '
    }
}

export const lightTheme: Theme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'light',
        primary: {
            main:"#1976d2"
        },
        background: {
            default: "#ffffff",
            paper:"#f5f5f5"
        },
        text: {
            primary: "#000000",
        },   
    },
    components: {
        MuiInputLabel:{
            styleOverrides: {
                root: {
                    color:'var(--text-color)'
                }
            }
        }
    }
})

export const darkTheme: Theme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'dark',
        primary: {
            main:"#90caf9"
        },
        background: {
            default: "#121212",
            paper:"#424242"
        },
        text: {
            primary: "#ffffff",
        },

    },
     components: {
        MuiInputLabel:{
            styleOverrides: {
                root: {
                    color:'var(--text-color)'
                }
            }
        }
    }
})