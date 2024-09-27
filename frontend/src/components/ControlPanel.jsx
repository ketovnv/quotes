import {CardContent} from "@mui/material";
import React from "react";
import QuotesInput from "./QuotesInput";
import webSocket from "../stores/webSocket";
import quotesStore from "../stores/quotes";
import {StartButton, StatButton, ControlPanelContainer, HStack} from '../styles';
import AnimatedNumber from "./AnimatedNumber";


const ControlPanel = () =>
    (<ControlPanelContainer>
        <CardContent>
            <QuotesInput/>
            <HStack justifyContent="space-between">
                <StartButton
                    onClick={() => webSocket.socket ? webSocket.disconnect() : webSocket.connect()}
                    variant="contained"
                    color={webSocket.socket ? 'warning' : 'primary'}
                >
                    {webSocket.socket ? 'Стоп' : 'Старт'}
                </StartButton>
                <StatButton
                    variant="outlined"
                    onClick={() => quotesStore.handleCalculate()}
                >
                    Статистика
                </StatButton>
            </HStack>
        </CardContent>
    </ControlPanelContainer>);

export default ControlPanel;