import React, {useEffect, useState} from "react";
import {AppContainer, HStack, VStack} from '../styles';

import ControlPanel from "./ControlPanel";
import StatusPanel from "./StatusPanel";
import CalculationPanel from "./CalculationPanel";
import appStore from "../stores/app";
import FabButton from "./FabButton";

const Root = () => {

    useEffect(() => {
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        // Пример рисования на canvas
        // ctx.fillStyle = 'radial-gradient(circle at 50% 50%, hsla(210, 100%, 75%, 0.5), hsl(220, 30%, 5%))';
        // ctx.fillRect(10, 10, 150, 75);
    }, []);


    let width = appStore.useScreenWidth();
    console.warn("Ширина экрана", width)

    const getDesktopContent = () => (
        <HStack paddingTop='100рх' justifyContent='center'>
            <ControlPanel/>
            <VStack width='400px'>
                <StatusPanel/>
                <CalculationPanel/>
            </VStack>
        </HStack>
    )

    const getMobileContent = () => (
        <VStack paddingTop='10рх'>
            <ControlPanel/>
            <StatusPanel/>
            <CalculationPanel/>
        </VStack>
    )

    const AppContent = width > 800 ? getDesktopContent() : getMobileContent();

    return (
        <AppContainer>
            <canvas id="myCanvas" width="100vw" height="100vh" style={{position: 'absolute', zIndex: 0}}/>
            {/*<div style={{position: 'relative', zIndex: 1, width: '100vw', height: '100vh'}}>*/}
                {AppContent}
            {/*</div>*/}
        </AppContainer>

    );
}

export default Root;