import {useEffect, useState} from "react";
import {makeAutoObservable,action} from "mobx";

class AppStore {

    changeColorTheme = null;

    constructor() {
        makeAutoObservable(this, {
            setToggleModeFunction: action
        });
    }

    setToggleModeFunction(changeTheme){
        this.changeColorTheme = changeTheme
    }

   useScreenWidth () {
        const [screenWidth, setScreenWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize = () => setScreenWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return screenWidth;
    };

}

const appStore = new AppStore();
export default appStore;
