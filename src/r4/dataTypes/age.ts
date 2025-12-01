import { FhirUri } from ".";


export class Age {
    value?: number;
    unit?: string;
    system?: FhirUri;
    code?: string;

    constructor(data: Partial<Age> = {}) {
        Object.assign(this, data);
    }
}