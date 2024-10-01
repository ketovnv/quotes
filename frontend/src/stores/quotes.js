import {makeAutoObservable, action, toJS} from "mobx";
import {calculateAverage} from "../classes/calculations";
import {BatchCalculator} from "../classes/BatchCalculator";

class QuotesStore { //!!!  НЕ Забыть о том что нужно чистить память !!!


    partSize = 100  // количество накопившихся котировок,
                    // при котором производится перерасчёт,
                    // если пользователь выбрал меньшее количество
                    // вычисления производятся только при накоплении
                    // выбранного им количества

    selectedNumber = 1 // выбранное пользователем количество котировок,
    // при котором производятся вычисления

    quotes = []; // массив для хранения котировок
    statusMessage = ['', 'success'] // текст и цвет сообщения


    //результаты последних вычислений
    results = {
        quotesNumber: 0,    // количество котировок,
                            // при котором производились
                            // вычисления
        average: 0, // креднее значение
        standardDeviation: 0, // стандартное отклонение
        modeValue: 0, // мода
        minValue: 0, // минимальное значение
        maxValue: 0, // максимальное значение
        lostQuotes: 0, // количество потерянных котировок
        calculationStartTime: new Date(), // время начала расчёта
        calculationTime: 0, // время расчёта в миллисекундах
    };

    resultsStream = {
        quotesNumber: 0,
        average: 0,
        standardDeviation: 0,
        modeValue: 0,
        minValue: 0,
        maxValue: 0,
        lostQuotes: 0,
        calculationStartTime: new Date(),
        calculationTime: 0,
    };

    resultsForUser = {
        quotesNumber: 0,
        average: 0,
        standardDeviation: 0,
        modeValue: 0,
        minValue: 0,
        maxValue: 0,
        lostQuotes: 0,
        calculationStartTime: new Date(),
        calculationTime: 0,
    };



    constructor() {
        makeAutoObservable(this, {
            setSelectedNumber: action,
            setStatusMessage: action,
            updateResultProperty: action
        });
    }


    setSelectedNumber(selectedNumber) {
        this.selectedNumber = selectedNumber
    }


    setStatusMessage(text, color) {
        this.statusMessage = [text, color];
    }


    async addQuote(quote) {

         BatchCalculator:scanQuote(quote)

        this.results.calculationStartTime = new Date()

        if (quote && quote.id && quote.value) {

            // накопившиеся после последнего вычисления котировки
            // console.warn('sum',this.results.quotesNumber)
            const accumulatedQuotesNumber = this.quotes.push(quote.value);
            // общее количество котировок
            const quotesNumber = accumulatedQuotesNumber + this.results.quotesNumber;
            console.warn(quotesNumber)

            // this.updateResultProperties(this.results, {
            //     quotesNumber
            // })

            // console.table(toJS(this.results))

            if (quotesNumber % this.selectedNumber === 0 ||
                (this.selectedNumber > this.partSize && accumulatedQuotesNumber > this.partSize - 1)) {

                // console.log(
                //     `Общее число котировок ${totalQuotesNumber} кратно выбранному числу ${this.selectedNumber}
                //      или число накопившихся  котировок ${totalQuotesNumber} больше  ${this.partSize}`
                // )

                await this.calculateResults(quotesNumber)

                // console.log('Очищаю память, массив котировок до очистки:', this.quotes);
                // вычищаем котировки, по которым уже произведены вычисления,
                this.quotes = []  // чтобы не засорять память

            } else {
                console.log(`Вычисления не нужны, общее количество котировок  ${this.quotes.length + this.results.quotesNumber}`)
            }

        } else {
            // невалидная (потеряная) котировка увеличивает счётчик потерянных котировок
            this.setStatusMessage(`Потеряна котировка. Всего потеряно: ${this.results.lostQuotes++}`, "warning");
            console.log('Потеряна котировка');
        }
    }


    async calculateResults(quotesNumber) {


        // console.log('Массив перед попытками преобразования:', this.quotes);
        // const aQ= toJS(this.quotes)
        // console.log('Массив после попытки преобразовать toJS(this.quotes):');
        // console.log(aQ);
        // const aQ2= toJS([...this.quotes])
        // console.log('Массив после попытки преобразовать  toJS([...this.quotes]):');
        // console.log(aQ2);
        // вычисление среднего арифметического
        // const average = await calculateAverage(
        //     this.results.quotesNumber,
        //     quotesNumber,
        //     this.results.average,
        //     toJS(this.quotes)
        // )

        // console.table({'average':average,'quotesNumber':quotesNumber})
        console.table({ average, quotesNumber });

        // console.log('average',average)
        // console.log('quotesNumber',quotesNumber)
        console.error(quotesNumber)
        this.updateResultProperties(this.results, {
            average,
            quotesNumber
        })
        console.warn('sum',this.results.quotesNumber)

        // вычисление среднего арифметического
        // await calculateAverage()
        // // вычисление среднего арифметического
        // await calculateAverage()
        // // вычисление среднего арифметического
        // await calculateAverage()
        // // вычисление среднего арифметического
        // await calculateAverage()

    }


}


const quotesStore = new QuotesStore();
export default quotesStore;