import {CardContent, Typography} from "@mui/material";
import React from "react";
import quotesStore from "../stores/quotes";
import {ControlPanelContainer} from '../styles';
import AnimatedNumber from "./AnimatedNumber";


const ControlPanel = () =>
    (<ControlPanelContainer>
        <CardContent>
            <Typography sx={{marginTop: 2}} color={quotesStore.statusMessage.color} w='100%'
                        textAlign="center"
                        fontSize={quotesStore.statusMessage.text.length > 32 ? 14 : 18}
                        dangerouslySetInnerHTML={{__html: quotesStore.statusMessage.text}}
            />
        </CardContent>
    </ControlPanelContainer>);

export default ControlPanel;