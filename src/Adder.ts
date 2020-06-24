import {numberGenerator} from "./numberGenerator";

export default class Adder {

    sum(a: number, b: number) {
        return a + b;
    }

    sumWithDelay(a: number, b: number) {
        return new Promise(resolve => {
            setTimeout(function () {
                resolve(a + b);
            }, 3000);
        });
    }

    sumTwoNumbers() {
        return numberGenerator() + numberGenerator();
    }
}
