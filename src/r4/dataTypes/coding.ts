import { FhirBoolean, FhirCode, FhirString, FhirUri } from ".";


export class Coding {
    system?: FhirUri;
    version?: String;
    code?: FhirCode;
    diaply?: FhirString;
    userSelected?: FhirBoolean;
}