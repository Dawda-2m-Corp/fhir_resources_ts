import { Reference } from "../reference";
import { CodeableConcept } from "./codeableConcept";
import { Coding } from "./coding";
import { Quantity } from "./quantity";
import { Range } from "./range";



export class UsageContext {
    code: Coding;
    valueCodeableConcept?: CodeableConcept;
    valueQuantity?: Quantity;
    valueRange?: Range;
    valueReference?: Reference;

    constructor(data: UsageContext) {
        this.code = data.code;
        this.valueCodeableConcept = data.valueCodeableConcept;
        this.valueQuantity = data.valueQuantity;
        this.valueRange = data.valueRange;
        this.valueReference = data.valueReference;
    }
}