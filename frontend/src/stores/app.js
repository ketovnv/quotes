import {useEffect, useState} from "react";
import {makeAutoObservable, action} from "mobx";
import {createTheme} from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";
import * as React from "react";

class AppStore {
    theme = createTheme({
        palette: {
            mode: 'dark'
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: () => ({
                    body: darkScrollbar(),
                }),
            },
        },

    });


    canvasSettngModal = false
    fabMenu = false
    overlay = false


    statusMessage = ['Готов кработе', 'success'] // текст и цвет сообщения

    screenWidth = window.innerWidth

    settings = {
        background: 'https://www.toptal.com/designers/subtlepatterns/uploads/stripes-light.png',
        animationSpeed: 1,
        particleCount: 100
    }

    constructor() {
        makeAutoObservable(this,
            {
                toggleFabMenu: action,
                toggleModalCanvas: action,
                toggleOverlay: action,
            });
    }

    setStatusMessage(text, color) {
        this.statusMessage = [text, color];
    }


    toggleModalCanvas = () => {
        this.canvasSettngModal = !this.canvasSettngModal;
    };

    toggleFabMenu = () => {
        this.fabMenu = !this.fabMenu;
    };

    toggleOverlay = () => {
        this.overlay = !this.overlay
    };

    saveUserSettings(settings) {
        this.settings = settings;
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }


    loadUserSettings() {
        const settings = localStorage.getItem('userSettings');
        return settings ? JSON.parse(settings) : this.settings;
    }


    setScreenWidth(width) {
        this.screenWidth = !this.screenWidth
    };

    useScreenWidth() {
        useEffect(() => {
            const handleResize = () => this.setScreenWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
    };


    getTranslation =(key)=> this.translations[key]

    translations = {
        partSize: 'кількість накопичених котирувань',
        quotesNumber: 'кількість котирувань, при якому проводилися розрахунки',
        average: 'середнє значення',
        standardDeviation: 'стандартне відхилення',
        modeValue: 'мода',
        minValue: 'мінімальне значення',
        maxValue: 'максимальне значення',
        lostQuotes: 'кількість втрачених котирувань',
        calculationStartTime: 'час початку розрахунку',
        calculationTime: 'час розрахунку у мілісекундах',
    };





}

const appStore = new AppStore();
export default appStore;
