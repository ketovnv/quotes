import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Root from "./components/Root";
import "./styles/global.css";
import FabButton from "./components/FabButton";
import appStore from "./stores/app";


const ReactJSSPApp = () => {

    return (
        <div>
            <ThemeProvider theme={appStore.theme}>
                <CssBaseline/>
                <FabButton/>
                <Root/>
            </ThemeProvider>
        </div>
    )
}

export default ReactJSSPApp;

