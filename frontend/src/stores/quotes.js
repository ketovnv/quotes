import {makeAutoObservable} from "mobx";

class QuotesStore {
    quotes = []; // Массив для хранения котировок
    totalQuotes = 0; // Общее количество котировок
    lostQuotes = 0; // Количество потерянных котировок
    meanValue = 0; // Среднее арифметическое

    constructor() {
        makeAutoObservable(this);
    }

    // Остальные свойства и методы...

    // Метод для проверки числа и обработки разных ситуаций
    handleUserInput(selectedNumber) {
        switch (true) {
            // Если число кратно 100, выполняем расчёты для всех котировок из текущего блока
            case selectedNumber % 100 === 0:
                this.processCurrentBlock();
                console.log(`Число ${selectedNumber} кратно 100, обрабатываем текущий блок.`);
                break;

            // Если число больше 100, но не кратно, выполняем специфическую обработку
            case selectedNumber > 100:
                this.processOver100(selectedNumber);
                console.log(`Число ${selectedNumber} больше 100, выполняем специальную обработку.`);
                break;

            // Если число меньше 100, обрабатываем оставшиеся котировки
            case selectedNumber < 100:
                this.processUnder100(selectedNumber);
                console.log(`Число ${selectedNumber} меньше 100, обрабатываем оставшиеся котировки.`);
                break;

            // Дополнительные случаи
            default:
                console.log("Нет подходящего случая для обработки.");
        }
    }

    // Метод для обработки текущего блока (когда кратно 100)
    processCurrentBlock() {
        // Логика обработки блока данных
    }

    // Метод для обработки случаев, когда число больше 100
    processOver100(selectedNumber) {
        // Специфическая логика для чисел больше 100
    }

    // Метод для обработки случаев, когда число меньше 100
    processUnder100(selectedNumber) {
        // Специфическая логика для чисел меньше 100
    }






    // Метод для очистки всех данных
    clearData() {
        this.quotes = [];
        this.totalQuotes = 0;
        this.lostQuotes = 0;
        this.meanValue = 0;
    }

}

const quotesStore = new QuotesStore();
export default quotesStore;