import { FhirCode } from "../types/primitives";
import { Period } from "./dataTypes/period";


export class HumanName {
    use?: FhirCode;
    text?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
    period?: Period;

    constructor(data: Partial<HumanName> = {}) {
        if (data.use) this.use = data.use;
        if (data.text) this.text = data.text;
        if (data.family) this.family = data.family;
        if (data.given) this.given = data.given;
        if (data.prefix) this.prefix = data.prefix;
        if (data.suffix) this.suffix = data.suffix;
        if (data.period) this.period = data.period;
    }

    /**
     * Convert to JSON
     */
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

    /**
     * Create from JSON
     */
    static fromJson(json: Record<string, any>): HumanName {
        return new HumanName({
            use: json.use,
            text: json.text,
            family: json.family,
            given: json.given,
            prefix: json.prefix,
            suffix: json.suffix,
            period: json.period ? Period.fromJson(json.period) : undefined,
        });
    }
}