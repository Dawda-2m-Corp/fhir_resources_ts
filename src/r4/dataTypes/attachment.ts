import { FhirBase64Binary, FhirCode, FhirDateTime, FhirUnsignedInt } from ".";


export class Attachment {
    contentType?: FhirCode;
    language?: FhirCode;
    data?: FhirBase64Binary;
    url?: FhirUnsignedInt;
    hash?: FhirBase64Binary;
    title?: String;
    creation?: FhirDateTime;


    constructor(data: Attachment) {
        Object.assign(this, data);
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.contentType !== undefined) result.contentType = this.contentType;
        if (this.language !== undefined) result.language = this.language;
        if (this.data !== undefined) result.data = this.data;
        if (this.url !== undefined) result.url = this.url;
        if (this.hash !== undefined) result.hash = this.hash;
        if (this.title !== undefined) result.title = this.title;
        if (this.creation !== undefined) result.creation = this.creation;
        return result;
    }

    toXml(): string {
        let xml = `<Attachment>`;
        if (this.contentType !== undefined) {
            xml += `<contentType>${this.contentType}</contentType>`;
        }
        if (this.language !== undefined) {
            xml += `<language>${this.language}</language>`;
        }
        if (this.data !== undefined) {
            xml += `<data>${this.data}</data>`;
        }
        if (this.url !== undefined) {
            xml += `<url>${this.url}</url>`;
        }
        if (this.hash !== undefined) {
            xml += `<hash>${this.hash}</hash>`;
        }
        if (this.title !== undefined) {
            xml += `<title>${this.title}</title>`;
        }
        if (this.creation !== undefined) {
            xml += `<creation>${this.creation}</creation>`;
        }
        xml += `</Attachment>`;
        return xml;
    }
}