import styled from 'styled-components';
import"@fontsource-variable/fraunces"
import {Box, Button, Card} from "@mui/material";


export const AppContainer = styled(Box)(() => ({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
    // backgroundColor: '#111',
    backgroundImage: 'radial-gradient(circle at 50% 50%, hsla(210, 100%, 75%, 0.5), hsl(220, 30%, 5%))',
    // backgroundRepeat: 'no-repeat',
}));

export const StyledAppBar = styled(Box)(() => ({
    alignItems: 'end',
    position: 'fixed',
    boxShadow: 'none',
    paddingRight: '12px',

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


export const HStack = styled(Box)(({...props}) => ({
    justifyContent: props.justifyContent || 'center',
    width: props.width || '100%',
    display: 'flex',
    flexDirection: 'row',
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

