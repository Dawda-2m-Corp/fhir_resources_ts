import { FhirCode, FhirString } from ".";
import { ContactDetail } from "./contactDetail";


export class Contributor {
    type: FhirCode;
    name: FhirString;
    contact?: ContactDetail[]

    constructor(data: Contributor) {
        this.type = data.type;
        this.name = data.name;
        this.contact = data.contact
    }
}