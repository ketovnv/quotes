import {makeAutoObservable, action} from "mobx";
// класс для хранения результатов
export class Results {
    quotesNumber = 0;
    average = 0;
    modeValue = 0;

    constructor(initialValues = {}) {
        this.updateFields(initialValues)
        makeAutoObservable(this),{
            supdateField: action
        }; // MobX объект
    }

    updateField(field, value) {
        if (!this.hasOwnProperty(field))
            console.warn(
                `Свойство ${field} не существует!
                 Будет добавлено новое свойство`
            );
        this[field] = value;
    }

    updateFields(fields) {
        if (fields) {
            Object.keys(fields).forEach(field => {
                this.updateField(field, fields[field]);
            });
        }
    }

    fullSync(results) {
        Object.assign(this, results);
    }
}