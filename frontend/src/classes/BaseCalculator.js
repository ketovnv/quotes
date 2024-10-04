import {Results} from "./Results";
import quotesStore from "../stores/quotes";
export class BaseCalculator {
    //результаты последних вычислений


    static scanQuote(selectedNumber, quote) {
        if (quote && quote.id && quote.value) {


            if (quotesNumber % quotesStore.selectedNumber === 0) {
                BatchCalculator
                    .calculate((quotesStore.batchVisibleResults ?? BatchCalculator.createVisibleResults({...self.initResult})));
                ChunkCalculator
                    .calculate((quotesStore.chunkVisibleResults ?? ChunkCalculator.createVisibleResults({...self.initResult})))
            }

            if (accumulatedQuotesNumber > BatchCalculator.partSize)
                BatchCalculator
                    .calculate((quotesStore.batchVisibleResults ?? BatchCalculator.createVisibleResults({...self.initResult})));

            if (accumulatedQuotesNumber > ChunkCalculator.partSize)
                ChunkCalculator
                    .calculate((quotesStore.chunkVisibleResults ?? ChunkCalculator.createVisibleResults({...self.initResult})))


            StreamCalculator
                .calculate((quotesStore.streamVisibleResults ?? StreamCalculator.createVisibleResults({...self.initResult})));
            // вычищаем котировки, по которым уже произведены вычисления,
            this.quotes = []     // чтобы не засорять память
        }

        this.lostQuotes++
        console.log('Потеряна котировка');
    }

}