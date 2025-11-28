import { FhirString, FhirCode, FhirPositiveInt } from '../../types/primitives';
import { Period } from './period';

export class ContactPoint {
    system?: FhirCode;
    value?: FhirString;
    use?: FhirCode;
    rank?: FhirPositiveInt;
    period?: Period;

    constructor(data: Partial<ContactPoint> = {}) {
        if (data.system !== undefined) this.system = data.system;
        if (data.value !== undefined) this.value = data.value;
        if (data.use !== undefined) this.use = data.use;
        if (data.rank !== undefined) this.rank = data.rank;
        if (data.period !== undefined) this.period = data.period;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.system !== undefined) result.system = this.system;
        if (this.value !== undefined) result.value = this.value;
        if (this.use !== undefined) result.use = this.use;
        if (this.rank !== undefined) result.rank = this.rank;
        if (this.period !== undefined) result.period = this.period.toJson();

        return result;
    }

    static fromJson(json: Record<string, any>): ContactPoint {
        return new ContactPoint({
            system: json.system,
            value: json.value,
            use: json.use,
            rank: json.rank,
            period: json.period ? Period.fromJson(json.period) : undefined,
        });
    }
}