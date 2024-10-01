import {makeAutoObservable, action} from 'mobx';
import {calculateAverage, calculateMax, calculateMin, calculateStandardDeviation} from "../classes/calculations";

class TestsStore {

    workerCache = [];

    constructor() {
        makeAutoObservable(this, {
            setStatusMessage: action,
            handleCalculate: action,
            runWorker: action
        });
    }

    async current() {

        const exampleFn = (arr) => arr.reduce((sum, val) => sum + val, 0); // простая функция для тестирования
        const data = Array.from({length: 10000}, () => Math.random()); // случайные данные
        const threads = [1, 2, 4]; // массив потоков (1, 2 и 4 потока)
        const iterations = 3; // количество итераций

        this.testAllMethods(exampleFn, data, threads, iterations);
    }


// Основная тестирующая функция
    async testAllMethods(fn, data, threads, iterations) {
        await this.testWithPromises(fn, data, threads, iterations);
        await this.testWithAsyncAwait(fn, data, threads, iterations);
        await this.testWithWorkers(fn, data, threads, iterations);
    }


// Асинхронная функция для тестирования промисов
    async testWithPromises(fn, data, threads, iterations) {
        console.time("Promises");
        const startTime = Date.now()
        for (let iteration = 0; iteration < iterations; iteration++) {
            const promises = [];
            const iterationResult = [];
            const threadsTime = Date.now();
            for (let thread of threads) {
                const chunkSize = Math.ceil(data.length / thread);
                for (let t = 0; t < thread; t++) {
                    const chunk = data.slice(t * chunkSize, (t + 1) * chunkSize);
                    promises.push(new Promise((resolve) => resolve(fn(chunk))));
                }
                const results = await Promise.all(promises);

            }

            // this.logWithTab("Promises", results);
        }
         // startTime = Date.now()
        console.timeEnd("Promises");
    }


    // Асинхронная функция для тестирования async/await
    async testWithAsyncAwait(fn, data, threads, iterations) {
        console.time("AsyncAwait");
        for (let iteration = 0; iteration < iterations; iteration++) {
            const iterationResult = [];
            let result = 0;
            for (let thread of threads) {
                const chunkSize = Math.ceil(data.length / thread);
                for (let t = 0; t < thread; t++) {
                    const chunk = data.slice(t * chunkSize, (t + 1) * chunkSize);
                    result += await fn(chunk);
                }
                iterationResult.push(result);
            }
            this.logWithTab("AsyncAwait", iterationResult, threads.map(t => t + ' потоков'));
        }
        console.timeEnd("AsyncAwait");
    }


    // Асинхронная функция для тестирования воркеров
    async testWithWorkers(fn, data, threads, iterations) {
        console.time("Workers");

        for (let iteration = 0; iteration < iterations; iteration++) {
            const promises = [];

            for (let thread of threads) {
                const chunkSize = Math.ceil(data.length / thread);
                for (let t = 0; t < thread; t++) {
                    const chunk = data.slice(t * chunkSize, (t + 1) * chunkSize);
                    promises.push(new Promise((resolve) => this.runWorker(fn, chunk, resolve)));
                }
            }

            const results = await Promise.all(promises);
            this.logWithTab("Workers", results, threads.map(t => t + ' потоков'));
        }

        console.timeEnd("Workers");
    }

// Функция для запуска воркера с кэшированием
    runWorker(fn, data, resolve) {
        let worker;

        if (this.workerCache.length > 0) {
            worker = this.workerCache.pop();
        } else {
            const workerScript = `
            self.onmessage = function(event) {
                const { fnString, chunk } = event.data;
                const fn = new Function("return " + fnString)();
                const result = fn(chunk);
                self.postMessage(result);
            };
        `;

            const blob = new Blob([workerScript], {type: "application/javascript"});
            worker = new Worker(URL.createObjectURL(blob));
        }

        worker.onmessage = function (event) {
            resolve(event.data);
            this.workerCache.push(worker); // Возвращаем воркер в кэш
        };

        worker.postMessage({fnString: fn.toString(), chunk: data});
    }


    logWithTab(method, result, columns) {
        console.groupCollapsed(method);
        console.table(`Result: ${result}`, columns);
        console.groupEnd();
    }


    setResults(results) {
        this.results = results;
        console.log(results);
    }
}

const testsStore = new TestsStore();
export default testsStore;
