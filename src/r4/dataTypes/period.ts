import { FhirDateTime } from ".";
import { Extension } from "../extensions";

export class Period {
    extension?: Extension[];
    start?: FhirDateTime;
    end?: FhirDateTime;
    constructor(data: Partial<Period>) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.extension !== undefined) result.extension = this.extension;
        if (this.start !== undefined) result.start = this.start;
        if (this.end !== undefined) result.end = this.end;

        return result;
    }
}