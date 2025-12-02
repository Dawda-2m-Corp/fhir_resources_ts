import { BaseFhirResource } from "./baseResource";
import { FhirDate, FhirDateTime, FhirMakeDown, FhirPositiveInt, FhirResourceTypes, FhirString } from "./dataTypes";
import { Annotation } from "./dataTypes/annotation";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { MonetaryComponent } from "./dataTypes/monetaryComponent";
import { Money } from "./dataTypes/money";
import { Period } from "./dataTypes/period";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

export class InvoiceParticipant {
    role?: CodeableConcept;
    actor: Reference;

    constructor(data: InvoiceParticipant) {
        this.actor = data.actor;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        return {
            ...this,
        };
    }

    toXml(): string {
        let xml = `<InvoiceParticipant>`;
        if (this.role !== undefined) {
            xml += `<role>`;
            xml += this.role.toXml();
            xml += `</role>`;
        }
        xml += `<actor>`;
        xml += this.actor.toXml();
        xml += `</actor>`;
        xml += `</InvoiceParticipant>`;
        return xml;
    }
}

export interface InvoiceLineItemConstructorData {
    sequence?: FhirPositiveInt | number;
    serviceDate?: FhirDate | string;
    servicePeriod?: Period;
    chargeItemReference?: Reference | { reference: string };
    chargeItemCodeableConcept?: CodeableConcept;
    priceComponent?: MonetaryComponent[];
}

export class InvoiceLineItem {
    sequence?: FhirPositiveInt;
    serviceDate?: FhirDate;
    servicePeriod?: Period;
    chargeItemReference?: Reference;
    chargeItemCodeableConcept?: CodeableConcept;
    priceComponent?: MonetaryComponent[];

    constructor(data: InvoiceLineItemConstructorData) {
        if (data.sequence !== undefined) {
            this.sequence = data.sequence as any;
        }
        if (data.serviceDate !== undefined) {
            this.serviceDate = data.serviceDate as any;
        }
        if (data.servicePeriod !== undefined) {
            this.servicePeriod = data.servicePeriod;
        }
        if (data.chargeItemReference !== undefined) {
            this.chargeItemReference = data.chargeItemReference instanceof Reference
                ? data.chargeItemReference
                : new Reference(data.chargeItemReference as any);
        }
        if (data.chargeItemCodeableConcept !== undefined) {
            this.chargeItemCodeableConcept = data.chargeItemCodeableConcept;
        }
        if (data.priceComponent !== undefined) {
            this.priceComponent = data.priceComponent;
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.sequence !== undefined) result.sequence = this.sequence;
        if (this.serviceDate !== undefined) result.serviceDate = this.serviceDate;
        if (this.servicePeriod !== undefined) result.servicePeriod = this.servicePeriod.toJson();
        if (this.chargeItemReference !== undefined) result.chargeItemReference = this.chargeItemReference.toJson();
        if (this.chargeItemCodeableConcept !== undefined) result.chargeItemCodeableConcept = this.chargeItemCodeableConcept.toJson();
        if (this.priceComponent !== undefined) result.priceComponent = this.priceComponent.map(comp => comp.toJson());

        return result;
    }

    toXml(): string {
        let xml = `<InvoiceLineItem>`;
        if (this.sequence !== undefined) {
            xml += `<sequence value="${this.sequence}"/>`;
        }
        if (this.serviceDate !== undefined) {
            xml += `<serviceDate value="${this.serviceDate}"/>`;
        }
        if (this.servicePeriod !== undefined) {
            xml += `<servicePeriod>`;
            xml += this.servicePeriod.toXml();
            xml += `</servicePeriod>`;
        }
        if (this.chargeItemReference !== undefined) {
            xml += `<chargeItemReference>`;
            xml += this.chargeItemReference.toXml();
            xml += `</chargeItemReference>`;
        }
        if (this.chargeItemCodeableConcept !== undefined) {
            xml += `<chargeItemCodeableConcept>`;
            xml += this.chargeItemCodeableConcept.toXml();
            xml += `</chargeItemCodeableConcept>`;
        }
        if (this.priceComponent !== undefined) {
            this.priceComponent.forEach((component) => {
                xml += `<priceComponent>`;
                xml += component.toXml();
                xml += `</priceComponent>`;
            });
        }
        xml += `</InvoiceLineItem>`;
        return xml;
    }
}

export interface InvoiceConstructorData {
    id?: string;
    status: FhirString | string;
    identifier?: Identifier[];
    cancelledReason?: FhirString | string;
    type?: CodeableConcept | { coding: any[] };
    subject?: Reference | { reference: string };
    recipient?: Reference | { reference: string };
    date?: FhirDateTime | string;
    creation?: FhirDateTime | string;
    periodDate?: FhirDate | string;
    periodPeriod?: Period;
    participant?: InvoiceParticipant[];
    issuer?: Reference | { reference: string };
    account?: Reference | { reference: string };
    lineItem?: (InvoiceLineItem | InvoiceLineItemConstructorData)[];
    totalPriceComponent?: MonetaryComponent[];
    totalNet?: Money | { value: number; currency: string };
    totalGross?: Money | { value: number; currency: string };
    paymentTerms?: FhirMakeDown | string;
    note?: Annotation[];
}

export class Invoice extends BaseFhirResource {
    resourceType: FhirResourceTypes = "Invoice";
    identifier?: Identifier[];
    status: FhirString;
    cancelledReason?: FhirString;
    type?: CodeableConcept;
    subject?: Reference;
    recipient?: Reference;
    date?: FhirDateTime;
    creation?: FhirDateTime;
    periodDate?: FhirDate;
    periodPeriod?: Period;
    participant?: InvoiceParticipant[]
    issuer?: Reference;
    account?: Reference;
    lineItem?: InvoiceLineItem[];
    totalPriceComponent?: MonetaryComponent[];
    totalNet?: Money;
    totalGross?: Money;
    paymentTerms?: FhirMakeDown;
    note?: Annotation[];

    constructor(data: InvoiceConstructorData) {
        super(data as any);
        this.status = data.status as any;

        if (data.identifier !== undefined) {
            this.identifier = data.identifier;
        }
        if (data.cancelledReason !== undefined) {
            this.cancelledReason = data.cancelledReason as any;
        }
        if (data.type !== undefined) {
            this.type = data.type instanceof CodeableConcept
                ? data.type
                : new CodeableConcept(data.type as any);
        }
        if (data.subject !== undefined) {
            this.subject = data.subject instanceof Reference
                ? data.subject
                : new Reference(data.subject as any);
        }
        if (data.recipient !== undefined) {
            this.recipient = data.recipient instanceof Reference
                ? data.recipient
                : new Reference(data.recipient as any);
        }
        if (data.date !== undefined) {
            this.date = data.date as any;
        }
        if (data.creation !== undefined) {
            this.creation = data.creation as any;
        }
        if (data.periodDate !== undefined) {
            this.periodDate = data.periodDate as any;
        }
        if (data.periodPeriod !== undefined) {
            this.periodPeriod = data.periodPeriod;
        }
        if (data.participant !== undefined) {
            this.participant = data.participant;
        }
        if (data.issuer !== undefined) {
            this.issuer = data.issuer instanceof Reference
                ? data.issuer
                : new Reference(data.issuer as any);
        }
        if (data.account !== undefined) {
            this.account = data.account instanceof Reference
                ? data.account
                : new Reference(data.account as any);
        }
        if (data.lineItem !== undefined) {
            this.lineItem = data.lineItem.map(item =>
                item instanceof InvoiceLineItem
                    ? item
                    : new InvoiceLineItem(item as any)
            );
        }
        if (data.totalPriceComponent !== undefined) {
            this.totalPriceComponent = data.totalPriceComponent;
        }
        if (data.totalNet !== undefined) {
            this.totalNet = data.totalNet instanceof Money
                ? data.totalNet
                : new Money(data.totalNet as any);
        }
        if (data.totalGross !== undefined) {
            this.totalGross = data.totalGross instanceof Money
                ? data.totalGross
                : new Money(data.totalGross as any);
        }
        if (data.paymentTerms !== undefined) {
            this.paymentTerms = data.paymentTerms as any;
        }
        if (data.note !== undefined) {
            this.note = data.note;
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJson()
        };

        if (this.identifier !== undefined) result.identifier = this.identifier.map(id => id.toJson());
        if (this.status !== undefined) result.status = this.status;
        if (this.cancelledReason !== undefined) result.cancelledReason = this.cancelledReason;
        if (this.type !== undefined) result.type = this.type.toJson();
        if (this.subject !== undefined) result.subject = this.subject.toJson();
        if (this.recipient !== undefined) result.recipient = this.recipient.toJson();
        if (this.date !== undefined) result.date = this.date;
        if (this.creation !== undefined) result.creation = this.creation;
        if (this.periodDate !== undefined) result.periodDate = this.periodDate;
        if (this.periodPeriod !== undefined) result.periodPeriod = this.periodPeriod.toJson();
        if (this.participant !== undefined) result.participant = this.participant.map(p => p.toJson());
        if (this.issuer !== undefined) result.issuer = this.issuer.toJson();
        if (this.account !== undefined) result.account = this.account.toJson();
        if (this.lineItem !== undefined) result.lineItem = this.lineItem.map(item => item.toJson());
        if (this.totalPriceComponent !== undefined) result.totalPriceComponent = this.totalPriceComponent.map(comp => comp.toJson());
        if (this.totalNet !== undefined) result.totalNet = this.totalNet.toJson();
        if (this.totalGross !== undefined) result.totalGross = this.totalGross.toJson();
        if (this.paymentTerms !== undefined) result.paymentTerms = this.paymentTerms;
        if (this.note !== undefined) result.note = this.note.map(n => n.toJson());

        return result;
    }

    toXml(): String {
        let xml = `<Invoice>`;
        xml += super.toXml();
        if (this.identifier !== undefined) {
            this.identifier.forEach((id) => {
                xml += `<identifier>`;
                xml += id.toXml();
                xml += `</identifier>`;
            });
        }
        xml += `<status value="${this.status}"/>`;
        if (this.cancelledReason !== undefined) {
            xml += `<cancelledReason value="${this.cancelledReason}"/>`;
        }
        if (this.type !== undefined) {
            xml += `<type>`;
            xml += this.type.toXml();
            xml += `</type>`;
        }
        if (this.subject !== undefined) {
            xml += `<subject>`;
            xml += this.subject.toXml();
            xml += `</subject>`;
        }
        if (this.recipient !== undefined) {
            xml += `<recipient>`;
            xml += this.recipient.toXml();
            xml += `</recipient>`;
        }
        if (this.date !== undefined) {
            xml += `<date value="${this.date}"/>`;
        }
        if (this.creation !== undefined) {
            xml += `<creation value="${this.creation}"/>`;
        }
        if (this.periodDate !== undefined) {
            xml += `<periodDate value="${this.periodDate}"/>`;
        }
        if (this.periodPeriod !== undefined) {
            xml += `<periodPeriod>`;
            xml += this.periodPeriod.toXml();
            xml += `</periodPeriod>`;
        }
        if (this.participant !== undefined) {
            this.participant.forEach((part) => {
                xml += `<participant>`;
                xml += part.toXml();
                xml += `</participant>`;
            });
        }
        if (this.issuer !== undefined) {
            xml += `<issuer>`;
            xml += this.issuer.toXml();
            xml += `</issuer>`;
        }
        if (this.account !== undefined) {
            xml += `<account>`;
            xml += this.account.toXml();
            xml += `</account>`;
        }
        if (this.lineItem !== undefined) {
            this.lineItem.forEach((item) => {
                xml += `<lineItem>`;
                xml += item.toXml();
                xml += `</lineItem>`;
            });
        }
        if (this.totalPriceComponent !== undefined) {
            this.totalPriceComponent.forEach((component) => {
                xml += `<totalPriceComponent>`;
                xml += component.toXml();
                xml += `</totalPriceComponent>`;
            });
        }
        if (this.totalNet !== undefined) {
            xml += `<totalNet>`;
            xml += this.totalNet.toXml();
            xml += `</totalNet>`;
        }
        if (this.totalGross !== undefined) {
            xml += `<totalGross>`;
            xml += this.totalGross.toXml();
            xml += `</totalGross>`;
        }
        if (this.paymentTerms !== undefined) {
            xml += `<paymentTerms>`;
            xml += this.paymentTerms;
            xml += `</paymentTerms>`;
        }
        if (this.note !== undefined) {
            this.note.forEach((annotation) => {
                xml += `<note>`;
                xml += annotation.toXml();
                xml += `</note>`;
            });
        }
        xml += `</Invoice>`;
        return xml;
    }
}