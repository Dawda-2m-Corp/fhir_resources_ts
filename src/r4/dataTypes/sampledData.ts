import { FhirDecimal, FhirPositiveInt, FhirString } from ".";
import { Period } from "./period";
import { Quantity } from "./quantity";


export class SampledData {
    origin: Quantity;
    period: Period;
    factor?: FhirDecimal;
    lowerLimit?: FhirDecimal;
    upperLimit?: FhirDecimal;
    dimensions?: FhirPositiveInt;
    data?: FhirString;

    constructor(data: SampledData) {
        this.origin = data.origin;
        this.period = data.period;
    }
}