export const calculateAverage = (values) => {
    return new Promise((resolve) => {
        const average = values.reduce((acc, val) => acc + val, 0) / values.length;
        setTimeout(() => resolve({type: 'average', value: average}), 5000);
    });
};

export const calculateMin = (values) => {
    return new Promise((resolve) => {
        const min = Math.min(...values);
        setTimeout(() => resolve({type: 'min', value: min}), 3000);
    });
};

export const calculateMax = (values) => {
    return new Promise((resolve) => {
        const max = Math.max(...values);
        setTimeout(() => resolve({type: 'max', value: max}), 7000);
    });
};

export const calculateStandardDeviation = (values, average) => {
    return new Promise((resolve) => {
        const variance = values.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) / values.length;
        const standardDeviation = Math.sqrt(variance);
        setTimeout(() => resolve({type: 'stdDev', value: standardDeviation}), 2000);
    });
};