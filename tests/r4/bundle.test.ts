import { Bundle, BundleLink, BundleEntry, BundleEntrySearch, BundleEntryRequest, BundleEntryResponse, BundleConstructorData } from '../../src/r4/bundle';
import { Identifier } from '../../src/r4/identifier';
import { Resource } from '../../src/r4/resource';

describe('Bundle', () => {
    describe('Basic Bundle Creation', () => {
        test('should create basic Bundle with required type field', () => {
            const bundle = new Bundle({
                type: 'searchset'
            });

            expect(bundle.resourceType).toBe('Bundle');
            expect(bundle.type).toBe('searchset');
        });

        test('should create Bundle with identifier and timestamp', () => {
            const bundle = new Bundle({
                identifier: {
                    system: 'http://example.org/bundles',
                    value: 'BUNDLE-001'
                },
                type: 'document',
                timestamp: '2024-12-01T10:00:00Z'
            });

            expect(bundle.identifier).toBeInstanceOf(Identifier);
            expect(bundle.identifier!.value).toBe('BUNDLE-001');
            expect(bundle.type).toBe('document');
            expect(bundle.timestamp).toBe('2024-12-01T10:00:00Z');
        });

        test('should create Bundle with different type values', () => {
            const types: Array<'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection' | 'subscription-notification'> =
                ['document', 'message', 'transaction', 'transaction-response', 'batch', 'batch-response', 'history', 'searchset', 'collection', 'subscription-notification'];

            types.forEach(type => {
                const bundle = new Bundle({ type });
                expect(bundle.type).toBe(type);
            });
        });
    });

    describe('BundleLink Tests', () => {
        test('should create BundleLink with required fields', () => {
            const link = new BundleLink({
                relation: 'self',
                url: 'http://example.org/fhir/Bundle/example'
            });

            expect(link.relation).toBe('self');
            expect(link.url).toBe('http://example.org/fhir/Bundle/example');
        });

        test('should serialize BundleLink to JSON', () => {
            const link = new BundleLink({
                relation: 'next',
                url: 'http://example.org/fhir/Bundle?_getpages=123&_since=2024-01-01'
            });

            const json = link.toJson();

            expect(json.relation).toBe('next');
            expect(json.url).toBe('http://example.org/fhir/Bundle?_getpages=123&_since=2024-01-01');
        });

        test('should serialize BundleLink to XML', () => {
            const link = new BundleLink({
                relation: 'prev',
                url: 'http://example.org/fhir/Bundle?_getpages=456'
            });

            const xml = link.toXml();

            expect(xml).toContain('<link>');
            expect(xml).toContain('<relation value="prev"/>');
            expect(xml).toContain('<url value="http://example.org/fhir/Bundle?_getpages=456"/>');
            expect(xml).toContain('</link>');
        });
    });

    describe('BundleEntry Nested Classes', () => {
        test('should create BundleEntrySearch', () => {
            const search = new BundleEntrySearch({
                mode: 'match',
                score: 0.95
            });

            expect(search.mode).toBe('match');
            expect(search.score).toBe(0.95);

            const json = search.toJson();
            expect(json.mode).toBe('match');
            expect(json.score).toBe(0.95);
        });

        test('should create BundleEntryRequest', () => {
            const request = new BundleEntryRequest({
                method: 'POST',
                url: 'Patient',
                ifNoneExist: 'identifier=12345'
            });

            expect(request.method).toBe('POST');
            expect(request.url).toBe('Patient');
            expect(request.ifNoneExist).toBe('identifier=12345');

            const json = request.toJson();
            expect(json.method).toBe('POST');
            expect(json.url).toBe('Patient');
            expect(json.ifNoneExist).toBe('identifier=12345');
        });

        test('should create BundleEntryResponse', () => {
            const response = new BundleEntryResponse({
                status: '201 Created',
                location: 'Patient/123',
                etag: 'W/"1"',
                lastModified: '2024-12-01T10:00:00Z'
            });

            expect(response.status).toBe('201 Created');
            expect(response.location).toBe('Patient/123');
            expect(response.etag).toBe('W/"1"');
            expect(response.lastModified).toBe('2024-12-01T10:00:00Z');

            const json = response.toJson();
            expect(json.status).toBe('201 Created');
            expect(json.location).toBe('Patient/123');
        });
    });

    describe('BundleEntry Tests', () => {
        test('should create BundleEntry with resource', () => {
            const entry = new BundleEntry({
                fullUrl: 'http://example.org/fhir/Patient/123',
                resource: {
                    resourceType: 'Patient',
                    id: '123'
                } as any
            });

            expect(entry.fullUrl).toBe('http://example.org/fhir/Patient/123');
            expect(entry.resource).toBeInstanceOf(Resource);
        });

        test('should create BundleEntry with search information', () => {
            const entry = new BundleEntry({
                fullUrl: 'http://example.org/fhir/Patient/456',
                resource: {
                    resourceType: 'Patient',
                    id: '456'
                } as any,
                search: new BundleEntrySearch({
                    mode: 'match',
                    score: 0.87
                })
            });

            expect(entry.search).toBeInstanceOf(BundleEntrySearch);
            expect(entry.search!.mode).toBe('match');
            expect(entry.search!.score).toBe(0.87);
        });

        test('should create BundleEntry with request and response', () => {
            const entry = new BundleEntry({
                request: new BundleEntryRequest({
                    method: 'PUT',
                    url: 'Patient/789'
                }),
                response: new BundleEntryResponse({
                    status: '200 OK',
                    etag: 'W/"2"'
                })
            });

            expect(entry.request).toBeInstanceOf(BundleEntryRequest);
            expect(entry.request!.method).toBe('PUT');
            expect(entry.response).toBeInstanceOf(BundleEntryResponse);
            expect(entry.response!.status).toBe('200 OK');
        });
    });

    describe('Bundle with Links and Entries', () => {
        test('should create Bundle with links', () => {
            const bundle = new Bundle({
                type: 'searchset',
                total: 50,
                link: [
                    {
                        relation: 'self',
                        url: 'http://example.org/fhir/Patient?_count=10'
                    },
                    {
                        relation: 'next',
                        url: 'http://example.org/fhir/Patient?_count=10&_getpages=123'
                    }
                ]
            });

            expect(bundle.total).toBe(50);
            expect(bundle.link).toHaveLength(2);
            expect(bundle.link![0]).toBeInstanceOf(BundleLink);
            expect(bundle.link![0].relation).toBe('self');
            expect(bundle.link![1].relation).toBe('next');
        });

        test('should create Bundle with entries', () => {
            const bundle = new Bundle({
                type: 'searchset',
                total: 2,
                entry: [
                    {
                        fullUrl: 'http://example.org/fhir/Patient/123',
                        resource: {
                            resourceType: 'Patient',
                            id: '123'
                        } as any,
                        search: new BundleEntrySearch({
                            mode: 'match',
                            score: 1.0
                        })
                    },
                    {
                        fullUrl: 'http://example.org/fhir/Patient/456',
                        resource: {
                            resourceType: 'Patient',
                            id: '456'
                        } as any,
                        search: new BundleEntrySearch({
                            mode: 'include'
                        })
                    }
                ]
            });

            expect(bundle.entry).toHaveLength(2);
            expect(bundle.entry![0]).toBeInstanceOf(BundleEntry);
            expect(bundle.entry![0].fullUrl).toBe('http://example.org/fhir/Patient/123');
            expect(bundle.entry![1].search!.mode).toBe('include');
        });
    });

    describe('JSON Serialization', () => {
        test('should serialize basic Bundle to JSON', () => {
            const bundle = new Bundle({
                id: 'example-bundle',
                type: 'collection',
                timestamp: '2024-12-01T15:00:00Z'
            });

            const json = bundle.toJson();

            expect(json.resourceType).toBe('Bundle');
            expect(json.id).toBe('example-bundle');
            expect(json.type).toBe('collection');
            expect(json.timestamp).toBe('2024-12-01T15:00:00Z');
        });

        test('should serialize complex Bundle to JSON', () => {
            const bundle = new Bundle({
                id: 'complex-bundle',
                identifier: {
                    system: 'http://example.org/bundles',
                    value: 'COMPLEX-001'
                },
                type: 'transaction',
                timestamp: '2024-12-01T16:30:00Z',
                link: [{
                    relation: 'self',
                    url: 'http://example.org/fhir/Bundle/complex-bundle'
                }],
                entry: [
                    {
                        fullUrl: 'urn:uuid:12345678-1234-1234-1234-123456789012',
                        resource: {
                            resourceType: 'Patient',
                            id: 'temp-patient'
                        } as any,
                        request: {
                            method: 'POST',
                            url: 'Patient'
                        }
                    },
                    {
                        fullUrl: 'urn:uuid:87654321-4321-4321-4321-210987654321',
                        resource: {
                            resourceType: 'Observation',
                            id: 'temp-obs'
                        } as any,
                        request: {
                            method: 'POST',
                            url: 'Observation'
                        }
                    }
                ]
            });

            const json = bundle.toJson();
            console.log('Complex Bundle JSON:', JSON.stringify(json, null, 2));

            expect(json.resourceType).toBe('Bundle');
            expect(json.identifier.value).toBe('COMPLEX-001');
            expect(json.type).toBe('transaction');
            expect(json.link).toHaveLength(1);
            expect(json.entry).toHaveLength(2);
            expect(json.entry[0].request.method).toBe('POST');
            expect(json.entry[1].fullUrl).toBe('urn:uuid:87654321-4321-4321-4321-210987654321');
        });
    });

    describe('XML Serialization', () => {
        test('should serialize Bundle to XML', () => {
            const bundle = new Bundle({
                id: 'xml-bundle',
                type: 'batch',
                total: 1
            });

            const xml = bundle.toXml();

            expect(xml).toContain('<Bundle');
            expect(xml).toContain('id="xml-bundle"');
            expect(xml).toContain('<type value="batch"/>');
            expect(xml).toContain('<total value="1"/>');
            expect(xml).toContain('</Bundle>');
        });

        test('should serialize Bundle with entries to XML', () => {
            const bundle = new Bundle({
                id: 'xml-with-entries',
                type: 'searchset',
                entry: [{
                    fullUrl: 'http://example.org/fhir/Patient/xml-patient',
                    resource: {
                        resourceType: 'Patient',
                        id: 'xml-patient'
                    } as any
                }]
            });

            const xml = bundle.toXml();

            expect(xml).toContain('<entry>');
            expect(xml).toContain('<fullUrl value="http://example.org/fhir/Patient/xml-patient"/>');
            expect(xml).toContain('<resource>');
            expect(xml).toContain('</entry>');
        });
    });

    describe('Static Methods', () => {
        test('should create Bundle from JSON', () => {
            const json = {
                resourceType: 'Bundle',
                id: 'from-json-bundle',
                type: 'history',
                total: 10,
                timestamp: '2024-12-01T18:00:00Z'
            };

            const bundle = Bundle.fromJson(json);

            expect(bundle).toBeInstanceOf(Bundle);
            expect(bundle.resourceType).toBe('Bundle');
            expect((bundle as any).id).toBe('from-json-bundle');
            expect(bundle.type).toBe('history');
            expect(bundle.total).toBe(10);
        });
    });

    describe('Edge Cases', () => {
        test('should handle Bundle with minimal required fields', () => {
            const bundle = new Bundle({
                type: 'collection'
            });

            expect(bundle.resourceType).toBe('Bundle');
            expect(bundle.type).toBe('collection');
            expect(bundle.identifier).toBeUndefined();
            expect(bundle.timestamp).toBeUndefined();
            expect(bundle.total).toBeUndefined();
            expect(bundle.link).toBeUndefined();
            expect(bundle.entry).toBeUndefined();
        });

        test('should handle single link and entry converted to arrays', () => {
            const bundle = new Bundle({
                type: 'searchset',
                link: {
                    relation: 'self',
                    url: 'http://example.org/single'
                } as any,
                entry: {
                    fullUrl: 'http://example.org/single-entry',
                    resource: {
                        resourceType: 'Patient'
                    } as any
                } as any
            });

            expect(bundle.link).toHaveLength(1);
            expect(bundle.entry).toHaveLength(1);
            expect(bundle.link![0]).toBeInstanceOf(BundleLink);
            expect(bundle.entry![0]).toBeInstanceOf(BundleEntry);
        });

        test('should handle Bundle with zero total', () => {
            const bundle = new Bundle({
                type: 'searchset',
                total: 0
            });

            expect(bundle.total).toBe(0);
        });

        test('should handle all HTTP methods in BundleEntryRequest', () => {
            const methods: Array<'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'> =
                ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH'];

            methods.forEach(method => {
                const request = new BundleEntryRequest({
                    method,
                    url: `Resource/${method.toLowerCase()}`
                });
                expect(request.method).toBe(method);
            });
        });
    });
});