import { FhirString, FhirCode } from '../../types/primitives';
import { Period } from './period';

export class Address {
    use?: FhirCode;
    type?: FhirCode;
    text?: FhirString;
    line?: FhirString[];
    city?: FhirString;
    district?: FhirString;
    state?: FhirString;
    postalCode?: FhirString;
    country?: FhirString;
    period?: Period;

    constructor(data: Partial<Address> = {}) {
        if (data.use !== undefined) this.use = data.use;
        if (data.type !== undefined) this.type = data.type;
        if (data.text !== undefined) this.text = data.text;
        if (data.line !== undefined) this.line = data.line;
        if (data.city !== undefined) this.city = data.city;
        if (data.district !== undefined) this.district = data.district;
        if (data.state !== undefined) this.state = data.state;
        if (data.postalCode !== undefined) this.postalCode = data.postalCode;
        if (data.country !== undefined) this.country = data.country;
        if (data.period !== undefined) this.period = data.period;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.use !== undefined) result.use = this.use;
        if (this.type !== undefined) result.type = this.type;
        if (this.text !== undefined) result.text = this.text;
        if (this.line !== undefined) result.line = this.line;
        if (this.city !== undefined) result.city = this.city;
        if (this.district !== undefined) result.district = this.district;
        if (this.state !== undefined) result.state = this.state;
        if (this.postalCode !== undefined) result.postalCode = this.postalCode;
        if (this.country !== undefined) result.country = this.country;
        if (this.period !== undefined) result.period = this.period.toJson();

        return result;
    }

    static fromJson(json: Record<string, any>): Address {
        return new Address({
            use: json.use,
            type: json.type,
            text: json.text,
            line: json.line,
            city: json.city,
            district: json.district,
            state: json.state,
            postalCode: json.postalCode,
            country: json.country,
            period: json.period ? Period.fromJson(json.period) : undefined,
        });
    }
}