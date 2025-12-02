import { Quantity } from "./quantity";


export class Ratio {
    numerator?: Quantity;
    denominator?: Quantity;

    constructor(data: Partial<Ratio>) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<Ratio>${JSON.stringify(this)}</Ratio>`;
    }
}