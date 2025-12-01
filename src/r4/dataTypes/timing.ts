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

    constructor(data: TimingRepeat) {
        Object.assign(this, data);
    }
}

export class Timing {
    event?: FhirDateTime[];
    repeat?: TimingRepeat;
    code?: CodeableConcept;

    constructor(data: Timing) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.event !== undefined) result.event = this.event;
        if (this.repeat !== undefined) result.repeat = this.repeat;
        if (this.code !== undefined) result.code = this.code.toJson();

        return result;
    }
}