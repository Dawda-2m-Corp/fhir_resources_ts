import { BaseFhirResource } from './baseResource';
import { Reference } from './reference';

/**
 * Binary - A resource containing binary content
 * 
 * This resource is a binary file or data that is typically not interpreted by the FHIR infrastructure.
 * It can be used for images, documents, multimedia, or any other binary content.
 */
export class Binary extends BaseFhirResource {
    resourceType: 'Binary' = 'Binary';

    contentType: string;                    // Required: MimeType of the binary content
    securityContext?: Reference;            // Identifies another resource to use as proxy when enforcing access control
    data?: string;                          // The actual binary content (base64Binary)

    constructor(data: Partial<Binary>) {
        super(data as any);

        // Required field validation
        if (!data.contentType) {
            throw new Error('Binary resource requires contentType');
        }

        this.contentType = data.contentType;

        if (data.securityContext !== undefined) {
            this.securityContext = data.securityContext instanceof Reference
                ? data.securityContext
                : new Reference(data.securityContext as any);
        }

        if (data.data !== undefined) {
            this.data = data.data;
        }
    }

    /**
     * Converts the Binary resource to JSON format
     */
    toJson(): any {
        const json = super.toJson();

        json.resourceType = this.resourceType;
        json.contentType = this.contentType;

        if (this.securityContext) {
            json.securityContext = this.securityContext.toJson();
        }

        if (this.data !== undefined) {
            json.data = this.data;
        }

        return json;
    }

    /**
     * Converts the Binary resource to XML format
     */
    toXml(): string {
        let xml = '';

        if (this.id) {
            xml += `<id value="${this.id}"/>`;
        }

        xml += `<resourceType value="${this.resourceType}"/>`;
        xml += `<contentType value="${this.contentType}"/>`;

        if (this.securityContext) {
            xml += `<securityContext>${this.securityContext.toXml()}</securityContext>`;
        }

        if (this.data !== undefined) {
            xml += `<data value="${this.data}"/>`;
        }

        return `<Binary>${xml}</Binary>`;
    }

    /**
     * Creates a Binary resource from JSON
     */
    static fromJson(json: any): Binary {
        return new Binary(json);
    }

    /**
     * Validates the Binary resource
     */
    isValid(): boolean {
        // Required field validation
        if (!this.contentType) {
            return false;
        }

        // Validate MIME type format (basic validation)
        const mimeTypeRegex = /^[a-zA-Z][a-zA-Z0-9][a-zA-Z0-9\!\#\$\&\-\^_]*\/[a-zA-Z0-9][a-zA-Z0-9\!\#\$\&\-\^_.+]*$/;
        if (!mimeTypeRegex.test(this.contentType)) {
            return false;
        }

        // Validate base64 data if present
        if (this.data !== undefined) {
            const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
            if (!base64Regex.test(this.data)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Gets the binary content size in bytes (if data is present)
     */
    getContentSize(): number {
        if (!this.data || this.data.length === 0) {
            return 0;
        }

        // Calculate size from base64 string
        // Remove any whitespace and calculate padding
        const cleanData = this.data.replace(/\s/g, '');
        const padding = cleanData.endsWith('==') ? 2 : cleanData.endsWith('=') ? 1 : 0;
        return Math.floor(cleanData.length * 3 / 4) - padding;
    }

    /**
     * Checks if the binary content is an image
     */
    isImage(): boolean {
        return this.contentType.startsWith('image/');
    }

    /**
     * Checks if the binary content is a document
     */
    isDocument(): boolean {
        const documentTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'text/html',
            'application/rtf'
        ];
        return documentTypes.includes(this.contentType);
    }

    /**
     * Gets the file extension based on content type
     */
    getFileExtension(): string {
        const extensions: { [key: string]: string } = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/bmp': 'bmp',
            'image/svg+xml': 'svg',
            'application/pdf': 'pdf',
            'application/msword': 'doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
            'text/plain': 'txt',
            'text/html': 'html',
            'application/json': 'json',
            'application/xml': 'xml',
            'video/mp4': 'mp4',
            'audio/mp3': 'mp3',
            'audio/wav': 'wav'
        };

        return extensions[this.contentType] || 'bin';
    }
}