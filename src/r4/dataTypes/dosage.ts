import { FhirBoolean, FhirInteger, FhirString } from ".";
import { CodeableConcept } from "./codeableConcept";
import { Quantity } from "./quantity";
import { Range } from "./range";
import { Ratio } from "./ratio";
import { Timing } from "./timing";


export class DosageDoesAndRate {
    type?: CodeableConcept;
    doseRange?: Range;
    doseQuantity?: Quantity;
    rateRatio?: Ratio;
    rateRange?: Range;
    rateQuantity?: Quantity;
}

export class Dosage {
    sequence?: FhirInteger;
    text?: FhirString;
    additionalInstruction?: CodeableConcept[];
    patientInstruction?: FhirString;
    timing?: Timing;
    asNeeded?: FhirBoolean;
    asNeededFor?: CodeableConcept[];
    site?: CodeableConcept;
    route?: CodeableConcept;
    method?: CodeableConcept;
    doseAndRate?: DosageDoesAndRate[];
    maxDoesPerPeriod?: Ratio[];
    maxDosePerAdministration?: Quantity;
    maxDosePerLifetime?: Quantity;


    constructor(data: Dosage) {
        Object.assign(this, data);
    }
}