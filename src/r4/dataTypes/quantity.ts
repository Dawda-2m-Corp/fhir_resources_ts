import { FhirCode, FhirDecimal, FhirString, FhirUri } from ".";


export class Quantity {
    value?: FhirDecimal;
    comparator?: FhirCode;
    unit?: FhirString;
    system?: FhirUri;
    code?: FhirCode;

    constructor(data: Partial<Quantity>) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.value !== undefined) result.value = this.value;
        if (this.comparator !== undefined) result.comparator = this.comparator;
        if (this.unit !== undefined) result.unit = this.unit;
        if (this.system !== undefined) result.system = this.system;
        if (this.code !== undefined) result.code = this.code;

        return result;
    }

    toXml(): String {
        return `<Quantity>${JSON.stringify(this)}</Quantity>`;
    }

}