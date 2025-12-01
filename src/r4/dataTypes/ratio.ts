import { Quantity } from "./quantity";


export class Ratio {
    numerator?: Quantity;
    denominator?: Quantity;

    constructor(data: Ratio) {
        Object.assign(this, data);
    }
}