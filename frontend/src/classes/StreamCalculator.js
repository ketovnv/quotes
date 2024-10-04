import {Results} from "./Results";

export class StreamCalculator{
    static frequencyMap ={}
    static results = new Results()

    static calculate(quote) {
        // частотa котировки для моды
        this.frequencyMap[quote] = (this.frequencyMap[quote] || 0) + 1;

        // если новая котировка встречается чаще
        if (!this.results.modeValue || this.frequencyMap[quote] > this.frequencyMap[this.results.modeValue]) {
            this.results.modeValue = quote;
        }

        // минимум
        if (quote < this.results.minValue) {
            this.results.minValue = quote;
        }

        // максимум
        if (quote > this.results.maxValue) {
            this.results.maxValue = quote;
        }

        this.meanValue += (quote - this.meanValue) / this.totalQuotes;

        return results
    }
}