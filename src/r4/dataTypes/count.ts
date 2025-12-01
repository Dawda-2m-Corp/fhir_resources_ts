import { FhirUri } from ".";


export class Count {
    value?: number;
    unit?: string;
    system?: FhirUri;
    code?: string;

    constructor(data: Partial<Count> = {}) {
        Object.assign(this, data);
    }
}