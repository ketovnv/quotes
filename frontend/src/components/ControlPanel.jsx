import {CardContent} from "@mui/material";
import React from "react";
import QuotesInput from "./QuotesInput";
import webSocket from "../stores/webSocket";
import quotesStore from "../stores/quotes";
import {StartButton, StatButton, Panel, HStack} from '../styles';
import app from "../App";
import {observer} from "mobx-react-lite";
import Divider from '@mui/material/Divider';


const ControlPanel = observer(() => {
    return (<Panel>
        <CardContent>
            <QuotesInput/>
            <Divider/>
            <HStack justifyContent="space-between" marginTop={2}>
                <StatButton
                    variant="outlined"
                    onClick={() =>
                        app.changeColorTheme()
                        // quotesStore.handleCalculate()
                    }
                >
                    Статистика
                </StatButton>
                <StartButton
                    onClick={() => webSocket.socket ? webSocket.disconnect() : webSocket.connect()}
                    variant="contained"
                    color={webSocket.socket ? 'warning' : 'primary'}
                >
                    {webSocket.socket ? 'Стоп' : 'Старт'}
                </StartButton>
            </HStack>
        </CardContent>
    </Panel>)
})

export default ControlPanel;