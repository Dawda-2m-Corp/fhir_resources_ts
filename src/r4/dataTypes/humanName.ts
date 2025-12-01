import { FhirCode, FhirString } from ".";
import { Period } from "./period";


export class HumanName {
    use?: FhirCode;
    text?: FhirString;
    family?: FhirString;
    given?: FhirString[];
    prefix?: FhirString[];
    suffix?: FhirString[];
    period?: Period;

    constructor(data: Partial<HumanName>) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.use !== undefined) result.use = this.use;
        if (this.text !== undefined) result.text = this.text;
        if (this.family !== undefined) result.family = this.family;
        if (this.given !== undefined) result.given = this.given;
        if (this.prefix !== undefined) result.prefix = this.prefix;
        if (this.suffix !== undefined) result.suffix = this.suffix;
        if (this.period !== undefined) result.period = this.period.toJson();

        return result;
    }
}