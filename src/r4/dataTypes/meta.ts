import { FhirCanonical, FhirId, FhirInstant, FhirUri } from ".";
import { Coding } from "./coding";


export class Meta {
    versionId?: FhirId;
    lastUpdated?: FhirInstant;
    source?: FhirUri;
    profile?: FhirCanonical[];
    security?: Coding[];
    tag?: Coding[];

    constructor(data: Meta) {
        Object.assign(this, data);
    }
}