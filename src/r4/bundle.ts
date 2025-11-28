import { FhirCode } from "../types/primitives";
import { DomainResource } from "./baseResource";
import { instant, uri } from "./dataTypes";
import { Signature } from "./dataTypes/signature";
import { Identifier } from "./identifier";
import Resource from "./resource";

export class BundleLink {
    relation: String;
    url: uri;

    constructor(data: { relation: String; url: uri }) {
        this.relation = data.relation;
        this.url = data.url;
    }

    toJson(): Record<string, any> {
        return {
            relation: this.relation,
            url: this.url,
        };
    }

    static fromJson(json: Record<string, any>): BundleLink {
        return new BundleLink({
            relation: json.relation,
            url: json.url,
        });
    }
}

export class BundleEntrySearch {
    mode: FhirCode;
    score?: number;

    constructor(data: { mode: FhirCode; score?: number }) {
        this.mode = data.mode;
        this.score = data.score;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            mode: this.mode,
        };
        if (this.score !== undefined) result.score = this.score;
        return result;
    }

    static fromJson(json: Record<string, any>): BundleEntrySearch {
        return new BundleEntrySearch({
            mode: json.mode,
            score: json.score,
        });
    }
}

export class BundleEntryRequest {
    method: FhirCode;
    url: uri;
    ifNoneMatch?: String;
    ifModifiedSince?: instant;
    ifMatch?: String;
    ifNoneExist?: String;

    constructor(data: {
        method: FhirCode;
        url: uri;
        ifNoneMatch?: String;
        ifModifiedSince?: instant;
        ifMatch?: String;
        ifNoneExist?: String;
    }) {
        this.method = data.method;
        this.url = data.url;
        this.ifNoneMatch = data.ifNoneMatch;
        this.ifModifiedSince = data.ifModifiedSince;
        this.ifMatch = data.ifMatch;
        this.ifNoneExist = data.ifNoneExist;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            method: this.method,
            url: this.url,
        };
        if (this.ifNoneMatch !== undefined) result.ifNoneMatch = this.ifNoneMatch;
        if (this.ifModifiedSince !== undefined) result.ifModifiedSince = this.ifModifiedSince;
        if (this.ifMatch !== undefined) result.ifMatch = this.ifMatch;
        if (this.ifNoneExist !== undefined) result.ifNoneExist = this.ifNoneExist;
        return result;
    }

    static fromJson(json: Record<string, any>): BundleEntryRequest {
        return new BundleEntryRequest({
            method: json.method,
            url: json.url,
            ifNoneMatch: json.ifNoneMatch,
            ifModifiedSince: json.ifModifiedSince,
            ifMatch: json.ifMatch,
            ifNoneExist: json.ifNoneExist,
        });
    }
}

export class BundleEntryReponse {
    status: String;
    location?: uri;
    etag?: String;
    lastModified?: instant;
    outcome?: Resource;

    constructor(data: {
        status: String;
        location?: uri;
        etag?: String;
        lastModified?: instant;
        outcome?: Resource;
    }) {
        this.status = data.status;
        this.location = data.location;
        this.etag = data.etag;
        this.lastModified = data.lastModified;
        this.outcome = data.outcome;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            status: this.status,
        };
        if (this.location !== undefined) result.location = this.location;
        if (this.etag !== undefined) result.etag = this.etag;
        if (this.lastModified !== undefined) result.lastModified = this.lastModified;
        return result;
    }

    static fromJson(json: Record<string, any>): BundleEntryReponse {
        return new BundleEntryReponse({
            status: json.status,
            location: json.location,
            etag: json.etag,
            lastModified: json.lastModified,
        });
    }
}

export class BundleEntry {
    fullUrl?: uri;
    resource?: Resource;
    search?: BundleEntrySearch;
    request?: BundleEntryRequest;
    response?: BundleEntryReponse;

    constructor(data: {
        fullUrl?: uri;
        resource?: Resource;
        search?: BundleEntrySearch;
        request?: BundleEntryRequest;
        response?: BundleEntryReponse;
    }) {
        this.fullUrl = data.fullUrl;
        this.resource = data.resource;
        this.search = data.search;
        this.request = data.request;
        this.response = data.response;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {};
        if (this.fullUrl !== undefined) result.fullUrl = this.fullUrl;
        if (this.resource !== undefined) result.resource = this.resource; // Assuming Resource has its own toJson method
        if (this.search !== undefined) result.search = this.search.toJson();
        if (this.request !== undefined) result.request = this.request.toJson();
        return result;
    }

    static fromJson(json: Record<string, any>): BundleEntry {
        return new BundleEntry({
            fullUrl: json.fullUrl,
            resource: json.resource, // Assuming Resource has its own fromJson method
            search: json.search ? BundleEntrySearch.fromJson(json.search) : undefined,
            request: json.request ? BundleEntryRequest.fromJson(json.request) : undefined,
        });
    }
}

export class Bundle extends DomainResource {
    resourceType: 'Bundle' = 'Bundle';
    identifier?: Identifier;
    type: FhirCode;
    timestamp?: instant;
    link?: BundleLink[];
    entry?: BundleEntry[];
    signature?: Signature;

    constructor(data: {
        identifier?: Identifier;
        type: FhirCode;
        timestamp?: instant;
        link?: BundleLink[];
        entry?: BundleEntry[];
        signature?: Signature;
    }) {
        super();
        this.identifier = data.identifier;
        this.type = data.type;
        this.timestamp = data.timestamp;
        this.link = data.link;
        this.entry = data.entry;
        this.signature = data.signature;
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = {
            resourceType: this.resourceType,
            type: this.type,
        };
        if (this.identifier !== undefined) result.identifier = this.identifier; // Assuming Identifier has its own toJson method
        if (this.timestamp !== undefined) result.timestamp = this.timestamp;
        if (this.link !== undefined) result.link = this.link.map((l) => l.toJson());
        if (this.entry !== undefined) result.entry = this.entry.map((e) => e.toJson());
        if (this.signature !== undefined) result.signature = this.signature.toJson();
        return result;
    }

    static fromJson(json: Record<string, any>): Bundle {
        return new Bundle({
            identifier: json.identifier, // Assuming Identifier has its own fromJson method
            type: json.type,
            timestamp: json.timestamp,
            link: json.link ? json.link.map((l: any) => BundleLink.fromJson(l)) : undefined,
            entry: json.entry ? json.entry.map((e: any) => BundleEntry.fromJson(e)) : undefined,
            signature: json.signature ? Signature.fromJson(json.signature) : undefined,
        });
    }
}