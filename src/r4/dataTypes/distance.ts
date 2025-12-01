import { FhirUri } from ".";


export class Distance {
    value?: number;
    unit?: string;
    system?: FhirUri;
    code?: string;

    constructor(data: Partial<Distance> = {}) {
        Object.assign(this, data);
    }
}