import styled from 'styled-components';
import {Box, Button, Card} from "@mui/material";

export const AppContainer = styled(Box)(({theme}) => ({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
    backgroundColor: theme?.palette?.mode === 'light' ? '#fff' : '#111',
    backgroundImage: theme?.palette?.mode === 'light'
        ? 'radial-gradient(circle at 50% 50%, hsla(210, 100%, 70%, 0.5), hsl(0, 0%, 95%))'
        : 'radial-gradient(circle at 50% 50%, hsla(210, 100%, 75%, 0.5), hsl(220, 30%, 5%))',
    backgroundRepeat: 'no-repeat',
}));

export const StyledAppBar = styled(Box)(({theme}) => ({
    alignItems: 'end',
    position: 'fixed',
    boxShadow: 'none',
    paddingRight: '12px',

}));

export const StyledButton = styled(Button)(({theme}) => ({
    backgroundColor: theme?.palette?.mode === 'light' ? '#ffffff' : '#333333',
    color: theme?.palette?.mode === 'light' ? '#007bff' : '#90caf9',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    '&:hover': {
        backgroundColor: theme?.palette?.mode === 'light' ? '#007bff' : '#64b5f6',
        color: 'white',
    },
}));

export const StartButton = styled(Button)(({theme}) => ({
    backgroundColor: theme?.palette?.mode === 'light' ? '#1976d2' : '#90caf9',
    color: 'white',
    '&:hover': {
        backgroundColor: theme?.palette?.mode === 'light' ? '#115293' : '#64b5f6',
    },
}));

export const StatButton = styled(Button)(({theme}) => ({
    backgroundColor: theme?.palette?.mode === 'light' ? '#ffffff' : '#333333',
    color: theme?.palette?.mode === 'light' ? '#007bff' : '#90caf9',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    '&:hover': {
        backgroundColor: theme?.palette?.mode === 'light' ? '#007bff' : '#64b5f6',
        color: 'white',
    },
}));

export const ControlPanelContainer = styled(Card)(({theme}) => ({
    width: '385px',
    minHeight: '115px',
    marginTop:3,
    boxShadow: theme?.palette?.mode === 'light' ? '0 3px 6px rgba(0,0,0,0.1)' : '0 3px 6px rgba(255,255,255,0.1)',
    backgroundColor: theme?.palette?.mode === 'light' ? '#ffffff' : '#424242',
}));


export const HStack = styled(Box)(({theme, ...props}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: props.justifyContent || 'center',
    alignItems: props.alignItems || 'center',
    width: props.width || '100%',
    ...props
}));

export const VStack = styled(Box)(({theme, ...props}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: props.justifyContent || 'flex-start',
    alignItems: props.alignItems || 'center',
    width: props.width || '100%',
    height: props.height || 'auto',
    ...props
}));
