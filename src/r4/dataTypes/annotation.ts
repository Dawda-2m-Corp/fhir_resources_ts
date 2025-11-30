import { FhirDateTime, FhirMakeDown } from ".";
import { Reference } from "../reference";


export class Annotation {
    authorReference?: Reference;
    authorString?: string;
    time?: FhirDateTime;
    text?: FhirMakeDown;

    constructor(data: Partial<Annotation> = {}) {
        if (data.authorReference) this.authorReference = data.authorReference;
        if (data.authorString) this.authorString = data.authorString;
        if (data.time) this.time = data.time;
        if (data.text) this.text = data.text;
    }
}