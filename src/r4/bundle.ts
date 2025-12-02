import { BaseFhirResource } from './baseResource';
import { Resource } from './resource';
import { Identifier } from './identifier';
import { Signature } from './dataTypes/signature';
import { FhirResourceTypes } from './dataTypes';

/**
 * Links related to Bundle or BundleEntry
 */
export class BundleLink {
    relation: string;    // Required: Link relation type
    url: string;         // Required: Reference URL

    constructor(data: Partial<BundleLink>) {
        this.relation = data.relation!;
        this.url = data.url!;
    }

    toJson(): any {
        return {
            relation: this.relation,
            url: this.url
        };
    }

    toXml(): string {
        return `<link><relation value="${this.relation}"/><url value="${this.url}"/></link>`;
    }

    static fromJson(json: any): BundleLink {
        return new BundleLink(json);
    }
}

/**
 * Search related information for Bundle entry
 */
export class BundleEntrySearch {
    mode?: 'match' | 'include';    // Why this is in the result set
    score?: number;                // Search ranking (between 0 and 1)

    constructor(data: Partial<BundleEntrySearch>) {
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.score !== undefined) {
            this.score = data.score;
        }
    }

    toJson(): any {
        const json: any = {};
        if (this.mode !== undefined) {
            json.mode = this.mode;
        }
        if (this.score !== undefined) {
            json.score = this.score;
        }
        return json;
    }

    toXml(): string {
        let xml = '<search>';
        if (this.mode !== undefined) {
            xml += `<mode value="${this.mode}"/>`;
        }
        if (this.score !== undefined) {
            xml += `<score value="${this.score}"/>`;
        }
        xml += '</search>';
        return xml;
    }

    static fromJson(json: any): BundleEntrySearch {
        return new BundleEntrySearch(json);
    }
}

/**
 * Request information for transaction/batch/history entries
 */
export class BundleEntryRequest {
    method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';  // Required: HTTP method
    url: string;                    // Required: URL for HTTP equivalent
    ifNoneMatch?: string;           // For managing cache validation
    ifModifiedSince?: string;       // For managing cache currency (instant)
    ifMatch?: string;               // For managing update contention
    ifNoneExist?: string;           // For conditional creates

    constructor(data: Partial<BundleEntryRequest>) {
        this.method = data.method!;
        this.url = data.url!;
        if (data.ifNoneMatch !== undefined) {
            this.ifNoneMatch = data.ifNoneMatch;
        }
        if (data.ifModifiedSince !== undefined) {
            this.ifModifiedSince = data.ifModifiedSince;
        }
        if (data.ifMatch !== undefined) {
            this.ifMatch = data.ifMatch;
        }
        if (data.ifNoneExist !== undefined) {
            this.ifNoneExist = data.ifNoneExist;
        }
    }

    toJson(): any {
        const json: any = {
            method: this.method,
            url: this.url
        };
        if (this.ifNoneMatch !== undefined) {
            json.ifNoneMatch = this.ifNoneMatch;
        }
        if (this.ifModifiedSince !== undefined) {
            json.ifModifiedSince = this.ifModifiedSince;
        }
        if (this.ifMatch !== undefined) {
            json.ifMatch = this.ifMatch;
        }
        if (this.ifNoneExist !== undefined) {
            json.ifNoneExist = this.ifNoneExist;
        }
        return json;
    }

    toXml(): string {
        let xml = '<request>';
        xml += `<method value="${this.method}"/>`;
        xml += `<url value="${this.url}"/>`;
        if (this.ifNoneMatch !== undefined) {
            xml += `<ifNoneMatch value="${this.ifNoneMatch}"/>`;
        }
        if (this.ifModifiedSince !== undefined) {
            xml += `<ifModifiedSince value="${this.ifModifiedSince}"/>`;
        }
        if (this.ifMatch !== undefined) {
            xml += `<ifMatch value="${this.ifMatch}"/>`;
        }
        if (this.ifNoneExist !== undefined) {
            xml += `<ifNoneExist value="${this.ifNoneExist}"/>`;
        }
        xml += '</request>';
        return xml;
    }

    static fromJson(json: any): BundleEntryRequest {
        return new BundleEntryRequest(json);
    }
}

/**
 * Response information for transaction/batch/history entries
 */
export class BundleEntryResponse {
    status: string;         // Required: Status response code
    location?: string;      // Location (if operation returns a location)
    etag?: string;          // ETag for the resource
    lastModified?: string;  // Server's date time modified (instant)
    outcome?: Resource;     // OperationOutcome with hints and warnings

    constructor(data: Partial<BundleEntryResponse>) {
        this.status = data.status!;
        if (data.location !== undefined) {
            this.location = data.location;
        }
        if (data.etag !== undefined) {
            this.etag = data.etag;
        }
        if (data.lastModified !== undefined) {
            this.lastModified = data.lastModified;
        }
        if (data.outcome !== undefined) {
            this.outcome = data.outcome instanceof Resource ? data.outcome : new Resource(data.outcome as any);
        }
    }

    toJson(): any {
        const json: any = {
            status: this.status
        };
        if (this.location !== undefined) {
            json.location = this.location;
        }
        if (this.etag !== undefined) {
            json.etag = this.etag;
        }
        if (this.lastModified !== undefined) {
            json.lastModified = this.lastModified;
        }
        if (this.outcome) {
            json.outcome = this.outcome.toJson();
        }
        return json;
    }

    toXml(): string {
        let xml = '<response>';
        xml += `<status value="${this.status}"/>`;
        if (this.location !== undefined) {
            xml += `<location value="${this.location}"/>`;
        }
        if (this.etag !== undefined) {
            xml += `<etag value="${this.etag}"/>`;
        }
        if (this.lastModified !== undefined) {
            xml += `<lastModified value="${this.lastModified}"/>`;
        }
        if (this.outcome) {
            xml += this.outcome.toXml().replace('<Resource', '<outcome').replace('</Resource>', '</outcome>');
        }
        xml += '</response>';
        return xml;
    }

    static fromJson(json: any): BundleEntryResponse {
        return new BundleEntryResponse(json);
    }
}

/**
 * Entry in the Bundle
 */
export class BundleEntry {
    link?: BundleLink[];            // Links related to this entry
    fullUrl?: string;               // URI for resource
    resource?: Resource;            // A resource in the bundle
    search?: BundleEntrySearch;     // Search related information
    request?: BundleEntryRequest;   // Additional execution information
    response?: BundleEntryResponse; // Results of execution

    constructor(data: Partial<BundleEntry>) {
        if (data.link) {
            this.link = Array.isArray(data.link)
                ? data.link.map(l => l instanceof BundleLink ? l : new BundleLink(l))
                : [new BundleLink(data.link as any)];
        }
        if (data.fullUrl !== undefined) {
            this.fullUrl = data.fullUrl;
        }
        if (data.resource !== undefined) {
            this.resource = data.resource instanceof Resource ? data.resource : new Resource(data.resource as any);
        }
        if (data.search !== undefined) {
            this.search = data.search instanceof BundleEntrySearch ? data.search : new BundleEntrySearch(data.search as any);
        }
        if (data.request !== undefined) {
            this.request = data.request instanceof BundleEntryRequest ? data.request : new BundleEntryRequest(data.request as any);
        }
        if (data.response !== undefined) {
            this.response = data.response instanceof BundleEntryResponse ? data.response : new BundleEntryResponse(data.response as any);
        }
    }

    toJson(): any {
        const json: any = {};
        if (this.link && this.link.length > 0) {
            json.link = this.link.map(l => l.toJson());
        }
        if (this.fullUrl !== undefined) {
            json.fullUrl = this.fullUrl;
        }
        if (this.resource) {
            json.resource = this.resource.toJson();
        }
        if (this.search) {
            json.search = this.search.toJson();
        }
        if (this.request) {
            json.request = this.request.toJson();
        }
        if (this.response) {
            json.response = this.response.toJson();
        }
        return json;
    }

    toXml(): string {
        let xml = '<entry>';
        if (this.link && this.link.length > 0) {
            this.link.forEach(l => {
                xml += l.toXml();
            });
        }
        if (this.fullUrl !== undefined) {
            xml += `<fullUrl value="${this.fullUrl}"/>`;
        }
        if (this.resource) {
            xml += this.resource.toXml().replace('<Resource', '<resource').replace('</Resource>', '</resource>');
        }
        if (this.search) {
            xml += this.search.toXml();
        }
        if (this.request) {
            xml += this.request.toXml();
        }
        if (this.response) {
            xml += this.response.toXml();
        }
        xml += '</entry>';
        return xml;
    }

    static fromJson(json: any): BundleEntry {
        return new BundleEntry(json);
    }
}

/**
 * Interface for Bundle constructor
 */
export interface BundleConstructorData {
    resourceType?: 'Bundle';
    id?: string;
    meta?: any;
    implicitRules?: string;
    language?: string;
    text?: any;
    contained?: any[];
    extension?: any[];
    modifierExtension?: any[];
    identifier?: Identifier | any;
    type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection' | 'subscription-notification';  // Required
    timestamp?: string;         // When the bundle was assembled (instant)
    total?: number;             // If search, total number of matches (unsignedInt)
    link?: BundleLink[] | any[];
    entry?: BundleEntry[] | any[];
    signature?: Signature | any;
    issues?: Resource | any;
}

/**
 * A container for a collection of resources.
 */
export class Bundle extends BaseFhirResource {
    resourceType: FhirResourceTypes = 'Bundle';
    identifier?: Identifier;        // Persistent identifier for the bundle
    type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection' | 'subscription-notification';  // Required: Bundle type
    timestamp?: string;             // When the bundle was assembled
    total?: number;                 // If search, total number of matches
    link?: BundleLink[];            // Links related to this Bundle
    entry?: BundleEntry[];          // Entry in the bundle
    signature?: Signature;          // Digital Signature
    issues?: Resource;              // Issues with the Bundle

    constructor(data: BundleConstructorData) {
        super(data as any);
        this.resourceType = 'Bundle';

        // Required field
        this.type = data.type;

        // Optional fields
        if (data.identifier !== undefined) {
            this.identifier = data.identifier instanceof Identifier ? data.identifier : new Identifier(data.identifier);
        }

        if (data.timestamp !== undefined) {
            this.timestamp = data.timestamp;
        }

        if (data.total !== undefined) {
            this.total = data.total;
        }

        if (data.link) {
            this.link = Array.isArray(data.link)
                ? data.link.map(l => l instanceof BundleLink ? l : new BundleLink(l))
                : [new BundleLink(data.link as any)];
        }

        if (data.entry) {
            this.entry = Array.isArray(data.entry)
                ? data.entry.map(e => e instanceof BundleEntry ? e : new BundleEntry(e as any))
                : [new BundleEntry(data.entry as any)];
        }

        if (data.signature !== undefined) {
            this.signature = data.signature instanceof Signature ? data.signature : new Signature(data.signature);
        }

        if (data.issues !== undefined) {
            this.issues = data.issues instanceof Resource ? data.issues : new Resource(data.issues);
        }
    }

    toJson(): any {
        const json = super.toJson();

        // Required field
        json.type = this.type;

        // Optional fields
        if (this.identifier) {
            json.identifier = this.identifier.toJson();
        }
        if (this.timestamp !== undefined) {
            json.timestamp = this.timestamp;
        }
        if (this.total !== undefined) {
            json.total = this.total;
        }
        if (this.link && this.link.length > 0) {
            json.link = this.link.map(l => l.toJson());
        }
        if (this.entry && this.entry.length > 0) {
            json.entry = this.entry.map(e => e.toJson());
        }
        if (this.signature) {
            json.signature = this.signature.toJson();
        }
        if (this.issues) {
            json.issues = this.issues.toJson();
        }

        return json;
    }

    toXml(): string {
        let xml = `<Bundle`;
        if (this.id) xml += ` id="${this.id}"`;
        xml += `>`;

        // Required field
        xml += `<type value="${this.type}"/>`;

        // Optional fields
        if (this.identifier) {
            xml += this.identifier.toXml().replace('<Identifier', '<identifier').replace('</Identifier>', '</identifier>');
        }
        if (this.timestamp !== undefined) {
            xml += `<timestamp value="${this.timestamp}"/>`;
        }
        if (this.total !== undefined) {
            xml += `<total value="${this.total}"/>`;
        }
        if (this.link && this.link.length > 0) {
            this.link.forEach(l => {
                xml += l.toXml();
            });
        }
        if (this.entry && this.entry.length > 0) {
            this.entry.forEach(e => {
                xml += e.toXml();
            });
        }
        if (this.signature) {
            xml += this.signature.toXml().replace('<Signature', '<signature').replace('</Signature>', '</signature>');
        }
        if (this.issues) {
            xml += this.issues.toXml().replace('<Resource', '<issues').replace('</Resource>', '</issues>');
        }

        xml += '</Bundle>';
        return xml;
    }

    static fromJson(json: any): Bundle {
        return new Bundle(json);
    }
}