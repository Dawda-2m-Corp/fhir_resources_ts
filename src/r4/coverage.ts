import { BaseFhirResource } from "./baseResource";
import { FhirBoolean, FhirCode, FhirPositiveInt, FhirResourceTypes, FhirString } from "./dataTypes";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { Money } from "./dataTypes/money";
import { Period } from "./dataTypes/period";
import { Quantity } from "./dataTypes/quantity";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

// Complex nested classes
export class CoveragePaymentBy {
    party: Reference;
    responsibility?: FhirString;

    constructor(data: any) {
        this.party = data.party instanceof Reference ? data.party : new Reference(data.party);
        if (data.responsibility !== undefined) {
            this.responsibility = data.responsibility as any;
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            party: this.party.toJson()
        };
        if (this.responsibility !== undefined) result.responsibility = this.responsibility;
        return result;
    }
}

export class CoverageClass {
    type: CodeableConcept;
    value: Identifier;
    name?: FhirString;

    constructor(data: any) {
        this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        this.value = data.value instanceof Identifier ? data.value : new Identifier(data.value);
        if (data.name !== undefined) {
            this.name = data.name as any;
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            type: this.type.toJson(),
            value: this.value.toJson()
        };
        if (this.name !== undefined) result.name = this.name;
        return result;
    }
}

export class CoverageCostToBeneficiaryException {
    type: CodeableConcept;
    period?: Period;

    constructor(data: any) {
        this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        if (data.period !== undefined) {
            this.period = data.period instanceof Period ? data.period : new Period(data.period);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            type: this.type.toJson()
        };
        if (this.period !== undefined) result.period = this.period.toJson();
        return result;
    }
}

export class CoverageCostToBeneficiary {
    type?: CodeableConcept;
    category?: CodeableConcept;
    network?: CodeableConcept;
    unit?: CodeableConcept;
    term?: CodeableConcept;
    valueQuantity?: Quantity;
    valueMoney?: Money;
    exception?: CoverageCostToBeneficiaryException[];

    constructor(data: any = {}) {
        if (data.type !== undefined) {
            this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        }
        if (data.category !== undefined) {
            this.category = data.category instanceof CodeableConcept ? data.category : new CodeableConcept(data.category);
        }
        if (data.network !== undefined) {
            this.network = data.network instanceof CodeableConcept ? data.network : new CodeableConcept(data.network);
        }
        if (data.unit !== undefined) {
            this.unit = data.unit instanceof CodeableConcept ? data.unit : new CodeableConcept(data.unit);
        }
        if (data.term !== undefined) {
            this.term = data.term instanceof CodeableConcept ? data.term : new CodeableConcept(data.term);
        }
        if (data.valueQuantity !== undefined) {
            this.valueQuantity = data.valueQuantity instanceof Quantity ? data.valueQuantity : new Quantity(data.valueQuantity);
        }
        if (data.valueMoney !== undefined) {
            this.valueMoney = data.valueMoney instanceof Money ? data.valueMoney : new Money(data.valueMoney);
        }
        if (data.exception !== undefined) {
            this.exception = data.exception.map((e: any) => new CoverageCostToBeneficiaryException(e));
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.type !== undefined) result.type = this.type.toJson();
        if (this.category !== undefined) result.category = this.category.toJson();
        if (this.network !== undefined) result.network = this.network.toJson();
        if (this.unit !== undefined) result.unit = this.unit.toJson();
        if (this.term !== undefined) result.term = this.term.toJson();
        if (this.valueQuantity !== undefined) result.valueQuantity = this.valueQuantity.toJson();
        if (this.valueMoney !== undefined) result.valueMoney = this.valueMoney.toJson();
        if (this.exception !== undefined) result.exception = this.exception.map(e => e.toJson());
        return result;
    }
}

export interface CoverageConstructorData {
    id?: string;
    identifier?: Identifier[];
    status: FhirCode | string;
    kind: FhirCode | string;
    paymentBy?: CoveragePaymentBy[] | any[];
    type?: CodeableConcept | { coding: any[] };
    policyHolder?: Reference | { reference: string };
    subscriber?: Reference | { reference: string };
    subscriberId?: Identifier[];
    beneficiary: Reference | { reference: string };
    dependent?: FhirString | string;
    relationship?: CodeableConcept | { coding: any[] };
    period?: Period | { start?: string; end?: string };
    insurer?: Reference | { reference: string };
    class?: CoverageClass[] | any[];
    order?: FhirPositiveInt | number;
    network?: FhirString | string;
    costToBeneficiary?: CoverageCostToBeneficiary[] | any[];
    subrogation?: FhirBoolean | boolean;
    contract?: Reference[] | { reference: string }[];
    insurancePlan?: Reference | { reference: string };
}

export class Coverage extends BaseFhirResource {
    resourceType: FhirResourceTypes = "Coverage";
    identifier?: Identifier[];
    status: FhirCode;
    kind: FhirCode;
    paymentBy?: CoveragePaymentBy[];
    type?: CodeableConcept;
    policyHolder?: Reference;
    subscriber?: Reference;
    subscriberId?: Identifier[];
    beneficiary: Reference;
    dependent?: FhirString;
    relationship?: CodeableConcept;
    period?: Period;
    insurer?: Reference;
    class?: CoverageClass[];
    order?: FhirPositiveInt;
    network?: FhirString;
    costToBeneficiary?: CoverageCostToBeneficiary[];
    subrogation?: FhirBoolean;
    contract?: Reference[];
    insurancePlan?: Reference;

    constructor(data: CoverageConstructorData) {
        super(data as any);
        this.status = data.status as any;
        this.kind = data.kind as any;

        this.beneficiary = data.beneficiary instanceof Reference
            ? data.beneficiary
            : new Reference(data.beneficiary as any);

        if (data.identifier !== undefined) {
            this.identifier = data.identifier;
        }
        if (data.paymentBy !== undefined) {
            this.paymentBy = data.paymentBy.map((pb: any) => pb instanceof CoveragePaymentBy ? pb : new CoveragePaymentBy(pb));
        }
        if (data.type !== undefined) {
            this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type as any);
        }
        if (data.policyHolder !== undefined) {
            this.policyHolder = data.policyHolder instanceof Reference ? data.policyHolder : new Reference(data.policyHolder as any);
        }
        if (data.subscriber !== undefined) {
            this.subscriber = data.subscriber instanceof Reference ? data.subscriber : new Reference(data.subscriber as any);
        }
        if (data.subscriberId !== undefined) {
            this.subscriberId = data.subscriberId;
        }
        if (data.dependent !== undefined) {
            this.dependent = data.dependent as any;
        }
        if (data.relationship !== undefined) {
            this.relationship = data.relationship instanceof CodeableConcept ? data.relationship : new CodeableConcept(data.relationship as any);
        }
        if (data.period !== undefined) {
            this.period = data.period instanceof Period ? data.period : new Period(data.period as any);
        }
        if (data.insurer !== undefined) {
            this.insurer = data.insurer instanceof Reference ? data.insurer : new Reference(data.insurer as any);
        }
        if (data.class !== undefined) {
            this.class = data.class.map((c: any) => c instanceof CoverageClass ? c : new CoverageClass(c));
        }
        if (data.order !== undefined) {
            this.order = data.order as any;
        }
        if (data.network !== undefined) {
            this.network = data.network as any;
        }
        if (data.costToBeneficiary !== undefined) {
            this.costToBeneficiary = data.costToBeneficiary.map((ctb: any) => ctb instanceof CoverageCostToBeneficiary ? ctb : new CoverageCostToBeneficiary(ctb));
        }
        if (data.subrogation !== undefined) {
            this.subrogation = data.subrogation as any;
        }
        if (data.contract !== undefined) {
            this.contract = data.contract.map((c: any) => c instanceof Reference ? c : new Reference(c as any));
        }
        if (data.insurancePlan !== undefined) {
            this.insurancePlan = data.insurancePlan instanceof Reference ? data.insurancePlan : new Reference(data.insurancePlan as any);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            ...super.toJson()
        };

        if (this.identifier !== undefined) result.identifier = this.identifier.map(id => id.toJson());
        result.status = this.status;
        result.kind = this.kind;
        if (this.paymentBy !== undefined) result.paymentBy = this.paymentBy.map(pb => pb.toJson());
        if (this.type !== undefined) result.type = this.type.toJson();
        if (this.policyHolder !== undefined) result.policyHolder = this.policyHolder.toJson();
        if (this.subscriber !== undefined) result.subscriber = this.subscriber.toJson();
        if (this.subscriberId !== undefined) result.subscriberId = this.subscriberId.map(sid => sid.toJson());
        result.beneficiary = this.beneficiary.toJson();
        if (this.dependent !== undefined) result.dependent = this.dependent;
        if (this.relationship !== undefined) result.relationship = this.relationship.toJson();
        if (this.period !== undefined) result.period = this.period.toJson();
        if (this.insurer !== undefined) result.insurer = this.insurer.toJson();
        if (this.class !== undefined) result.class = this.class.map(c => c.toJson());
        if (this.order !== undefined) result.order = this.order;
        if (this.network !== undefined) result.network = this.network;
        if (this.costToBeneficiary !== undefined) result.costToBeneficiary = this.costToBeneficiary.map(ctb => ctb.toJson());
        if (this.subrogation !== undefined) result.subrogation = this.subrogation;
        if (this.contract !== undefined) result.contract = this.contract.map(c => c.toJson());
        if (this.insurancePlan !== undefined) result.insurancePlan = this.insurancePlan.toJson();

        return result;
    }

    toXml(): string {
        let xml = `<Coverage>`;
        xml += super.toXml();

        if (this.identifier !== undefined) {
            this.identifier.forEach(id => {
                xml += `<identifier>${id.toXml()}</identifier>`;
            });
        }
        xml += `<status value="${this.status}"/>`;
        xml += `<kind value="${this.kind}"/>`;

        if (this.paymentBy !== undefined) {
            this.paymentBy.forEach(pb => {
                xml += `<paymentBy><party>${pb.party.toXml()}</party>`;
                if (pb.responsibility !== undefined) {
                    xml += `<responsibility value="${pb.responsibility}"/>`;
                }
                xml += `</paymentBy>`;
            });
        }

        if (this.type !== undefined) {
            xml += `<type>${this.type.toXml()}</type>`;
        }
        if (this.policyHolder !== undefined) {
            xml += `<policyHolder>${this.policyHolder.toXml()}</policyHolder>`;
        }
        if (this.subscriber !== undefined) {
            xml += `<subscriber>${this.subscriber.toXml()}</subscriber>`;
        }

        if (this.subscriberId !== undefined) {
            this.subscriberId.forEach(sid => {
                xml += `<subscriberId>${sid.toXml()}</subscriberId>`;
            });
        }

        xml += `<beneficiary>${this.beneficiary.toXml()}</beneficiary>`;

        if (this.dependent !== undefined) {
            xml += `<dependent value="${this.dependent}"/>`;
        }
        if (this.relationship !== undefined) {
            xml += `<relationship>${this.relationship.toXml()}</relationship>`;
        }
        if (this.period !== undefined) {
            xml += `<period>${this.period.toXml()}</period>`;
        }
        if (this.insurer !== undefined) {
            xml += `<insurer>${this.insurer.toXml()}</insurer>`;
        }

        if (this.class !== undefined) {
            this.class.forEach(c => {
                xml += `<class><type>${c.type.toXml()}</type><value>${c.value.toXml()}</value>`;
                if (c.name !== undefined) {
                    xml += `<name value="${c.name}"/>`;
                }
                xml += `</class>`;
            });
        }

        if (this.order !== undefined) {
            xml += `<order value="${this.order}"/>`;
        }
        if (this.network !== undefined) {
            xml += `<network value="${this.network}"/>`;
        }

        if (this.costToBeneficiary !== undefined) {
            this.costToBeneficiary.forEach(ctb => {
                xml += `<costToBeneficiary>`;
                if (ctb.type !== undefined) xml += `<type>${ctb.type.toXml()}</type>`;
                if (ctb.category !== undefined) xml += `<category>${ctb.category.toXml()}</category>`;
                if (ctb.network !== undefined) xml += `<network>${ctb.network.toXml()}</network>`;
                if (ctb.unit !== undefined) xml += `<unit>${ctb.unit.toXml()}</unit>`;
                if (ctb.term !== undefined) xml += `<term>${ctb.term.toXml()}</term>`;
                if (ctb.valueQuantity !== undefined) xml += `<valueQuantity>${ctb.valueQuantity.toXml()}</valueQuantity>`;
                if (ctb.valueMoney !== undefined) xml += `<valueMoney>${ctb.valueMoney.toXml()}</valueMoney>`;
                if (ctb.exception !== undefined) {
                    ctb.exception.forEach(e => {
                        xml += `<exception><type>${e.type.toXml()}</type>`;
                        if (e.period !== undefined) xml += `<period>${e.period.toXml()}</period>`;
                        xml += `</exception>`;
                    });
                }
                xml += `</costToBeneficiary>`;
            });
        }

        if (this.subrogation !== undefined) {
            xml += `<subrogation value="${this.subrogation}"/>`;
        }

        if (this.contract !== undefined) {
            this.contract.forEach(c => {
                xml += `<contract>${c.toXml()}</contract>`;
            });
        }

        if (this.insurancePlan !== undefined) {
            xml += `<insurancePlan>${this.insurancePlan.toXml()}</insurancePlan>`;
        }

        xml += `</Coverage>`;
        return xml;
    }
}