import { FhirCode } from ".";
import { Extension } from "../extensions";
import { Period } from "./period";


export class Address {
    extension?: Extension[]
    use?: FhirCode;
    type?: FhirCode;
    text?: string;
    line?: string[];
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    period?: Period;


    constructor(data: Address) {
        Object.assign(this, data);
    }
}