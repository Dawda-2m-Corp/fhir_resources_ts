import { FhirString } from ".";
import { ContactPoint } from './contactPoint';


export class ContactDetail {
    name?: FhirString;
    telecome?: ContactPoint[];
}