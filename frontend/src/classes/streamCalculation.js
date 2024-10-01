export const calculateAverageStream = async (totalQuotesNumber, average, quoteValue) => {
    average += (quoteValue - average) / totalQuotesNumber
    return average

};




export const calculateMode = async (lastResultQuotesNumber, currentQuotesNumber, lastResult, newQuotes) => {
    // Собираем все котировки: старые (если были) и новые
    const allQuotes = lastResultQuotesNumber > 0 ? newQuotes.concat(lastResult) : newQuotes;

    // Создаем объект для подсчета частоты значений
    const frequency = {};

    // Подсчитываем частоту каждого значения
    allQuotes.forEach((quote) => {
        frequency[quote] = (frequency[quote] || 0) + 1;
    });

    // Определяем моду (значение с максимальной частотой)
    let mode = newQuotes[0];
    let maxCount = frequency[mode];

    for (let quote in frequency) {
        if (frequency[quote] > maxCount) {
            mode = quote;
            maxCount = frequency[quote];
        }
    }

    // Возвращаем модальное значение
    return parseInt(mode, 10); // Так как котировки целые, приводим к числу
};





//
// addQuote(quote) {
//     // Обновление среднего
//     this.meanValue += (quote - this.meanValue) / this.totalQuotes;
//
//     // Обновление стандартного отклонения (алгоритм Вельфорда)
//     const delta = quote - this.meanValue;
//     this.M2 += delta * (quote - this.meanValue);
//
//     // Обновление моды
//     this.updateMode(quote);
//
//     // Обновление минимума и максимума
//     this.minValue = Math.min(this.minValue, quote);
//     this.maxValue = Math.max(this.maxValue, quote);
//
//     // Увеличиваем счётчик
//     this.totalQuotes++;
// }
//
// addQuote(quote) {
//     // Обновление среднего
//     this.meanValue += (quote - this.meanValue) / this.totalQuotes;
//
//     // Обновление стандартного отклонения (алгоритм Вельфорда)
//     const delta = quote - this.meanValue;
//     this.M2 += delta * (quote - this.meanValue);
//
//     // Обновление моды
//     this.updateMode(quote);
//
//     // Обновление минимума и максимума
//     this.minValue = Math.min(this.minValue, quote);
//     this.maxValue = Math.max(this.maxValue, quote);
//
//     // Увеличиваем счётчик
//     this.totalQuotes++;
// }
//
// addQuote(quote) {
//     this.quotes.push(quote);
//
//     // Обновляем частоту котировки для моды
//     if (this.frequencyMap[quote]) {
//         this.frequencyMap[quote]++;
//     } else {
//         this.frequencyMap[quote] = 1;
//     }
//
//     // Обновляем моду, если новая котировка встречается чаще
//     if (!this.results.modeValue || this.frequencyMap[quote] > this.frequencyMap[this.results.modeValue]) {
//         this.results.modeValue = quote;
//     }
//
//     // Обновляем минимум
//     if (quote < this.results.minValue) {
//         this.results.minValue = quote;
//     }
//
//     // Обновляем максимум
//     if (quote > this.results.maxValue) {
//         this.results.maxValue = quote;
//     }
//
//     // Теперь модуль расчётов вызывается по необходимости
//     if (this.quotes.length % this.selectedNumber === 0) {
//         this.calculateResults();
//     }
// }
//
// // Метод для вычисления всех показателей
// calculateResults() {
//     const accumulatedQuotesNumber = this.quotes.length;
//     // Пример: расчет среднего арифметического
//     this.results.average = calculateAverage(this.quotes);
//
//     console.log('Результаты обновлены:', this.results);
// }
// }
//
// calculateStandardDeviation() {
//     const mean = this.results.average; // Среднее уже вычислено
//     const n = this.quotes.length; // Количество котировок
//
//     if (n === 0) return 0; // Обработка случая, если нет данных
//
//     // Суммируем квадраты отклонений от среднего
//     const variance = this.quotes.reduce((acc, quote) => {
//         return acc + Math.pow(quote - mean, 2);
//     }, 0) / n;
//
//     // Возвращаем квадратный корень из дисперсии (variance) для получения стандартного отклонения
//     return Math.sqrt(variance);
// }
//
//
// class QuotesStore {
//     constructor() {
//         // Инициализация переменных
//     }
//
//     addQuote(quote) {
//         // Обновление среднего
//         this.meanValue += (quote - this.meanValue) / this.totalQuotes;
//
//         // Обновление стандартного отклонения (алгоритм Вельфорда)
//         const delta = quote - this.meanValue;
//         this.M2 += delta * (quote - this.meanValue);
//
//         // Обновление моды
//         this.updateMode(quote);
//
//         // Обновление минимума и максимума
//         this.minValue = Math.min(this.minValue, quote);
//         this.maxValue = Math.max(this.maxValue, quote);
//
//         // Увеличиваем счётчик
//         this.totalQuotes++;
//     }
//
//     getStandardDeviation() {
//         return Math.sqrt(this.M2 / this.totalQuotes);
//     }
//
//     updateMode(quote) {
//         // Логика обновления моды
//     }
// }
//
// async function processQuotes(quotes) {
//     const chunkSize = Math.ceil(quotes.length / 3); // Разделяем массив на 3 части
//
//     const tasks = [
//         calculateChunk(quotes.slice(0, chunkSize)),
//         calculateChunk(quotes.slice(chunkSize, chunkSize * 2)),
//         calculateChunk(quotes.slice(chunkSize * 2))
//     ];
//
//     const [result1, result2, result3] = await Promise.all(tasks);
//
//     // Мержим результаты
//     const mergedResult = mergeResults([result1, result2, result3]);
//     return mergedResult;
// }
//
// // Пример расчётов для каждой части массива
// async function calculateChunk(chunk) {
//     let minValue = Number.MAX_VALUE;
//     let maxValue = Number.MIN_VALUE;
//     let total = 0;
//     let count = 0;
//     let lostQuotes = 0;
//
//     for (const quote of chunk) {
//         if (quote === null) {
//             lostQuotes++;
//             continue;
//         }
//         minValue = Math.min(minValue, quote);
//         maxValue = Math.max(maxValue, quote);
//         total += quote;
//         count++;
//     }
//
//     return {
//         minValue,
//         maxValue,
//         average: total / count,
//         lostQuotes
//     };
// }
//
// // Мерджинг результатов
// function mergeResults(results) {
//     let minValue = Number.MAX_VALUE;
//     let maxValue = Number.MIN_VALUE;
//     let total = 0;
//     let count = 0;
//     let lostQuotes = 0;
//
//     for (const result of results) {
//         minValue = Math.min(minValue, result.minValue);
//         maxValue = Math.max(maxValue, result.maxValue);
//         total += result.average * (result.count || 1); // Умножаем на количество элементов
//         count += result.count;
//         lostQuotes += result.lostQuotes;
//     }
//
//     return {
//         minValue,
//         maxValue,
//         average: total / count,
//         lostQuotes
//     };
// }
//
// class AdaptiveManager {
//     constructor() {
//         this.currentChunkSize = 100; // Начальный размер пакета
//         this.lastCalculationTime = 0;
//         this.checkInterval = 300000; // 5 минут для проверки адаптации
//     }
//
//     // Метод для проверки и обновления размера пакета
//     adaptChunkSize(timeTakenForLastCalculation) {
//         this.lastCalculationTime = timeTakenForLastCalculation;
//
//         if (timeTakenForLastCalculation < 500) {
//             // Если расчёты заняли меньше 500мс, увеличиваем размер пакета
//             this.currentChunkSize = Math.min(this.currentChunkSize * 1.5, 10000);
//         } else if (timeTakenForLastCalculation > 800) {
//             // Если больше 800мс, уменьшаем размер пакета
//             this.currentChunkSize = Math.max(this.currentChunkSize / 1.5, 100);
//         }
//
//         console.log(`Новый размер пакета: ${this.currentChunkSize}`);
//     }
// }