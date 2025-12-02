import { BaseFhirResource } from "./baseResource";
import { FhirCode, FhirPositiveInt, FhirResourceTypes, FhirString } from "./dataTypes";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { ExtendedContactDetail } from "./dataTypes/extendedContactDetail";
import { Money } from "./dataTypes/money";
import { Period } from "./dataTypes/period";
import { Quantity } from "./dataTypes/quantity";
import { Identifier } from "./identifier";
import { Reference } from "./reference";

// Nested classes for InsurancePlan

export class InsurancePlanCoverageBenefitLimit {
    value?: Quantity;
    code?: CodeableConcept;

    constructor(data: any) {
        if (data.value !== undefined) {
            this.value = data.value instanceof Quantity ? data.value : new Quantity(data.value);
        }
        if (data.code !== undefined) {
            this.code = data.code instanceof CodeableConcept ? data.code : new CodeableConcept(data.code);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.value !== undefined) result.value = this.value.toJson();
        if (this.code !== undefined) result.code = this.code.toJson();
        return result;
    }

    toXml(): string {
        let xml = '<limit>';
        if (this.value !== undefined) xml += `<value>${this.value.toXml()}</value>`;
        if (this.code !== undefined) xml += `<code>${this.code.toXml()}</code>`;
        xml += '</limit>';
        return xml;
    }
}

export class InsurancePlanCoverageBenefit {
    type: CodeableConcept;
    requirement?: FhirString;
    limit?: InsurancePlanCoverageBenefitLimit[];

    constructor(data: any) {
        this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        if (data.requirement !== undefined) {
            this.requirement = data.requirement as FhirString;
        }
        if (data.limit !== undefined) {
            this.limit = Array.isArray(data.limit)
                ? data.limit.map((l: any) => new InsurancePlanCoverageBenefitLimit(l))
                : [new InsurancePlanCoverageBenefitLimit(data.limit)];
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        result.type = this.type.toJson();
        if (this.requirement !== undefined) result.requirement = this.requirement;
        if (this.limit !== undefined) result.limit = this.limit.map(l => l.toJson());
        return result;
    }

    toXml(): string {
        let xml = '<benefit>';
        xml += `<type>${this.type.toXml()}</type>`;
        if (this.requirement !== undefined) xml += `<requirement value="${this.requirement}"/>`;
        if (this.limit !== undefined) {
            this.limit.forEach(l => { xml += l.toXml(); });
        }
        xml += '</benefit>';
        return xml;
    }
}

export class InsurancePlanCoverage {
    type: CodeableConcept;
    network?: Reference[];
    benefit: InsurancePlanCoverageBenefit[];

    constructor(data: any) {
        this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        if (data.network !== undefined) {
            this.network = Array.isArray(data.network)
                ? data.network.map((n: any) => n instanceof Reference ? n : new Reference(n))
                : [data.network instanceof Reference ? data.network : new Reference(data.network)];
        }
        this.benefit = Array.isArray(data.benefit)
            ? data.benefit.map((b: any) => new InsurancePlanCoverageBenefit(b))
            : [new InsurancePlanCoverageBenefit(data.benefit)];
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        result.type = this.type.toJson();
        if (this.network !== undefined) result.network = this.network.map(n => n.toJson());
        result.benefit = this.benefit.map(b => b.toJson());
        return result;
    }

    toXml(): string {
        let xml = '<coverage>';
        xml += `<type>${this.type.toXml()}</type>`;
        if (this.network !== undefined) {
            this.network.forEach(n => { xml += `<network>${n.toXml()}</network>`; });
        }
        this.benefit.forEach(b => { xml += b.toXml(); });
        xml += '</coverage>';
        return xml;
    }
}

export class InsurancePlanPlanGeneralCost {
    type?: CodeableConcept;
    groupSize?: FhirPositiveInt;
    cost?: Money;
    comment?: FhirString;

    constructor(data: any) {
        if (data.type !== undefined) {
            this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        }
        if (data.groupSize !== undefined) {
            this.groupSize = data.groupSize as FhirPositiveInt;
        }
        if (data.cost !== undefined) {
            this.cost = data.cost instanceof Money ? data.cost : new Money(data.cost);
        }
        if (data.comment !== undefined) {
            this.comment = data.comment as FhirString;
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.type !== undefined) result.type = this.type.toJson();
        if (this.groupSize !== undefined) result.groupSize = this.groupSize;
        if (this.cost !== undefined) result.cost = this.cost.toJson();
        if (this.comment !== undefined) result.comment = this.comment;
        return result;
    }

    toXml(): string {
        let xml = '<generalCost>';
        if (this.type !== undefined) xml += `<type>${this.type.toXml()}</type>`;
        if (this.groupSize !== undefined) xml += `<groupSize value="${this.groupSize}"/>`;
        if (this.cost !== undefined) xml += `<cost>${this.cost.toXml()}</cost>`;
        if (this.comment !== undefined) xml += `<comment value="${this.comment}"/>`;
        xml += '</generalCost>';
        return xml;
    }
}

export class InsurancePlanPlanSpecificCostBenefitCost {
    type: CodeableConcept;
    applicability?: CodeableConcept;
    qualifiers?: CodeableConcept[];
    value?: Quantity;

    constructor(data: any) {
        this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        if (data.applicability !== undefined) {
            this.applicability = data.applicability instanceof CodeableConcept ? data.applicability : new CodeableConcept(data.applicability);
        }
        if (data.qualifiers !== undefined) {
            this.qualifiers = Array.isArray(data.qualifiers)
                ? data.qualifiers.map((q: any) => q instanceof CodeableConcept ? q : new CodeableConcept(q))
                : [data.qualifiers instanceof CodeableConcept ? data.qualifiers : new CodeableConcept(data.qualifiers)];
        }
        if (data.value !== undefined) {
            this.value = data.value instanceof Quantity ? data.value : new Quantity(data.value);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        result.type = this.type.toJson();
        if (this.applicability !== undefined) result.applicability = this.applicability.toJson();
        if (this.qualifiers !== undefined) result.qualifiers = this.qualifiers.map(q => q.toJson());
        if (this.value !== undefined) result.value = this.value.toJson();
        return result;
    }

    toXml(): string {
        let xml = '<cost>';
        xml += `<type>${this.type.toXml()}</type>`;
        if (this.applicability !== undefined) xml += `<applicability>${this.applicability.toXml()}</applicability>`;
        if (this.qualifiers !== undefined) {
            this.qualifiers.forEach(q => { xml += `<qualifiers>${q.toXml()}</qualifiers>`; });
        }
        if (this.value !== undefined) xml += `<value>${this.value.toXml()}</value>`;
        xml += '</cost>';
        return xml;
    }
}

export class InsurancePlanPlanSpecificCostBenefit {
    type: CodeableConcept;
    cost?: InsurancePlanPlanSpecificCostBenefitCost[];

    constructor(data: any) {
        this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        if (data.cost !== undefined) {
            this.cost = Array.isArray(data.cost)
                ? data.cost.map((c: any) => new InsurancePlanPlanSpecificCostBenefitCost(c))
                : [new InsurancePlanPlanSpecificCostBenefitCost(data.cost)];
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        result.type = this.type.toJson();
        if (this.cost !== undefined) result.cost = this.cost.map(c => c.toJson());
        return result;
    }

    toXml(): string {
        let xml = '<benefit>';
        xml += `<type>${this.type.toXml()}</type>`;
        if (this.cost !== undefined) {
            this.cost.forEach(c => { xml += c.toXml(); });
        }
        xml += '</benefit>';
        return xml;
    }
}

export class InsurancePlanPlanSpecificCost {
    category: CodeableConcept;
    benefit?: InsurancePlanPlanSpecificCostBenefit[];

    constructor(data: any) {
        this.category = data.category instanceof CodeableConcept ? data.category : new CodeableConcept(data.category);
        if (data.benefit !== undefined) {
            this.benefit = Array.isArray(data.benefit)
                ? data.benefit.map((b: any) => new InsurancePlanPlanSpecificCostBenefit(b))
                : [new InsurancePlanPlanSpecificCostBenefit(data.benefit)];
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        result.category = this.category.toJson();
        if (this.benefit !== undefined) result.benefit = this.benefit.map(b => b.toJson());
        return result;
    }

    toXml(): string {
        let xml = '<specificCost>';
        xml += `<category>${this.category.toXml()}</category>`;
        if (this.benefit !== undefined) {
            this.benefit.forEach(b => { xml += b.toXml(); });
        }
        xml += '</specificCost>';
        return xml;
    }
}

export class InsurancePlanPlan {
    identifier?: Identifier[];
    type?: CodeableConcept;
    coverageArea?: Reference[];
    network?: Reference[];
    generalCost?: InsurancePlanPlanGeneralCost[];
    specificCost?: InsurancePlanPlanSpecificCost[];

    constructor(data: any) {
        if (data.identifier !== undefined) {
            this.identifier = Array.isArray(data.identifier)
                ? data.identifier.map((i: any) => i instanceof Identifier ? i : new Identifier(i))
                : [data.identifier instanceof Identifier ? data.identifier : new Identifier(data.identifier)];
        }
        if (data.type !== undefined) {
            this.type = data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type);
        }
        if (data.coverageArea !== undefined) {
            this.coverageArea = Array.isArray(data.coverageArea)
                ? data.coverageArea.map((ca: any) => ca instanceof Reference ? ca : new Reference(ca))
                : [data.coverageArea instanceof Reference ? data.coverageArea : new Reference(data.coverageArea)];
        }
        if (data.network !== undefined) {
            this.network = Array.isArray(data.network)
                ? data.network.map((n: any) => n instanceof Reference ? n : new Reference(n))
                : [data.network instanceof Reference ? data.network : new Reference(data.network)];
        }
        if (data.generalCost !== undefined) {
            this.generalCost = Array.isArray(data.generalCost)
                ? data.generalCost.map((gc: any) => new InsurancePlanPlanGeneralCost(gc))
                : [new InsurancePlanPlanGeneralCost(data.generalCost)];
        }
        if (data.specificCost !== undefined) {
            this.specificCost = Array.isArray(data.specificCost)
                ? data.specificCost.map((sc: any) => new InsurancePlanPlanSpecificCost(sc))
                : [new InsurancePlanPlanSpecificCost(data.specificCost)];
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.identifier !== undefined) result.identifier = this.identifier.map(i => i.toJson());
        if (this.type !== undefined) result.type = this.type.toJson();
        if (this.coverageArea !== undefined) result.coverageArea = this.coverageArea.map(ca => ca.toJson());
        if (this.network !== undefined) result.network = this.network.map(n => n.toJson());
        if (this.generalCost !== undefined) result.generalCost = this.generalCost.map(gc => gc.toJson());
        if (this.specificCost !== undefined) result.specificCost = this.specificCost.map(sc => sc.toJson());
        return result;
    }

    toXml(): string {
        let xml = '<plan>';
        if (this.identifier !== undefined) {
            this.identifier.forEach(i => { xml += `<identifier>${i.toXml()}</identifier>`; });
        }
        if (this.type !== undefined) xml += `<type>${this.type.toXml()}</type>`;
        if (this.coverageArea !== undefined) {
            this.coverageArea.forEach(ca => { xml += `<coverageArea>${ca.toXml()}</coverageArea>`; });
        }
        if (this.network !== undefined) {
            this.network.forEach(n => { xml += `<network>${n.toXml()}</network>`; });
        }
        if (this.generalCost !== undefined) {
            this.generalCost.forEach(gc => { xml += gc.toXml(); });
        }
        if (this.specificCost !== undefined) {
            this.specificCost.forEach(sc => { xml += sc.toXml(); });
        }
        xml += '</plan>';
        return xml;
    }
}

// Constructor interface for InsurancePlan
export interface InsurancePlanConstructorData {
    resourceType?: FhirResourceTypes;
    id?: FhirString;
    identifier?: Identifier[] | any[] | any;
    status?: FhirCode | string;
    type?: CodeableConcept[] | any[] | any;
    name?: FhirString;
    alias?: FhirString[] | string[] | string;
    period?: Period | any;
    ownedBy?: Reference | any;
    administeredBy?: Reference | any;
    coverageArea?: Reference[] | any[] | any;
    contact?: ExtendedContactDetail[] | any[] | any;
    endpoint?: Reference[] | any[] | any;
    network?: Reference[] | any[] | any;
    coverage?: InsurancePlanCoverage[] | any[] | any;
    plan?: InsurancePlanPlan[] | any[] | any;
}

// Main InsurancePlan resource class
export class InsurancePlan extends BaseFhirResource {
    resourceType: FhirResourceTypes = 'InsurancePlan';
    identifier?: Identifier[];
    status?: FhirCode;
    type?: CodeableConcept[];
    name?: FhirString;
    alias?: FhirString[];
    period?: Period;
    ownedBy?: Reference;
    administeredBy?: Reference;
    coverageArea?: Reference[];
    contact?: ExtendedContactDetail[];
    endpoint?: Reference[];
    network?: Reference[];
    coverage?: InsurancePlanCoverage[];
    plan?: InsurancePlanPlan[];

    constructor(data: InsurancePlanConstructorData) {
        super(data as any);

        if (data.identifier !== undefined) {
            this.identifier = Array.isArray(data.identifier)
                ? data.identifier.map((i: any) => i instanceof Identifier ? i : new Identifier(i))
                : [data.identifier instanceof Identifier ? data.identifier : new Identifier(data.identifier)];
        }
        if (data.status !== undefined) {
            this.status = data.status as FhirCode;
        }
        if (data.type !== undefined) {
            this.type = Array.isArray(data.type)
                ? data.type.map((t: any) => t instanceof CodeableConcept ? t : new CodeableConcept(t))
                : [data.type instanceof CodeableConcept ? data.type : new CodeableConcept(data.type)];
        }
        if (data.name !== undefined) {
            this.name = data.name as FhirString;
        }
        if (data.alias !== undefined) {
            this.alias = Array.isArray(data.alias) ? data.alias : [data.alias];
        }
        if (data.period !== undefined) {
            this.period = data.period instanceof Period ? data.period : new Period(data.period);
        }
        if (data.ownedBy !== undefined) {
            this.ownedBy = data.ownedBy instanceof Reference ? data.ownedBy : new Reference(data.ownedBy);
        }
        if (data.administeredBy !== undefined) {
            this.administeredBy = data.administeredBy instanceof Reference ? data.administeredBy : new Reference(data.administeredBy);
        }
        if (data.coverageArea !== undefined) {
            this.coverageArea = Array.isArray(data.coverageArea)
                ? data.coverageArea.map((ca: any) => ca instanceof Reference ? ca : new Reference(ca))
                : [data.coverageArea instanceof Reference ? data.coverageArea : new Reference(data.coverageArea)];
        }
        if (data.contact !== undefined) {
            this.contact = Array.isArray(data.contact)
                ? data.contact.map((c: any) => c instanceof ExtendedContactDetail ? c : new ExtendedContactDetail(c))
                : [data.contact instanceof ExtendedContactDetail ? data.contact : new ExtendedContactDetail(data.contact)];
        }
        if (data.endpoint !== undefined) {
            this.endpoint = Array.isArray(data.endpoint)
                ? data.endpoint.map((e: any) => e instanceof Reference ? e : new Reference(e))
                : [data.endpoint instanceof Reference ? data.endpoint : new Reference(data.endpoint)];
        }
        if (data.network !== undefined) {
            this.network = Array.isArray(data.network)
                ? data.network.map((n: any) => n instanceof Reference ? n : new Reference(n))
                : [data.network instanceof Reference ? data.network : new Reference(data.network)];
        }
        if (data.coverage !== undefined) {
            this.coverage = Array.isArray(data.coverage)
                ? data.coverage.map((c: any) => new InsurancePlanCoverage(c))
                : [new InsurancePlanCoverage(data.coverage)];
        }
        if (data.plan !== undefined) {
            this.plan = Array.isArray(data.plan)
                ? data.plan.map((p: any) => new InsurancePlanPlan(p))
                : [new InsurancePlanPlan(data.plan)];
        }
    }

    toJson(): Record<string, any> {
        const result = super.toJson();

        if (this.identifier !== undefined) result.identifier = this.identifier.map(i => i.toJson());
        if (this.status !== undefined) result.status = this.status;
        if (this.type !== undefined) result.type = this.type.map(t => t.toJson());
        if (this.name !== undefined) result.name = this.name;
        if (this.alias !== undefined) result.alias = this.alias;
        if (this.period !== undefined) result.period = this.period.toJson();
        if (this.ownedBy !== undefined) result.ownedBy = this.ownedBy.toJson();
        if (this.administeredBy !== undefined) result.administeredBy = this.administeredBy.toJson();
        if (this.coverageArea !== undefined) result.coverageArea = this.coverageArea.map(ca => ca.toJson());
        if (this.contact !== undefined) result.contact = this.contact;
        if (this.endpoint !== undefined) result.endpoint = this.endpoint.map(e => e.toJson());
        if (this.network !== undefined) result.network = this.network.map(n => n.toJson());
        if (this.coverage !== undefined) result.coverage = this.coverage.map(c => c.toJson());
        if (this.plan !== undefined) result.plan = this.plan.map(p => p.toJson());

        return result;
    }

    toXml(): string {
        let xml = `<InsurancePlan xmlns="http://hl7.org/fhir">`;

        if (this.id !== undefined) xml += `<id value="${this.id}"/>`;

        if (this.identifier !== undefined) {
            this.identifier.forEach(i => { xml += `<identifier>${i.toXml()}</identifier>`; });
        }
        if (this.status !== undefined) xml += `<status value="${this.status}"/>`;
        if (this.type !== undefined) {
            this.type.forEach(t => { xml += `<type>${t.toXml()}</type>`; });
        }
        if (this.name !== undefined) xml += `<name value="${this.name}"/>`;
        if (this.alias !== undefined) {
            this.alias.forEach(a => { xml += `<alias value="${a}"/>`; });
        }
        if (this.period !== undefined) xml += `<period>${this.period.toXml()}</period>`;
        if (this.ownedBy !== undefined) xml += `<ownedBy>${this.ownedBy.toXml()}</ownedBy>`;
        if (this.administeredBy !== undefined) xml += `<administeredBy>${this.administeredBy.toXml()}</administeredBy>`;
        if (this.coverageArea !== undefined) {
            this.coverageArea.forEach(ca => { xml += `<coverageArea>${ca.toXml()}</coverageArea>`; });
        }
        if (this.contact !== undefined) {
            this.contact.forEach(c => { xml += `<contact>${JSON.stringify(c)}</contact>`; });
        }
        if (this.endpoint !== undefined) {
            this.endpoint.forEach(e => { xml += `<endpoint>${e.toXml()}</endpoint>`; });
        }
        if (this.network !== undefined) {
            this.network.forEach(n => { xml += `<network>${n.toXml()}</network>`; });
        }
        if (this.coverage !== undefined) {
            this.coverage.forEach(c => { xml += c.toXml(); });
        }
        if (this.plan !== undefined) {
            this.plan.forEach(p => { xml += p.toXml(); });
        }

        xml += '</InsurancePlan>';
        return xml;
    }

    static fromJson(json: Record<string, any>): InsurancePlan {
        return new InsurancePlan(json);
    }
}