import { BaseFhirResource } from "./baseResource";
import { FhirBoolean, FhirMakeDown, FhirResourceTypes, FhirString } from "./dataTypes";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { ExtendedContactDetail } from "./dataTypes/extendedContactDetail";
import { Period } from "./dataTypes/period";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

// Nested class for Organization qualification
export class OrganizationQualification {
    identifier?: Identifier[];
    code: CodeableConcept;
    period?: Period;
    issuer?: Reference;

    constructor(data: any) {
        if (data.identifier !== undefined) {
            this.identifier = Array.isArray(data.identifier)
                ? data.identifier.map((i: any) => i instanceof Identifier ? i : new Identifier(i))
                : [data.identifier instanceof Identifier ? data.identifier : new Identifier(data.identifier)];
        }
        this.code = data.code instanceof CodeableConcept ? data.code : new CodeableConcept(data.code);
        if (data.period !== undefined) {
            this.period = data.period instanceof Period ? data.period : new Period(data.period);
        }
        if (data.issuer !== undefined) {
            this.issuer = data.issuer instanceof Reference ? data.issuer : new Reference(data.issuer);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.identifier !== undefined) result.identifier = this.identifier.map(i => i.toJson());
        result.code = this.code.toJson();
        if (this.period !== undefined) result.period = this.period.toJson();
        if (this.issuer !== undefined) result.issuer = this.issuer.toJson();
        return result;
    }

    toXml(): string {
        let xml = '<qualification>';
        if (this.identifier !== undefined) {
            this.identifier.forEach(i => { xml += `<identifier>${i.toXml()}</identifier>`; });
        }
        xml += `<code>${this.code.toXml()}</code>`;
        if (this.period !== undefined) xml += `<period>${this.period.toXml()}</period>`;
        if (this.issuer !== undefined) xml += `<issuer>${this.issuer.toXml()}</issuer>`;
        xml += '</qualification>';
        return xml;
    }
}

// Constructor interface for Organization
export interface OrganizationConstructorData {
    resourceType?: FhirResourceTypes;
    id?: FhirString;
    identifier?: Identifier[] | any[] | any;
    active?: FhirBoolean | boolean;
    type?: CodeableConcept[] | any[] | any;
    name?: FhirString | string;
    alias?: FhirString[] | string[] | string;
    description?: FhirMakeDown | string;
    contact?: ExtendedContactDetail[] | any[] | any;
    partOf?: Reference | any;
    endpoint?: Reference[] | any[] | any;
    qualification?: OrganizationQualification[] | any[] | any;
}

// Main Organization resource class
export class Organization extends BaseFhirResource {
    resourceType: FhirResourceTypes = 'Organization';
    identifier?: Identifier[];
    active?: FhirBoolean;
    type?: CodeableConcept[];
    name?: FhirString;
    alias?: FhirString[];
    description?: FhirMakeDown;
    contact?: ExtendedContactDetail[];
    partOf?: Reference;
    endpoint?: Reference[];
    qualification?: OrganizationQualification[];

    constructor(data: OrganizationConstructorData) {
        super(data as any);

        if (data.identifier !== undefined) {
            this.identifier = Array.isArray(data.identifier)
                ? data.identifier.map((i: any) => i instanceof Identifier ? i : new Identifier(i))
                : [data.identifier instanceof Identifier ? data.identifier : new Identifier(data.identifier)];
        }
        if (data.active !== undefined) {
            this.active = data.active as FhirBoolean;
        }
        if (data.type !== undefined) {
            this.type = Array.isArray(data.type)
                ? data.type.map((t: any) => t instanceof CodeableConcept ? t : new CodeableConcept(t))
                : [data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type)];
        }
        if (data.name !== undefined) {
            this.name = data.name as FhirString;
        }
        if (data.alias !== undefined) {
            this.alias = Array.isArray(data.alias) ? data.alias : [data.alias];
        }
        if (data.description !== undefined) {
            this.description = data.description as FhirMakeDown;
        }
        if (data.contact !== undefined) {
            this.contact = Array.isArray(data.contact)
                ? data.contact.map((c: any) => c instanceof ExtendedContactDetail ? c : new ExtendedContactDetail(c))
                : [data.contact instanceof ExtendedContactDetail ? data.contact : new ExtendedContactDetail(data.contact)];
        }
        if (data.partOf !== undefined) {
            this.partOf = data.partOf instanceof Reference ? data.partOf : new Reference(data.partOf);
        }
        if (data.endpoint !== undefined) {
            this.endpoint = Array.isArray(data.endpoint)
                ? data.endpoint.map((e: any) => e instanceof Reference ? e : new Reference(e))
                : [data.endpoint instanceof Reference ? data.endpoint : new Reference(data.endpoint)];
        }
        if (data.qualification !== undefined) {
            this.qualification = Array.isArray(data.qualification)
                ? data.qualification.map((q: any) => new OrganizationQualification(q))
                : [new OrganizationQualification(data.qualification)];
        }
    }

    toJson(): Record<string, any> {
        const result = super.toJson();

        if (this.identifier !== undefined) result.identifier = this.identifier.map(i => i.toJson());
        if (this.active !== undefined) result.active = this.active;
        if (this.type !== undefined) result.type = this.type.map(t => t.toJson());
        if (this.name !== undefined) result.name = this.name;
        if (this.alias !== undefined) result.alias = this.alias;
        if (this.description !== undefined) result.description = this.description;
        if (this.contact !== undefined) result.contact = this.contact;
        if (this.partOf !== undefined) result.partOf = this.partOf.toJson();
        if (this.endpoint !== undefined) result.endpoint = this.endpoint.map(e => e.toJson());
        if (this.qualification !== undefined) result.qualification = this.qualification.map(q => q.toJson());

        return result;
    }

    toXml(): string {
        let xml = `<Organization xmlns="http://hl7.org/fhir">`;

        if (this.id !== undefined) xml += `<id value="${this.id}"/>`;

        if (this.identifier !== undefined) {
            this.identifier.forEach(i => { xml += `<identifier>${i.toXml()}</identifier>`; });
        }
        if (this.active !== undefined) xml += `<active value="${this.active}"/>`;
        if (this.type !== undefined) {
            this.type.forEach(t => { xml += `<type>${t.toXml()}</type>`; });
        }
        if (this.name !== undefined) xml += `<name value="${this.name}"/>`;
        if (this.alias !== undefined) {
            this.alias.forEach(a => { xml += `<alias value="${a}"/>`; });
        }
        if (this.description !== undefined) xml += `<description value="${this.description}"/>`;
        if (this.contact !== undefined) {
            this.contact.forEach(c => { xml += `<contact>${JSON.stringify(c)}</contact>`; });
        }
        if (this.partOf !== undefined) xml += `<partOf>${this.partOf.toXml()}</partOf>`;
        if (this.endpoint !== undefined) {
            this.endpoint.forEach(e => { xml += `<endpoint>${e.toXml()}</endpoint>`; });
        }
        if (this.qualification !== undefined) {
            this.qualification.forEach(q => { xml += q.toXml(); });
        }

        xml += '</Organization>';
        return xml;
    }

    static fromJson(json: Record<string, any>): Organization {
        return new Organization(json);
    }
}