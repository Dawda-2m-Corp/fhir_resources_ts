import { BaseFhirResource } from "./baseResource";
import { FhirBoolean, FhirCode, FhirDate, FhirDateTime, FhirDecimal, FhirMakeDown, FhirResourceTypes, FhirString, FhirTime, FhirUnsignedInt, FhirUri } from "./dataTypes";
import { Annotation } from "./dataTypes/annotation";
import { Attachment } from "./dataTypes/attachment";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { CodeableReference } from "./dataTypes/codeableReference";
import { Coding } from "./dataTypes/coding";
import { Money } from "./dataTypes/money";
import { Period } from "./dataTypes/period";
import { Quantity } from "./dataTypes/quantity";
import { Signature } from "./dataTypes/signature";
import { Timing } from "./dataTypes/timing";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

export class ContentDefinition {
    type: CodeableConcept;
    subType?: CodeableConcept[];
    publisher?: Reference;
    publicationDate?: FhirDateTime;
    publicationStatus: FhirCode;
    copyright?: FhirMakeDown;

    constructor(data: Partial<ContentDefinition> = {}) {
        this.type = data.type!;
        this.publicationStatus = data.publicationStatus!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ContentDefinition>${JSON.stringify(this)}</ContentDefinition>`;
    }
}

export class ContractTermAsset {
    scope?: CodeableConcept;
    type?: CodeableConcept[];
    typeReference?: Reference[];
    subType?: CodeableConcept[];
    relationship?: Coding;
    context?: {
        reference?: Reference;
        code?: CodeableConcept[];
        text?: FhirString;
    }[];
    condition?: FhirString;
    periodType?: CodeableConcept[];
    period?: Period[];
    usePeriod?: Period[];
    text?: FhirString;
    linkId?: FhirString[];
    answer?: any[];
    securityLabelNumber?: FhirUnsignedInt[];
    valuedItem?: {
        entityCodeableConcept?: CodeableConcept;
        entityReference?: Reference;
        identifier?: Identifier;
        effectiveTime?: FhirDateTime;
        quantity?: Quantity;
        unitPrice?: Money;
        factor?: FhirDecimal;
        points?: FhirDecimal;
        net?: Money;
        payment?: FhirString;
        paymentDate?: FhirDateTime;
        responsible?: Reference;
        recipent?: Reference;
        linkId?: FhirString[];
        securityLabelNumber?: FhirUnsignedInt[];
    }[];

    constructor(data: Partial<ContractTermAsset> & { [key: string]: any } = {}) {
        // Handle type conversion
        if (data.type) {
            if (Array.isArray(data.type)) {
                this.type = data.type.map((typeData: any) =>
                    typeData instanceof CodeableConcept ? typeData : new CodeableConcept(typeData as any)
                );
            } else {
                // If type is a single object, convert it to array
                this.type = [(data.type as any) instanceof CodeableConcept ? data.type : new CodeableConcept(data.type as any)];
            }
        }

        Object.assign(this, {
            scope: data.scope,
            typeReference: data.typeReference,
            subType: data.subType,
            relationship: data.relationship,
            context: data.context,
            condition: data.condition,
            periodType: data.periodType,
            period: data.period,
            usePeriod: data.usePeriod,
            text: data.text,
            linkId: data.linkId,
            answer: data.answer,
            securityLabelNumber: data.securityLabelNumber,
            valuedItem: data.valuedItem
        });
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ContractTermAsset>${JSON.stringify(this)}</ContractTermAsset>`;
    }
}

export class ContractTermOffer {
    identifier?: Identifier;
    party?: {
        reference: Reference;
        role: CodeableConcept;
    };
    topic?: Reference;
    type?: CodeableConcept;
    decisionMode?: CodeableConcept[];
    answer?: {
        valueBoolean?: boolean;
        valueDecimal?: FhirDecimal;
        valueInteger?: number;
        valueDate?: FhirDate;
        valueDateTime?: FhirDateTime;
        valueTime?: FhirTime;
        valueString?: FhirString;
        valueUri?: FhirUri;
        valueAttachment?: Attachment;
        valueCoding?: Coding;
        valueQuantity?: Quantity;
        valueReference?: Reference;
    }[];
    text?: FhirString;
    linkId?: FhirString[];
    securityLabelNumber?: FhirUnsignedInt[];

    constructor(data: Partial<ContractTermOffer> & { [key: string]: any } = {}) {
        // Handle type conversion
        if (data.type && !(data.type instanceof CodeableConcept)) {
            this.type = new CodeableConcept(data.type as any);
        } else if (data.type) {
            this.type = data.type;
        }

        Object.assign(this, {
            identifier: data.identifier,
            party: data.party,
            topic: data.topic,
            decisionMode: data.decisionMode,
            answer: data.answer,
            text: data.text,
            linkId: data.linkId,
            securityLabelNumber: data.securityLabelNumber
        });
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ContractTermOffer>${JSON.stringify(this)}</ContractTermOffer>`;
    }
}


export class ContractTermAction {
    doNotPerform?: FhirBoolean;
    type: CodeableConcept;
    subject?: {
        reference: Reference;
        role: CodeableConcept;
    }[];
    intent: CodeableConcept;
    linkId?: FhirString[];
    status: CodeableConcept;
    context?: Reference;
    contextLinkId?: FhirString[];
    occurrenceDateTime?: FhirDateTime;
    occurrencePeriod?: Period;
    occurrenceTiming?: Timing;
    requester?: Reference[];
    requesterLinkId?: FhirString[];
    performerType?: CodeableConcept[];
    performerRole?: CodeableConcept[];
    performer?: Reference[];
    performerLinkId?: FhirString[];
    reason?: CodeableReference[];
    reasonReference?: Reference[];
    reasonLinkId?: FhirString[];
    note?: Annotation[];
    securityLabelNumber?: FhirUnsignedInt[];

    constructor(data: Partial<ContractTermAction> = {}) {
        this.type = data.type!;
        this.intent = data.intent!;
        this.status = data.status!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ContractTermAction>${JSON.stringify(this)}</ContractTermAction>`;
    }
}




export class ContractTerm {
    identifier?: Identifier;
    issued?: FhirDateTime;
    applies?: Period;
    topicCodeableConcept?: CodeableConcept;
    topicReference?: Reference;
    type?: CodeableConcept;
    subType?: CodeableConcept;
    text?: FhirString;
    securityLabel?: {
        number?: FhirUnsignedInt[];
        classification: CodeableConcept;
        category?: CodeableConcept[];
        control?: CodeableConcept[];
    }[];
    offer: ContractTermOffer;
    asset?: ContractTermAsset[];
    action?: ContractTermAction[];
    group?: any[];

    constructor(data: Partial<ContractTerm> & { [key: string]: any } = {}) {
        // Handle offer conversion
        if (data.offer && !(data.offer instanceof ContractTermOffer)) {
            this.offer = new ContractTermOffer(data.offer as any);
        } else {
            this.offer = data.offer!;
        }

        // Handle asset conversion
        if (data.asset) {
            this.asset = data.asset.map(assetData =>
                assetData instanceof ContractTermAsset ? assetData : new ContractTermAsset(assetData as any)
            );
        }

        // Handle identifier conversion
        if (data.identifier && !(data.identifier instanceof Identifier)) {
            this.identifier = new Identifier(data.identifier as any);
        } else if (data.identifier) {
            this.identifier = data.identifier;
        }

        Object.assign(this, {
            issued: data.issued,
            applies: data.applies,
            topicCodeableConcept: data.topicCodeableConcept,
            topicReference: data.topicReference,
            type: data.type,
            subType: data.subType,
            text: data.text,
            securityLabel: data.securityLabel,
            action: data.action,
            group: data.group
        });
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ContractTerm>${JSON.stringify(this)}</ContractTerm>`;
    }
}



export class Contract extends BaseFhirResource {
    resourceType: FhirResourceTypes = "Contract";
    identifier?: Identifier[];
    url?: FhirUri;
    version?: FhirString;
    status?: FhirCode;
    legalState?: CodeableConcept;
    instantiatesCannonical?: Reference;
    instantiatesUri?: FhirUri;
    contentDerivative?: CodeableConcept;
    issued?: FhirDateTime;
    applies?: Period;
    expirationType?: CodeableConcept;
    subject?: Reference[];
    authority?: Reference[];
    domain?: Reference[];
    site?: Reference[];
    name?: FhirString;
    title?: FhirString
    subtitle?: FhirString;
    alias?: FhirString[]
    author?: Reference;
    scope?: CodeableConcept;
    topicCodeableConcept?: CodeableConcept;
    topicReference?: Reference;
    type?: CodeableConcept;
    subType?: CodeableConcept[];
    contentDefinition?: ContentDefinition;
    term?: ContractTerm[];
    supportingInfo?: Reference[];
    relevantHistory?: Reference[];
    signer?: {
        type: Coding;
        party: Reference;
        signature: Signature[];
    }[]
    friendly?: {
        contentAttachment?: Attachment;
        contentReference?: Reference;
    }[];
    legal?: {
        contentAttachment?: Attachment;
        contentReference?: Reference;
    }[];
    rule?: {
        contentAttachment?: Attachment;
        contentReference?: Reference;
    }[];
    legallyBindingAttachment?: Attachment;
    legallyBindingReference?: Reference;

    constructor(data: Partial<Contract> & { [key: string]: any } = {}) {
        super(data as any);

        // Convert plain objects to proper instances where needed
        if (data.legalState && !(data.legalState instanceof CodeableConcept)) {
            this.legalState = new CodeableConcept(data.legalState as any);
        } else if (data.legalState) {
            this.legalState = data.legalState;
        }

        if (data.subject) {
            this.subject = data.subject.map(subjectData =>
                subjectData instanceof Reference ? subjectData : new Reference(subjectData as any)
            );
        }

        if (data.term) {
            this.term = data.term.map(termData =>
                termData instanceof ContractTerm ? termData : new ContractTerm(termData as any)
            );
        }

        // Copy other properties
        Object.assign(this, {
            identifier: data.identifier,
            url: data.url,
            version: data.version,
            status: data.status,
            instantiatesCannonical: data.instantiatesCannonical,
            instantiatesUri: data.instantiatesUri,
            contentDerivative: data.contentDerivative,
            issued: data.issued,
            applies: data.applies,
            expirationType: data.expirationType,
            authority: data.authority,
            domain: data.domain,
            site: data.site,
            name: data.name,
            title: data.title,
            subtitle: data.subtitle,
            alias: data.alias,
            author: data.author,
            scope: data.scope,
            topicCodeableConcept: data.topicCodeableConcept,
            topicReference: data.topicReference,
            type: data.type,
            subType: data.subType,
            contentDefinition: data.contentDefinition,
            supportingInfo: data.supportingInfo,
            relevantHistory: data.relevantHistory,
            signer: data.signer,
            friendly: data.friendly,
            legal: data.legal,
            rule: data.rule,
            legallyBindingAttachment: data.legallyBindingAttachment,
            legallyBindingReference: data.legallyBindingReference
        });
    }

    toJson(): Record<string, any> {
        const result = super.toJson();

        // Add Contract-specific fields with proper serialization
        if (this.identifier !== undefined) {
            result.identifier = this.identifier.map(i =>
                typeof i.toJson === 'function' ? i.toJson() : i
            );
        }
        if (this.url !== undefined) result.url = this.url;
        if (this.version !== undefined) result.version = this.version;
        if (this.status !== undefined) result.status = this.status;
        if (this.legalState !== undefined) result.legalState = this.legalState.toJson();
        if (this.issued !== undefined) result.issued = this.issued;
        if (this.subject !== undefined) {
            result.subject = this.subject.map(s =>
                typeof s.toJson === 'function' ? s.toJson() : s
            );
        }
        if (this.term !== undefined) {
            result.term = this.term.map(t =>
                typeof t.toJson === 'function' ? t.toJson() : t
            );
        }
        // Add other fields as needed...

        return result;
    }

    toXml(): String {
        return `<Contract>${JSON.stringify(this)}</Contract>`;
    }
}