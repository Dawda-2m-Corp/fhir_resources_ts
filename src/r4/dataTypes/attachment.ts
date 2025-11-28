import { FhirString, FhirUrl, FhirCode, FhirUnsignedInt, FhirDateTime } from '../../types/primitives';

export class Attachment {
    contentType?: FhirCode;
    language?: FhirCode;
    data?: string; // base64Binary
    url?: FhirUrl;
    size?: FhirUnsignedInt;
    hash?: string; // base64Binary
    title?: FhirString;
    creation?: FhirDateTime;

    constructor(data: Partial<Attachment> = {}) {
        if (data.contentType !== undefined) this.contentType = data.contentType;
        if (data.language !== undefined) this.language = data.language;
        if (data.data !== undefined) this.data = data.data;
        if (data.url !== undefined) this.url = data.url;
        if (data.size !== undefined) this.size = data.size;
        if (data.hash !== undefined) this.hash = data.hash;
        if (data.title !== undefined) this.title = data.title;
        if (data.creation !== undefined) this.creation = data.creation;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};

        if (this.contentType !== undefined) result.contentType = this.contentType;
        if (this.language !== undefined) result.language = this.language;
        if (this.data !== undefined) result.data = this.data;
        if (this.url !== undefined) result.url = this.url;
        if (this.size !== undefined) result.size = this.size;
        if (this.hash !== undefined) result.hash = this.hash;
        if (this.title !== undefined) result.title = this.title;
        if (this.creation !== undefined) result.creation = this.creation;

        return result;
    }

    static fromJson(json: Record<string, any>): Attachment {
        return new Attachment({
            contentType: json.contentType,
            language: json.language,
            data: json.data,
            url: json.url,
            size: json.size,
            hash: json.hash,
            title: json.title,
            creation: json.creation,
        });
    }
}