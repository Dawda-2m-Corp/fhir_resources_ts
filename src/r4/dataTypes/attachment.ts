import { FhirBase64Binary, FhirCode, FhirDateTime, FhirUnsignedInt } from ".";


export class Attachment {
    contentType?: FhirCode;
    language?: FhirCode;
    data?: FhirBase64Binary;
    url?: FhirUnsignedInt;
    hash?: FhirBase64Binary;
    title?: String;
    creation?: FhirDateTime;


    constructor(data: Attachment) {
        Object.assign(this, data);
    }
}