import {Box, Card, CardContent, SvgIcon} from "@mui/material";
import React from "react";
import QuotesInput from "./QuotesInput";
import webSocket from "../stores/webSocket";
import quotesStore from "../stores/quotes";
import {StartButton, StatButton, Panel, HStack, VStack} from '../styles';
import app from "../App";
import {observer} from "mobx-react-lite";
import Divider from '@mui/material/Divider';
import appStore from "../stores/app";
import ControlPanel from "./ControlPanel";
import StatusPanel from "./StatusPanel";
import CalculationPanel from "./CalculationPanel";


const CalculatorBoard = observer(() => {
    return (<Box className='board' sx={{width:.49}}>
        <ControlPanel/>
        <VStack width='.48'>
            <StatusPanel/>
            <CalculationPanel/>
        </VStack>
    </Box>)
})

export default CalculatorBoard;