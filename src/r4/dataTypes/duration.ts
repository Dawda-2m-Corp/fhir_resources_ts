import { FhirUri } from ".";


export class Duration {
    value?: number;
    unit?: string;
    system?: FhirUri;
    code?: string;

    constructor(data: Partial<Duration> = {}) {
        Object.assign(this, data);
    }
}