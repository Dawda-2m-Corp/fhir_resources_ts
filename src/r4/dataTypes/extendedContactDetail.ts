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

    constructor(data: Partial<ExtendedContactDetail>) {
        if (data.purpose !== undefined) {
            this.purpose = data.purpose instanceof CodeableConcept ? data.purpose : new CodeableConcept(data.purpose as any);
        }
        if (data.name) {
            this.name = Array.isArray(data.name) ? data.name : [data.name];
        }
        if (data.telecom) {
            this.telecom = Array.isArray(data.telecom) ? data.telecom : [data.telecom];
        }
        if (data.address !== undefined) {
            this.address = data.address instanceof Address ? data.address : new Address(data.address as any);
        }
        if (data.organization !== undefined) {
            this.organization = data.organization instanceof Reference ? data.organization : new Reference(data.organization as any);
        }
        if (data.period !== undefined) {
            this.period = data.period instanceof Period ? data.period : new Period(data.period as any);
        }
    }

    toJson(): any {
        const json: any = {};
        if (this.purpose) json.purpose = this.purpose.toJson();
        if (this.name && this.name.length > 0) json.name = this.name;
        if (this.telecom && this.telecom.length > 0) json.telecom = this.telecom;
        if (this.address) json.address = this.address.toJson();
        if (this.organization) json.organization = this.organization.toJson();
        if (this.period) json.period = this.period.toJson();
        return json;
    }

    toXml(): string {
        let xml = '<ExtendedContactDetail>';
        if (this.purpose) xml += this.purpose.toXml().replace('<CodeableConcept', '<purpose').replace('</CodeableConcept>', '</purpose>');
        if (this.name && this.name.length > 0) {
            this.name.forEach(n => xml += `<name>${JSON.stringify(n)}</name>`);
        }
        if (this.telecom && this.telecom.length > 0) {
            this.telecom.forEach(t => xml += `<telecom>${JSON.stringify(t)}</telecom>`);
        }
        if (this.address) xml += this.address.toXml().replace('<Address', '<address').replace('</Address>', '</address>');
        if (this.organization) xml += this.organization.toXml().replace('<Reference', '<organization').replace('</Reference>', '</organization>');
        if (this.period) xml += this.period.toXml().replace('<Period', '<period').replace('</Period>', '</period>');
        xml += '</ExtendedContactDetail>';
        return xml;
    }
}