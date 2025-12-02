import { BaseFhirResource } from './baseResource';
import { Identifier } from './identifier';
import { Reference } from './reference';
import { CodeableConcept } from './dataTypes/codeableConcept';
import { Period } from './dataTypes/period';
import {
    FhirResourceTypes
} from './dataTypes';

/**
 * Money data type for financial amounts
 */
export class Money {
    value?: number;
    currency?: string;

    constructor(data: Partial<Money>) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.value !== undefined) result.value = this.value;
        if (this.currency !== undefined) result.currency = this.currency;
        return result;
    }

    toXml(): string {
        let xml = '<Money>';
        if (this.value !== undefined) xml += `<value value="${this.value}"/>`;
        if (this.currency !== undefined) xml += `<currency value="${this.currency}"/>`;
        xml += '</Money>';
        return xml;
    }
}

/**
 * Note concerning processing
 */
export class PaymentReconciliationProcessNote {
    type?: 'display' | 'print' | 'printoper';  // Required: Note type
    text?: string;                             // Note explanatory text

    constructor(data: Partial<PaymentReconciliationProcessNote>) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.type !== undefined) result.type = this.type;
        if (this.text !== undefined) result.text = this.text;
        return result;
    }

    toXml(): string {
        let xml = '<processNote>';
        if (this.type !== undefined) xml += `<type value="${this.type}"/>`;
        if (this.text !== undefined) xml += `<text value="${this.text}"/>`;
        xml += '</processNote>';
        return xml;
    }
}

/**
 * Interface for PaymentReconciliationAllocation constructor
 */
interface IPaymentReconciliationAllocation {
    identifier?: Identifier | Partial<Identifier>;
    predecessor?: Identifier | Partial<Identifier>;
    target?: Reference | Partial<Reference>;
    targetItemString?: string;
    targetItemIdentifier?: Identifier | Partial<Identifier>;
    targetItemPositiveInt?: number;
    encounter?: Reference | Partial<Reference>;
    account?: Reference | Partial<Reference>;
    type?: CodeableConcept | Partial<CodeableConcept>;
    submitter?: Reference | Partial<Reference>;
    response?: Reference | Partial<Reference>;
    date?: string;
    responsible?: Reference | Partial<Reference>;
    payee?: Reference | Partial<Reference>;
    amount?: Money | Partial<Money>;
}

/**
 * Settlement particulars - allocation of payment amounts
 */
export class PaymentReconciliationAllocation {
    identifier?: Identifier;                    // Business identifier of the payment detail
    predecessor?: Identifier;                   // Business identifier of the prior payment detail
    target?: Reference;                         // Subject of the payment (Account|ChargeItem|Claim|Contract|Encounter|Invoice)

    // targetItem[x] - union type for sub-element of the subject
    targetItemString?: string;
    targetItemIdentifier?: Identifier;
    targetItemPositiveInt?: number;

    encounter?: Reference;                      // Applied-to encounter
    account?: Reference;                        // Applied-to account
    type?: CodeableConcept;                     // Category of payment
    submitter?: Reference;                      // Submitter of the request (Organization|Practitioner|PractitionerRole)
    response?: Reference;                       // Response committing to a payment (ClaimResponse)
    date?: string;                              // Date of commitment to pay
    responsible?: Reference;                    // Contact for the response (PractitionerRole)
    payee?: Reference;                          // Recipient of the payment (Organization|Practitioner|PractitionerRole)
    amount?: Money;                             // Amount allocated to this payable

    constructor(data: IPaymentReconciliationAllocation) {
        if (data.identifier && !(data.identifier instanceof Identifier)) {
            this.identifier = new Identifier(data.identifier);
        } else {
            this.identifier = data.identifier;
        }

        if (data.predecessor && !(data.predecessor instanceof Identifier)) {
            this.predecessor = new Identifier(data.predecessor);
        } else {
            this.predecessor = data.predecessor;
        }

        if (data.target && !(data.target instanceof Reference)) {
            this.target = new Reference(data.target);
        } else {
            this.target = data.target;
        }

        if (data.targetItemIdentifier && !(data.targetItemIdentifier instanceof Identifier)) {
            this.targetItemIdentifier = new Identifier(data.targetItemIdentifier);
        } else {
            this.targetItemIdentifier = data.targetItemIdentifier;
        }

        if (data.encounter && !(data.encounter instanceof Reference)) {
            this.encounter = new Reference(data.encounter);
        } else {
            this.encounter = data.encounter;
        }

        if (data.account && !(data.account instanceof Reference)) {
            this.account = new Reference(data.account);
        } else {
            this.account = data.account;
        }

        if (data.type && !(data.type instanceof CodeableConcept)) {
            this.type = new CodeableConcept(data.type);
        } else {
            this.type = data.type;
        }

        if (data.submitter && !(data.submitter instanceof Reference)) {
            this.submitter = new Reference(data.submitter);
        } else {
            this.submitter = data.submitter;
        }

        if (data.response && !(data.response instanceof Reference)) {
            this.response = new Reference(data.response);
        } else {
            this.response = data.response;
        }

        if (data.responsible && !(data.responsible instanceof Reference)) {
            this.responsible = new Reference(data.responsible);
        } else {
            this.responsible = data.responsible;
        }

        if (data.payee && !(data.payee instanceof Reference)) {
            this.payee = new Reference(data.payee);
        } else {
            this.payee = data.payee;
        }

        if (data.amount) {
            if (data.amount instanceof Money) {
                this.amount = data.amount;
            } else {
                this.amount = new Money(data.amount);
            }
        }

        // Assign remaining primitive properties
        Object.assign(this, {
            targetItemString: data.targetItemString,
            targetItemPositiveInt: data.targetItemPositiveInt,
            date: data.date
        });
    }

    /**
     * Validates that only one targetItem[x] field is set
     */
    isValid(): boolean {
        const targetItemCount = [
            this.targetItemString,
            this.targetItemIdentifier,
            this.targetItemPositiveInt
        ].filter(item => item !== undefined).length;

        return targetItemCount <= 1;
    }

    /**
     * Gets the target item value regardless of type
     */
    getTargetItem(): string | Identifier | number | undefined {
        if (this.targetItemString !== undefined) return this.targetItemString;
        if (this.targetItemIdentifier !== undefined) return this.targetItemIdentifier;
        if (this.targetItemPositiveInt !== undefined) return this.targetItemPositiveInt;
        return undefined;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.identifier) result.identifier = this.identifier.toJson();
        if (this.predecessor) result.predecessor = this.predecessor.toJson();
        if (this.target) result.target = this.target.toJson();
        if (this.targetItemString !== undefined) result.targetItemString = this.targetItemString;
        if (this.targetItemIdentifier) result.targetItemIdentifier = this.targetItemIdentifier.toJson();
        if (this.targetItemPositiveInt !== undefined) result.targetItemPositiveInt = this.targetItemPositiveInt;
        if (this.encounter) result.encounter = this.encounter.toJson();
        if (this.account) result.account = this.account.toJson();
        if (this.type) result.type = this.type.toJson();
        if (this.submitter) result.submitter = this.submitter.toJson();
        if (this.response) result.response = this.response.toJson();
        if (this.date !== undefined) result.date = this.date;
        if (this.responsible) result.responsible = this.responsible.toJson();
        if (this.payee) result.payee = this.payee.toJson();
        if (this.amount) result.amount = this.amount.toJson();

        return result;
    }

    toXml(): string {
        let xml = '<allocation>';

        if (this.identifier) xml += this.identifier.toXml();
        if (this.predecessor) xml += this.predecessor.toXml();
        if (this.target) xml += this.target.toXml();
        if (this.targetItemString !== undefined) xml += `<targetItemString value="${this.targetItemString}"/>`;
        if (this.targetItemIdentifier) xml += this.targetItemIdentifier.toXml();
        if (this.targetItemPositiveInt !== undefined) xml += `<targetItemPositiveInt value="${this.targetItemPositiveInt}"/>`;
        if (this.encounter) xml += this.encounter.toXml();
        if (this.account) xml += this.account.toXml();
        if (this.type) xml += this.type.toXml();
        if (this.submitter) xml += this.submitter.toXml();
        if (this.response) xml += this.response.toXml();
        if (this.date !== undefined) xml += `<date value="${this.date}"/>`;
        if (this.responsible) xml += this.responsible.toXml();
        if (this.payee) xml += this.payee.toXml();
        if (this.amount) xml += this.amount.toXml();

        xml += '</allocation>';
        return xml;
    }
}

/**
 * Interface for PaymentReconciliation constructor
 */
interface IPaymentReconciliation {
    id?: string;
    meta?: any;
    implicitRules?: string;
    language?: string;
    identifier?: (Identifier | Partial<Identifier>)[] | Identifier | Partial<Identifier>;
    type?: CodeableConcept | Partial<CodeableConcept>;
    status?: 'active' | 'cancelled' | 'draft' | 'entered-in-error';
    kind?: CodeableConcept | Partial<CodeableConcept>;
    period?: Period | Partial<Period>;
    created?: string;
    enterer?: Reference | Partial<Reference>;
    issuerType?: CodeableConcept | Partial<CodeableConcept>;
    paymentIssuer?: Reference | Partial<Reference>;
    request?: Reference | Partial<Reference>;
    requestor?: Reference | Partial<Reference>;
    outcome?: 'queued' | 'complete' | 'error' | 'partial';
    disposition?: string;
    date?: string;
    location?: Reference | Partial<Reference>;
    method?: CodeableConcept | Partial<CodeableConcept>;
    cardBrand?: string;
    accountNumber?: string;
    expirationDate?: string;
    processor?: string;
    referenceNumber?: string;
    authorization?: string;
    tenderedAmount?: Money | Partial<Money>;
    returnedAmount?: Money | Partial<Money>;
    amount?: Money | Partial<Money>;
    paymentIdentifier?: Identifier | Partial<Identifier>;
    allocation?: (PaymentReconciliationAllocation | IPaymentReconciliationAllocation)[] | PaymentReconciliationAllocation | IPaymentReconciliationAllocation;
    formCode?: CodeableConcept | Partial<CodeableConcept>;
    processNote?: (PaymentReconciliationProcessNote | Partial<PaymentReconciliationProcessNote>)[] | PaymentReconciliationProcessNote | Partial<PaymentReconciliationProcessNote>;
}

/**
 * FHIR PaymentReconciliation Resource
 * This resource provides the details including amount of a payment and allocates the payment items being paid.
 */
export class PaymentReconciliation extends BaseFhirResource {
    resourceType: FhirResourceTypes = 'PaymentReconciliation';

    identifier?: Identifier[];                  // Business Identifier for a payment reconciliation
    type?: CodeableConcept;                     // Required: Category of payment
    status?: 'active' | 'cancelled' | 'draft' | 'entered-in-error';  // Required: Payment status
    kind?: CodeableConcept;                     // Workflow originating payment
    period?: Period;                            // Period covered
    created?: string;                           // Required: Creation date
    enterer?: Reference;                        // Who entered the payment (Organization|Practitioner|PractitionerRole)
    issuerType?: CodeableConcept;               // Nature of the source
    paymentIssuer?: Reference;                  // Party generating payment (Organization|Patient|RelatedPerson)
    request?: Reference;                        // Reference to requesting resource (Task)
    requestor?: Reference;                      // Responsible practitioner (Organization|Practitioner|PractitionerRole)
    outcome?: 'queued' | 'complete' | 'error' | 'partial';  // Payment outcome
    disposition?: string;                       // Disposition message
    date?: string;                              // Required: When payment issued
    location?: Reference;                       // Where payment collected (Location)
    method?: CodeableConcept;                   // Payment instrument icon
    cardBrand?: string;                         // Type of card
    accountNumber?: string;                     // Digits for verification
    expirationDate?: string;                    // Expiration year-month
    processor?: string;                         // Processor name
    referenceNumber?: string;                   // Check number or payment reference
    authorization?: string;                     // Authorization number
    tenderedAmount?: Money;                     // Amount offered by the issuer
    returnedAmount?: Money;                     // Amount returned by the receiver
    amount?: Money;                             // Required: Total amount of Payment
    paymentIdentifier?: Identifier;             // Business identifier for the payment
    allocation?: PaymentReconciliationAllocation[];  // Settlement particulars
    formCode?: CodeableConcept;                 // Printed form identifier
    processNote?: PaymentReconciliationProcessNote[];  // Note concerning processing

    constructor(data: IPaymentReconciliation) {
        super(data as any);

        // Handle identifier array
        if (data.identifier) {
            if (Array.isArray(data.identifier)) {
                this.identifier = data.identifier.map(item =>
                    item instanceof Identifier ? item : new Identifier(item)
                );
            } else {
                this.identifier = [
                    data.identifier instanceof Identifier ? data.identifier : new Identifier(data.identifier)
                ];
            }
        }

        // Handle complex objects
        if (data.type && !(data.type instanceof CodeableConcept)) {
            this.type = new CodeableConcept(data.type);
        } else {
            this.type = data.type;
        }

        if (data.kind && !(data.kind instanceof CodeableConcept)) {
            this.kind = new CodeableConcept(data.kind);
        } else {
            this.kind = data.kind;
        }

        if (data.period && !(data.period instanceof Period)) {
            this.period = new Period(data.period);
        } else {
            this.period = data.period;
        }

        if (data.enterer && !(data.enterer instanceof Reference)) {
            this.enterer = new Reference(data.enterer);
        } else {
            this.enterer = data.enterer;
        }

        if (data.issuerType && !(data.issuerType instanceof CodeableConcept)) {
            this.issuerType = new CodeableConcept(data.issuerType);
        } else {
            this.issuerType = data.issuerType;
        }

        if (data.paymentIssuer && !(data.paymentIssuer instanceof Reference)) {
            this.paymentIssuer = new Reference(data.paymentIssuer);
        } else {
            this.paymentIssuer = data.paymentIssuer;
        }

        if (data.request && !(data.request instanceof Reference)) {
            this.request = new Reference(data.request);
        } else {
            this.request = data.request;
        }

        if (data.requestor && !(data.requestor instanceof Reference)) {
            this.requestor = new Reference(data.requestor);
        } else {
            this.requestor = data.requestor;
        }

        if (data.location && !(data.location instanceof Reference)) {
            this.location = new Reference(data.location);
        } else {
            this.location = data.location;
        }

        if (data.method && !(data.method instanceof CodeableConcept)) {
            this.method = new CodeableConcept(data.method);
        } else {
            this.method = data.method;
        }

        if (data.tenderedAmount && !(data.tenderedAmount instanceof Money)) {
            this.tenderedAmount = new Money(data.tenderedAmount);
        } else {
            this.tenderedAmount = data.tenderedAmount;
        }

        if (data.returnedAmount && !(data.returnedAmount instanceof Money)) {
            this.returnedAmount = new Money(data.returnedAmount);
        } else {
            this.returnedAmount = data.returnedAmount;
        }

        if (data.amount && !(data.amount instanceof Money)) {
            this.amount = new Money(data.amount);
        } else {
            this.amount = data.amount;
        }

        if (data.paymentIdentifier && !(data.paymentIdentifier instanceof Identifier)) {
            this.paymentIdentifier = new Identifier(data.paymentIdentifier);
        } else {
            this.paymentIdentifier = data.paymentIdentifier;
        }

        // Handle allocation array
        if (data.allocation) {
            if (Array.isArray(data.allocation)) {
                this.allocation = data.allocation.map(item =>
                    item instanceof PaymentReconciliationAllocation ? item : new PaymentReconciliationAllocation(item)
                );
            } else {
                this.allocation = [
                    data.allocation instanceof PaymentReconciliationAllocation ? data.allocation : new PaymentReconciliationAllocation(data.allocation)
                ];
            }
        }

        if (data.formCode && !(data.formCode instanceof CodeableConcept)) {
            this.formCode = new CodeableConcept(data.formCode);
        } else {
            this.formCode = data.formCode;
        }

        // Handle processNote array
        if (data.processNote) {
            if (Array.isArray(data.processNote)) {
                this.processNote = data.processNote.map(item =>
                    item instanceof PaymentReconciliationProcessNote ? item : new PaymentReconciliationProcessNote(item)
                );
            } else {
                this.processNote = [
                    data.processNote instanceof PaymentReconciliationProcessNote ? data.processNote : new PaymentReconciliationProcessNote(data.processNote)
                ];
            }
        }

        // Assign remaining properties
        Object.assign(this, {
            status: data.status,
            created: data.created,
            outcome: data.outcome,
            disposition: data.disposition,
            date: data.date,
            cardBrand: data.cardBrand,
            accountNumber: data.accountNumber,
            expirationDate: data.expirationDate,
            processor: data.processor,
            referenceNumber: data.referenceNumber,
            authorization: data.authorization
        });
    }

    /**
     * Validates the PaymentReconciliation resource
     */
    isValid(): boolean {
        // Check required fields
        if (!this.type || !this.status || !this.created || !this.date || !this.amount) {
            return false;
        }

        // Validate status enum
        if (!['active', 'cancelled', 'draft', 'entered-in-error'].includes(this.status)) {
            return false;
        }

        // Validate outcome enum if present
        if (this.outcome && !['queued', 'complete', 'error', 'partial'].includes(this.outcome)) {
            return false;
        }

        // Validate date formats
        if (this.created && !this.isValidDateTime(this.created)) {
            return false;
        }

        if (this.date && !this.isValidDate(this.date)) {
            return false;
        }

        if (this.expirationDate && !this.isValidDate(this.expirationDate)) {
            return false;
        }

        // Validate all allocations
        if (this.allocation && !this.allocation.every(alloc => alloc.isValid())) {
            return false;
        }

        return true;
    }

    /**
     * Gets all allocation amounts
     */
    getAllocationAmounts(): Money[] {
        if (!this.allocation) return [];
        return this.allocation
            .filter(alloc => alloc.amount)
            .map(alloc => alloc.amount!);
    }

    /**
     * Gets total allocated amount
     */
    getTotalAllocatedAmount(): number {
        const amounts = this.getAllocationAmounts();
        return amounts.reduce((total, money) => total + (money.value || 0), 0);
    }

    /**
     * Checks if payment is complete
     */
    isPaymentComplete(): boolean {
        return this.status === 'active' && this.outcome === 'complete';
    }

    /**
     * Gets allocations by type
     */
    getAllocationsByType(typeCode: string): PaymentReconciliationAllocation[] {
        if (!this.allocation) return [];
        return this.allocation.filter(alloc =>
            alloc.type?.coding?.some(coding => coding.code === typeCode)
        );
    }

    /**
     * Gets payment method display name
     */
    getPaymentMethodName(): string | undefined {
        const text = this.method?.text as string;
        const display = this.method?.coding?.[0]?.display as string;
        return text || display;
    }

    /**
     * Checks if payment has card details
     */
    hasCardDetails(): boolean {
        return !!(this.cardBrand || this.accountNumber || this.expirationDate);
    }

    /**
     * Gets process notes by type
     */
    getProcessNotesByType(type: 'display' | 'print' | 'printoper'): PaymentReconciliationProcessNote[] {
        if (!this.processNote) return [];
        return this.processNote.filter(note => note.type === type);
    }

    /**
     * Validates date format (YYYY-MM-DD)
     */
    private isValidDate(date: string): boolean {
        return /^\d{4}-\d{2}-\d{2}$/.test(date);
    }

    /**
     * Validates dateTime format (ISO 8601)
     */
    private isValidDateTime(dateTime: string): boolean {
        return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(dateTime);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            resourceType: this.resourceType
        };

        if (this.id) result.id = this.id;
        if (this.meta) result.meta = this.meta;
        if (this.implicitRules) result.implicitRules = this.implicitRules;
        if (this.language) result.language = this.language;
        if (this.identifier) result.identifier = this.identifier.map(item => item.toJson());
        if (this.type) result.type = this.type.toJson();
        if (this.status) result.status = this.status;
        if (this.kind) result.kind = this.kind.toJson();
        if (this.period) result.period = this.period.toJson();
        if (this.created) result.created = this.created;
        if (this.enterer) result.enterer = this.enterer.toJson();
        if (this.issuerType) result.issuerType = this.issuerType.toJson();
        if (this.paymentIssuer) result.paymentIssuer = this.paymentIssuer.toJson();
        if (this.request) result.request = this.request.toJson();
        if (this.requestor) result.requestor = this.requestor.toJson();
        if (this.outcome) result.outcome = this.outcome;
        if (this.disposition) result.disposition = this.disposition;
        if (this.date) result.date = this.date;
        if (this.location) result.location = this.location.toJson();
        if (this.method) result.method = this.method.toJson();
        if (this.cardBrand) result.cardBrand = this.cardBrand;
        if (this.accountNumber) result.accountNumber = this.accountNumber;
        if (this.expirationDate) result.expirationDate = this.expirationDate;
        if (this.processor) result.processor = this.processor;
        if (this.referenceNumber) result.referenceNumber = this.referenceNumber;
        if (this.authorization) result.authorization = this.authorization;
        if (this.tenderedAmount) result.tenderedAmount = this.tenderedAmount.toJson();
        if (this.returnedAmount) result.returnedAmount = this.returnedAmount.toJson();
        if (this.amount) result.amount = this.amount.toJson();
        if (this.paymentIdentifier) result.paymentIdentifier = this.paymentIdentifier.toJson();
        if (this.allocation) result.allocation = this.allocation.map(item => item.toJson());
        if (this.formCode) result.formCode = this.formCode.toJson();
        if (this.processNote) result.processNote = this.processNote.map(item => item.toJson());

        return result;
    }

    toXml(): string {
        let xml = '<PaymentReconciliation>';

        xml += `<resourceType value="${this.resourceType}"/>`;
        if (this.id) xml += `<id value="${this.id}"/>`;
        if (this.meta) xml += `<meta>${JSON.stringify(this.meta)}</meta>`;
        if (this.implicitRules) xml += `<implicitRules value="${this.implicitRules}"/>`;
        if (this.language) xml += `<language value="${this.language}"/>`;
        if (this.identifier) this.identifier.forEach(item => xml += item.toXml());
        if (this.type) xml += this.type.toXml();
        if (this.status) xml += `<status value="${this.status}"/>`;
        if (this.kind) xml += this.kind.toXml();
        if (this.period) xml += this.period.toXml();
        if (this.created) xml += `<created value="${this.created}"/>`;
        if (this.enterer) xml += this.enterer.toXml();
        if (this.issuerType) xml += this.issuerType.toXml();
        if (this.paymentIssuer) xml += this.paymentIssuer.toXml();
        if (this.request) xml += this.request.toXml();
        if (this.requestor) xml += this.requestor.toXml();
        if (this.outcome) xml += `<outcome value="${this.outcome}"/>`;
        if (this.disposition) xml += `<disposition value="${this.disposition}"/>`;
        if (this.date) xml += `<date value="${this.date}"/>`;
        if (this.location) xml += this.location.toXml();
        if (this.method) xml += this.method.toXml();
        if (this.cardBrand) xml += `<cardBrand value="${this.cardBrand}"/>`;
        if (this.accountNumber) xml += `<accountNumber value="${this.accountNumber}"/>`;
        if (this.expirationDate) xml += `<expirationDate value="${this.expirationDate}"/>`;
        if (this.processor) xml += `<processor value="${this.processor}"/>`;
        if (this.referenceNumber) xml += `<referenceNumber value="${this.referenceNumber}"/>`;
        if (this.authorization) xml += `<authorization value="${this.authorization}"/>`;
        if (this.tenderedAmount) xml += this.tenderedAmount.toXml();
        if (this.returnedAmount) xml += this.returnedAmount.toXml();
        if (this.amount) xml += this.amount.toXml();
        if (this.paymentIdentifier) xml += this.paymentIdentifier.toXml();
        if (this.allocation) this.allocation.forEach(item => xml += item.toXml());
        if (this.formCode) xml += this.formCode.toXml();
        if (this.processNote) this.processNote.forEach(item => xml += item.toXml());

        xml += '</PaymentReconciliation>';
        return xml;
    }

    static fromJson(json: any): PaymentReconciliation {
        return new PaymentReconciliation(json);
    }
}