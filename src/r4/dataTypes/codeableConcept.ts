import { Coding } from "./coding";


export class CodeableConcept {
    coding?: Coding[];
    text?: String;

    constructor(data: CodeableConcept) {
        this.coding = data.coding;
        this.text = data.text
    }
}