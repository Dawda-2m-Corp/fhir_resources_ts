import { BaseFhirResource } from "./baseResource";
import { FhirBoolean, FhirCode, FhirDate, FhirDateTime, FhirDecimal, FhirPositiveInt, FhirResourceTypes, FhirString } from "./dataTypes";
import { Address } from "./dataTypes/address";
import { Attachment } from "./dataTypes/attachment";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { CodeableReference } from "./dataTypes/codeableReference";
import { Money } from "./dataTypes/money";
import { Period } from "./dataTypes/period";
import { Quantity } from "./dataTypes/quantity";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

// Complex nested classes
export class ClaimResponseEvent {
    type: CodeableConcept;
    whenDateTime?: FhirDateTime;
    whenPeriod?: Period;

    constructor(data: any) {
        this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        if (data.whenDateTime !== undefined) this.whenDateTime = data.whenDateTime as any;
        if (data.whenPeriod !== undefined) this.whenPeriod = data.whenPeriod;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = { type: this.type.toJson() };
        if (this.whenDateTime !== undefined) result.whenDateTime = this.whenDateTime;
        if (this.whenPeriod !== undefined) result.whenPeriod = this.whenPeriod.toJson();
        return result;
    }
}

export class ClaimResponseReviewOutcome {
    decision?: CodeableConcept;
    reason?: CodeableConcept[];
    preAuthRef?: FhirString;
    preAuthPeriod?: Period;

    constructor(data: any = {}) {
        if (data.decision !== undefined) {
            this.decision = data.decision instanceof CodeableConcept ? data.decision : new CodeableConcept(data.decision);
        }
        if (data.reason !== undefined) {
            this.reason = data.reason.map((r: any) => r instanceof CodeableConcept ? r : new CodeableConcept(r));
        }
        if (data.preAuthRef !== undefined) this.preAuthRef = data.preAuthRef as any;
        if (data.preAuthPeriod !== undefined) this.preAuthPeriod = data.preAuthPeriod;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.decision !== undefined) result.decision = this.decision.toJson();
        if (this.reason !== undefined) result.reason = this.reason.map(r => r.toJson());
        if (this.preAuthRef !== undefined) result.preAuthRef = this.preAuthRef;
        if (this.preAuthPeriod !== undefined) result.preAuthPeriod = this.preAuthPeriod.toJson();
        return result;
    }
}

export class ClaimResponseAdjudication {
    category: CodeableConcept;
    reason?: CodeableConcept;
    amount?: Money;
    quantity?: Quantity;

    constructor(data: any) {
        this.category = data.category instanceof CodeableConcept ? data.category : new CodeableConcept(data.category);
        if (data.reason !== undefined) {
            this.reason = data.reason instanceof CodeableConcept ? data.reason : new CodeableConcept(data.reason);
        }
        if (data.amount !== undefined) {
            this.amount = data.amount instanceof Money ? data.amount : new Money(data.amount);
        }
        if (data.quantity !== undefined) {
            this.quantity = data.quantity instanceof Quantity ? data.quantity : new Quantity(data.quantity);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = { category: this.category.toJson() };
        if (this.reason !== undefined) result.reason = this.reason.toJson();
        if (this.amount !== undefined) result.amount = this.amount.toJson();
        if (this.quantity !== undefined) result.quantity = this.quantity.toJson();
        return result;
    }
}

export class ClaimResponseSubDetail {
    subDetailSequence: FhirPositiveInt;
    traceNumber?: Identifier[];
    noteNumber?: FhirPositiveInt[];
    reviewOutcome?: ClaimResponseReviewOutcome;
    adjudication?: ClaimResponseAdjudication[];

    constructor(data: any) {
        this.subDetailSequence = data.subDetailSequence as any;
        if (data.traceNumber !== undefined) this.traceNumber = data.traceNumber;
        if (data.noteNumber !== undefined) this.noteNumber = data.noteNumber;
        if (data.reviewOutcome !== undefined) {
            this.reviewOutcome = new ClaimResponseReviewOutcome(data.reviewOutcome);
        }
        if (data.adjudication !== undefined) {
            this.adjudication = data.adjudication.map((adj: any) => new ClaimResponseAdjudication(adj));
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = { subDetailSequence: this.subDetailSequence };
        if (this.traceNumber !== undefined) result.traceNumber = this.traceNumber.map(t => t.toJson());
        if (this.noteNumber !== undefined) result.noteNumber = this.noteNumber;
        if (this.reviewOutcome !== undefined) result.reviewOutcome = this.reviewOutcome.toJson();
        if (this.adjudication !== undefined) result.adjudication = this.adjudication.map(adj => adj.toJson());
        return result;
    }
}

export class ClaimResponseDetail {
    detailSequence: FhirPositiveInt;
    traceNumber?: Identifier[];
    noteNumber?: FhirPositiveInt[];
    reviewOutcome?: ClaimResponseReviewOutcome;
    adjudication?: ClaimResponseAdjudication[];
    subDetail?: ClaimResponseSubDetail[];

    constructor(data: any) {
        this.detailSequence = data.detailSequence as any;
        if (data.traceNumber !== undefined) this.traceNumber = data.traceNumber;
        if (data.noteNumber !== undefined) this.noteNumber = data.noteNumber;
        if (data.reviewOutcome !== undefined) {
            this.reviewOutcome = new ClaimResponseReviewOutcome(data.reviewOutcome);
        }
        if (data.adjudication !== undefined) {
            this.adjudication = data.adjudication.map((adj: any) => new ClaimResponseAdjudication(adj));
        }
        if (data.subDetail !== undefined) {
            this.subDetail = data.subDetail.map((sd: any) => new ClaimResponseSubDetail(sd));
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = { detailSequence: this.detailSequence };
        if (this.traceNumber !== undefined) result.traceNumber = this.traceNumber.map(t => t.toJson());
        if (this.noteNumber !== undefined) result.noteNumber = this.noteNumber;
        if (this.reviewOutcome !== undefined) result.reviewOutcome = this.reviewOutcome.toJson();
        if (this.adjudication !== undefined) result.adjudication = this.adjudication.map(adj => adj.toJson());
        if (this.subDetail !== undefined) result.subDetail = this.subDetail.map(sd => sd.toJson());
        return result;
    }
}

export class ClaimResponseItem {
    itemSequence: FhirPositiveInt;
    traceNumber?: Identifier[];
    noteNumber?: FhirPositiveInt[];
    reviewOutcome?: ClaimResponseReviewOutcome;
    adjudication?: ClaimResponseAdjudication[];
    detail?: ClaimResponseDetail[];

    constructor(data: any) {
        this.itemSequence = data.itemSequence as any;
        if (data.traceNumber !== undefined) this.traceNumber = data.traceNumber;
        if (data.noteNumber !== undefined) this.noteNumber = data.noteNumber;
        if (data.reviewOutcome !== undefined) {
            this.reviewOutcome = new ClaimResponseReviewOutcome(data.reviewOutcome);
        }
        if (data.adjudication !== undefined) {
            this.adjudication = data.adjudication.map((adj: any) => new ClaimResponseAdjudication(adj));
        }
        if (data.detail !== undefined) {
            this.detail = data.detail.map((d: any) => new ClaimResponseDetail(d));
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = { itemSequence: this.itemSequence };
        if (this.traceNumber !== undefined) result.traceNumber = this.traceNumber.map(t => t.toJson());
        if (this.noteNumber !== undefined) result.noteNumber = this.noteNumber;
        if (this.reviewOutcome !== undefined) result.reviewOutcome = this.reviewOutcome.toJson();
        if (this.adjudication !== undefined) result.adjudication = this.adjudication.map(adj => adj.toJson());
        if (this.detail !== undefined) result.detail = this.detail.map(d => d.toJson());
        return result;
    }
}

export class ClaimResponseBodySite {
    site: CodeableReference[];
    subSite?: CodeableConcept[];

    constructor(data: any) {
        this.site = data.site.map((s: any) => s instanceof CodeableReference ? s : new CodeableReference(s));
        if (data.subSite !== undefined) {
            this.subSite = data.subSite.map((ss: any) => ss instanceof CodeableConcept ? ss : new CodeableConcept(ss));
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = { site: this.site.map(s => s.toJson()) };
        if (this.subSite !== undefined) result.subSite = this.subSite.map(ss => ss.toJson());
        return result;
    }
}

export class ClaimResponseAddItemDetail {
    traceNumber?: Identifier[];
    revenue?: CodeableConcept;
    productOrService?: CodeableConcept;
    productOrServiceEnd?: CodeableConcept;
    modifier?: CodeableConcept[];
    quantity?: Quantity;
    unitPrice?: Money;
    factor?: FhirDecimal;
    tax?: Money;
    net?: Money;
    noteNumber?: FhirPositiveInt[];
    reviewOutcome?: ClaimResponseReviewOutcome;
    adjudication?: ClaimResponseAdjudication[];
    // subDetail?: ClaimResponseAddItemSubDetail[]; // TODO: Define this class

    constructor(data: any = {}) {
        if (data.traceNumber !== undefined) this.traceNumber = data.traceNumber;
        if (data.revenue !== undefined) {
            this.revenue = data.revenue instanceof CodeableConcept ? data.revenue : new CodeableConcept(data.revenue);
        }
        if (data.productOrService !== undefined) {
            this.productOrService = data.productOrService instanceof CodeableConcept ? data.productOrService : new CodeableConcept(data.productOrService);
        }
        if (data.productOrServiceEnd !== undefined) {
            this.productOrServiceEnd = data.productOrServiceEnd instanceof CodeableConcept ? data.productOrServiceEnd : new CodeableConcept(data.productOrServiceEnd);
        }
        if (data.modifier !== undefined) {
            this.modifier = data.modifier.map((m: any) => m instanceof CodeableConcept ? m : new CodeableConcept(m));
        }
        if (data.quantity !== undefined) {
            this.quantity = data.quantity instanceof Quantity ? data.quantity : new Quantity(data.quantity);
        }
        if (data.unitPrice !== undefined) {
            this.unitPrice = data.unitPrice instanceof Money ? data.unitPrice : new Money(data.unitPrice);
        }
        if (data.factor !== undefined) this.factor = data.factor as any;
        if (data.tax !== undefined) {
            this.tax = data.tax instanceof Money ? data.tax : new Money(data.tax);
        }
        if (data.net !== undefined) {
            this.net = data.net instanceof Money ? data.net : new Money(data.net);
        }
        if (data.noteNumber !== undefined) this.noteNumber = data.noteNumber;
        if (data.reviewOutcome !== undefined) {
            this.reviewOutcome = new ClaimResponseReviewOutcome(data.reviewOutcome);
        }
        if (data.adjudication !== undefined) {
            this.adjudication = data.adjudication.map((adj: any) => new ClaimResponseAdjudication(adj));
        }
        // if (data.subDetail !== undefined) {
        //     this.subDetail = data.subDetail.map((sd: any) => new ClaimResponseAddItemSubDetail(sd));
        // }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.traceNumber !== undefined) result.traceNumber = this.traceNumber.map(t => t.toJson());
        if (this.revenue !== undefined) result.revenue = this.revenue.toJson();
        if (this.productOrService !== undefined) result.productOrService = this.productOrService.toJson();
        if (this.productOrServiceEnd !== undefined) result.productOrServiceEnd = this.productOrServiceEnd.toJson();
        if (this.modifier !== undefined) result.modifier = this.modifier.map(m => m.toJson());
        if (this.quantity !== undefined) result.quantity = this.quantity.toJson();
        if (this.unitPrice !== undefined) result.unitPrice = this.unitPrice.toJson();
        if (this.factor !== undefined) result.factor = this.factor;
        if (this.tax !== undefined) result.tax = this.tax.toJson();
        if (this.net !== undefined) result.net = this.net.toJson();
        if (this.noteNumber !== undefined) result.noteNumber = this.noteNumber;
        if (this.reviewOutcome !== undefined) result.reviewOutcome = this.reviewOutcome.toJson();
        if (this.adjudication !== undefined) result.adjudication = this.adjudication.map(adj => adj.toJson());
        // if (this.subDetail !== undefined) result.subDetail = this.subDetail.map(sd => sd.toJson());
        return result;
    }
}

export class ClaimResponseAddItemSubDetail {
    traceNumber?: Identifier[];
    revenue?: CodeableConcept;
    productOrService?: CodeableConcept;
    productOrServiceEnd?: CodeableConcept;
    modifier?: CodeableConcept[];
    quantity?: Quantity;
    unitPrice?: Money;
    factor?: FhirDecimal;
    tax?: Money;
    net?: Money;
    noteNumber?: FhirPositiveInt[];
    reviewOutcome?: ClaimResponseReviewOutcome;
    adjudication?: ClaimResponseAdjudication[];

    constructor(data: any = {}) {
        if (data.traceNumber !== undefined) this.traceNumber = data.traceNumber;
        if (data.revenue !== undefined) {
            this.revenue = data.revenue instanceof CodeableConcept ? data.revenue : new CodeableConcept(data.revenue);
        }
        if (data.productOrService !== undefined) {
            this.productOrService = data.productOrService instanceof CodeableConcept ? data.productOrService : new CodeableConcept(data.productOrService);
        }
        if (data.productOrServiceEnd !== undefined) {
            this.productOrServiceEnd = data.productOrServiceEnd instanceof CodeableConcept ? data.productOrServiceEnd : new CodeableConcept(data.productOrServiceEnd);
        }
        if (data.modifier !== undefined) {
            this.modifier = data.modifier.map((m: any) => m instanceof CodeableConcept ? m : new CodeableConcept(m));
        }
        if (data.quantity !== undefined) {
            this.quantity = data.quantity instanceof Quantity ? data.quantity : new Quantity(data.quantity);
        }
        if (data.unitPrice !== undefined) {
            this.unitPrice = data.unitPrice instanceof Money ? data.unitPrice : new Money(data.unitPrice);
        }
        if (data.factor !== undefined) this.factor = data.factor as any;
        if (data.tax !== undefined) {
            this.tax = data.tax instanceof Money ? data.tax : new Money(data.tax);
        }
        if (data.net !== undefined) {
            this.net = data.net instanceof Money ? data.net : new Money(data.net);
        }
        if (data.noteNumber !== undefined) this.noteNumber = data.noteNumber;
        if (data.reviewOutcome !== undefined) {
            this.reviewOutcome = new ClaimResponseReviewOutcome(data.reviewOutcome);
        }
        if (data.adjudication !== undefined) {
            this.adjudication = data.adjudication.map((adj: any) => new ClaimResponseAdjudication(adj));
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.traceNumber !== undefined) result.traceNumber = this.traceNumber.map(t => t.toJson());
        if (this.revenue !== undefined) result.revenue = this.revenue.toJson();
        if (this.productOrService !== undefined) result.productOrService = this.productOrService.toJson();
        if (this.productOrServiceEnd !== undefined) result.productOrServiceEnd = this.productOrServiceEnd.toJson();
        if (this.modifier !== undefined) result.modifier = this.modifier.map(m => m.toJson());
        if (this.quantity !== undefined) result.quantity = this.quantity.toJson();
        if (this.unitPrice !== undefined) result.unitPrice = this.unitPrice.toJson();
        if (this.factor !== undefined) result.factor = this.factor;
        if (this.tax !== undefined) result.tax = this.tax.toJson();
        if (this.net !== undefined) result.net = this.net.toJson();
        if (this.noteNumber !== undefined) result.noteNumber = this.noteNumber;
        if (this.reviewOutcome !== undefined) result.reviewOutcome = this.reviewOutcome.toJson();
        if (this.adjudication !== undefined) result.adjudication = this.adjudication.map(adj => adj.toJson());
        return result;
    }
}

export class ClaimResponseAddItem {
    itemSequence?: FhirPositiveInt[];
    detailSequence?: FhirPositiveInt[];
    subdetailSequence?: FhirPositiveInt[];
    traceNumber?: Identifier[];
    provider?: Reference[];
    revenue?: CodeableConcept;
    productOrService?: CodeableConcept;
    productOrServiceEnd?: CodeableConcept;
    request?: Reference[];
    modifier?: CodeableConcept[];
    programCode?: CodeableConcept[];
    servicedDate?: FhirDate;
    servicedPeriod?: Period;
    locationCodeableConcept?: CodeableConcept;
    locationAddress?: Address;
    locationReference?: Reference;
    quantity?: Quantity;
    unitPrice?: Money;
    factor?: FhirDecimal;
    tax?: Money;
    net?: Money;
    bodySite?: ClaimResponseBodySite[];
    noteNumber?: FhirPositiveInt[];
    reviewOutcome?: ClaimResponseReviewOutcome;
    adjudication?: ClaimResponseAdjudication[];
    detail?: ClaimResponseAddItemDetail[];

    constructor(data: any = {}) {
        if (data.itemSequence !== undefined) this.itemSequence = data.itemSequence;
        if (data.detailSequence !== undefined) this.detailSequence = data.detailSequence;
        if (data.subdetailSequence !== undefined) this.subdetailSequence = data.subdetailSequence;
        if (data.traceNumber !== undefined) this.traceNumber = data.traceNumber;
        if (data.provider !== undefined) {
            this.provider = data.provider.map((p: any) => p instanceof Reference ? p : new Reference(p));
        }
        if (data.revenue !== undefined) {
            this.revenue = data.revenue instanceof CodeableConcept ? data.revenue : new CodeableConcept(data.revenue);
        }
        if (data.productOrService !== undefined) {
            this.productOrService = data.productOrService instanceof CodeableConcept ? data.productOrService : new CodeableConcept(data.productOrService);
        }
        if (data.productOrServiceEnd !== undefined) {
            this.productOrServiceEnd = data.productOrServiceEnd instanceof CodeableConcept ? data.productOrServiceEnd : new CodeableConcept(data.productOrServiceEnd);
        }
        if (data.request !== undefined) {
            this.request = data.request.map((r: any) => r instanceof Reference ? r : new Reference(r));
        }
        if (data.modifier !== undefined) {
            this.modifier = data.modifier.map((m: any) => m instanceof CodeableConcept ? m : new CodeableConcept(m));
        }
        if (data.programCode !== undefined) {
            this.programCode = data.programCode.map((pc: any) => pc instanceof CodeableConcept ? pc : new CodeableConcept(pc));
        }
        if (data.servicedDate !== undefined) this.servicedDate = data.servicedDate as any;
        if (data.servicedPeriod !== undefined) this.servicedPeriod = data.servicedPeriod;
        if (data.locationCodeableConcept !== undefined) {
            this.locationCodeableConcept = data.locationCodeableConcept instanceof CodeableConcept ? data.locationCodeableConcept : new CodeableConcept(data.locationCodeableConcept);
        }
        if (data.locationAddress !== undefined) this.locationAddress = data.locationAddress;
        if (data.locationReference !== undefined) {
            this.locationReference = data.locationReference instanceof Reference ? data.locationReference : new Reference(data.locationReference);
        }
        if (data.quantity !== undefined) {
            this.quantity = data.quantity instanceof Quantity ? data.quantity : new Quantity(data.quantity);
        }
        if (data.unitPrice !== undefined) {
            this.unitPrice = data.unitPrice instanceof Money ? data.unitPrice : new Money(data.unitPrice);
        }
        if (data.factor !== undefined) this.factor = data.factor as any;
        if (data.tax !== undefined) {
            this.tax = data.tax instanceof Money ? data.tax : new Money(data.tax);
        }
        if (data.net !== undefined) {
            this.net = data.net instanceof Money ? data.net : new Money(data.net);
        }
        if (data.bodySite !== undefined) {
            this.bodySite = data.bodySite.map((bs: any) => new ClaimResponseBodySite(bs));
        }
        if (data.noteNumber !== undefined) this.noteNumber = data.noteNumber;
        if (data.reviewOutcome !== undefined) {
            this.reviewOutcome = new ClaimResponseReviewOutcome(data.reviewOutcome);
        }
        if (data.adjudication !== undefined) {
            this.adjudication = data.adjudication.map((adj: any) => new ClaimResponseAdjudication(adj));
        }
        if (data.detail !== undefined) {
            this.detail = data.detail.map((d: any) => new ClaimResponseAddItemDetail(d));
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.itemSequence !== undefined) result.itemSequence = this.itemSequence;
        if (this.detailSequence !== undefined) result.detailSequence = this.detailSequence;
        if (this.subdetailSequence !== undefined) result.subdetailSequence = this.subdetailSequence;
        if (this.traceNumber !== undefined) result.traceNumber = this.traceNumber.map(t => t.toJson());
        if (this.provider !== undefined) result.provider = this.provider.map(p => p.toJson());
        if (this.revenue !== undefined) result.revenue = this.revenue.toJson();
        if (this.productOrService !== undefined) result.productOrService = this.productOrService.toJson();
        if (this.productOrServiceEnd !== undefined) result.productOrServiceEnd = this.productOrServiceEnd.toJson();
        if (this.request !== undefined) result.request = this.request.map(r => r.toJson());
        if (this.modifier !== undefined) result.modifier = this.modifier.map(m => m.toJson());
        if (this.programCode !== undefined) result.programCode = this.programCode.map(pc => pc.toJson());
        if (this.servicedDate !== undefined) result.servicedDate = this.servicedDate;
        if (this.servicedPeriod !== undefined) result.servicedPeriod = this.servicedPeriod.toJson();
        if (this.locationCodeableConcept !== undefined) result.locationCodeableConcept = this.locationCodeableConcept.toJson();
        if (this.locationAddress !== undefined) result.locationAddress = this.locationAddress.toJson();
        if (this.locationReference !== undefined) result.locationReference = this.locationReference.toJson();
        if (this.quantity !== undefined) result.quantity = this.quantity.toJson();
        if (this.unitPrice !== undefined) result.unitPrice = this.unitPrice.toJson();
        if (this.factor !== undefined) result.factor = this.factor;
        if (this.tax !== undefined) result.tax = this.tax.toJson();
        if (this.net !== undefined) result.net = this.net.toJson();
        if (this.bodySite !== undefined) result.bodySite = this.bodySite.map(bs => bs.toJson());
        if (this.noteNumber !== undefined) result.noteNumber = this.noteNumber;
        if (this.reviewOutcome !== undefined) result.reviewOutcome = this.reviewOutcome.toJson();
        if (this.adjudication !== undefined) result.adjudication = this.adjudication.map(adj => adj.toJson());
        if (this.detail !== undefined) result.detail = this.detail.map(d => d.toJson());
        return result;
    }
}

export class ClaimResponseTotal {
    category: CodeableConcept;
    amount: Money;

    constructor(data: any) {
        this.category = data.category instanceof CodeableConcept ? data.category : new CodeableConcept(data.category);
        this.amount = data.amount instanceof Money ? data.amount : new Money(data.amount);
    }

    toJson(): Record<string, any> {
        return {
            category: this.category.toJson(),
            amount: this.amount.toJson()
        };
    }
}

export class ClaimResponsePayment {
    type: CodeableConcept;
    adjustment?: Money;
    adjustmentReason?: CodeableConcept;
    date?: FhirDate;
    amount: Money;
    identifier?: Identifier;

    constructor(data: any) {
        this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        this.amount = data.amount instanceof Money ? data.amount : new Money(data.amount);
        if (data.adjustment !== undefined) {
            this.adjustment = data.adjustment instanceof Money ? data.adjustment : new Money(data.adjustment);
        }
        if (data.adjustmentReason !== undefined) {
            this.adjustmentReason = data.adjustmentReason instanceof CodeableConcept ? data.adjustmentReason : new CodeableConcept(data.adjustmentReason);
        }
        if (data.date !== undefined) this.date = data.date as any;
        if (data.identifier !== undefined) this.identifier = data.identifier;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            type: this.type.toJson(),
            amount: this.amount.toJson()
        };
        if (this.adjustment !== undefined) result.adjustment = this.adjustment.toJson();
        if (this.adjustmentReason !== undefined) result.adjustmentReason = this.adjustmentReason.toJson();
        if (this.date !== undefined) result.date = this.date;
        if (this.identifier !== undefined) result.identifier = this.identifier.toJson();
        return result;
    }
}

export class ClaimResponseProcessNote {
    number?: FhirPositiveInt;
    type?: CodeableConcept;
    text: FhirString;
    language?: CodeableConcept;

    constructor(data: any) {
        this.text = data.text as any;
        if (data.number !== undefined) this.number = data.number as any;
        if (data.type !== undefined) {
            this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        }
        if (data.language !== undefined) {
            this.language = data.language instanceof CodeableConcept ? data.language : new CodeableConcept(data.language);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = { text: this.text };
        if (this.number !== undefined) result.number = this.number;
        if (this.type !== undefined) result.type = this.type.toJson();
        if (this.language !== undefined) result.language = this.language.toJson();
        return result;
    }
}

export class ClaimResponseInsurance {
    sequence: FhirPositiveInt;
    focal: FhirBoolean;
    coverage: Reference;
    businessArrangement?: FhirString;
    claimResponse?: Reference;

    constructor(data: any) {
        this.sequence = data.sequence as any;
        this.focal = data.focal as any;
        this.coverage = data.coverage instanceof Reference ? data.coverage : new Reference(data.coverage);
        if (data.businessArrangement !== undefined) this.businessArrangement = data.businessArrangement as any;
        if (data.claimResponse !== undefined) {
            this.claimResponse = data.claimResponse instanceof Reference ? data.claimResponse : new Reference(data.claimResponse);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            sequence: this.sequence,
            focal: this.focal,
            coverage: this.coverage.toJson()
        };
        if (this.businessArrangement !== undefined) result.businessArrangement = this.businessArrangement;
        if (this.claimResponse !== undefined) result.claimResponse = this.claimResponse.toJson();
        return result;
    }
}

export class ClaimResponseError {
    itemSequence?: FhirPositiveInt;
    detailSequence?: FhirPositiveInt;
    subDetailSequence?: FhirPositiveInt;
    code: CodeableConcept;
    expression?: FhirString[];

    constructor(data: any) {
        this.code = data.code instanceof CodeableConcept ? data.code : new CodeableConcept(data.code);
        if (data.itemSequence !== undefined) this.itemSequence = data.itemSequence as any;
        if (data.detailSequence !== undefined) this.detailSequence = data.detailSequence as any;
        if (data.subDetailSequence !== undefined) this.subDetailSequence = data.subDetailSequence as any;
        if (data.expression !== undefined) this.expression = data.expression;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = { code: this.code.toJson() };
        if (this.itemSequence !== undefined) result.itemSequence = this.itemSequence;
        if (this.detailSequence !== undefined) result.detailSequence = this.detailSequence;
        if (this.subDetailSequence !== undefined) result.subDetailSequence = this.subDetailSequence;
        if (this.expression !== undefined) result.expression = this.expression;
        return result;
    }
}

export interface ClaimResponseConstructorData {
    id?: string;
    identifier?: Identifier[];
    traceNumber?: Identifier[];
    status: FhirCode | string;
    type: CodeableConcept | { coding: any[] };
    subType?: CodeableConcept | { coding: any[] };
    use: FhirCode | string;
    patient: Reference | { reference: string };
    created: FhirDateTime | string;
    insurer?: Reference | { reference: string };
    requestor?: Reference | { reference: string };
    request?: Reference | { reference: string };
    outcome: FhirCode | string;
    decision?: CodeableConcept | { coding: any[] };
    disposition?: FhirString | string;
    preAuthRef?: FhirString | string;
    // New fields
    event?: ClaimResponseEvent[] | any[];
    payeeType?: CodeableConcept | { coding: any[] };
    encounter?: Reference[] | { reference: string }[];
    diagnosisRelatedGroup?: CodeableConcept | { coding: any[] };
    item?: ClaimResponseItem[] | any[];
    addItem?: ClaimResponseAddItem[] | any[];
    adjudication?: ClaimResponseAdjudication[] | any[];
    total?: ClaimResponseTotal[] | any[];
    payment?: ClaimResponsePayment | any;
    fundsReserve?: CodeableConcept | { coding: any[] };
    formCode?: CodeableConcept | { coding: any[] };
    form?: Attachment | any;
    processNote?: ClaimResponseProcessNote[] | any[];
    communicationRequest?: Reference[] | { reference: string }[];
    insurance?: ClaimResponseInsurance[] | any[];
    error?: ClaimResponseError[] | any[];
}

export class ClaimResponse extends BaseFhirResource {
    resourceType: FhirResourceTypes = "ClaimResponse";
    identifier?: Identifier[];
    traceNumber?: Identifier[];
    status: FhirCode;
    type: CodeableConcept;
    subType?: CodeableConcept;
    use: FhirCode;
    patient: Reference;
    created: FhirDateTime;
    insurer?: Reference;
    requestor?: Reference;
    request?: Reference;
    outcome: FhirCode;
    decision?: CodeableConcept;
    disposition?: FhirString;
    preAuthRef?: FhirString;
    // New fields
    event?: ClaimResponseEvent[];
    payeeType?: CodeableConcept;
    encounter?: Reference[];
    diagnosisRelatedGroup?: CodeableConcept;
    item?: ClaimResponseItem[];
    addItem?: ClaimResponseAddItem[];
    adjudication?: ClaimResponseAdjudication[];
    total?: ClaimResponseTotal[];
    payment?: ClaimResponsePayment;
    fundsReserve?: CodeableConcept;
    formCode?: CodeableConcept;
    form?: Attachment;
    processNote?: ClaimResponseProcessNote[];
    communicationRequest?: Reference[];
    insurance?: ClaimResponseInsurance[];
    error?: ClaimResponseError[];


    constructor(data: ClaimResponseConstructorData) {
        super(data as any);
        this.status = data.status as any;
        this.use = data.use as any;
        this.created = data.created as any;
        this.outcome = data.outcome as any;

        this.type = data.type instanceof CodeableConcept
            ? data.type
            : new CodeableConcept(data.type as any);

        this.patient = data.patient instanceof Reference
            ? data.patient
            : new Reference(data.patient as any);

        if (data.identifier !== undefined) {
            this.identifier = data.identifier;
        }
        if (data.traceNumber !== undefined) {
            this.traceNumber = data.traceNumber;
        }
        if (data.subType !== undefined) {
            this.subType = data.subType instanceof CodeableConcept
                ? data.subType
                : new CodeableConcept(data.subType as any);
        }
        if (data.insurer !== undefined) {
            this.insurer = data.insurer instanceof Reference
                ? data.insurer
                : new Reference(data.insurer as any);
        }
        if (data.requestor !== undefined) {
            this.requestor = data.requestor instanceof Reference
                ? data.requestor
                : new Reference(data.requestor as any);
        }
        if (data.request !== undefined) {
            this.request = data.request instanceof Reference
                ? data.request
                : new Reference(data.request as any);
        }
        if (data.decision !== undefined) {
            this.decision = data.decision instanceof CodeableConcept
                ? data.decision
                : new CodeableConcept(data.decision as any);
        }
        if (data.disposition !== undefined) {
            this.disposition = data.disposition as any;
        }
        if (data.preAuthRef !== undefined) {
            this.preAuthRef = data.preAuthRef as any;
        }

        // New fields
        if (data.event !== undefined) {
            this.event = data.event.map((e: any) => e instanceof ClaimResponseEvent ? e : new ClaimResponseEvent(e));
        }
        if (data.payeeType !== undefined) {
            this.payeeType = data.payeeType instanceof CodeableConcept ? data.payeeType : new CodeableConcept(data.payeeType as any);
        }
        if (data.encounter !== undefined) {
            this.encounter = data.encounter.map((e: any) => e instanceof Reference ? e : new Reference(e as any));
        }
        if (data.diagnosisRelatedGroup !== undefined) {
            this.diagnosisRelatedGroup = data.diagnosisRelatedGroup instanceof CodeableConcept ? data.diagnosisRelatedGroup : new CodeableConcept(data.diagnosisRelatedGroup as any);
        }
        if (data.item !== undefined) {
            this.item = data.item.map((i: any) => i instanceof ClaimResponseItem ? i : new ClaimResponseItem(i));
        }
        if (data.addItem !== undefined) {
            this.addItem = data.addItem.map((ai: any) => ai instanceof ClaimResponseAddItem ? ai : new ClaimResponseAddItem(ai));
        }
        if (data.adjudication !== undefined) {
            this.adjudication = data.adjudication.map((adj: any) => adj instanceof ClaimResponseAdjudication ? adj : new ClaimResponseAdjudication(adj));
        }
        if (data.total !== undefined) {
            this.total = data.total.map((t: any) => t instanceof ClaimResponseTotal ? t : new ClaimResponseTotal(t));
        }
        if (data.payment !== undefined) {
            this.payment = data.payment instanceof ClaimResponsePayment ? data.payment : new ClaimResponsePayment(data.payment);
        }
        if (data.fundsReserve !== undefined) {
            this.fundsReserve = data.fundsReserve instanceof CodeableConcept ? data.fundsReserve : new CodeableConcept(data.fundsReserve as any);
        }
        if (data.formCode !== undefined) {
            this.formCode = data.formCode instanceof CodeableConcept ? data.formCode : new CodeableConcept(data.formCode as any);
        }
        if (data.form !== undefined) {
            this.form = data.form;
        }
        if (data.processNote !== undefined) {
            this.processNote = data.processNote.map((pn: any) => pn instanceof ClaimResponseProcessNote ? pn : new ClaimResponseProcessNote(pn));
        }
        if (data.communicationRequest !== undefined) {
            this.communicationRequest = data.communicationRequest.map((cr: any) => cr instanceof Reference ? cr : new Reference(cr as any));
        }
        if (data.insurance !== undefined) {
            this.insurance = data.insurance.map((ins: any) => ins instanceof ClaimResponseInsurance ? ins : new ClaimResponseInsurance(ins));
        }
        if (data.error !== undefined) {
            this.error = data.error.map((err: any) => err instanceof ClaimResponseError ? err : new ClaimResponseError(err));
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJson()
        };

        if (this.identifier !== undefined) {
            result.identifier = this.identifier.map(id => id.toJson());
        }
        if (this.traceNumber !== undefined) {
            result.traceNumber = this.traceNumber.map(id => id.toJson());
        }
        result.status = this.status;
        result.type = this.type.toJson();
        if (this.subType !== undefined) {
            result.subType = this.subType.toJson();
        }
        result.use = this.use;
        result.patient = this.patient.toJson();
        result.created = this.created;
        if (this.insurer !== undefined) {
            result.insurer = this.insurer.toJson();
        }
        if (this.requestor !== undefined) {
            result.requestor = this.requestor.toJson();
        }
        if (this.request !== undefined) {
            result.request = this.request.toJson();
        }
        result.outcome = this.outcome;
        if (this.decision !== undefined) {
            result.decision = this.decision.toJson();
        }
        if (this.disposition !== undefined) {
            result.disposition = this.disposition;
        }
        if (this.preAuthRef !== undefined) {
            result.preAuthRef = this.preAuthRef;
        }

        // New fields
        if (this.event !== undefined) {
            result.event = this.event.map(e => e.toJson());
        }
        if (this.payeeType !== undefined) {
            result.payeeType = this.payeeType.toJson();
        }
        if (this.encounter !== undefined) {
            result.encounter = this.encounter.map(e => e.toJson());
        }
        if (this.diagnosisRelatedGroup !== undefined) {
            result.diagnosisRelatedGroup = this.diagnosisRelatedGroup.toJson();
        }
        if (this.item !== undefined) {
            result.item = this.item.map(i => i.toJson());
        }
        if (this.addItem !== undefined) {
            result.addItem = this.addItem.map(ai => ai.toJson());
        }
        if (this.adjudication !== undefined) {
            result.adjudication = this.adjudication.map(adj => adj.toJson());
        }
        if (this.total !== undefined) {
            result.total = this.total.map(t => t.toJson());
        }
        if (this.payment !== undefined) {
            result.payment = this.payment.toJson();
        }
        if (this.fundsReserve !== undefined) {
            result.fundsReserve = this.fundsReserve.toJson();
        }
        if (this.formCode !== undefined) {
            result.formCode = this.formCode.toJson();
        }
        if (this.form !== undefined) {
            result.form = this.form instanceof Attachment && this.form.toJson ? this.form.toJson() : this.form;
        }
        if (this.processNote !== undefined) {
            result.processNote = this.processNote.map(pn => pn.toJson());
        }
        if (this.communicationRequest !== undefined) {
            result.communicationRequest = this.communicationRequest.map(cr => cr.toJson());
        }
        if (this.insurance !== undefined) {
            result.insurance = this.insurance.map(ins => ins.toJson());
        }
        if (this.error !== undefined) {
            result.error = this.error.map(err => err.toJson());
        }

        return result;
    }

    toXml(): string {
        let xml = `<ClaimResponse>`;
        if (this.identifier !== undefined) {
            this.identifier.forEach(id => {
                xml += `<identifier>${id.toXml()}</identifier>`;
            });
        }
        if (this.traceNumber !== undefined) {
            this.traceNumber.forEach(id => {
                xml += `<traceNumber>${id.toXml()}</traceNumber>`;
            });
        }
        xml += `<status>${this.status}</status>`;
        xml += `<type>${this.type.toXml()}</type>`;
        if (this.subType !== undefined) {
            xml += `<subType>${this.subType.toXml()}</subType>`;
        }
        xml += `<use>${this.use}</use>`;
        xml += `<patient>${this.patient.toXml()}</patient>`;
        xml += `<created>${this.created}</created>`;
        if (this.insurer !== undefined) {
            xml += `<insurer>${this.insurer.toXml()}</insurer>`;
        }
        if (this.requestor !== undefined) {
            xml += `<requestor>${this.requestor.toXml()}</requestor>`;
        }
        if (this.request !== undefined) {
            xml += `<request>${this.request.toXml()}</request>`;
        }
        xml += `<outcome>${this.outcome}</outcome>`;
        if (this.decision !== undefined) {
            xml += `<decision>${this.decision.toXml()}</decision>`;
        }
        if (this.disposition !== undefined) {
            xml += `<disposition>${this.disposition}</disposition>`;
        }
        if (this.preAuthRef !== undefined) {
            xml += `<preAuthRef>${this.preAuthRef}</preAuthRef>`;
        }
        xml += `</ClaimResponse>`;
        return xml;
    }

}