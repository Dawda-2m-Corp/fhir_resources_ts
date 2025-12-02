import { FhirCode, FhirPositiveInt, FhirString } from ".";
import { Period } from "./period";


export class ContactPoint {
    system?: FhirCode;
    value?: FhirString;
    use?: FhirString;
    rank?: FhirPositiveInt;
    period?: Period;

    constructor(data: ContactPoint) {
        Object.assign(this, data);
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

    toXml(): string {
        let xml = `<ContactPoint>`;
        if (this.system !== undefined) {
            xml += `<system>${this.system}</system>`;
        }
        if (this.value !== undefined) {
            xml += `<value>${this.value}</value>`;
        }
        if (this.use !== undefined) {
            xml += `<use>${this.use}</use>`;
        }
        if (this.rank !== undefined) {
            xml += `<rank>${this.rank}</rank>`;
        }
        if (this.period !== undefined) {
            xml += `<period>${this.period.toXml()}</period>`;
        }
        xml += `</ContactPoint>`;
        return xml;
    }
}