import { Quantity } from "./quantity";


export class Range {
    low?: Quantity;
    high?: Quantity;

    constructor(data: Range) {
        Object.assign(this, data);
    }
}