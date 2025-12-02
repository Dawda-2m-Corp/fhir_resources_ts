import { BaseFhirResource } from "./baseResource";
import { FhirCanonical, FhirCode, FhirDateTime, FhirResourceTypes, FhirString, FhirUri } from "./dataTypes";
import { Annotation } from "./dataTypes/annotation";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { CodeableReference } from "./dataTypes/codeableReference";
import { Period } from "./dataTypes/period";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

// Complex nested class for CarePlan activity
export class CarePlanActivity {
    performedActivity?: CodeableReference[];
    progress?: Annotation[];
    plannedActivityReference?: Reference;

    constructor(data: any = {}) {
        if (data.performedActivity !== undefined) {
            this.performedActivity = data.performedActivity.map((pa: any) =>
                pa instanceof CodeableReference ? pa : new CodeableReference(pa)
            );
        }
        if (data.progress !== undefined) {
            this.progress = data.progress.map((p: any) =>
                p instanceof Annotation ? p : new Annotation(p)
            );
        }
        if (data.plannedActivityReference !== undefined) {
            this.plannedActivityReference = data.plannedActivityReference instanceof Reference
                ? data.plannedActivityReference
                : new Reference(data.plannedActivityReference);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.performedActivity !== undefined) {
            result.performedActivity = this.performedActivity.map(pa => pa.toJson());
        }
        if (this.progress !== undefined) {
            result.progress = this.progress.map(p => p.toJson());
        }
        if (this.plannedActivityReference !== undefined) {
            result.plannedActivityReference = this.plannedActivityReference.toJson();
        }

        return result;
    }
}

export interface CarePlanConstructorData {
    id?: string;
    identifier?: Identifier[];
    instantiatesCanonical?: FhirCanonical[] | string[];
    instantiatesUri?: FhirUri[] | string[];
    basedOn?: Reference[] | { reference: string }[];
    replaces?: Reference[] | { reference: string }[];
    partOf?: Reference[] | { reference: string }[];
    status: FhirCode | string;
    intent: FhirCode | string;
    category?: CodeableConcept[] | { coding: any[] }[];
    title?: FhirString | string;
    description?: FhirString | string;
    subject: Reference | { reference: string };
    encounter?: Reference | { reference: string };
    period?: Period | { start?: string; end?: string };
    created?: FhirDateTime | string;
    custodian?: Reference | { reference: string };
    contributor?: Reference[] | { reference: string }[];
    careTeam?: Reference[] | { reference: string }[];
    addresses?: CodeableReference[] | any[];
    supportingInfo?: Reference[] | { reference: string }[];
    goal?: Reference[] | { reference: string }[];
    activity?: CarePlanActivity[] | any[];
    note?: Annotation[] | any[];
}

export class CarePlan extends BaseFhirResource {
    resourceType: FhirResourceTypes = "CarePlan";
    identifier?: Identifier[];
    instantiatesCanonical?: FhirCanonical[];
    instantiatesUri?: FhirUri[];
    basedOn?: Reference[];
    replaces?: Reference[];
    partOf?: Reference[];
    status: FhirCode;
    intent: FhirCode;
    category?: CodeableConcept[];
    title?: FhirString;
    description?: FhirString;
    subject: Reference;
    encounter?: Reference;
    period?: Period;
    created?: FhirDateTime;
    custodian?: Reference;
    contributor?: Reference[];
    careTeam?: Reference[];
    addresses?: CodeableReference[];
    supportingInfo?: Reference[];
    goal?: Reference[];
    activity?: CarePlanActivity[];
    note?: Annotation[];

    constructor(data: CarePlanConstructorData) {
        super(data as any);
        this.status = data.status as any;
        this.intent = data.intent as any;

        this.subject = data.subject instanceof Reference
            ? data.subject
            : new Reference(data.subject as any);

        if (data.identifier !== undefined) {
            this.identifier = data.identifier;
        }
        if (data.instantiatesCanonical !== undefined) {
            this.instantiatesCanonical = data.instantiatesCanonical as any;
        }
        if (data.instantiatesUri !== undefined) {
            this.instantiatesUri = data.instantiatesUri as any;
        }
        if (data.basedOn !== undefined) {
            this.basedOn = data.basedOn.map((bo: any) =>
                bo instanceof Reference ? bo : new Reference(bo as any)
            );
        }
        if (data.replaces !== undefined) {
            this.replaces = data.replaces.map((r: any) =>
                r instanceof Reference ? r : new Reference(r as any)
            );
        }
        if (data.partOf !== undefined) {
            this.partOf = data.partOf.map((po: any) =>
                po instanceof Reference ? po : new Reference(po as any)
            );
        }
        if (data.category !== undefined) {
            this.category = data.category.map((c: any) =>
                c instanceof CodeableConcept ? c : new CodeableConcept(c as any)
            );
        }
        if (data.title !== undefined) {
            this.title = data.title as any;
        }
        if (data.description !== undefined) {
            this.description = data.description as any;
        }
        if (data.encounter !== undefined) {
            this.encounter = data.encounter instanceof Reference
                ? data.encounter
                : new Reference(data.encounter as any);
        }
        if (data.period !== undefined) {
            this.period = data.period instanceof Period ? data.period : new Period(data.period);
        }
        if (data.created !== undefined) {
            this.created = data.created as any;
        }
        if (data.custodian !== undefined) {
            this.custodian = data.custodian instanceof Reference
                ? data.custodian
                : new Reference(data.custodian as any);
        }
        if (data.contributor !== undefined) {
            this.contributor = data.contributor.map((c: any) =>
                c instanceof Reference ? c : new Reference(c as any)
            );
        }
        if (data.careTeam !== undefined) {
            this.careTeam = data.careTeam.map((ct: any) =>
                ct instanceof Reference ? ct : new Reference(ct as any)
            );
        }
        if (data.addresses !== undefined) {
            this.addresses = data.addresses.map((a: any) =>
                a instanceof CodeableReference ? a : new CodeableReference(a)
            );
        }
        if (data.supportingInfo !== undefined) {
            this.supportingInfo = data.supportingInfo.map((si: any) =>
                si instanceof Reference ? si : new Reference(si as any)
            );
        }
        if (data.goal !== undefined) {
            this.goal = data.goal.map((g: any) =>
                g instanceof Reference ? g : new Reference(g as any)
            );
        }
        if (data.activity !== undefined) {
            this.activity = data.activity.map((a: any) =>
                a instanceof CarePlanActivity ? a : new CarePlanActivity(a)
            );
        }
        if (data.note !== undefined) {
            this.note = data.note.map((n: any) =>
                n instanceof Annotation ? n : new Annotation(n)
            );
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJson()
        };

        if (this.identifier !== undefined) result.identifier = this.identifier.map(id => id.toJson());
        if (this.instantiatesCanonical !== undefined) result.instantiatesCanonical = this.instantiatesCanonical;
        if (this.instantiatesUri !== undefined) result.instantiatesUri = this.instantiatesUri;
        if (this.basedOn !== undefined) result.basedOn = this.basedOn.map(bo => bo.toJson());
        if (this.replaces !== undefined) result.replaces = this.replaces.map(r => r.toJson());
        if (this.partOf !== undefined) result.partOf = this.partOf.map(po => po.toJson());
        result.status = this.status;
        result.intent = this.intent;
        if (this.category !== undefined) result.category = this.category.map(c => c.toJson());
        if (this.title !== undefined) result.title = this.title;
        if (this.description !== undefined) result.description = this.description;
        result.subject = this.subject.toJson();
        if (this.encounter !== undefined) result.encounter = this.encounter.toJson();
        if (this.period !== undefined) result.period = this.period.toJson();
        if (this.created !== undefined) result.created = this.created;
        if (this.custodian !== undefined) result.custodian = this.custodian.toJson();
        if (this.contributor !== undefined) result.contributor = this.contributor.map(c => c.toJson());
        if (this.careTeam !== undefined) result.careTeam = this.careTeam.map(ct => ct.toJson());
        if (this.addresses !== undefined) result.addresses = this.addresses.map(a => a.toJson());
        if (this.supportingInfo !== undefined) result.supportingInfo = this.supportingInfo.map(si => si.toJson());
        if (this.goal !== undefined) result.goal = this.goal.map(g => g.toJson());
        if (this.activity !== undefined) result.activity = this.activity.map(a => a.toJson());
        if (this.note !== undefined) result.note = this.note.map(n => n.toJson());

        return result;
    }

    toXml(): string {
        let xml = `<CarePlan>`;
        xml += super.toXml();

        if (this.identifier !== undefined) {
            this.identifier.forEach(id => {
                xml += `<identifier>${id.toXml()}</identifier>`;
            });
        }
        if (this.instantiatesCanonical !== undefined) {
            this.instantiatesCanonical.forEach(ic => {
                xml += `<instantiatesCanonical value="${ic}"/>`;
            });
        }
        if (this.instantiatesUri !== undefined) {
            this.instantiatesUri.forEach(iu => {
                xml += `<instantiatesUri value="${iu}"/>`;
            });
        }
        if (this.basedOn !== undefined) {
            this.basedOn.forEach(bo => {
                xml += `<basedOn>${bo.toXml()}</basedOn>`;
            });
        }
        if (this.replaces !== undefined) {
            this.replaces.forEach(r => {
                xml += `<replaces>${r.toXml()}</replaces>`;
            });
        }
        if (this.partOf !== undefined) {
            this.partOf.forEach(po => {
                xml += `<partOf>${po.toXml()}</partOf>`;
            });
        }
        xml += `<status value="${this.status}"/>`;
        xml += `<intent value="${this.intent}"/>`;
        if (this.category !== undefined) {
            this.category.forEach(c => {
                xml += `<category>${c.toXml()}</category>`;
            });
        }
        if (this.title !== undefined) {
            xml += `<title value="${this.title}"/>`;
        }
        if (this.description !== undefined) {
            xml += `<description value="${this.description}"/>`;
        }
        xml += `<subject>${this.subject.toXml()}</subject>`;
        if (this.encounter !== undefined) {
            xml += `<encounter>${this.encounter.toXml()}</encounter>`;
        }
        if (this.period !== undefined) {
            xml += `<period>${this.period.toXml()}</period>`;
        }
        if (this.created !== undefined) {
            xml += `<created value="${this.created}"/>`;
        }
        if (this.custodian !== undefined) {
            xml += `<custodian>${this.custodian.toXml()}</custodian>`;
        }
        if (this.contributor !== undefined) {
            this.contributor.forEach(c => {
                xml += `<contributor>${c.toXml()}</contributor>`;
            });
        }
        if (this.careTeam !== undefined) {
            this.careTeam.forEach(ct => {
                xml += `<careTeam>${ct.toXml()}</careTeam>`;
            });
        }
        if (this.addresses !== undefined) {
            this.addresses.forEach(a => {
                xml += `<addresses>${a.toXml()}</addresses>`;
            });
        }
        if (this.supportingInfo !== undefined) {
            this.supportingInfo.forEach(si => {
                xml += `<supportingInfo>${si.toXml()}</supportingInfo>`;
            });
        }
        if (this.goal !== undefined) {
            this.goal.forEach(g => {
                xml += `<goal>${g.toXml()}</goal>`;
            });
        }
        if (this.activity !== undefined) {
            this.activity.forEach(activity => {
                xml += `<activity>`;
                // XML serialization for activity would go here
                xml += `</activity>`;
            });
        }
        if (this.note !== undefined) {
            this.note.forEach(n => {
                xml += `<note>${n.toXml()}</note>`;
            });
        }

        xml += `</CarePlan>`;
        return xml;
    }
}