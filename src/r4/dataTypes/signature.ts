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
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        result.type = this.type.map(t => typeof t.toJson === 'function' ? t.toJson() : t);
        result.when = this.when;

        if (this.who !== undefined) {
            result.who = typeof this.who.toJson === 'function' ? this.who.toJson() : this.who;
        }
        if (this.onBehalfOf !== undefined) {
            result.onBehalfOf = typeof this.onBehalfOf.toJson === 'function' ? this.onBehalfOf.toJson() : this.onBehalfOf;
        }
        if (this.targetFormat !== undefined) result.targetFormat = this.targetFormat;
        if (this.sigFormat !== undefined) result.sigFormat = this.sigFormat;
        if (this.data !== undefined) result.data = this.data;

        return result;
    }

    toXml(): String {
        return `<Signature>${JSON.stringify(this)}</Signature>`;
    }
}