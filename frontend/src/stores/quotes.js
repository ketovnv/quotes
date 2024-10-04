import {makeAutoObservable, action} from "mobx";

class QuotesStore {

    partSize = 1000  // количество накопившихся котировок,
                    // при котором производится перерасчёт,
                    // если пользователь выбрал меньшее количество
                    // вычисления производятся только при накоплении
                    // выбранного им количества
    lostQuotes = 0;


    selectedNumber = 1  // выбранное пользователем количество котировок,
                        // при котором производятся вычисления


    constructor() {
        makeAutoObservable(this,
            {setSelectedNumber: action}
        );
    }


    newQuote(quote) {
        if (quote && quote.id && quote.value) {
            BatchCalculator.calculate(quote.value)
            ChunkCalculator.calculate(quote.value)
            StreamCalculator.calculate(quote.value)
        } else {
            this.lostQuotes++
            console.log('Потеряна котировка');
        }
    }

    setSelectedNumber(number) {
        this.selectedNumber = number
    }

}

const quotesStore = new QuotesStore();
export default quotesStore;