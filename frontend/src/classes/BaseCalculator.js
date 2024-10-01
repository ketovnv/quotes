import {Results} from "./Results";

export class BaseCalculator {

    static batchResults = new Results()
    static chunkResults = new Results()
    static streamResults = new Results()

    static createVisibleResults() {
        return new Results();
    }

    scanQuote(quote) {

    }


    async calculate(quote, results = this.results) {

        throw new Error("Method 'calculate()' must be implemented.");
    }

    syncResults(toResult, fromResult, fields = null, field = null) {
        // если поля передано, синхронизируeтся только оно
        if (field)
            toResult.updateField(field, fromResult[field])
        if (fields) {
            // если поля переданы, синхронизируются только они
            fields.forEach(field => {
                toResult.updateField(field, fromResult[field])
            });
        } else {
            // поля не переданы - сливается всё данные
            toResult.updateFields(fromResult);
        }
    }

}