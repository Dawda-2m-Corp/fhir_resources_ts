import { BaseFhirResource } from './baseResource';
import { Identifier } from './identifier';
import { Reference } from './reference';
import { CodeableConcept } from './dataTypes/codeableConcept';
import { Money } from './dataTypes/money';
import { FhirResourceTypes } from './dataTypes';

/**
 * Interface for PaymentNotice constructor
 */
export interface PaymentNoticeConstructorData {
    resourceType?: 'PaymentNotice';
    id?: string;
    meta?: any;
    implicitRules?: string;
    language?: string;
    text?: any;
    contained?: any[];
    extension?: any[];
    modifierExtension?: any[];
    identifier?: Identifier[] | any[];
    status: 'active' | 'cancelled' | 'draft' | 'entered-in-error';  // Required
    request?: Reference | any;
    response?: Reference | any;
    created: string;  // Required - dateTime
    reporter?: Reference | any;
    payment?: Reference | any;
    paymentDate?: string;  // date
    payee?: Reference | any;
    recipient: Reference | any;  // Required
    amount: Money | any;  // Required
    paymentStatus?: CodeableConcept | any;
}

/**
 * This resource provides the details including amount of a payment and allocates the payment items being paid for.
 */
export class PaymentNotice extends BaseFhirResource {
    resourceType: FhirResourceTypes = 'PaymentNotice';
    identifier?: Identifier[];                  // Business Identifier for the payment notice
    status: 'active' | 'cancelled' | 'draft' | 'entered-in-error';  // Required: Status of the notice
    request?: Reference;                        // Request reference
    response?: Reference;                       // Response reference
    created: string;                            // Required: Creation date (dateTime)
    reporter?: Reference;                       // Responsible practitioner
    payment?: Reference;                        // Payment reference (PaymentReconciliation)
    paymentDate?: string;                       // Payment or clearing date
    payee?: Reference;                          // Party being paid
    recipient: Reference;                       // Required: Party being notified
    amount: Money;                              // Required: Monetary amount of the payment
    paymentStatus?: CodeableConcept;            // Issued or cleared Status of the payment

    constructor(data: PaymentNoticeConstructorData) {
        super(data as any);
        this.resourceType = 'PaymentNotice';

        // Required fields
        this.status = data.status;
        this.created = data.created;
        this.recipient = data.recipient instanceof Reference ? data.recipient : new Reference(data.recipient);
        this.amount = data.amount instanceof Money ? data.amount : new Money(data.amount);

        // Optional fields
        if (data.identifier) {
            this.identifier = Array.isArray(data.identifier)
                ? data.identifier.map(id => id instanceof Identifier ? id : new Identifier(id))
                : [new Identifier(data.identifier as any)];
        }

        if (data.request !== undefined) {
            this.request = data.request instanceof Reference ? data.request : new Reference(data.request);
        }

        if (data.response !== undefined) {
            this.response = data.response instanceof Reference ? data.response : new Reference(data.response);
        }

        if (data.reporter !== undefined) {
            this.reporter = data.reporter instanceof Reference ? data.reporter : new Reference(data.reporter);
        }

        if (data.payment !== undefined) {
            this.payment = data.payment instanceof Reference ? data.payment : new Reference(data.payment);
        }

        if (data.paymentDate !== undefined) {
            this.paymentDate = data.paymentDate;
        }

        if (data.payee !== undefined) {
            this.payee = data.payee instanceof Reference ? data.payee : new Reference(data.payee);
        }

        if (data.paymentStatus !== undefined) {
            this.paymentStatus = data.paymentStatus instanceof CodeableConcept ? data.paymentStatus : new CodeableConcept(data.paymentStatus);
        }
    }

    toJson(): any {
        const json = super.toJson();

        // Required fields
        json.status = this.status;
        json.created = this.created;
        json.recipient = this.recipient.toJson();
        json.amount = this.amount.toJson();

        // Optional fields
        if (this.identifier && this.identifier.length > 0) {
            json.identifier = this.identifier.map(id => id.toJson());
        }
        if (this.request) {
            json.request = this.request.toJson();
        }
        if (this.response) {
            json.response = this.response.toJson();
        }
        if (this.reporter) {
            json.reporter = this.reporter.toJson();
        }
        if (this.payment) {
            json.payment = this.payment.toJson();
        }
        if (this.paymentDate !== undefined) {
            json.paymentDate = this.paymentDate;
        }
        if (this.payee) {
            json.payee = this.payee.toJson();
        }
        if (this.paymentStatus) {
            json.paymentStatus = this.paymentStatus.toJson();
        }

        return json;
    }

    toXml(): string {
        let xml = `<PaymentNotice`;
        if (this.id) xml += ` id="${this.id}"`;
        xml += `>`;

        // Required fields
        xml += `<status value="${this.status}"/>`;
        xml += `<created value="${this.created}"/>`;
        xml += this.recipient.toXml().replace('<Reference', '<recipient').replace('</Reference>', '</recipient>');
        xml += this.amount.toXml().replace('<Money', '<amount').replace('</Money>', '</amount>');

        // Optional fields
        if (this.identifier && this.identifier.length > 0) {
            this.identifier.forEach(id => {
                xml += id.toXml().replace('<Identifier', '<identifier').replace('</Identifier>', '</identifier>');
            });
        }
        if (this.request) {
            xml += this.request.toXml().replace('<Reference', '<request').replace('</Reference>', '</request>');
        }
        if (this.response) {
            xml += this.response.toXml().replace('<Reference', '<response').replace('</Reference>', '</response>');
        }
        if (this.reporter) {
            xml += this.reporter.toXml().replace('<Reference', '<reporter').replace('</Reference>', '</reporter>');
        }
        if (this.payment) {
            xml += this.payment.toXml().replace('<Reference', '<payment').replace('</Reference>', '</payment>');
        }
        if (this.paymentDate !== undefined) {
            xml += `<paymentDate value="${this.paymentDate}"/>`;
        }
        if (this.payee) {
            xml += this.payee.toXml().replace('<Reference', '<payee').replace('</Reference>', '</payee>');
        }
        if (this.paymentStatus) {
            xml += this.paymentStatus.toXml().replace('<CodeableConcept', '<paymentStatus').replace('</CodeableConcept>', '</paymentStatus>');
        }

        xml += '</PaymentNotice>';
        return xml;
    }

    static fromJson(json: any): PaymentNotice {
        return new PaymentNotice(json);
    }
}