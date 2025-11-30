import { FhirCode, FhirPositiveInt, FhirString } from ".";
import { Period } from "./period";


export class ContactPoint {
    system?: FhirCode;
    value?: FhirString;
    use?: FhirString;
    rank?: FhirPositiveInt;
    period?: Period;

    constructor(data: ContactPoint) {
        this.system = data.system;
        this.value = data.value;
        this.use = data.use;
        this.rank = data.rank;
        this.period = data.period;
    }
}