import { FhirCanonical, FhirCode, FhirPositiveInt, FhirString } from ".";
import { Reference } from "../reference";
import { CodeableConcept } from "./codeableConcept";
import { Coding } from "./coding";
import { Duration } from "./duration";
import { Period } from "./period";


export class DataRequirementCodeFilter {
    path?: FhirString;
    searchParam?: FhirString;
    valueSet?: FhirCanonical;
    code?: Coding[];

    constructor(data: Partial<DataRequirementCodeFilter> = {}) {
        if (data.path !== undefined) this.path = data.path;
        if (data.searchParam !== undefined) this.searchParam = data.searchParam;
        if (data.valueSet !== undefined) this.valueSet = data.valueSet;
        if (data.code !== undefined) this.code = data.code;
    }
}

export class DataRequirementDateFilter {
    path?: FhirString;
    searchParam?: FhirString;
    valueDateTime?: string;
    valuePeriod?: Period;
    valueDuration?: Duration;

    constructor(data: Partial<DataRequirementDateFilter> = {}) {
        if (data.path !== undefined) this.path = data.path;
        if (data.searchParam !== undefined) this.searchParam = data.searchParam;
        if (data.valueDateTime !== undefined) this.valueDateTime = data.valueDateTime;
        if (data.valuePeriod !== undefined) this.valuePeriod = data.valuePeriod;
        if (data.valueDuration !== undefined) this.valueDuration = data.valueDuration;
    }
}

export class DataRequirementSort {
    path: FhirString;
    direction: FhirCode;

    constructor(data: DataRequirementSort) {
        this.path = data.path;
        this.direction = data.direction;
    }
}

export class DataRequirement {
    type: FhirCode;
    profile?: FhirCanonical[];
    subjectCodeableConcept?: CodeableConcept;
    subjectReference?: Reference;
    mustSupport?: FhirString[];
    codeFilter?: DataRequirementCodeFilter[];
    dateFilter?: DataRequirementDateFilter[];
    limit?: FhirPositiveInt;
    sort?: DataRequirementSort[];

    constructor(data: DataRequirement) {
        this.type = data.type
        if (data.profile !== undefined) this.profile = data.profile;
        if (data.subjectCodeableConcept !== undefined) this.subjectCodeableConcept = data.subjectCodeableConcept;
        if (data.subjectReference !== undefined) this.subjectReference = data.subjectReference;
        if (data.mustSupport !== undefined) this.mustSupport = data.mustSupport;
        if (data.codeFilter !== undefined) this.codeFilter = data.codeFilter;
        if (data.dateFilter !== undefined) this.dateFilter = data.dateFilter;
        if (data.limit !== undefined) this.limit = data.limit;
        if (data.sort !== undefined) this.sort = data.sort;
    }

}