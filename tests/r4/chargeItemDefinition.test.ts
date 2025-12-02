import {
    ChargeItemDefinition,
    ChargeItemDefinitionApplicability,
    ChargeItemDefinitionPropertyGroup
} from '../../src/r4/chargeItemDefinition';
import { CodeableConcept } from '../../src/r4/dataTypes/codeableConcept';
import { Coding } from '../../src/r4/dataTypes/coding';
import { ContactDetail } from '../../src/r4/dataTypes/contactDetail';
import { Expression } from '../../src/r4/dataTypes/expression';
import { MonetaryComponent } from '../../src/r4/dataTypes/monetaryComponent';
import { Period } from '../../src/r4/dataTypes/period';
import { RelatedArtifact } from '../../src/r4/dataTypes/relatedArtifact';
import { UsageContext } from '../../src/r4/dataTypes/usageContext';
import { Identifier } from '../../src/r4/identifier';
import { Reference } from '../../src/r4/reference';

describe('ChargeItemDefinition', () => {
    describe('Basic ChargeItemDefinition Creation', () => {
        test('should create basic ChargeItemDefinition', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'basic-def',
                status: 'active',
                name: 'Basic Charge Definition',
                title: 'Basic Charge Item Definition'
            });

            expect(chargeItemDefinition.resourceType).toBe('ChargeItemDefinition');
            expect(chargeItemDefinition.id).toBe('basic-def');
            expect(chargeItemDefinition.status).toBe('active');
            expect(chargeItemDefinition.name).toBe('Basic Charge Definition');
            expect(chargeItemDefinition.title).toBe('Basic Charge Item Definition');
        });

        test('should create ChargeItemDefinition with identifiers and URL', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'def-with-identifiers',
                url: 'http://example.org/charge-definitions/example',
                identifier: [
                    { system: 'http://example.org/def-ids', value: 'DEF001' },
                    { system: 'http://example.org/legacy-ids', value: 'OLD-DEF-001' }
                ],
                status: 'draft'
            });

            expect(chargeItemDefinition.url).toBe('http://example.org/charge-definitions/example');
            expect(chargeItemDefinition.identifier).toHaveLength(2);
            expect(chargeItemDefinition.identifier![0]).toBeInstanceOf(Identifier);
            expect(chargeItemDefinition.identifier![0].system).toBe('http://example.org/def-ids');
            expect(chargeItemDefinition.identifier![0].value).toBe('DEF001');
        });
    });

    describe('ChargeItemDefinition with Version and Metadata', () => {
        test('should create ChargeItemDefinition with version algorithm string', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'versioned-def',
                status: 'active',
                version: '1.0.0',
                versionAlgorithmString: 'semver',
                experimental: true,
                date: '2024-01-01T00:00:00Z',
                publisher: 'Example Healthcare Organization'
            });

            expect(chargeItemDefinition.version).toBe('1.0.0');
            expect(chargeItemDefinition.versionAlgorithmString).toBe('semver');
            expect(chargeItemDefinition.experimental).toBe(true);
            expect(chargeItemDefinition.date).toBe('2024-01-01T00:00:00Z');
            expect(chargeItemDefinition.publisher).toBe('Example Healthcare Organization');
        });

        test('should create ChargeItemDefinition with version algorithm coding', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'coded-version-def',
                status: 'active',
                version: '2.0.0',
                versionAlgorithmCoding: {
                    system: 'http://terminology.hl7.org/CodeSystem/version-algorithm',
                    code: 'semver',
                    display: 'Semantic Versioning'
                }
            });

            expect(chargeItemDefinition.versionAlgorithmCoding).toBeInstanceOf(Coding);
            expect(chargeItemDefinition.versionAlgorithmCoding!.system).toBe('http://terminology.hl7.org/CodeSystem/version-algorithm');
            expect(chargeItemDefinition.versionAlgorithmCoding!.code).toBe('semver');
        });
    });

    describe('ChargeItemDefinition with Content and Context', () => {
        test('should create ChargeItemDefinition with descriptions and context', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'contextual-def',
                status: 'active',
                description: 'A comprehensive charge item definition for laboratory tests',
                purpose: 'To standardize billing for common laboratory procedures',
                copyright: 'Copyright 2024 Example Healthcare. All rights reserved.',
                copyrightLabel: '© 2024 Example Healthcare',
                approvalDate: '2024-01-01',
                lastReviewDate: '2024-06-01',
                derivedFromUri: ['http://example.org/base-definitions/lab-tests'],
                partOf: ['http://example.org/charge-definitions/laboratory-suite'],
                replaces: ['http://example.org/charge-definitions/old-lab-def']
            });

            expect(chargeItemDefinition.description).toBe('A comprehensive charge item definition for laboratory tests');
            expect(chargeItemDefinition.purpose).toBe('To standardize billing for common laboratory procedures');
            expect(chargeItemDefinition.copyright).toBe('Copyright 2024 Example Healthcare. All rights reserved.');
            expect(chargeItemDefinition.copyrightLabel).toBe('© 2024 Example Healthcare');
            expect(chargeItemDefinition.derivedFromUri).toEqual(['http://example.org/base-definitions/lab-tests']);
            expect(chargeItemDefinition.partOf).toEqual(['http://example.org/charge-definitions/laboratory-suite']);
            expect(chargeItemDefinition.replaces).toEqual(['http://example.org/charge-definitions/old-lab-def']);
        });

        test('should create ChargeItemDefinition with code and instances', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'coded-def',
                status: 'active',
                code: {
                    coding: [{
                        system: 'http://loinc.org',
                        code: '33747-0',
                        display: 'Hemoglobin A1c'
                    }]
                },
                instance: [
                    { reference: 'Device/lab-analyzer-001' },
                    { reference: 'HealthcareService/lab-service' }
                ]
            });

            expect(chargeItemDefinition.code).toBeInstanceOf(CodeableConcept);
            expect(chargeItemDefinition.code!.coding![0].system).toBe('http://loinc.org');
            expect(chargeItemDefinition.instance).toHaveLength(2);
            expect(chargeItemDefinition.instance![0]).toBeInstanceOf(Reference);
            expect(chargeItemDefinition.instance![0].reference).toBe('Device/lab-analyzer-001');
        });
    });

    describe('ChargeItemDefinition Applicability', () => {
        test('should create ChargeItemDefinition with applicability conditions', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'conditional-def',
                status: 'active',
                applicability: [{
                    condition: {
                        language: 'text/fhirpath',
                        expression: '%context.status = "active"'
                    },
                    effectivePeriod: {
                        start: '2024-01-01',
                        end: '2024-12-31'
                    },
                    relatedArtifact: {
                        type: 'documentation',
                        url: 'http://example.org/documentation/billing-rules'
                    }
                }]
            });

            expect(chargeItemDefinition.applicability).toHaveLength(1);

            const applicability = chargeItemDefinition.applicability![0];
            expect(applicability).toBeInstanceOf(ChargeItemDefinitionApplicability);
            expect(applicability.condition).toBeInstanceOf(Expression);
            expect(applicability.condition!.language).toBe('text/fhirpath');
            expect(applicability.effectivePeriod).toBeInstanceOf(Period);
            expect(applicability.effectivePeriod!.start).toBe('2024-01-01');
            expect(applicability.relatedArtifact).toBeInstanceOf(RelatedArtifact);
        });
    });

    describe('ChargeItemDefinition Property Groups', () => {
        test('should create ChargeItemDefinition with property groups', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'grouped-def',
                status: 'active',
                propertyGroup: [{
                    applicability: [{
                        condition: {
                            language: 'text/fhirpath',
                            expression: '%context.class = "inpatient"'
                        },
                        effectivePeriod: {
                            start: '2024-01-01'
                        }
                    }],
                    priceComponent: [{
                        type: 'base',
                        code: {
                            coding: [{
                                system: 'http://terminology.hl7.org/CodeSystem/price-component-type',
                                code: 'base',
                                display: 'Base Price'
                            }]
                        },
                        amount: {
                            value: 150.00,
                            currency: 'USD'
                        }
                    }]
                }]
            });

            expect(chargeItemDefinition.propertyGroup).toHaveLength(1);

            const propertyGroup = chargeItemDefinition.propertyGroup![0];
            expect(propertyGroup).toBeInstanceOf(ChargeItemDefinitionPropertyGroup);
            expect(propertyGroup.applicability).toHaveLength(1);
            expect(propertyGroup.applicability![0]).toBeInstanceOf(ChargeItemDefinitionApplicability);
            expect(propertyGroup.priceComponent).toHaveLength(1);
            expect(propertyGroup.priceComponent![0]).toBeInstanceOf(MonetaryComponent);
            expect(propertyGroup.priceComponent![0].type).toBe('base');
        });

        test('should create ChargeItemDefinition with multiple property groups', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'multi-group-def',
                status: 'active',
                propertyGroup: [
                    {
                        applicability: [{
                            condition: {
                                language: 'text/fhirpath',
                                expression: '%context.class = "inpatient"'
                            }
                        }],
                        priceComponent: [{
                            type: 'base',
                            amount: { value: 200.00, currency: 'USD' }
                        }]
                    },
                    {
                        applicability: [{
                            condition: {
                                language: 'text/fhirpath',
                                expression: '%context.class = "outpatient"'
                            }
                        }],
                        priceComponent: [{
                            type: 'base',
                            amount: { value: 150.00, currency: 'USD' }
                        }]
                    }
                ]
            });

            expect(chargeItemDefinition.propertyGroup).toHaveLength(2);
            expect(chargeItemDefinition.propertyGroup![0].priceComponent![0].amount!.value).toBe(200.00);
            expect(chargeItemDefinition.propertyGroup![1].priceComponent![0].amount!.value).toBe(150.00);
        });
    });

    describe('JSON Serialization', () => {
        test('should serialize basic ChargeItemDefinition to JSON', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'json-def',
                status: 'active',
                name: 'JSON Test Definition',
                title: 'JSON Test Charge Item Definition'
            });

            const json = chargeItemDefinition.toJson();

            expect(json.resourceType).toBe('ChargeItemDefinition');
            expect(json.id).toBe('json-def');
            expect(json.status).toBe('active');
            expect(json.name).toBe('JSON Test Definition');
            expect(json.title).toBe('JSON Test Charge Item Definition');
        });

        test('should serialize complex ChargeItemDefinition to JSON', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'complex-json-def',
                url: 'http://example.org/charge-definitions/complex',
                identifier: [{ system: 'http://example.org/def-ids', value: 'COMPLEX001' }],
                status: 'active',
                version: '1.0.0',
                experimental: false,
                propertyGroup: [{
                    priceComponent: [{
                        type: 'base',
                        amount: { value: 100.00, currency: 'USD' }
                    }]
                }]
            });

            const json = chargeItemDefinition.toJson();

            expect(json.url).toBe('http://example.org/charge-definitions/complex');
            expect(json.identifier).toHaveLength(1);
            expect(json.version).toBe('1.0.0');
            expect(json.experimental).toBe(false);
            expect(json.propertyGroup).toHaveLength(1);
            expect(json.propertyGroup[0].priceComponent[0].amount.value).toBe(100.00);
        });
    });

    describe('XML Serialization', () => {
        test('should serialize ChargeItemDefinition to XML', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                id: 'xml-def',
                status: 'active',
                name: 'XML Test Definition'
            });

            const xml = chargeItemDefinition.toXml();

            expect(xml).toContain('<ChargeItemDefinition xmlns="http://hl7.org/fhir">');
            expect(xml).toContain('<id value="xml-def"/>');
            expect(xml).toContain('<status value="active"/>');
            expect(xml).toContain('<name value="XML Test Definition"/>');
            expect(xml).toContain('</ChargeItemDefinition>');
        });
    });

    describe('Nested Class Tests', () => {
        test('should create standalone ChargeItemDefinitionApplicability', () => {
            const applicability = new ChargeItemDefinitionApplicability({
                condition: {
                    language: 'text/fhirpath',
                    expression: 'Patient.active = true'
                },
                effectivePeriod: {
                    start: '2024-01-01',
                    end: '2024-12-31'
                }
            });

            expect(applicability.condition).toBeInstanceOf(Expression);
            expect(applicability.effectivePeriod).toBeInstanceOf(Period);

            const json = applicability.toJson();
            expect(json.condition.expression).toBe('Patient.active = true');
            expect(json.effectivePeriod.start).toBe('2024-01-01');
        });

        test('should create standalone ChargeItemDefinitionPropertyGroup', () => {
            const propertyGroup = new ChargeItemDefinitionPropertyGroup({
                priceComponent: [{
                    type: 'base',
                    amount: { value: 75.00, currency: 'USD' }
                }]
            });

            expect(propertyGroup.priceComponent).toHaveLength(1);
            expect(propertyGroup.priceComponent![0]).toBeInstanceOf(MonetaryComponent);

            const json = propertyGroup.toJson();
            expect(json.priceComponent[0].amount.value).toBe(75.00);
        });
    });

    describe('Static Methods', () => {
        test('should create ChargeItemDefinition from JSON', () => {
            const jsonData = {
                resourceType: 'ChargeItemDefinition',
                id: 'from-json-def',
                status: 'active',
                name: 'From JSON Definition'
            };

            const chargeItemDefinition = ChargeItemDefinition.fromJson(jsonData);

            expect(chargeItemDefinition).toBeInstanceOf(ChargeItemDefinition);
            expect(chargeItemDefinition.id).toBe('from-json-def');
            expect(chargeItemDefinition.status).toBe('active');
            expect(chargeItemDefinition.name).toBe('From JSON Definition');
        });
    });

    describe('Edge Cases', () => {
        test('should handle ChargeItemDefinition with only required status', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                status: 'draft'
            });

            expect(chargeItemDefinition.resourceType).toBe('ChargeItemDefinition');
            expect(chargeItemDefinition.status).toBe('draft');
            expect(chargeItemDefinition.id).toBeUndefined();
            expect(chargeItemDefinition.name).toBeUndefined();
        });

        test('should handle single values converted to arrays', () => {
            const chargeItemDefinition = new ChargeItemDefinition({
                identifier: { system: 'http://example.org/defs', value: 'SINGLE001' },
                status: 'active',
                derivedFromUri: 'http://example.org/base-def',
                partOf: 'http://example.org/parent-def',
                instance: { reference: 'Device/single-device' }
            });

            expect(chargeItemDefinition.identifier).toHaveLength(1);
            expect(chargeItemDefinition.derivedFromUri).toEqual(['http://example.org/base-def']);
            expect(chargeItemDefinition.partOf).toEqual(['http://example.org/parent-def']);
            expect(chargeItemDefinition.instance).toHaveLength(1);
        });

        test('should handle choice types (versionAlgorithm)', () => {
            // Test with string version
            const defWithString = new ChargeItemDefinition({
                status: 'active',
                versionAlgorithmString: 'semantic'
            });
            expect(defWithString.versionAlgorithmString).toBe('semantic');
            expect(defWithString.versionAlgorithmCoding).toBeUndefined();

            // Test with coding version
            const defWithCoding = new ChargeItemDefinition({
                status: 'active',
                versionAlgorithmCoding: {
                    system: 'http://example.org/version-algorithms',
                    code: 'custom'
                }
            });
            expect(defWithCoding.versionAlgorithmCoding).toBeInstanceOf(Coding);
            expect(defWithCoding.versionAlgorithmString).toBeUndefined();
        });
    });
});