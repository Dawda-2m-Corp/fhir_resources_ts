import { Quantity } from "./quantity";


export class Range {
    low?: Quantity;
    high?: Quantity;

    constructor(data: Range) {
        this.low = data.low;
        this.high = data.high;
    }
}