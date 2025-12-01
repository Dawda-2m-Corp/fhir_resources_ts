import { FhirCode, FhirPositiveInt, FhirString } from ".";
import { Period } from "./period";


export class ContactPoint {
    system?: FhirCode;
    value?: FhirString;
    use?: FhirString;
    rank?: FhirPositiveInt;
    period?: Period;

    constructor(data: ContactPoint) {
        Object.assign(this, data);
    }
}