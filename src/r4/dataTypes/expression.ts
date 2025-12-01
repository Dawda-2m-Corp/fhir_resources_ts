import { FhirCode, FhirString, FhirUri } from ".";


export class Expression {
    description?: FhirString;
    name?: FhirCode;
    language?: FhirCode;
    expression?: FhirString;
    reference?: FhirUri;

    constructor(data: Expression) {
        Object.assign(this, data);
    }
}