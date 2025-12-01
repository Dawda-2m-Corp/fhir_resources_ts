import { FhirCanonical, FhirCode, FhirDate, FhirString } from ".";
import { Reference } from "../reference";
import { Attachment } from "./attachment";
import { CodeableConcept } from "./codeableConcept";


export class RelatedArtifact {
    type: FhirCode;
    classifier?: CodeableConcept[];
    label?: FhirString;
    display?: FhirString
    citation?: FhirString;
    document?: Attachment;
    resource?: FhirCanonical;
    resourceReference?: Reference;
    publicationStatus?: FhirCode;
    publicationDate?: FhirDate;

    constructor(data: RelatedArtifact) {
        this.type = data.type;
        Object.assign(this, data);
    }
}