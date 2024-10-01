import {Results} from './Results'
import {BaseCalculator} from "./BaseCalculator";

export class BatchCalculator extends BaseCalculator {

    async calculate(results=null) {

        const calculatingResults= results ?? this.results;

        const calculateAverage = async (lastCalculationQuotesNumber, totalQuotesNumber, lastResult, accumulatedQuotes) => {
            console.log(lastCalculationQuotesNumber, totalQuotesNumber, lastResult, accumulatedQuotes)
            const accumulatedQuotesAmount = accumulatedQuotes.reduce((acc, val) => acc + val, 0);

            if (lastCalculationQuotesNumber < 1) {
                return accumulatedQuotesAmount / totalQuotesNumber;
            }

            return (lastResult * lastCalculationQuotesNumber + accumulatedQuotesAmount) / totalQuotesNumber;
        };
    }

}
