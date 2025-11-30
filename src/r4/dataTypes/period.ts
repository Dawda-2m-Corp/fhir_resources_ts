import { FhirDateTime } from ".";
import { Extension } from "../extensions";

export class Period {
    extension?: Extension[];
    start?: FhirDateTime;
    end?: FhirDateTime;
    constructor(data: Period) {
        this.extension = data.extension;
        this.start = data.start;
        this.end = data.end;
    }
}