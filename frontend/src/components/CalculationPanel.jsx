import {Box, CardContent, Typography} from "@mui/material";
import React from "react";
import quotesStore from "../stores/quotes";
import {ControlPanelContainer, HStack} from '../styles';
import AnimatedNumber from "./AnimatedNumber";


const ControlPanel = () =>
    (<ControlPanelContainer>
            <CardContent>
                <HStack>
                    <Typography fontSize={14} sx={{position:"relative",top:3}}>Время выполнения:&nbsp;</Typography>
                    <AnimatedNumber
                        endValue={quotesStore.calculateStartTime ? (Date.now()-quotesStore.calculateStartTime)/1000 : 0}
                        startFromPrevious={true} />
                    <Typography fontSize={14} sx={{position:"relative",top:3}}>&nbsp;сек</Typography>
                </HStack>
                {quotesStore.statistics &&
                    Array.isArray(quotesStore.statistics) && quotesStore.statistics.map((stat, index) => (
                        <Box display="flex" flexDirection="column">
                            <Typography>
                                {stat.type}:
                            </Typography>
                            <AnimatedNumber endValue={stat.value}/>
                        </Box>
                    ))
                }
            </CardContent>
        </ControlPanelContainer>);

export default ControlPanel;