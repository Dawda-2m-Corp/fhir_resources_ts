import { Coding } from "./coding";


export class CodeableConcept {
    coding?: Coding[];
    text?: String;

    constructor(data: Partial<CodeableConcept> & {
        coding?: (Coding | Partial<Coding>)[];
    }) {
        // Convert plain objects to Coding instances
        if (data.coding) {
            this.coding = data.coding.map(codingData =>
                codingData instanceof Coding ? codingData : new Coding(codingData)
            );
        }
        if (data.text !== undefined) this.text = data.text;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.coding !== undefined) {
            result.coding = this.coding.map(c =>
                typeof c.toJson === 'function' ? c.toJson() : c
            );
        }
        if (this.text !== undefined) result.text = this.text;

        return result;
    }

    toXml(): String {
        let xml = `<CodeableConcept>`;
        if (this.coding !== undefined) {
            this.coding.forEach(c => {
                xml += `<coding>${c.toXml()}</coding>`;
            });
        }
        if (this.text !== undefined) {
            xml += `<text>${this.text}</text>`;
        }
        xml += `</CodeableConcept>`;
        return xml;
    }
}