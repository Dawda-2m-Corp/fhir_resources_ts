import { FhirDateTime } from ".";
import { Extension } from "../extensions";

export interface PeriodConstructorData {
    extension?: Extension[];
    start?: FhirDateTime | string;
    end?: FhirDateTime | string;
}

export class Period {
    extension?: Extension[];
    start?: FhirDateTime;
    end?: FhirDateTime;

    constructor(data: PeriodConstructorData | Period) {
        if (data.extension !== undefined) {
            this.extension = data.extension;
        }
        if (data.start !== undefined) {
            this.start = data.start as any;
        }
        if (data.end !== undefined) {
            this.end = data.end as any;
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.extension !== undefined) result.extension = this.extension;
        if (this.start !== undefined) result.start = this.start;
        if (this.end !== undefined) result.end = this.end;

        return result;
    }

    toXml(): string {
        let xml = ``;
        if (this.extension !== undefined) {
            this.extension.forEach((ext) => {
                xml += `<extension>`;
                xml += ext.toXml();
                xml += `</extension>`;
            });
        }
        if (this.start !== undefined) {
            xml += `<start value="${this.start}"/>`;
        }
        if (this.end !== undefined) {
            xml += `<end value="${this.end}"/>`;
        }
        return xml;
    }
}