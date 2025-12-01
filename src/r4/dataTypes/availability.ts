import { FhirBoolean, FhirCode, FhirString, FhirTime } from ".";
import { Period } from "./period";


export class AvailabilityTime {
    daysOfWeek?: FhirCode[];
    allDay?: FhirBoolean;
    availableStartTime?: FhirTime;
    availableEndTime?: FhirTime;
}

export class NotAvailableTime {
    description?: FhirString;
    during?: Period;

    constructor(data: NotAvailableTime) {
        this.description = data.description;
        this.during = data.during;
    }
}

export class Availability {
    availableTime?: AvailabilityTime[];
    notAvailable?: NotAvailableTime[];

    constructor(data: Availability) {
        this.availableTime = data.availableTime;
        this.notAvailable = data.notAvailable;
    }
}