import { FhirCode, FhirDecimal } from ".";
import { CodeableConcept } from "./codeableConcept";
import { Money } from "./money";


export class MonetaryComponent {
    type: FhirCode;
    code?: CodeableConcept;
    factor?: FhirDecimal;
    amount?: Money;

    constructor(data: Partial<MonetaryComponent>) {
        this.type = data.type!;
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        result.type = this.type;
        if (this.code !== undefined) result.code = this.code.toJson();
        if (this.factor !== undefined) result.factor = this.factor;
        if (this.amount !== undefined) result.amount = this.amount.toJson();

        return result;
    }

    toXml(): string {
        let xml = `<MonetaryComponent>`;
        xml += `<type>${this.type}</type>`;
        if (this.code !== undefined) {
            xml += `<code>${this.code.toXml()}</code>`;
        }
        if (this.factor !== undefined) {
            xml += `<factor>${this.factor}</factor>`;
        }
        if (this.amount !== undefined) {
            xml += `<amount>${this.amount.toXml()}</amount>`;
        }
        xml += `</MonetaryComponent>`;
        return xml;
    }
}