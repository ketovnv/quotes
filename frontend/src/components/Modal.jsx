import React, {useState} from 'react';
import {Box, Button, Modal, TextField} from "@mui/material";

import {observer} from 'mobx-react-lite';

import appStore from "../stores/app";

const ModalWindow = observer(() => {

    // const panel = document.querySelector('.panel');
    // const styleSelect = document.getElementById('styleSelect');
    //
    // function applyPanelStyle(style) {
    //     panel.classList.remove('default-style', 'metallic-style', 'gradient-style', 'textured-style');
    //     panel.classList.add(`${style}-style`);
    //     localStorage.setItem('panelStyle', style);
    // }
    //
    // const savedStyle = localStorage.getItem('panelStyle');
    // if (savedStyle) {
    //     applyPanelStyle(savedStyle);
    //     styleSelect.value = savedStyle;
    // }
    //
    // styleSelect.addEventListener('change', (event) => {
    //     alert(event.target.value)
    //     applyPanelStyle(event.target.value);
    // });

    return (

        <Modal
            open={appStore.canvasSettngModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <h2 id="modal-title">Modal Window</h2>
                <p id="modal-description">Content of the modal.</p>
                <Button onClick={appStore.toggleModalCanvas}>Close</Button>
                <div className="settings-panel">
                    <label htmlFor="styleSelect">Выберите стиль панели:</label>
                    <select id="styleSelect">
                        <option value="default">Стандартный</option>
                        <option value="metallic">Металлический</option>
                        <option value="gradient">Градиент</option>
                        <option value="textured">С текстурой</option>
                    </select>
                </div>
            </Box>
        </Modal>)
})


export default ModalWindow;