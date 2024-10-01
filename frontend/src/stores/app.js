import {useEffect, useState} from "react";
import {makeAutoObservable,action} from "mobx";

class AppStore {

    constructor() {
        makeAutoObservable(this);
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
