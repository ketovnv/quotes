import {Results} from "./Results";


function mergeResults(results) {
    let minValue = Number.MAX_VALUE;
    let maxValue = Number.MIN_VALUE;
    let total = 0;
    let count = 0;
    let lostQuotes = 0;
    let M2 = 0; // для стандартного отклонения
    let frequencyMap = {}; // для моды
    let modeValue = null;

    for (const result of results) {
        // Обновляем мин/макс значения
        minValue = Math.min(minValue, result.minValue);
        maxValue = Math.max(maxValue, result.maxValue);

        total += result.average * result.count;
        count += result.count;
        lostQuotes += result.lostQuotes;

        // Обновляем стандартное отклонение
        const delta = result.average - (total / count);
        M2 += delta * (result.average - (total / count)) * result.count;

        // Обновляем частоту для моды
        for (const [quote, frequency] of Object.entries(result.frequencyMap)) {
            frequencyMap[quote] = (frequencyMap[quote] || 0) + frequency;
        }

        // Обновляем моду
        for (const [quote, frequency] of Object.entries(frequencyMap)) {
            if (!modeValue || frequencyMap[quote] > frequencyMap[modeValue]) {
                modeValue = quote;
            }
        }
    }

    return {
        minValue,
        maxValue,
        average: total / count,
        standardDeviation: Math.sqrt(M2 / count),
        modeValue,
        lostQuotes
    };
}

function calculateChunk(chunk) {
    let minValue = Number.MAX_VALUE;
    let maxValue = Number.MIN_VALUE;
    let total = 0;
    let count = 0;
    let lostQuotes = 0;
    let M2 = 0; // для стандартного отклонения
    let frequencyMap = {}; // для моды
    let modeValue = null;

    for (const quote of chunk) {
        if (quote === null) {
            lostQuotes++;
            continue;
        }

        // Обновляем мин/макс значения
        minValue = Math.min(minValue, quote);
        maxValue = Math.max(maxValue, quote);
        total += quote;
        count++;

        // Обновляем стандартное отклонение (алгоритм Вельфорда)
        const delta = quote - (total / count);
        M2 += delta * (quote - (total / count));

        // Обновляем частоту для моды
        if (frequencyMap[quote]) {
            frequencyMap[quote]++;
        } else {
            frequencyMap[quote] = 1;
        }

        //  мод
        if (!modeValue || frequencyMap[quote] > frequencyMap[modeValue]) {
            modeValue = quote;
        }
    }
}



export class ChunkCalculator extends BaseCalculator {
    static results = new Results()
    static calculate() {



        return this.results
    }}