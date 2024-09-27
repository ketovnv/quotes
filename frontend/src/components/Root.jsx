import React, {useEffect, useState} from "react";
import {AppContainer, HStack, VStack} from '../styles';

import ControlPanel from "./ControlPanel";
import StatusPanel from "./StatusPanel";
import CalculationPanel from "./CalculationPanel";
import appStore from "../stores/app";

const Root = () => {

    let width = appStore.useScreenWidth();
    console.warn("Ширина экрана",width)

    const getDesktopContent = ()=> (
        <HStack paddingTop='100рх' justifyContent='center'>
            <ControlPanel/>
            <VStack width='400px'>
                <StatusPanel/>
                <CalculationPanel/>
            </VStack>
        </HStack>
    )

    const getMobileContent = ()=>(
        <VStack paddingTop='10рх'>
            <ControlPanel/>
            <StatusPanel/>
            <CalculationPanel/>
        </VStack>
    )

    return (
        <AppContainer>
            {
                width > 800
                    ? getDesktopContent() :
                    getMobileContent()
            }
        </AppContainer>
    );
}

export default Root;