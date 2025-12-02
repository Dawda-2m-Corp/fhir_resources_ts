import { FhirDateTime, FhirMakeDown } from ".";
import { Reference } from "../reference";


export class Annotation {
    authorReference?: Reference;
    authorString?: string;
    time?: FhirDateTime;
    text?: FhirMakeDown;

    constructor(data: Partial<Annotation> = {}) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.authorReference !== undefined) {
            result.authorReference = typeof this.authorReference.toJson === 'function'
                ? this.authorReference.toJson()
                : this.authorReference;
        }
        if (this.authorString !== undefined) result.authorString = this.authorString;
        if (this.time !== undefined) result.time = this.time;
        if (this.text !== undefined) result.text = this.text;

        return result;
    }

    toXml(): string {
        let xml = `<Annotation>`;
        if (this.authorReference !== undefined) {
            xml += `<authorReference>`;
            xml += this.authorReference.toXml();
            xml += `</authorReference>`;
        }
        if (this.authorString !== undefined) {
            xml += `<authorString value="${this.authorString}"/>`;
        }
        if (this.time !== undefined) {
            xml += `<time value="${this.time}"/>`;
        }
        if (this.text !== undefined) {
            xml += `<text value="${this.text}"/>`;
        }
        xml += `</Annotation>`;
        return xml;
    }
}