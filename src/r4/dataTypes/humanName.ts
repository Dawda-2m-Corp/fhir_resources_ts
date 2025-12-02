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

    toXml(): string {
        let xml = `<HumanName>`;
        if (this.use !== undefined) {
            xml += `<use>${this.use}</use>`;
        }
        if (this.text !== undefined) {
            xml += `<text>${this.text}</text>`;
        }
        if (this.family !== undefined) {
            xml += `<family>${this.family}</family>`;
        }
        if (this.given !== undefined) {
            this.given.forEach(given => {
                xml += `<given>${given}</given>`;
            });
        }
        if (this.prefix !== undefined) {
            this.prefix.forEach(prefix => {
                xml += `<prefix>${prefix}</prefix>`;
            });
        }
        if (this.suffix !== undefined) {
            this.suffix.forEach(suffix => {
                xml += `<suffix>${suffix}</suffix>`;
            });
        }
        if (this.period !== undefined) {
            xml += `<period>${this.period.toXml()}</period>`;
        }
        xml += `</HumanName>`;
        return xml;
    }
}