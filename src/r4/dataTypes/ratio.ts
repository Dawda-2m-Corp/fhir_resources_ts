import { Quantity } from "./quantity";


export class Ratio {
    numerator?: Quantity;
    denominator?: Quantity;

    constructor(data: Ratio) {
        this.denominator = data.denominator;
        this.numerator = data.numerator;
    }
}