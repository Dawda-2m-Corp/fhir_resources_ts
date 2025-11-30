import { FhirCode, FhirDecimal, FhirString, FhirUri } from ".";


export class Quantity {
    value?: FhirDecimal;
    comparator?: FhirCode;
    unit?: FhirString;
    system?: FhirUri;
    code?: FhirCode;

    constructor(data: Quantity) {
        this.value = data.value;
        this.comparator = data.comparator;
        this.unit = data.unit;
        this.system = data.system;
        this.code = data.code
    }
}