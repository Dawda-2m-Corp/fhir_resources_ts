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
        this.extension = data.extension;
        this.use = data.use;
        this.type = data.type;
        this.text = data.text;
        this.line = data.line;
        this.city = data.city;
        this.district = data.district;
        this.state = data.state;
        this.postalCode = data.postalCode;
        this.country = data.country;
        this.period = data.period;
    }
}