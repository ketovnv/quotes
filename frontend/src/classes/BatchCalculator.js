
export class BatchCalculator {
    static frequencyMap = {}

    static modeForPackage(results) {
        results.quotes.forEach(quote => {
            // частота для каждой котировки в пакете
            this.frequencyMap[quote] ?
                this.frequencyMap[quote]++ :
                this.frequencyMap[quote] = 1;
            // обновление моды, если новая котировка встречается чаще
            if (results.modeValue ||
                (this.frequencyMap[quote] >
                    this.frequencyMap[results.modeValue])
            )
                results.modeValue = quote;
        });

        return this.syncResults()
    }

    static calculate(quote) {

        if(quotesStore.isSelectedShowPath) {
            this.results = quotesStore.batchVisibleResults
        }

        this.results.quotes.push(quote)


        this.modeForPackage(results)

            .updateField(
                'calculationTime',
                new Date.now - this.calculationStartTime
            )


    }
}

///////////////////////////////////////////////////////////////////
// будет запускаться в BaseCalculator поэтому
const staticSync = BaseCalculator.syncResults
//подготовка метода для запуска таймера
const timeSync = staticSync.bind(
    this,
    null, null,
    'calculationStartTime', new Date()
)
// запуск вычислений,
// в данном случае невидимых для пользователя (false)
const resultsAfterCalculation =
    BatchCalculator.calculate(timeSync(true ?
        quotesStore.batchVisibleResults :
        BatchCalculator.batchResults)
    )

// const calculatingResults= results ?? this.results;
//
// const calculateAverage = async (lastCalculationQuotesNumber, totalQuotesNumber, lastResult, accumulatedQuotes) => {
//     console.log(lastCalculationQuotesNumber, totalQuotesNumber, lastResult, accumulatedQuotes)
//     const accumulatedQuotesAmount = accumulatedQuotes.reduce((acc, val) => acc + val, 0);
//
//     if (lastCalculationQuotesNumber < 1) {
//         return accumulatedQuotesAmount / totalQuotesNumber;
//     }
//
//     return (lastResult * lastCalculationQuotesNumber + accumulatedQuotesAmount) / totalQuotesNumber;
// };
// }


