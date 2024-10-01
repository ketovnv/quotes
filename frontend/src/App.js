import React, {useState, useEffect} from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkScrollbar from '@mui/material/darkScrollbar';
import Root from "./components/Root";
import "./styles/global.css";
import FabButton from "./components/FabButton";


const ReactJSSPApp = () => {

    const theme = createTheme({
        palette: {
            mode: 'dark'
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (themeParam) => ({
                    body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
                }),
            },
        },

    });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {/*<FabButton/>*/}
                <Root/>
            </ThemeProvider>
        </div>
    )
}

export default ReactJSSPApp;

