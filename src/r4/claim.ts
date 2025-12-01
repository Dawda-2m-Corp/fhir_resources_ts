import { BaseFhirResource } from "./baseResource";
import { FhirBoolean, FhirCode, FhirDate, FhirDateTime, FhirDecimal, FhirInteger, FhirPositiveInt, FhirResourceTypes, FhirString, FhirUri } from "./dataTypes";
import { Address } from "./dataTypes/address";
import { Attachment } from "./dataTypes/attachment";
import { CodeableConcept } from './dataTypes/codeableConcept';
import { CodeableReference } from "./dataTypes/codeableReference";
import { Money } from "./dataTypes/money";
import { Period } from './dataTypes/period';
import { Quantity } from "./dataTypes/quantity";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

// Interface for Claim constructor data that allows plain objects
interface ClaimConstructorData extends Partial<Omit<Claim, 'type' | 'patient' | 'insurer' | 'provider'>> {
    status: FhirCode;
    user: FhirCode;
    type: CodeableConcept | {
        coding?: {
            system?: FhirUri;
            version?: string;
            code?: FhirCode;
            display?: string;
            userSelected?: boolean;
        }[];
        text?: string;
    };
    patient: Reference | {
        reference?: FhirString;
        type?: FhirUri;
        identifier?: Identifier;
    };
    insurer?: Reference | {
        reference?: FhirString;
        type?: FhirUri;
        identifier?: Identifier;
    };
    provider?: Reference | {
        reference?: FhirString;
        type?: FhirUri;
        identifier?: Identifier;
    };
}

export class ClaimRelated {
    claim?: Reference;
    relationship?: CodeableConcept;
    reference?: Identifier;

    constructor(data: Partial<ClaimRelated> = {}) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ClaimRelated>${JSON.stringify(this)}</ClaimRelated>`;
    }
}

export class ClaimPayee {
    type: CodeableConcept;
    party?: Reference;

    constructor(data: Partial<ClaimPayee> = {}) {
        this.type = data.type!;
        Object.assign(this, data);
    }
    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ClaimPayee>${JSON.stringify(this)}</ClaimPayee>`;
    }
}

export class ClaimEvent {
    type: CodeableConcept;
    whenDateTime?: FhirDateTime;
    whenPeriod?: Period;

    constructor(data: Partial<ClaimEvent> = {}) {
        this.type = data.type!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ClaimEvent>${JSON.stringify(this)}</ClaimEvent>`;
    }
}


export class ClaimCareTeam {
    sequence: FhirPositiveInt;
    provider: Reference;
    responsible?: FhirBoolean;
    role?: CodeableConcept;
    qualification?: CodeableConcept;

    constructor(data: Partial<ClaimCareTeam> = {}) {
        this.sequence = data.sequence!;
        this.provider = data.provider!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ClaimCareTeam>${JSON.stringify(this)}</ClaimCareTeam>`;
    }
}

export class ClaimSupportingInfo {
    sequence: FhirPositiveInt;
    category: CodeableConcept;
    code?: CodeableConcept;
    timingDateTime?: FhirDateTime;
    timingPeriod?: Period;
    valueBoolean?: FhirBoolean;
    valueString?: FhirString;
    valueQuantity?: Quantity;
    valueAttachment?: Attachment;
    reason?: CodeableConcept;

    constructor(data: Partial<ClaimSupportingInfo> = {}) {
        this.sequence = data.sequence!;
        this.category = data.category!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ClaimSupportingInfo>${JSON.stringify(this)}</ClaimSupportingInfo>`;
    }
}

export class ClaimDiagnosis {
    sequence: FhirPositiveInt;
    diagnosisCodeableConcept?: CodeableConcept;
    diagnosisReference?: Reference;
    type?: CodeableConcept[];
    onAdmission?: CodeableConcept;
    packageCode?: CodeableConcept;

    constructor(data: Partial<ClaimDiagnosis> = {}) {
        this.sequence = data.sequence!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ClaimDiagnosis>${JSON.stringify(this)}</ClaimDiagnosis>`;
    }
}

export class ClaimProcedure {
    sequence: FhirPositiveInt;
    type?: CodeableConcept[];
    date?: FhirDateTime;
    procedureCodeableConcept?: CodeableConcept;
    procedureReference?: Reference;
    udi?: Reference[];

    constructor(data: Partial<ClaimProcedure> = {}) {
        this.sequence = data.sequence!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ClaimProcedure>${JSON.stringify(this)}</ClaimProcedure>`;
    }
}

export class ClaimAccident {
    date: FhirDateTime;
    type?: CodeableConcept;
    locationAddress?: Address;
    locationReference?: Reference;

    constructor(data: Partial<ClaimAccident> = {}) {
        this.date = data.date!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ClaimAccident>${JSON.stringify(this)}</ClaimAccident>`;
    }
}

export class ClaimItem {
    sequence: FhirPositiveInt;
    traceNumber?: Identifier;
    careTeamSequence?: FhirPositiveInt[];
    diagnosisSequence?: FhirPositiveInt[];
    procedureSequence?: FhirPositiveInt[];
    informationSequence?: FhirPositiveInt[];
    revenue?: CodeableConcept;
    category?: CodeableConcept;
    productOrService?: CodeableConcept;
    productOrServiceEnd?: CodeableConcept;
    request?: Reference[];
    modifier?: CodeableConcept[];
    programCode?: CodeableConcept[];
    servicedDate?: FhirDate;;
    servicedPeriod?: Period;
    locationCodeableConcept?: CodeableConcept;
    locationAddress?: Address;
    locationReference?: Reference;
    patientPaid?: Money;
    quantity?: Quantity;
    unitPrice?: Money;
    factor?: FhirInteger;
    tax?: Money;
    net?: Money;
    udi?: Reference[];
    bodySite?: {
        site?: CodeableReference[];
        subSite?: CodeableConcept[]
    }[];
    encounter?: Reference[];
    detail?: {
        sequence: FhirPositiveInt;
        traceNumber: Identifier[];
        revenue?: CodeableConcept;
        category?: CodeableConcept;
        productOrService?: CodeableConcept;
        productOrServiceEnd?: CodeableConcept;
        modifier?: CodeableConcept[];
        programCode?: CodeableConcept[];
        patientPaid?: Money;
        quantity?: Quantity;
        unitPrice?: Money;
        factor?: FhirDecimal;
        tax?: Money;
        net?: Money;
        udi?: Reference[];
        subDetail: {
            sequence: FhirPositiveInt;
            traceNumber: Identifier[];
            revenue?: CodeableConcept;
            category?: CodeableConcept;
            productOrService?: CodeableConcept;
            productOrServiceEnd?: CodeableConcept;
            modifier?: CodeableConcept[];
            programCode?: CodeableConcept[];
            patientPaid?: Money; // Paid by the patient
            quantity?: Quantity; // Count of products or services
            unitPrice?: Money; // Fee, charge or cost per item
            factor?: FhirDecimal; // Price scaling factor
            tax?: Money; // Total tax
            net?: Money; // Total item cost
            udi?: Reference[]; // Unique device identifier
        }[];
    }

    constructor(data: Partial<ClaimItem> = {}) {
        this.sequence = data.sequence!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ClaimItem>${JSON.stringify(this)}</ClaimItem>`;
    }
}

export class Claim extends BaseFhirResource {
    resourceType: FhirResourceTypes = "Claim";
    identifier?: Identifier[];
    traceNumber?: Identifier[];
    status: FhirCode;
    type: CodeableConcept;
    subType?: CodeableConcept;
    user: FhirCode;
    patient: Reference;
    enterer?: Reference;
    insurer?: Reference;
    provider?: Reference;
    priority?: CodeableConcept;
    fundsReserve?: CodeableConcept;
    related?: ClaimRelated[];
    prescription?: Reference;
    originalPrescription?: Reference;
    payee?: ClaimPayee;
    referral?: Reference;
    encounter?: Reference[];
    facility?: Reference;
    diagnosisRelatedGroup?: CodeableConcept;
    event?: ClaimEvent[];
    careTeam?: ClaimCareTeam[];
    supportingInfo?: ClaimSupportingInfo[];
    diagnosis?: ClaimDiagnosis[];
    procedure?: ClaimProcedure[];
    accident?: ClaimAccident;
    patientPaid?: Money;
    item?: ClaimItem[];
    total?: Money;


    constructor(data: ClaimConstructorData) {
        super(data as BaseFhirResource);

        this.status = data.status!;
        this.user = data.user!;

        // Convert plain objects to proper instances
        this.type = data.type instanceof CodeableConcept
            ? data.type
            : new CodeableConcept(data.type! as any);

        this.patient = data.patient instanceof Reference
            ? data.patient
            : new Reference(data.patient! as any);

        if (data.insurer) {
            this.insurer = data.insurer instanceof Reference
                ? data.insurer
                : new Reference(data.insurer as any);
        }

        if (data.provider) {
            this.provider = data.provider instanceof Reference
                ? data.provider
                : new Reference(data.provider as any);
        }

        // Copy other properties
        Object.assign(this, {
            identifier: data.identifier,
            traceNumber: data.traceNumber,
            subType: data.subType,
            enterer: data.enterer,
            priority: data.priority,
            fundsReserve: data.fundsReserve,
            related: data.related,
            prescription: data.prescription,
            originalPrescription: data.originalPrescription,
            payee: data.payee,
            referral: data.referral,
            encounter: data.encounter,
            facility: data.facility,
            diagnosisRelatedGroup: data.diagnosisRelatedGroup,
            event: data.event,
            careTeam: data.careTeam,
            supportingInfo: data.supportingInfo,
            diagnosis: data.diagnosis,
            procedure: data.procedure,
            accident: data.accident,
            patientPaid: data.patientPaid,
            item: data.item,
            total: data.total
        });
    }

    toJson(): Record<string, any> {
        const result = super.toJson();

        // Add Claim-specific fields
        if (this.identifier !== undefined) {
            result.identifier = this.identifier.map(i =>
                typeof i.toJson === 'function' ? i.toJson() : i
            );
        }
        if (this.traceNumber !== undefined) {
            result.traceNumber = this.traceNumber.map(t =>
                typeof t.toJson === 'function' ? t.toJson() : t
            );
        }
        if (this.status !== undefined) result.status = this.status;
        if (this.type !== undefined) result.type = this.type.toJson();
        if (this.subType !== undefined) result.subType = this.subType.toJson();
        if (this.user !== undefined) result.user = this.user;
        if (this.patient !== undefined) result.patient = this.patient.toJson();
        if (this.enterer !== undefined) result.enterer = this.enterer.toJson();
        if (this.insurer !== undefined) result.insurer = this.insurer.toJson();
        if (this.provider !== undefined) result.provider = this.provider.toJson();
        if (this.priority !== undefined) result.priority = this.priority.toJson();
        if (this.fundsReserve !== undefined) result.fundsReserve = this.fundsReserve.toJson();
        // Add other fields as needed...

        return result;
    }

    toXml(): String {
        return `<Claim>${JSON.stringify(this)}</Claim>`;
    }
}