import React, {useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {observer} from 'mobx-react-lite';
import quotesStore from '../stores/quotes';
import {HStack} from '../styles';

const QuotesInput = observer(() => {

    return (
        <HStack mb={2}>
            <Button onClick={() => quotesStore.setNumQuotes(quotesStore.numQuotes > 1 ? quotesStore.numQuotes - 1 : 0)}
                    sx={{marginRight: 1}}>
                <RemoveIcon/>
            </Button>
            <TextField
                InputLabelProps={{
                    style: {fontSize: '14px'},
                }}
                inputProps={{
                    style: {fontSize: '30px'},
                }}
                type="number"
                label="Количество котировок"
                variant="outlined"
                value={quotesStore.numQuotes}
                onChange={(e) => quotesStore.setNumQuotes(parseInt(e.target.value, 10))}
            />
            <Button onClick={() => quotesStore.setNumQuotes(quotesStore.numQuotes + 1)} sx={{marginLeft: 1}}
                    padding={1}>
                <AddIcon/>
            </Button>
        </HStack>
    );
})

export default QuotesInput;