export const calculateAverage = async (lastCalculationQuotesNumber, totalQuotesNumber, lastResult, accumulatedQuotes) => {
    console.log(lastCalculationQuotesNumber, totalQuotesNumber, lastResult, accumulatedQuotes)
    const accumulatedQuotesAmount = accumulatedQuotes.reduce((acc, val) => acc + val, 0);

    if (lastCalculationQuotesNumber < 1) {
        return accumulatedQuotesAmount / totalQuotesNumber;
    }

    return (lastResult * lastCalculationQuotesNumber + accumulatedQuotesAmount) / totalQuotesNumber;
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

