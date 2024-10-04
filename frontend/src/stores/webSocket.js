import {makeAutoObservable} from 'mobx';
import appStore from "./app";
import quotesStore from "./quotes";


class WebSocketStore {
    url = 'ws://localhost:8082'
    // url='wss://trade.termplat.com:8800/?password=1234'
    socket = null;
    isConnected = false;

    constructor() {
        makeAutoObservable(this);
        // Уникальный идентификатор клиента
        this.clientId = localStorage.getItem('clientId') || this.generateClientId();
        localStorage.setItem('clientId', this.clientId);
    }

    generateClientId() {
        return `client_${Math.floor(Math.random() * 1e9).toString()}`
    }

    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            this.isConnected = true;
            appStore.setStatusMessage(["Подключение установлено", "primary"]);
            this.sendMessage({type: 'register', clientId: this.clientId});
        };

        this.socket.onmessage = async (event) => {
            try {
                const quote = JSON.parse(event.data);
                quotesStore.newQuote(quote)
            } catch (error) {
                appStore.setStatusMessage(["Соединение потеряно. Попытка переподключения ...", "warning"]);
                setTimeout(() => {
                    this.connect(this.url);
                }, 5000);
                console.error("WebSocket error:", error);
            }
        };

        this.socket.onclose = () => {
            appStore.setStatusMessage(["Готов к работе", "white"]);
            console.log('WebSocket connection closed');
        };
    }

    scanQuote(message) {
        if (this.socket && this.isConnected) {
            this.socket.send(JSON.stringify(message));
        }
    }


    sendMessage(message) {
        if (this.socket && this.isConnected) {
            this.socket.send(JSON.stringify(message));
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

const webSocketStore = new WebSocketStore();
export default webSocketStore;