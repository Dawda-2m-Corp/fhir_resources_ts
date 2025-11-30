import { FhirUri } from ".";


export class Duration {
    value?: number;
    unit?: string;
    system?: FhirUri;
    code?: string;

    constructor(data: Partial<Duration> = {}) {
        if (data.value !== undefined) this.value = data.value;
        if (data.unit !== undefined) this.unit = data.unit;
        if (data.system !== undefined) this.system = data.system;
        if (data.code !== undefined) this.code = data.code;
    }
}