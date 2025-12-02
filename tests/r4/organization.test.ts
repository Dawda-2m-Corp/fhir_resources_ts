import {
    Organization,
    OrganizationQualification
} from '../../src/r4/organization';
import { CodeableConcept } from '../../src/r4/dataTypes/codeableConcept';
import { Reference } from '../../src/r4/reference';
import { Identifier } from '../../src/r4/identifier';
import { Period } from '../../src/r4/dataTypes/period';
import { ExtendedContactDetail } from '../../src/r4/dataTypes/extendedContactDetail';

describe('Organization', () => {
    describe('Basic Organization Creation', () => {
        test('should create basic Organization', () => {
            const organization = new Organization({
                id: 'basic-org',
                name: 'Basic Health Organization',
                active: true
            });

            expect(organization.resourceType).toBe('Organization');
            expect(organization.id).toBe('basic-org');
            expect(organization.name).toBe('Basic Health Organization');
            expect(organization.active).toBe(true);
        });

        test('should create Organization with identifiers', () => {
            const organization = new Organization({
                id: 'org-with-identifiers',
                identifier: [
                    { system: 'http://example.org/org-ids', value: 'ORG001' },
                    { system: 'http://example.org/legacy-ids', value: 'OLD-ORG-001' }
                ]
            });

            expect(organization.identifier).toHaveLength(2);
            expect(organization.identifier![0]).toBeInstanceOf(Identifier);
            expect(organization.identifier![0].system).toBe('http://example.org/org-ids');
            expect(organization.identifier![0].value).toBe('ORG001');
        });
    });

    describe('Organization with Complex Fields', () => {
        test('should create Organization with type and description', () => {
            const organization = new Organization({
                id: 'complex-org',
                type: [
                    {
                        coding: [{
                            system: 'http://terminology.hl7.org/CodeSystem/organization-type',
                            code: 'prov',
                            display: 'Healthcare Provider'
                        }]
                    }
                ],
                name: 'Complex Healthcare Organization',
                alias: ['Complex Health', 'CHO'],
                description: 'A comprehensive healthcare organization providing multiple services',
                active: true
            });

            expect(organization.type).toHaveLength(1);
            expect(organization.type![0]).toBeInstanceOf(CodeableConcept);
            expect(organization.alias).toEqual(['Complex Health', 'CHO']);
            expect(organization.description).toBe('A comprehensive healthcare organization providing multiple services');
        });

        test('should create Organization with partOf and endpoints', () => {
            const organization = new Organization({
                id: 'subsidiary-org',
                name: 'Subsidiary Organization',
                partOf: { reference: 'Organization/parent-org' },
                endpoint: [
                    { reference: 'Endpoint/fhir-api' },
                    { reference: 'Endpoint/patient-portal' }
                ]
            });

            expect(organization.partOf).toBeInstanceOf(Reference);
            expect(organization.partOf!.reference).toBe('Organization/parent-org');
            expect(organization.endpoint).toHaveLength(2);
            expect(organization.endpoint![0]).toBeInstanceOf(Reference);
        });
    });

    describe('Organization Qualifications', () => {
        test('should create Organization with qualifications', () => {
            const organization = new Organization({
                id: 'qualified-org',
                name: 'Qualified Healthcare Organization',
                qualification: [{
                    identifier: [{ system: 'http://example.org/qualifications', value: 'QUAL001' }],
                    code: {
                        coding: [{
                            system: 'http://terminology.hl7.org/CodeSystem/v2-0360',
                            code: 'MD',
                            display: 'Doctor of Medicine'
                        }]
                    },
                    period: {
                        start: '2020-01-01',
                        end: '2025-12-31'
                    },
                    issuer: { reference: 'Organization/medical-board' }
                }]
            });

            expect(organization.qualification).toHaveLength(1);

            const qualification = organization.qualification![0];
            expect(qualification).toBeInstanceOf(OrganizationQualification);
            expect(qualification.identifier).toHaveLength(1);
            expect(qualification.identifier![0]).toBeInstanceOf(Identifier);
            expect(qualification.code).toBeInstanceOf(CodeableConcept);
            expect(qualification.period).toBeInstanceOf(Period);
            expect(qualification.period!.start).toBe('2020-01-01');
            expect(qualification.issuer).toBeInstanceOf(Reference);
            expect(qualification.issuer!.reference).toBe('Organization/medical-board');
        });

        test('should create Organization with multiple qualifications', () => {
            const organization = new Organization({
                id: 'multi-qualified-org',
                name: 'Multi-Qualified Organization',
                qualification: [
                    {
                        code: {
                            coding: [{
                                system: 'http://terminology.hl7.org/CodeSystem/v2-0360',
                                code: 'MD',
                                display: 'Doctor of Medicine'
                            }]
                        },
                        period: { start: '2020-01-01' },
                        issuer: { reference: 'Organization/medical-board' }
                    },
                    {
                        code: {
                            coding: [{
                                system: 'http://terminology.hl7.org/CodeSystem/v2-0360',
                                code: 'RN',
                                display: 'Registered Nurse'
                            }]
                        },
                        period: { start: '2019-01-01' },
                        issuer: { reference: 'Organization/nursing-board' }
                    }
                ]
            });

            expect(organization.qualification).toHaveLength(2);
            expect(organization.qualification![1].code.coding![0].code).toBe('RN');
        });
    });

    describe('JSON Serialization', () => {
        test('should serialize basic Organization to JSON', () => {
            const organization = new Organization({
                id: 'json-org',
                name: 'JSON Test Organization',
                active: true
            });

            const json = organization.toJson();

            expect(json.resourceType).toBe('Organization');
            expect(json.id).toBe('json-org');
            expect(json.name).toBe('JSON Test Organization');
            expect(json.active).toBe(true);
        });

        test('should serialize complex Organization to JSON', () => {
            const organization = new Organization({
                id: 'complex-json-org',
                identifier: [{ system: 'http://example.org/org-ids', value: 'COMPLEX001' }],
                active: true,
                type: [{ coding: [{ system: 'http://example.org/types', code: 'hospital' }] }],
                name: 'Complex JSON Organization',
                alias: ['Alternative Name', 'Another Name'],
                description: 'A complex organization for testing',
                qualification: [{
                    code: { coding: [{ system: 'http://example.org/qualifications', code: 'accredited' }] },
                    period: { start: '2024-01-01' }
                }]
            });

            const json = organization.toJson();

            expect(json.identifier).toHaveLength(1);
            expect(json.identifier[0].system).toBe('http://example.org/org-ids');
            expect(json.type).toHaveLength(1);
            expect(json.alias).toEqual(['Alternative Name', 'Another Name']);
            expect(json.description).toBe('A complex organization for testing');
            expect(json.qualification).toHaveLength(1);
            expect(json.qualification[0].period.start).toBe('2024-01-01');
        });
    });

    describe('XML Serialization', () => {
        test('should serialize Organization to XML', () => {
            const organization = new Organization({
                id: 'xml-org',
                name: 'XML Test Organization',
                active: true
            });

            const xml = organization.toXml();

            expect(xml).toContain('<Organization xmlns="http://hl7.org/fhir">');
            expect(xml).toContain('<id value="xml-org"/>');
            expect(xml).toContain('<name value="XML Test Organization"/>');
            expect(xml).toContain('<active value="true"/>');
            expect(xml).toContain('</Organization>');
        });
    });

    describe('OrganizationQualification Class', () => {
        test('should create standalone OrganizationQualification', () => {
            const qualification = new OrganizationQualification({
                identifier: [{ system: 'http://example.org/qual-ids', value: 'QUAL123' }],
                code: {
                    coding: [{
                        system: 'http://terminology.hl7.org/CodeSystem/v2-0360',
                        code: 'PharmD',
                        display: 'Doctor of Pharmacy'
                    }]
                },
                period: {
                    start: '2021-01-01',
                    end: '2026-12-31'
                },
                issuer: { reference: 'Organization/pharmacy-board' }
            });

            expect(qualification.identifier).toHaveLength(1);
            expect(qualification.code).toBeInstanceOf(CodeableConcept);
            expect(qualification.period).toBeInstanceOf(Period);
            expect(qualification.issuer).toBeInstanceOf(Reference);
        });

        test('should serialize OrganizationQualification to JSON and XML', () => {
            const qualification = new OrganizationQualification({
                code: {
                    coding: [{
                        system: 'http://example.org/qualifications',
                        code: 'certified',
                        display: 'Certified'
                    }]
                },
                period: { start: '2024-01-01' }
            });

            const json = qualification.toJson();
            expect(json.code.coding[0].code).toBe('certified');
            expect(json.period.start).toBe('2024-01-01');

            const xml = qualification.toXml();
            expect(xml).toContain('<qualification>');
            expect(xml).toContain('<code>');
            expect(xml).toContain('<period>');
            expect(xml).toContain('</qualification>');
        });
    });

    describe('Static Methods', () => {
        test('should create Organization from JSON', () => {
            const jsonData = {
                resourceType: 'Organization',
                id: 'from-json-org',
                name: 'From JSON Organization',
                active: true
            };

            const organization = Organization.fromJson(jsonData);

            expect(organization).toBeInstanceOf(Organization);
            expect(organization.id).toBe('from-json-org');
            expect(organization.name).toBe('From JSON Organization');
            expect(organization.active).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty Organization', () => {
            const organization = new Organization({});

            expect(organization.resourceType).toBe('Organization');
            expect(organization.id).toBeUndefined();
            expect(organization.name).toBeUndefined();
            expect(organization.active).toBeUndefined();
        });

        test('should handle single values converted to arrays', () => {
            const organization = new Organization({
                identifier: { system: 'http://example.org/orgs', value: 'SINGLE001' },
                type: { coding: [{ system: 'http://example.org/types', code: 'hospital' }] },
                alias: 'Single Alias',
                endpoint: { reference: 'Endpoint/single-endpoint' },
                qualification: {
                    code: { coding: [{ system: 'http://example.org/quals', code: 'basic' }] }
                }
            });

            expect(organization.identifier).toHaveLength(1);
            expect(organization.type).toHaveLength(1);
            expect(organization.alias).toEqual(['Single Alias']);
            expect(organization.endpoint).toHaveLength(1);
            expect(organization.qualification).toHaveLength(1);
        });

        test('should handle qualification without optional fields', () => {
            const organization = new Organization({
                id: 'minimal-qual-org',
                qualification: [{
                    code: {
                        coding: [{
                            system: 'http://example.org/qualifications',
                            code: 'basic'
                        }]
                    }
                }]
            });

            const qualification = organization.qualification![0];
            expect(qualification.code).toBeInstanceOf(CodeableConcept);
            expect(qualification.identifier).toBeUndefined();
            expect(qualification.period).toBeUndefined();
            expect(qualification.issuer).toBeUndefined();
        });
    });
});