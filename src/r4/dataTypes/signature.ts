import { FhirCode } from "../../types/primitives";
import { Reference } from "../reference";
import { Coding } from "./coding";


export class Signature {
    type: Coding[];
    when: string;
    who: Reference;
    onBehalfOf?: Reference;
    targetFormat?: string;
    sigFormat?: FhirCode;
    data?: string;

    constructor(data: {
        type: Coding[];
        when: string;
        who: Reference;
        onBehalfOf?: Reference;
        targetFormat?: string;
        sigFormat?: FhirCode;
        data?: string;
    }) {
        this.type = data.type;
        this.when = data.when;
        this.who = data.who;
        this.onBehalfOf = data.onBehalfOf;
        this.targetFormat = data.targetFormat;
        this.sigFormat = data.sigFormat;
        this.data = data.data;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        result.type = this.type.map(t => t.toJson());
        result.when = this.when;
        result.who = this.who.toJson();
        if (this.onBehalfOf !== undefined) result.onBehalfOf = this.onBehalfOf.toJson();
        if (this.targetFormat !== undefined) result.targetFormat = this.targetFormat;
        if (this.sigFormat !== undefined) result.sigFormat = this.sigFormat;
        if (this.data !== undefined) result.data = this.data;

        return result;
    }

    static fromJson(json: Record<string, any>): Signature {
        return new Signature({
            type: json.type.map((t: Record<string, any>) => Coding.fromJson(t)),
            when: json.when,
            who: Reference.fromJson(json.who),
            onBehalfOf: json.onBehalfOf ? Reference.fromJson(json.onBehalfOf) : undefined,
            targetFormat: json.targetFormat,
            sigFormat: json.sigFormat,
            data: json.data,
        });
    }
}