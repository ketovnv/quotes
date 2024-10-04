import {makeAutoObservable, action} from "mobx";

// класс для хранения результатов вычислений
export class Results {

    quotesNumber = 0// количество котировок,
    // при котором производились
    // вычисления
    average = 0 // cреднее значение
    standardDeviation = 0 // стандартное отклонение
    modeValue = 0 // мода
    minValue = 0 // минимальное значение
    maxValue = 0 // максимальное значение
    // количество потерянных котировок
    calculationStartTime = new Date() // время начала расчёта
    calculationTime = 0 // время расчёта в миллисекундах
    quotes = [] // котировки накопленные с моменета
                //последних вычислений


    constructor(initialValues) {
        this.updateFields(initialValues)
        makeAutoObservable(this), {
            updateField: action
        }; // MobX объект
    }

    updateField(field, value) {
        if (!this.hasOwnProperty(field))
            console.warn(
                `Свойство ${field} не существует!
                 Будет добавлено новое свойство`
            );
        this[field] = value;
        return this
    }

    updateFields(fields) {
        if (fields) {
            Object.keys(fields).forEach(field => {
                this.updateField(field, fields[field]);
            });
        }
        return this
    }

}