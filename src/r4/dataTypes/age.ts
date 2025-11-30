import { FhirUri } from ".";


export class Age {
    value?: number;
    unit?: string;
    system?: FhirUri;
    code?: string;

    constructor(data: Partial<Age> = {}) {
        if (data.value !== undefined) this.value = data.value;
        if (data.unit !== undefined) this.unit = data.unit;
        if (data.system !== undefined) this.system = data.system;
        if (data.code !== undefined) this.code = data.code;
    }
}