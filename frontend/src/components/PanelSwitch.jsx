import React, {useState} from 'react';
import {Box, Button, FormControlLabel, Switch, TextField} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {observer} from 'mobx-react-lite';
import quotesStore from '../stores/quotes';
import {HStack} from '../styles';

const PanelSwitch = (showPanel,togglePanel) => {
    return (
            <FormControlLabel
                control={
                    <Switch
                        checked={showPanel}
                        onChange={togglePanel}
                        color="primary"
                        value="dynamic-class-name"
                    />
                }
                label="Success"
            />
    );
}

export default PanelSwitch;