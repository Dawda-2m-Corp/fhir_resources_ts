import { FhirCode, FhirDecimal } from ".";


export class Money {
    value?: FhirDecimal;
    currency?: FhirCode;

    constructor(data: Money) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.value !== undefined) result.value = this.value;
        if (this.currency !== undefined) result.currency = this.currency;

        return result;
    }

    toXml(): string {
        let xml = `<Money>`;
        if (this.value !== undefined) {
            xml += `<value>${this.value}</value>`;
        }
        if (this.currency !== undefined) {
            xml += `<currency>${this.currency}</currency>`;
        }
        xml += `</Money>`;
        return xml;
    }
}