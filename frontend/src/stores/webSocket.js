import {makeAutoObservable} from 'mobx';
import quotesStore from "./quotes";


class WebSocketStore {
    url='ws://localhost:8082'
    socket = null;
    messages = [];
    isConnected = false;

    constructor() {
        makeAutoObservable(this);
        // Уникальный идентификатор клиента
        this.clientId = localStorage.getItem('clientId') || this.generateClientId();
        localStorage.setItem('clientId', this.clientId);
    }

    generateClientId() {
        return `client_${Math.random().toString(36).substr(2, 9)}`;
    }

    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            this.isConnected = true;
            quotesStore.setStatusMessage({text:"Подключение установлено",color:"primary"});
            this.sendMessage({type: 'register', clientId: this.clientId});
        };


        this.socket.onmessage = (event) => {
            try {
                const quote = JSON.parse(event.data);
                quotesStore.addQuote(quote);
                console.log("Получена котировка:", quote);
            } catch (error) {
                console.error("Ошибка при получении котировки:", error);
                quotesStore.setStatusMessage({text:"Ошибка при получении котировки", color:'danger'});
            }
        };

        this.socket.onclose = () => {
            quotesStore.setStatusMessage({text:"Готов к работе",color:'white'});
            console.log('WebSocket connection closed');
        };

        this.socket.onerror = (error) => {
            // Попытка переподключения через 5 секунд
            quotesStore.setStatusMessage({text:"Соединение потеряно. Попытка переподключения...", color:'warning'});
            setTimeout(() => {
                this.connect(this.url);
            }, 5000);
            console.error("WebSocket error:", error);
            this.socket.close()
        };

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