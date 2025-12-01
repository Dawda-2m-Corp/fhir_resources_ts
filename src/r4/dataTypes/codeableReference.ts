import { Reference } from "../reference";
import { CodeableConcept } from "./codeableConcept";


export class CodeableReference {
    concept?: CodeableConcept;
    reference?: Reference;

    constructor(data: Partial<CodeableReference> = {}) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<CodeableReference>${JSON.stringify(this)}</CodeableReference>`;
    }
}