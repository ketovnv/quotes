import React, {useState, useEffect} from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import tests from "./stores/tests";
import Root from "./components/Root";
import appStore from "./stores/app";


const ReactJSSPApp = () => {

    const [mode, setMode] = useState('dark');

    useEffect(() => {
        console.warn('ReactJSSPApp')
    }, []);


    const theme = createTheme({
        palette: {
            mode: mode || 'dark',
        },
    });

    appStore.setToggleModeFunction(() => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Root/>
        </ThemeProvider>
    )
}

export default ReactJSSPApp;

