import { FhirCode, FhirString } from ".";
import { Period } from "./period";


export class HumanName {
    use?: FhirCode;
    text?: FhirString;
    family?: FhirString;
    given?: FhirString[];
    prefix?: FhirString[];
    suffix?: FhirString[];
    period?: Period;
}