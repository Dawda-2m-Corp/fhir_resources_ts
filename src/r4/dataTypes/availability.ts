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

    constructor(data: Partial<Availability>) {
        if (data.availableTime) {
            this.availableTime = Array.isArray(data.availableTime) ? data.availableTime : [data.availableTime];
        }
        if (data.notAvailable) {
            this.notAvailable = Array.isArray(data.notAvailable)
                ? data.notAvailable.map(na => new NotAvailableTime(na))
                : [new NotAvailableTime(data.notAvailable)];
        }
    }

    toJson(): any {
        const json: any = {};
        if (this.availableTime && this.availableTime.length > 0) {
            json.availableTime = this.availableTime;
        }
        if (this.notAvailable && this.notAvailable.length > 0) {
            json.notAvailable = this.notAvailable.map(na => ({
                description: na.description,
                during: na.during?.toJson()
            }));
        }
        return json;
    }

    toXml(): string {
        let xml = '<Availability>';
        if (this.availableTime && this.availableTime.length > 0) {
            this.availableTime.forEach(at => {
                xml += '<availableTime>';
                if (at.daysOfWeek) at.daysOfWeek.forEach(day => xml += `<daysOfWeek value="${day}"/>`);
                if (at.allDay !== undefined) xml += `<allDay value="${at.allDay}"/>`;
                if (at.availableStartTime) xml += `<availableStartTime value="${at.availableStartTime}"/>`;
                if (at.availableEndTime) xml += `<availableEndTime value="${at.availableEndTime}"/>`;
                xml += '</availableTime>';
            });
        }
        if (this.notAvailable && this.notAvailable.length > 0) {
            this.notAvailable.forEach(na => {
                xml += '<notAvailable>';
                if (na.description) xml += `<description value="${na.description}"/>`;
                if (na.during) xml += na.during.toXml().replace('<Period', '<during').replace('</Period>', '</during>');
                xml += '</notAvailable>';
            });
        }
        xml += '</Availability>';
        return xml;
    }
}