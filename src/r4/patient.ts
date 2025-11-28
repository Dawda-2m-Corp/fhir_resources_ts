
import { FhirCode, FhirDate } from '../types/primitives';
import { DomainResource } from './baseResource';
import { HumanName } from './humanName';
import { Identifier } from './identifier';
import { Reference } from './reference';
import { CodeableConcept, ContactPoint, Address, Attachment, Period } from './dataTypes';

export class PatientContact {
    relationship?: CodeableConcept[];
    name?: HumanName;
    telecom?: ContactPoint[];
    address?: Address;
    gender?: FhirCode;
    organization?: Reference;
    period?: Period;

    constructor(data: Partial<PatientContact> = {}) {
        if (data.relationship) this.relationship = data.relationship;
        if (data.name) this.name = data.name;
        if (data.telecom) this.telecom = data.telecom;
        if (data.address) this.address = data.address;
        if (data.gender) this.gender = data.gender;
        if (data.organization) this.organization = data.organization;
        if (data.period) this.period = data.period;
    }
}

export class PatientCommunication {
    language: CodeableConcept;
    preferred?: boolean;

    constructor(data: { language: CodeableConcept; preferred?: boolean }) {
        this.language = data.language;
        this.preferred = data.preferred;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        result.language = this.language.toJson();
        if (this.preferred !== undefined) result.preferred = this.preferred;
        return result;
    }

    static fromJson(json: Record<string, any>): PatientCommunication {
        return new PatientCommunication({
            language: CodeableConcept.fromJson(json.language),
            preferred: json.preferred,
        });
    }
}

export class PatientLink {
    other: Reference;
    type: FhirCode;

    constructor(data: { other: Reference; type: FhirCode }) {
        this.other = data.other;
        this.type = data.type;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        result.other = this.other.toJson();
        result.type = this.type;
        return result;
    }

    static fromJson(json: Record<string, any>): PatientLink {
        return new PatientLink({
            other: Reference.fromJson(json.other),
            type: json.type,
        });
    }
}


export class Patient extends DomainResource {
    resourceType: 'Patient' = 'Patient';
    identifier?: Identifier[];
    active?: boolean;
    name?: HumanName[];
    telecom?: ContactPoint[];
    gender?: FhirCode;
    birthDate?: FhirDate;
    deceasedBoolean?: boolean;
    deceasedDateTime?: string;
    address?: Address[];
    maritalStatus?: CodeableConcept;
    multipleBirthBoolean?: boolean;
    multipleBirthInteger?: number;
    photo?: Attachment[];
    communication?: PatientCommunication[];
    generalPractitioner?: Reference[];
    managingOrganization?: Reference;
    link?: PatientLink[];

    constructor(data: Partial<Patient> = {}) {
        super(data);

        // Copy all Patient-specific properties
        if (data.identifier !== undefined) this.identifier = data.identifier;
        if (data.active !== undefined) this.active = data.active;
        if (data.name !== undefined) this.name = data.name;
        if (data.telecom !== undefined) this.telecom = data.telecom;
        if (data.gender !== undefined) this.gender = data.gender;
        if (data.birthDate !== undefined) this.birthDate = data.birthDate;
        if (data.deceasedBoolean !== undefined) this.deceasedBoolean = data.deceasedBoolean;
        if (data.deceasedDateTime !== undefined) this.deceasedDateTime = data.deceasedDateTime;
        if (data.address !== undefined) this.address = data.address;
        if (data.maritalStatus !== undefined) this.maritalStatus = data.maritalStatus;
        if (data.multipleBirthBoolean !== undefined) this.multipleBirthBoolean = data.multipleBirthBoolean;
        if (data.multipleBirthInteger !== undefined) this.multipleBirthInteger = data.multipleBirthInteger;
        if (data.photo !== undefined) this.photo = data.photo;
        if (data.communication !== undefined) this.communication = data.communication;
        if (data.generalPractitioner !== undefined) this.generalPractitioner = data.generalPractitioner;
        if (data.managingOrganization !== undefined) this.managingOrganization = data.managingOrganization;
        if (data.link !== undefined) this.link = data.link;
    }

    toJson(): Record<string, any> {
        const result = super.toJson();

        if (this.identifier !== undefined) {
            result.identifier = this.identifier.map(i => i.toJson());
        }
        if (this.active !== undefined) result.active = this.active;
        if (this.name !== undefined) {
            result.name = this.name.map(n => n.toJson());
        }
        if (this.telecom !== undefined) {
            result.telecom = this.telecom.map(t => t.toJson());
        }
        if (this.gender !== undefined) result.gender = this.gender;
        if (this.birthDate !== undefined) result.birthDate = this.birthDate;
        if (this.deceasedBoolean !== undefined) result.deceasedBoolean = this.deceasedBoolean;
        if (this.deceasedDateTime !== undefined) result.deceasedDateTime = this.deceasedDateTime;
        if (this.address !== undefined) {
            result.address = this.address.map(a => a.toJson());
        }
        if (this.maritalStatus !== undefined) result.maritalStatus = this.maritalStatus.toJson();
        if (this.multipleBirthBoolean !== undefined) result.multipleBirthBoolean = this.multipleBirthBoolean;
        if (this.multipleBirthInteger !== undefined) result.multipleBirthInteger = this.multipleBirthInteger;
        if (this.photo !== undefined) {
            result.photo = this.photo.map(p => p.toJson());
        }
        if (this.communication !== undefined) {
            result.communication = this.communication.map(c => c.toJson());
        }
        if (this.generalPractitioner !== undefined) {
            result.generalPractitioner = this.generalPractitioner.map(gp => gp.toJson());
        }
        if (this.managingOrganization !== undefined) {
            result.managingOrganization = this.managingOrganization.toJson();
        }
        if (this.link !== undefined) {
            result.link = this.link.map(l => l.toJson());
        }

        return result;
    }

    static fromJson(json: Record<string, any>): Patient {
        const patient = new Patient({
            identifier: json.identifier ? json.identifier.map((i: any) => Identifier.fromJson(i)) : undefined,
            active: json.active,
            name: json.name ? json.name.map((n: any) => HumanName.fromJson(n)) : undefined,
            gender: json.gender,
            birthDate: json.birthDate,
            deceasedBoolean: json.deceasedBoolean,
            deceasedDateTime: json.deceasedDateTime,
            multipleBirthBoolean: json.multipleBirthBoolean,
            multipleBirthInteger: json.multipleBirthInteger,
            communication: json.communication ? json.communication.map((c: any) => PatientCommunication.fromJson(c)) : undefined,
            generalPractitioner: json.generalPractitioner ? json.generalPractitioner.map((gp: any) => Reference.fromJson(gp)) : undefined,
            managingOrganization: json.managingOrganization ? Reference.fromJson(json.managingOrganization) : undefined,
            link: json.link ? json.link.map((l: any) => PatientLink.fromJson(l)) : undefined,
        });

        // Copy base resource properties
        if (json.id) patient.id = json.id;
        if (json.meta) patient.meta = json.meta;
        if (json.implicitRules) patient.implicitRules = json.implicitRules;
        if (json.language) patient.language = json.language;
        if (json.text) patient.text = json.text;
        if (json.extension) patient.extension = json.extension;
        if (json.modifierExtension) patient.modifierExtension = json.modifierExtension;

        return patient;
    }

    /**
     * Create Patient from JSON string
     */
    static fromJsonString(jsonString: string): Patient {
        const data = JSON.parse(jsonString);
        return Patient.fromJson(data);
    }
}