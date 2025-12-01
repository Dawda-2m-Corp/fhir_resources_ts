import { FhirCanonical, FhirCode, FhirInteger, FhirString } from ".";

export class ParameterDefinition {
    name?: FhirCode;
    use: FhirCode;
    min?: FhirInteger;
    max?: FhirInteger;
    documentation?: FhirString;
    type: FhirCode;
    profile?: FhirCanonical;

    constructor(data: ParameterDefinition) {
        this.use = data.use;
        this.type = data.type;
        Object.assign(this, data);
    }
}