import {CardContent, Typography} from "@mui/material";
import React from "react";
import quotesStore from "../stores/quotes";
import {Panel} from '../styles';



const ControlPanel = () =>
    (<Panel>
        <CardContent>
            <Typography sx={{marginTop: 2}} color={quotesStore.statusMessage[1]} w='100%'
                        textAlign="center"
                        fontSize={quotesStore.statusMessage[0].length > 32 ? 14 : 18}
                        dangerouslySetInnerHTML={{__html: quotesStore.statusMessage[0]}}
            />
        </CardContent>
    </Panel>);

export default ControlPanel;