import { BaseFhirResource } from "./baseResource";
import { FhirBoolean, FhirCanonical, FhirCode, FhirDate, FhirDateTime, FhirMakeDown, FhirResourceTypes, FhirString, FhirUri } from "./dataTypes";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { Coding } from "./dataTypes/coding";
import { ContactDetail } from "./dataTypes/contactDetail";
import { Expression } from "./dataTypes/expression";
import { MonetaryComponent } from "./dataTypes/monetaryComponent";
import { Period } from "./dataTypes/period";
import { RelatedArtifact } from "./dataTypes/relatedArtifact";
import { UsageContext } from "./dataTypes/usageContext";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

// Nested class for ChargeItemDefinition applicability
export class ChargeItemDefinitionApplicability {
    condition?: Expression;
    effectivePeriod?: Period;
    relatedArtifact?: RelatedArtifact;

    constructor(data: any) {
        if (data.condition !== undefined) {
            this.condition = data.condition instanceof Expression ? data.condition : new Expression(data.condition);
        }
        if (data.effectivePeriod !== undefined) {
            this.effectivePeriod = data.effectivePeriod instanceof Period ? data.effectivePeriod : new Period(data.effectivePeriod);
        }
        if (data.relatedArtifact !== undefined) {
            this.relatedArtifact = data.relatedArtifact instanceof RelatedArtifact ? data.relatedArtifact : new RelatedArtifact(data.relatedArtifact);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.condition !== undefined) result.condition = this.condition.toJson();
        if (this.effectivePeriod !== undefined) result.effectivePeriod = this.effectivePeriod.toJson();
        if (this.relatedArtifact !== undefined) result.relatedArtifact = this.relatedArtifact.toJson();
        return result;
    }

    toXml(): string {
        let xml = '<applicability>';
        if (this.condition !== undefined) xml += `<condition>${this.condition.toXml()}</condition>`;
        if (this.effectivePeriod !== undefined) xml += `<effectivePeriod>${this.effectivePeriod.toXml()}</effectivePeriod>`;
        if (this.relatedArtifact !== undefined) xml += `<relatedArtifact>${this.relatedArtifact.toXml()}</relatedArtifact>`;
        xml += '</applicability>';
        return xml;
    }
}

// Nested class for ChargeItemDefinition property group
export class ChargeItemDefinitionPropertyGroup {
    applicability?: ChargeItemDefinitionApplicability[];
    priceComponent?: MonetaryComponent[];

    constructor(data: any) {
        if (data.applicability !== undefined) {
            this.applicability = Array.isArray(data.applicability)
                ? data.applicability.map((a: any) => new ChargeItemDefinitionApplicability(a))
                : [new ChargeItemDefinitionApplicability(data.applicability)];
        }
        if (data.priceComponent !== undefined) {
            this.priceComponent = Array.isArray(data.priceComponent)
                ? data.priceComponent.map((pc: any) => pc instanceof MonetaryComponent ? pc : new MonetaryComponent(pc))
                : [data.priceComponent instanceof MonetaryComponent ? data.priceComponent : new MonetaryComponent(data.priceComponent)];
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.applicability !== undefined) result.applicability = this.applicability.map(a => a.toJson());
        if (this.priceComponent !== undefined) result.priceComponent = this.priceComponent.map(pc => pc.toJson());
        return result;
    }

    toXml(): string {
        let xml = '<propertyGroup>';
        if (this.applicability !== undefined) {
            this.applicability.forEach(a => { xml += a.toXml(); });
        }
        if (this.priceComponent !== undefined) {
            this.priceComponent.forEach(pc => { xml += `<priceComponent>${pc.toXml()}</priceComponent>`; });
        }
        xml += '</propertyGroup>';
        return xml;
    }
}

// Constructor interface for ChargeItemDefinition
export interface ChargeItemDefinitionConstructorData {
    resourceType?: FhirResourceTypes;
    id?: FhirString;
    url?: FhirUri | string;
    identifier?: Identifier[] | any[] | any;
    version?: FhirString | string;
    versionAlgorithmString?: FhirString | string;
    versionAlgorithmCoding?: Coding | any;
    name?: FhirString | string;
    title?: FhirString | string;
    derivedFromUri?: FhirUri[] | string[] | string;
    partOf?: FhirCanonical[] | string[] | string;
    replaces?: FhirCanonical[] | string[] | string;
    status?: FhirCode | string;
    experimental?: FhirBoolean | boolean;
    date?: FhirDateTime | string;
    publisher?: FhirString | string;
    contact?: ContactDetail[] | any[] | any;
    description?: FhirMakeDown | string;
    useContext?: UsageContext[] | any[] | any;
    jurisdiction?: CodeableConcept[] | any[] | any;
    purpose?: FhirMakeDown | string;
    copyright?: FhirMakeDown | string;
    copyrightLabel?: FhirString | string;
    approvalDate?: FhirDate | string;
    lastReviewDate?: FhirDate | string;
    code?: CodeableConcept | any;
    instance?: Reference[] | any[] | any;
    applicability?: ChargeItemDefinitionApplicability[] | any[] | any;
    propertyGroup?: ChargeItemDefinitionPropertyGroup[] | any[] | any;
}

// Main ChargeItemDefinition resource class
export class ChargeItemDefinition extends BaseFhirResource {
    resourceType: FhirResourceTypes = 'ChargeItemDefinition';
    url?: FhirUri;
    identifier?: Identifier[];
    version?: FhirString;
    versionAlgorithmString?: FhirString;
    versionAlgorithmCoding?: Coding;
    name?: FhirString;
    title?: FhirString;
    derivedFromUri?: FhirUri[];
    partOf?: FhirCanonical[];
    replaces?: FhirCanonical[];
    status: FhirCode;
    experimental?: FhirBoolean;
    date?: FhirDateTime;
    publisher?: FhirString;
    contact?: ContactDetail[];
    description?: FhirMakeDown;
    useContext?: UsageContext[];
    jurisdiction?: CodeableConcept[];
    purpose?: FhirMakeDown;
    copyright?: FhirMakeDown;
    copyrightLabel?: FhirString;
    approvalDate?: FhirDate;
    lastReviewDate?: FhirDate;
    code?: CodeableConcept;
    instance?: Reference[];
    applicability?: ChargeItemDefinitionApplicability[];
    propertyGroup?: ChargeItemDefinitionPropertyGroup[];

    constructor(data: ChargeItemDefinitionConstructorData) {
        super(data as any);

        this.status = (data.status || 'unknown') as FhirCode; if (data.url !== undefined) {
            this.url = data.url as FhirUri;
        }
        if (data.identifier !== undefined) {
            this.identifier = Array.isArray(data.identifier)
                ? data.identifier.map((i: any) => i instanceof Identifier ? i : new Identifier(i))
                : [data.identifier instanceof Identifier ? data.identifier : new Identifier(data.identifier)];
        }
        if (data.version !== undefined) {
            this.version = data.version as FhirString;
        }
        if (data.versionAlgorithmString !== undefined) {
            this.versionAlgorithmString = data.versionAlgorithmString as FhirString;
        }
        if (data.versionAlgorithmCoding !== undefined) {
            this.versionAlgorithmCoding = data.versionAlgorithmCoding instanceof Coding ? data.versionAlgorithmCoding : new Coding(data.versionAlgorithmCoding);
        }
        if (data.name !== undefined) {
            this.name = data.name as FhirString;
        }
        if (data.title !== undefined) {
            this.title = data.title as FhirString;
        }
        if (data.derivedFromUri !== undefined) {
            this.derivedFromUri = Array.isArray(data.derivedFromUri) ? data.derivedFromUri as FhirUri[] : [data.derivedFromUri as FhirUri];
        }
        if (data.partOf !== undefined) {
            this.partOf = Array.isArray(data.partOf) ? data.partOf as FhirCanonical[] : [data.partOf as FhirCanonical];
        }
        if (data.replaces !== undefined) {
            this.replaces = Array.isArray(data.replaces) ? data.replaces as FhirCanonical[] : [data.replaces as FhirCanonical];
        }
        if (data.experimental !== undefined) {
            this.experimental = data.experimental as FhirBoolean;
        }
        if (data.date !== undefined) {
            this.date = data.date as FhirDateTime;
        }
        if (data.publisher !== undefined) {
            this.publisher = data.publisher as FhirString;
        }
        if (data.contact !== undefined) {
            this.contact = Array.isArray(data.contact)
                ? data.contact.map((c: any) => c instanceof ContactDetail ? c : new ContactDetail(c))
                : [data.contact instanceof ContactDetail ? data.contact : new ContactDetail(data.contact)];
        }
        if (data.description !== undefined) {
            this.description = data.description as FhirMakeDown;
        }
        if (data.useContext !== undefined) {
            this.useContext = Array.isArray(data.useContext)
                ? data.useContext.map((uc: any) => uc instanceof UsageContext ? uc : new UsageContext(uc))
                : [data.useContext instanceof UsageContext ? data.useContext : new UsageContext(data.useContext)];
        }
        if (data.jurisdiction !== undefined) {
            this.jurisdiction = Array.isArray(data.jurisdiction)
                ? data.jurisdiction.map((j: any) => j instanceof CodeableConcept ? j : new CodeableConcept(j))
                : [data.jurisdiction instanceof CodeableConcept ? data.jurisdiction : new CodeableConcept(data.jurisdiction)];
        }
        if (data.purpose !== undefined) {
            this.purpose = data.purpose as FhirMakeDown;
        }
        if (data.copyright !== undefined) {
            this.copyright = data.copyright as FhirMakeDown;
        }
        if (data.copyrightLabel !== undefined) {
            this.copyrightLabel = data.copyrightLabel as FhirString;
        }
        if (data.approvalDate !== undefined) {
            this.approvalDate = data.approvalDate as FhirDate;
        }
        if (data.lastReviewDate !== undefined) {
            this.lastReviewDate = data.lastReviewDate as FhirDate;
        }
        if (data.code !== undefined) {
            this.code = data.code instanceof CodeableConcept ? data.code : new CodeableConcept(data.code);
        }
        if (data.instance !== undefined) {
            this.instance = Array.isArray(data.instance)
                ? data.instance.map((i: any) => i instanceof Reference ? i : new Reference(i))
                : [data.instance instanceof Reference ? data.instance : new Reference(data.instance)];
        }
        if (data.applicability !== undefined) {
            this.applicability = Array.isArray(data.applicability)
                ? data.applicability.map((a: any) => new ChargeItemDefinitionApplicability(a))
                : [new ChargeItemDefinitionApplicability(data.applicability)];
        }
        if (data.propertyGroup !== undefined) {
            this.propertyGroup = Array.isArray(data.propertyGroup)
                ? data.propertyGroup.map((pg: any) => new ChargeItemDefinitionPropertyGroup(pg))
                : [new ChargeItemDefinitionPropertyGroup(data.propertyGroup)];
        }
    }

    toJson(): Record<string, any> {
        const result = super.toJson();

        result.status = this.status;
        if (this.url !== undefined) result.url = this.url;
        if (this.identifier !== undefined) result.identifier = this.identifier.map(i => i.toJson());
        if (this.version !== undefined) result.version = this.version;
        if (this.versionAlgorithmString !== undefined) result.versionAlgorithmString = this.versionAlgorithmString;
        if (this.versionAlgorithmCoding !== undefined) result.versionAlgorithmCoding = this.versionAlgorithmCoding.toJson();
        if (this.name !== undefined) result.name = this.name;
        if (this.title !== undefined) result.title = this.title;
        if (this.derivedFromUri !== undefined) result.derivedFromUri = this.derivedFromUri;
        if (this.partOf !== undefined) result.partOf = this.partOf;
        if (this.replaces !== undefined) result.replaces = this.replaces;
        if (this.experimental !== undefined) result.experimental = this.experimental;
        if (this.date !== undefined) result.date = this.date;
        if (this.publisher !== undefined) result.publisher = this.publisher;
        if (this.contact !== undefined) result.contact = this.contact;
        if (this.description !== undefined) result.description = this.description;
        if (this.useContext !== undefined) result.useContext = this.useContext;
        if (this.jurisdiction !== undefined) result.jurisdiction = this.jurisdiction.map(j => j.toJson());
        if (this.purpose !== undefined) result.purpose = this.purpose;
        if (this.copyright !== undefined) result.copyright = this.copyright;
        if (this.copyrightLabel !== undefined) result.copyrightLabel = this.copyrightLabel;
        if (this.approvalDate !== undefined) result.approvalDate = this.approvalDate;
        if (this.lastReviewDate !== undefined) result.lastReviewDate = this.lastReviewDate;
        if (this.code !== undefined) result.code = this.code.toJson();
        if (this.instance !== undefined) result.instance = this.instance.map(i => i.toJson());
        if (this.applicability !== undefined) result.applicability = this.applicability.map(a => a.toJson());
        if (this.propertyGroup !== undefined) result.propertyGroup = this.propertyGroup.map(pg => pg.toJson());

        return result;
    }

    toXml(): string {
        let xml = `<ChargeItemDefinition xmlns="http://hl7.org/fhir">`;

        if (this.id !== undefined) xml += `<id value="${this.id}"/>`;

        if (this.url !== undefined) xml += `<url value="${this.url}"/>`;
        if (this.identifier !== undefined) {
            this.identifier.forEach(i => { xml += `<identifier>${i.toXml()}</identifier>`; });
        }
        if (this.version !== undefined) xml += `<version value="${this.version}"/>`;
        if (this.versionAlgorithmString !== undefined) xml += `<versionAlgorithmString value="${this.versionAlgorithmString}"/>`;
        if (this.versionAlgorithmCoding !== undefined) xml += `<versionAlgorithmCoding>${this.versionAlgorithmCoding.toXml()}</versionAlgorithmCoding>`;
        if (this.name !== undefined) xml += `<name value="${this.name}"/>`;
        if (this.title !== undefined) xml += `<title value="${this.title}"/>`;
        if (this.derivedFromUri !== undefined) {
            this.derivedFromUri.forEach(uri => { xml += `<derivedFromUri value="${uri}"/>`; });
        }
        if (this.partOf !== undefined) {
            this.partOf.forEach(po => { xml += `<partOf value="${po}"/>`; });
        }
        if (this.replaces !== undefined) {
            this.replaces.forEach(r => { xml += `<replaces value="${r}"/>`; });
        }
        xml += `<status value="${this.status}"/>`;
        if (this.experimental !== undefined) xml += `<experimental value="${this.experimental}"/>`;
        if (this.date !== undefined) xml += `<date value="${this.date}"/>`;
        if (this.publisher !== undefined) xml += `<publisher value="${this.publisher}"/>`;
        if (this.contact !== undefined) {
            this.contact.forEach(c => { xml += `<contact>${JSON.stringify(c)}</contact>`; });
        }
        if (this.description !== undefined) xml += `<description value="${this.description}"/>`;
        if (this.useContext !== undefined) {
            this.useContext.forEach(uc => { xml += `<useContext>${JSON.stringify(uc)}</useContext>`; });
        }
        if (this.jurisdiction !== undefined) {
            this.jurisdiction.forEach(j => { xml += `<jurisdiction>${j.toXml()}</jurisdiction>`; });
        }
        if (this.purpose !== undefined) xml += `<purpose value="${this.purpose}"/>`;
        if (this.copyright !== undefined) xml += `<copyright value="${this.copyright}"/>`;
        if (this.copyrightLabel !== undefined) xml += `<copyrightLabel value="${this.copyrightLabel}"/>`;
        if (this.approvalDate !== undefined) xml += `<approvalDate value="${this.approvalDate}"/>`;
        if (this.lastReviewDate !== undefined) xml += `<lastReviewDate value="${this.lastReviewDate}"/>`;
        if (this.code !== undefined) xml += `<code>${this.code.toXml()}</code>`;
        if (this.instance !== undefined) {
            this.instance.forEach(i => { xml += `<instance>${i.toXml()}</instance>`; });
        }
        if (this.applicability !== undefined) {
            this.applicability.forEach(a => { xml += a.toXml(); });
        }
        if (this.propertyGroup !== undefined) {
            this.propertyGroup.forEach(pg => { xml += pg.toXml(); });
        }

        xml += '</ChargeItemDefinition>';
        return xml;
    }

    static fromJson(json: Record<string, any>): ChargeItemDefinition {
        return new ChargeItemDefinition(json);
    }
}