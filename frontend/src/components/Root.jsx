import {AppContainer, HStack, VStack} from '../styles';
import ControlPanel from "./ControlPanel";
import StatusPanel from "./StatusPanel";
import CalculationPanel from "./CalculationPanel";
import appStore from "../stores/app";
import CalculatorBoard from "./CаlculatorBoard";
import Modal from "./Modal";

const Root = () => {

    appStore.useScreenWidth();

    const getDesktopContent = () =>

        <CalculatorBoard paddingTop='100рх' justifyContent='center'/>


    const getMobileContent = () =>
        <VStack paddingTop='10рх'>
            <ControlPanel/>
            <StatusPanel/>
            <CalculationPanel/>
        </VStack>


    const AppContent = appStore.screenWidth > 800 ? getDesktopContent() : getMobileContent();
    console.warn("Ширина экрана", appStore.screenWidth)
    return (
        <AppContainer>
            <div style={{position: 'relative', zIndex: 1, width: '100vw', height: '100vh'}}>
                {AppContent}
            </div>
            <Modal/>
        </AppContainer>

    );
}

export default Root;