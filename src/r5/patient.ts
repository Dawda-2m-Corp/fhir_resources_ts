
import { Address } from '../r4/dataTypes/address';
import { Period } from '../r4/dataTypes/period';
import { BaseFhirResource, FhirCode, Patient as PatientR4B } from '../r4b/index'



export class Patient extends PatientR4B {
    birthPlace?: Address;
    effectivePeriod?: Period;
    assurance?: FhirCode;

    constructor(data: Patient) {
        super(data as BaseFhirResource);
        this.birthPlace = data.birthPlace;
        this.effectivePeriod = data.effectivePeriod;
        this.assurance = data.assurance;
    }

    toJson(): Record<string, any> {
        return {
            ...super.toJson(),
            birthPlace: this.birthPlace,
            effectivePeriod: this.effectivePeriod,
            assurance: this.assurance,
        };
    }

    toXml(): String {
        return `<Patient>${JSON.stringify(this.toJson())}</Patient>`;
    }
}