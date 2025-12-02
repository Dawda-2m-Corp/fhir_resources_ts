import { FhirCanonical, FhirCode, FhirDate, FhirDateTime, FhirString } from ".";
import { Reference } from "../reference";
import { CodeableConcept } from "./codeableConcept";
import { DataRequirement } from "./dataRequirement";
import { Expression } from "./expression";
import { Timing } from "./timing";


export class TriggerDefinition {
    type: FhirCode;
    name?: FhirString;
    code?: CodeableConcept;
    subscriptionTopic?: FhirCanonical;
    timingTiming?: Timing;
    timingReference?: Reference;
    timingDate?: FhirDate;
    timingDateTime?: FhirDateTime;
    data?: DataRequirement[];
    condition?: Expression;

    constructor(data: TriggerDefinition) {
        this.type = data.type;
        this.name = data.name;
        this.code = data.code;
        this.subscriptionTopic = data.subscriptionTopic;
        this.timingTiming = data.timingTiming;
        this.timingReference = data.timingReference;
        this.timingDate = data.timingDate;
        this.timingDateTime = data.timingDateTime;
        this.data = data.data;
        this.condition = data.condition;
    }
}