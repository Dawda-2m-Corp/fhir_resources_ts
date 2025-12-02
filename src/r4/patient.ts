import { BaseFhirResource } from "./baseResource";
import { FhirBoolean, FhirCode, FhirDate, FhirResourceTypes } from "./dataTypes";
import { Address } from "./dataTypes/address";
import { Attachment } from "./dataTypes/attachment";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { ContactPoint } from "./dataTypes/contactPoint";
import { HumanName } from "./dataTypes/humanName";
import { Period } from "./dataTypes/period";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

export interface PatientConstructorData extends Partial<Omit<Patient, 'name'>> {
    name?: (HumanName | {
        use?: FhirCode;
        text?: string;
        family?: string;
        given?: string[];
        prefix?: string[];
        suffix?: string[];
        period?: Period;
    })[];
}

export class PatientContact {
    relationship?: CodeableConcept[];
    name?: HumanName;
    telecom?: ContactPoint[];
    address?: Address;
    gender?: FhirCode;
    organization?: Reference;
    period?: Period;

    constructor(data: Partial<PatientContact> = {}) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<PatientContact>${JSON.stringify(this)}</PatientContact>`;
    }
}

export class PatientCommunication {
    language: CodeableConcept;
    preferred?: FhirBoolean;

    constructor(data: Partial<PatientCommunication> = {}) {
        this.language = data.language!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<PatientCommunication>${JSON.stringify(this)}</PatientCommunication>`;
    }
}

export class PatientLink {
    other: Reference;
    type: FhirCode;

    constructor(data: Partial<PatientLink> = {}) {
        this.other = data.other!;
        this.type = data.type!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<PatientLink>${JSON.stringify(this)}</PatientLink>`;
    }
}


export class Patient extends BaseFhirResource {
    resourceType: FhirResourceTypes = "Patient";
    identifier?: Identifier[];
    active?: FhirBoolean;
    name?: HumanName[];
    telecom?: ContactPoint[];
    gender?: FhirCode;
    birthDate?: FhirDate;
    deceasedBoolean?: FhirBoolean;
    deceasedDateTime?: FhirDate;
    address?: Address[];
    maritalStatus?: CodeableConcept;
    multipleBirthBoolean?: FhirBoolean;
    multipleBirthInteger?: number;
    photo?: Attachment[];
    contact?: PatientContact[];
    communication?: PatientCommunication[];
    generalPractitioner?: Reference[];
    managingOrganization?: Reference;
    link?: PatientLink[];

    constructor(data: PatientConstructorData = {}) {
        super(data as BaseFhirResource);

        if (data.name) {
            this.name = data.name.map(nameData =>
                nameData instanceof HumanName ? nameData : new HumanName(nameData as Partial<HumanName>)
            );
        }

        if (data.active !== undefined) this.active = data.active;
        if (data.gender !== undefined) this.gender = data.gender;
        if (data.birthDate !== undefined) this.birthDate = data.birthDate;
    }

    toJson(): Record<string, any> {
        const result = super.toJson();

        if (this.name !== undefined) {
            result.name = this.name.map(name =>
                typeof name.toJson === 'function' ? name.toJson() : name
            );
        }
        if (this.active !== undefined) result.active = this.active;
        if (this.gender !== undefined) result.gender = this.gender;
        if (this.birthDate !== undefined) result.birthDate = this.birthDate;

        return result;
    }

    toXml(): String {
        return `<Patient>${JSON.stringify(this)}</Patient>`;
    }
}