import { BaseFhirResource } from "./baseResource";
import { FhirCode, FhirDateTime, FhirString, FhirUri } from "./dataTypes";
import { Annotation } from "./dataTypes/annotation";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { Period } from "./dataTypes/period";
import { Quantity } from "./dataTypes/quantity";
import { Timing } from "./dataTypes/timing";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

// Interface for ChargeItem constructor data that allows plain objects
interface ChargeItemConstructorData extends Partial<Omit<ChargeItem, 'code' | 'subject' | 'quantity' | 'note'>> {
    status: FhirCode;
    code: CodeableConcept | any;
    subject: Reference | any;
    quantity?: Quantity | any;
    note?: (Annotation | any)[];
}


export class ChargeItemPerformer {
    function?: CodeableConcept;
    actor: Reference;

    constructor(data: Partial<ChargeItemPerformer> = {}) {
        this.actor = data.actor!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): String {
        return `<ChargeItemPerformer>${JSON.stringify(this)}</ChargeItemPerformer>`;
    }
}

export class ChargeItem extends BaseFhirResource {
    resourceType: 'ChargeItem' = 'ChargeItem';
    identifier?: Identifier[];
    definitionUri?: FhirUri[];
    definitionCanonical?: FhirUri[];
    status: FhirCode;
    partOf?: Reference;
    code: CodeableConcept;
    subject: Reference;
    encounter?: Reference;
    occurrenceDateTime?: FhirDateTime;
    occurrencePeriod?: Period;
    occurenceTiming?: Timing;
    performer?: ChargeItemPerformer[];
    performingOrganization?: Reference;
    requestingOrganization?: Reference;
    costCenter?: Reference;
    quantity?: Quantity;
    bodysite?: CodeableConcept[];
    unitPriceComponent?: Quantity;
    totalPriceComponent?: Quantity;
    overrideReason?: FhirString;
    enterer?: Reference;
    enteredDate?: FhirDateTime;
    reason?: CodeableConcept[];
    service?: Reference[];
    productReference?: Reference;
    productCodeableConcept?: CodeableConcept;
    account?: Reference[];
    note?: Annotation[];
    supportingInformation?: Reference[];

    constructor(data: ChargeItemConstructorData) {
        super(data as any);

        this.status = data.status!;
        this.code = data.code instanceof CodeableConcept ? data.code : new CodeableConcept(data.code as any);
        this.subject = data.subject instanceof Reference ? data.subject : new Reference(data.subject as any);

        if (data.quantity && !(data.quantity instanceof Quantity)) {
            this.quantity = new Quantity(data.quantity as any);
        } else if (data.quantity) {
            this.quantity = data.quantity;
        }

        if (data.note) {
            this.note = data.note.map(noteData =>
                noteData instanceof Annotation ? noteData : new Annotation(noteData as any)
            );
        }

        Object.assign(this, {
            identifier: data.identifier,
            definitionUri: data.definitionUri,
            definitionCanonical: data.definitionCanonical,
            partOf: data.partOf,
            encounter: data.encounter,
            occurrenceDateTime: data.occurrenceDateTime,
            occurrencePeriod: data.occurrencePeriod,
            occurenceTiming: data.occurenceTiming,
            performer: data.performer,
            performingOrganization: data.performingOrganization,
            requestingOrganization: data.requestingOrganization,
            costCenter: data.costCenter,
            bodysite: data.bodysite,
            unitPriceComponent: data.unitPriceComponent,
            totalPriceComponent: data.totalPriceComponent,
            overrideReason: data.overrideReason,
            enterer: data.enterer,
            enteredDate: data.enteredDate,
            reason: data.reason,
            service: data.service,
            productReference: data.productReference,
            productCodeableConcept: data.productCodeableConcept,
            account: data.account,
            supportingInformation: data.supportingInformation
        });
    }

    toJson(): Record<string, any> {
        const result = super.toJson();

        if (this.identifier !== undefined) result.identifier = this.identifier;
        if (this.definitionUri !== undefined) result.definitionUri = this.definitionUri;
        if (this.definitionCanonical !== undefined) result.definitionCanonical = this.definitionCanonical;
        result.status = this.status;
        if (this.partOf !== undefined) result.partOf = this.partOf;
        result.code = typeof this.code.toJson === 'function' ? this.code.toJson() : this.code;
        result.subject = typeof this.subject.toJson === 'function' ? this.subject.toJson() : this.subject;
        if (this.encounter !== undefined) result.encounter = this.encounter;
        if (this.occurrenceDateTime !== undefined) result.occurrenceDateTime = this.occurrenceDateTime;
        if (this.occurrencePeriod !== undefined) result.occurrencePeriod = this.occurrencePeriod.toJson();
        if (this.occurenceTiming !== undefined) result.occurenceTiming = this.occurenceTiming.toJson();
        if (this.performer !== undefined) {
            result.performer = this.performer.map(p =>
                typeof p.toJson === 'function' ? p.toJson() : p
            );
        }
        if (this.performingOrganization !== undefined) result.performingOrganization = this.performingOrganization;
        if (this.requestingOrganization !== undefined) result.requestingOrganization = this.requestingOrganization;
        if (this.costCenter !== undefined) result.costCenter = this.costCenter;
        if (this.quantity !== undefined) result.quantity = this.quantity.toJson();
        if (this.bodysite !== undefined) {
            result.bodysite = this.bodysite.map(bs =>
                typeof bs.toJson === 'function' ? bs.toJson() : bs
            );
        }
        if (this.unitPriceComponent !== undefined) result.unitPriceComponent = this.unitPriceComponent.toJson();
        if (this.totalPriceComponent !== undefined) result.totalPriceComponent = this.totalPriceComponent.toJson();
        if (this.overrideReason !== undefined) result.overrideReason = this.overrideReason;
        if (this.enterer !== undefined) result.enterer = this.enterer;
        if (this.enteredDate !== undefined) result.enteredDate = this.enteredDate;
        if (this.reason !== undefined) {
            result.reason = this.reason.map(r =>
                typeof r.toJson === 'function' ? r.toJson() : r
            );
        }
        if (this.service !== undefined) {
            result.service = this.service.map(s =>
                typeof s.toJson === 'function' ? s.toJson() : s
            );
        }
        if (this.productReference !== undefined) result.productReference = this.productReference;
        if (this.productCodeableConcept !== undefined) {
            result.productCodeableConcept = typeof this.productCodeableConcept.toJson === 'function'
                ? this.productCodeableConcept.toJson()
                : this.productCodeableConcept;
        }
        if (this.account !== undefined) {
            result.account = this.account.map(a =>
                typeof a.toJson === 'function' ? a.toJson() : a
            );
        }
        if (this.note !== undefined) {
            result.note = this.note.map(n =>
                typeof n.toJson === 'function' ? n.toJson() : n
            );
        }
        if (this.supportingInformation !== undefined) {
            result.supportingInformation = this.supportingInformation.map(si =>
                typeof si.toJson === 'function' ? si.toJson() : si
            );
        }

        return result;
    }

    toXml(): String {
        return `<ChargeItem>${JSON.stringify(this)}</ChargeItem>`;
    }
}