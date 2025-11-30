import { FhirCode, FhirDateTime, FhirDecimal, FhirPositiveInt, FhirTime, FhirUnsignedInt } from ".";
import { CodeableConcept } from "./codeableConcept";
import { Duration } from "./duration";
import { Period } from "./period";
import { Range } from "./range";


export class TimingRepeat {
    boundsDuration?: Duration;
    boundsRange?: Range;
    boundsPeriod?: Period;
    count?: FhirPositiveInt;
    duration?: FhirDecimal;
    durationMax?: FhirDecimal;
    durationUnit?: FhirCode;
    frequency?: FhirPositiveInt;
    frequencyMax?: FhirPositiveInt;
    period?: FhirDecimal;
    periodMax?: FhirDecimal;
    periodUnit?: FhirDecimal;
    dayOfWeek?: FhirCode[];
    timeOfDay?: FhirTime[];
    when?: FhirCode;
    offset?: FhirUnsignedInt;
}

export class TIming {
    event?: FhirDateTime[];
    repeat?: TimingRepeat;
    code?: CodeableConcept;
}