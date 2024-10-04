import {Box, Button, Card, CardContent, FormControlLabel, Switch, Typography} from "@mui/material";
import React from "react";
import quotesStore from "../stores/quotes";
import {HStack, Panel} from '../styles';
import AnimatedNumber from "./AnimatedNumber";
import {observer} from "mobx-react-lite";
import appStore from "../stores/app";


const CalculationPanel = observer(() => {
    return (
        <Card className='metallPanel'>
            <CardContent>
                <HStack>
                    <Typography fontSize={14} sx={{position: "relative", top: 3}}>Время выполнения:&nbsp;</Typography>
                    <AnimatedNumber
                        endValue={quotesStore.calculateStartTime ? (Date.now() - quotesStore.calculateStartTime) / 1000 : 0}
                        startFromPrevious={true}/>
                    <Typography fontSize={14} sx={{position: "relative", top: 3}}>&nbsp;сек</Typography>
                </HStack>

                {quotesStore["VisibleResults"] &&
                    < Box display="flex" flexDirection="column">
                        <Typography>
                            {stat.type}:
                        </Typography>
                        <AnimatedNumber endValue={stat.value}/>
                    </Box>}
                    ))
                }
            </CardContent>
        </Card>)
})

export default CalculationPanel;