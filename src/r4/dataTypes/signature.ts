import { FhirBase64Binary, FhirCode, FhirInstant } from ".";
import { Reference } from "../reference";
import { Coding } from "./coding";


export class Signature {
    type: Coding[];
    when: FhirInstant;
    who?: Reference;
    onBehalfOf?: Reference;
    targetFormat?: FhirCode;
    sigFormat?: FhirCode;
    data?: FhirBase64Binary;


    constructor(data: Signature) {
        this.type = data.type;
        this.when = data.when;
    }
}