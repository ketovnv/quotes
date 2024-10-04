import {Card, CardContent, Typography} from "@mui/material";
import React from "react";
import quotesStore from "../stores/quotes";
import {Panel} from '../styles';
import appStore from "../stores/app";

const ControlPanel = () =>
    (<Card className='panel'>
        <CardContent>
            <Typography sx={{marginTop: 2}} color={appStore.statusMessage[1]} w='100%'
                        textAlign="center"
                        fontSize={appStore.statusMessage[0].length > 32 ? 14 : 18}
                        dangerouslySetInnerHTML={{__html: appStore.statusMessage[0]}}
            />
        </CardContent>
    </Card>);

export default ControlPanel;