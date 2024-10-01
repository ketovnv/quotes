import styled from 'styled-components';
import {Box, Button, Card} from "@mui/material";
import '@fontsource-variable/fira-code';

export const AppContainer = styled(Box)(() => ({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
    backgroundColor: '#111',
    backgroundImage: 'radial-gradient(circle at 50% 50%, hsla(210, 100%, 75%, 0.5), hsl(220, 30%, 5%))',
    backgroundRepeat: 'no-repeat',
}));


export const StyledButton = styled(Button)(() => ({
    backgroundColor: '#333333',
    color: '#90caf9',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    '&:hover': {
        backgroundColor: '#64b5f6',
        color: 'white',
    },
}));

export const StartButton = styled(Button)(() => ({
    backgroundColor: '#90caf9',
    color: 'white',
    '&:hover': {
        backgroundColor: '#64b5f6',
    },
}));

export const StatButton = styled(Button)(() => ({
    backgroundColor: '#333333',
    color: '#90caf9',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    '&:hover': {
        backgroundColor: '#64b5f6',
        color: 'white',
    },
}));

export const Panel = styled(Card)(() => ({
    width: '385px',
    minHeight: '115px',
    marginTop: 3,
    boxShadow: '0 3px 6px rgba(255,255,255,0.1)',
    backgroundColor: '#424242',
    transition: 'all 0.3s ease',
}));

export const HStack = styled(Box)(({...props}) => ({
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 16,
}))
//
export const VStack = styled(Box)(({...props}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: props.justifyContent || 'flex-start',
    alignItems: props.alignItems || 'center',
    width: props.width || '100%',
    height: props.height || 'auto',
    ...props
}));

