import { Reference } from "../reference";
import { Address } from "./address";
import { CodeableConcept } from "./codeableConcept";
import { ContactPoint } from "./contactPoint";
import { HumanName } from "./humanName";
import { Period } from "./period";


export class ExtendedContactDetail {
    purpose?: CodeableConcept;
    name?: HumanName[];
    telecom?: ContactPoint[];
    address?: Address;
    organization?: Reference;
    period?: Period;

    constructor(data: ExtendedContactDetail) {
        Object.assign(this, data);
    }
}