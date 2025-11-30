import { FhirCode, FhirDecimal } from ".";


export class Money {
    value?: FhirDecimal;
    currency?: FhirCode;

    constructor(data: Money) {
        this.value = data.value;
        this.currency = data.currency
    }
}