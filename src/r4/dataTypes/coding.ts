import { FhirBoolean, FhirCode, FhirString, FhirUri } from ".";


export class Coding {
    system?: FhirUri;
    version?: String;
    code?: FhirCode;
    diaply?: FhirString;
    userSelected?: FhirBoolean;

    constructor(data: Partial<Coding>) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.system !== undefined) result.system = this.system;
        if (this.version !== undefined) result.version = this.version;
        if (this.code !== undefined) result.code = this.code;
        if (this.diaply !== undefined) result.diaply = this.diaply;
        if (this.userSelected !== undefined) result.userSelected = this.userSelected;

        return result;
    }

    toXml(): string {
        let xml = `<Coding>`;
        if (this.system !== undefined) {
            xml += `<system>${this.system}</system>`;
        }
        if (this.version !== undefined) {
            xml += `<version>${this.version}</version>`;
        }
        if (this.code !== undefined) {
            xml += `<code>${this.code}</code>`;
        }
        if (this.diaply !== undefined) {
            xml += `<diaply>${this.diaply}</diaply>`;
        }
        if (this.userSelected !== undefined) {
            xml += `<userSelected>${this.userSelected}</userSelected>`;
        }
        xml += `</Coding>`;
        return xml;
    }
}