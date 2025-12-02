import {
    CodeSystem,
    CodeSystemFilter,
    CodeSystemProperty,
    CodeSystemConcept,
    CodeSystemConceptDesignation,
    CodeSystemConceptProperty
} from '../../src/r4/codeSystem';
import { Identifier } from '../../src/r4/identifier';
import { Coding } from '../../src/r4/dataTypes/coding';
import { CodeableConcept } from '../../src/r4/dataTypes/codeableConcept';
import { Period } from '../../src/r4/dataTypes/period';

describe('CodeSystem Resource Tests', () => {
    describe('CodeSystemFilter Tests', () => {
        test('should create CodeSystemFilter with required fields', () => {
            const filter = new CodeSystemFilter({
                code: 'concept',
                operator: ['=', 'is-a'],
                value: 'test-value'
            });

            expect(filter.code).toBe('concept');
            expect(filter.operator).toEqual(['=', 'is-a']);
            expect(filter.value).toBe('test-value');
        });

        test('should throw error when required fields are missing', () => {
            expect(() => {
                new CodeSystemFilter({} as any);
            }).toThrow('CodeSystemFilter requires code, operator, and value');
        });

        test('should serialize to JSON correctly', () => {
            const filter = new CodeSystemFilter({
                code: 'concept',
                operator: ['='],
                value: 'test-value',
                description: 'Filter description'
            });

            const json = filter.toJson();
            expect(json.code).toBe('concept');
            expect(json.operator).toEqual(['=']);
            expect(json.value).toBe('test-value');
            expect(json.description).toBe('Filter description');
        });
    });

    describe('CodeSystemProperty Tests', () => {
        test('should create CodeSystemProperty with required fields', () => {
            const property = new CodeSystemProperty({
                code: 'inactive',
                type: 'boolean'
            });

            expect(property.code).toBe('inactive');
            expect(property.type).toBe('boolean');
        });

        test('should throw error when required fields are missing', () => {
            expect(() => {
                new CodeSystemProperty({ code: 'test' } as any);
            }).toThrow('CodeSystemProperty requires code and type');
        });

        test('should serialize to JSON correctly', () => {
            const property = new CodeSystemProperty({
                code: 'inactive',
                type: 'boolean',
                uri: 'http://hl7.org/fhir/concept-properties#inactive',
                description: 'Indicates if the concept is inactive'
            });

            const json = property.toJson();
            expect(json.code).toBe('inactive');
            expect(json.type).toBe('boolean');
            expect(json.uri).toBe('http://hl7.org/fhir/concept-properties#inactive');
            expect(json.description).toBe('Indicates if the concept is inactive');
        });
    });

    describe('CodeSystemConceptDesignation Tests', () => {
        test('should create CodeSystemConceptDesignation with required fields', () => {
            const designation = new CodeSystemConceptDesignation({
                value: 'Patient Display Name'
            });

            expect(designation.value).toBe('Patient Display Name');
        });

        test('should throw error when value is missing', () => {
            expect(() => {
                new CodeSystemConceptDesignation({} as any);
            }).toThrow('CodeSystemConceptDesignation requires value');
        });

        test('should handle Coding objects', () => {
            const designation = new CodeSystemConceptDesignation({
                value: 'Patient Display Name',
                language: 'en-US',
                use: new Coding({
                    system: 'http://terminology.hl7.org/CodeSystem/designation-usage' as any,
                    code: 'display' as any
                })
            });

            expect(designation.language).toBe('en-US');
            expect(designation.use).toBeInstanceOf(Coding);
            expect(designation.use?.code).toBe('display');
        });
    });

    describe('CodeSystemConceptProperty Tests', () => {
        test('should create CodeSystemConceptProperty with code and value', () => {
            const property = new CodeSystemConceptProperty({
                code: 'inactive',
                valueBoolean: true
            });

            expect(property.code).toBe('inactive');
            expect(property.valueBoolean).toBe(true);
        });

        test('should throw error when code is missing', () => {
            expect(() => {
                new CodeSystemConceptProperty({} as any);
            }).toThrow('CodeSystemConceptProperty requires code');
        });

        test('should handle different value types', () => {
            const stringProperty = new CodeSystemConceptProperty({
                code: 'display',
                valueString: 'Display Name'
            });

            const integerProperty = new CodeSystemConceptProperty({
                code: 'order',
                valueInteger: 1
            });

            expect(stringProperty.valueString).toBe('Display Name');
            expect(integerProperty.valueInteger).toBe(1);
        });
    });

    describe('CodeSystemConcept Tests', () => {
        test('should create CodeSystemConcept with required fields', () => {
            const concept = new CodeSystemConcept({
                code: 'patient'
            });

            expect(concept.code).toBe('patient');
        });

        test('should throw error when code is missing', () => {
            expect(() => {
                new CodeSystemConcept({} as any);
            }).toThrow('CodeSystemConcept requires code');
        });

        test('should handle nested concepts', () => {
            const concept = new CodeSystemConcept({
                code: 'person',
                display: 'Person',
                concept: [new CodeSystemConcept({
                    code: 'patient',
                    display: 'Patient'
                })]
            });

            expect(concept.concept).toHaveLength(1);
            expect(concept.concept?.[0]).toBeInstanceOf(CodeSystemConcept);
            expect(concept.concept?.[0].code).toBe('patient');
        });

        test('should serialize to JSON correctly', () => {
            const concept = new CodeSystemConcept({
                code: 'patient',
                display: 'Patient',
                definition: 'A person receiving healthcare'
            });

            const json = concept.toJson();
            expect(json.code).toBe('patient');
            expect(json.display).toBe('Patient');
            expect(json.definition).toBe('A person receiving healthcare');
        });
    });

    describe('CodeSystem Resource Tests', () => {
        describe('Constructor and Basic Properties', () => {
            test('should create CodeSystem with minimal required data', () => {
                const codeSystem = new CodeSystem({
                    status: 'active',
                    content: 'complete'
                });

                expect(codeSystem.resourceType).toBe('CodeSystem');
                expect(codeSystem.status).toBe('active');
                expect(codeSystem.content).toBe('complete');
            });

            test('should throw error when required fields are missing', () => {
                expect(() => {
                    new CodeSystem({} as any);
                }).toThrow('CodeSystem resource requires status and content');
            });

            test('should create CodeSystem with all properties', () => {
                const codeSystem = new CodeSystem({
                    id: 'test-code-system' as any,
                    url: 'http://example.org/fhir/CodeSystem/test',
                    identifier: [new Identifier({
                        system: 'http://example.org/identifiers',
                        value: 'CS-001'
                    })],
                    version: '1.0.0',
                    name: 'TestCodeSystem',
                    title: 'Test Code System',
                    status: 'active',
                    experimental: true,
                    date: '2024-12-02T10:00:00Z',
                    publisher: 'Example Organization',
                    description: 'A test code system for demonstration',
                    caseSensitive: true,
                    content: 'complete',
                    count: 5
                });

                expect(codeSystem.url).toBe('http://example.org/fhir/CodeSystem/test');
                expect(codeSystem.version).toBe('1.0.0');
                expect(codeSystem.name).toBe('TestCodeSystem');
                expect(codeSystem.title).toBe('Test Code System');
                expect(codeSystem.experimental).toBe(true);
                expect(codeSystem.caseSensitive).toBe(true);
                expect(codeSystem.count).toBe(5);
            });
        });

        describe('JSON Serialization', () => {
            test('should serialize minimal CodeSystem to JSON', () => {
                const codeSystem = new CodeSystem({
                    status: 'draft',
                    content: 'example'
                });

                const json = codeSystem.toJson();
                expect(json.resourceType).toBe('CodeSystem');
                expect(json.status).toBe('draft');
                expect(json.content).toBe('example');
            });

            test('should serialize complete CodeSystem to JSON', () => {
                const codeSystem = new CodeSystem({
                    id: 'complex-code-system' as any,
                    url: 'http://example.org/fhir/CodeSystem/complex',
                    version: '2.1.0',
                    name: 'ComplexCodeSystem',
                    title: 'Complex Code System',
                    status: 'active',
                    content: 'complete',
                    concept: [new CodeSystemConcept({
                        code: 'concept1',
                        display: 'Concept 1',
                        definition: 'First concept'
                    })],
                    property: [new CodeSystemProperty({
                        code: 'inactive',
                        type: 'boolean'
                    })]
                });

                const json = codeSystem.toJson();
                expect(json.resourceType).toBe('CodeSystem');
                expect(json.url).toBe('http://example.org/fhir/CodeSystem/complex');
                expect(json.concept).toHaveLength(1);
                expect(json.concept[0].code).toBe('concept1');
                expect(json.property).toHaveLength(1);
                expect(json.property[0].type).toBe('boolean');
            });
        });

        describe('XML Serialization', () => {
            test('should serialize minimal CodeSystem to XML', () => {
                const codeSystem = new CodeSystem({
                    status: 'active',
                    content: 'fragment'
                });

                const xml = codeSystem.toXml();
                expect(xml).toContain('<CodeSystem>');
                expect(xml).toContain('<resourceType value="CodeSystem"/>');
                expect(xml).toContain('<status value="active"/>');
                expect(xml).toContain('<content value="fragment"/>');
                expect(xml).toContain('</CodeSystem>');
            });

            test('should serialize complete CodeSystem to XML', () => {
                const codeSystem = new CodeSystem({
                    id: 'xml-test' as any,
                    url: 'http://example.org/fhir/CodeSystem/xml-test',
                    name: 'XmlTestCodeSystem',
                    status: 'active',
                    content: 'complete'
                });

                const xml = codeSystem.toXml();
                expect(xml).toContain('<id value="xml-test"/>');
                expect(xml).toContain('<url value="http://example.org/fhir/CodeSystem/xml-test"/>');
                expect(xml).toContain('<name value="XmlTestCodeSystem"/>');
            });
        });

        describe('Validation', () => {
            test('should validate CodeSystem with valid status and content', () => {
                const codeSystem = new CodeSystem({
                    status: 'active',
                    content: 'complete'
                });

                expect(codeSystem.isValid()).toBe(true);
            });

            test('should invalidate CodeSystem with invalid status', () => {
                const codeSystem = new CodeSystem({
                    status: 'invalid-status',
                    content: 'complete'
                });

                expect(codeSystem.isValid()).toBe(false);
            });

            test('should invalidate CodeSystem with invalid content', () => {
                const codeSystem = new CodeSystem({
                    status: 'active',
                    content: 'invalid-content'
                });

                expect(codeSystem.isValid()).toBe(false);
            });

            test('should validate hierarchyMeaning values', () => {
                const validCodeSystem = new CodeSystem({
                    status: 'active',
                    content: 'complete',
                    hierarchyMeaning: 'is-a'
                });

                const invalidCodeSystem = new CodeSystem({
                    status: 'active',
                    content: 'complete',
                    hierarchyMeaning: 'invalid-meaning'
                });

                expect(validCodeSystem.isValid()).toBe(true);
                expect(invalidCodeSystem.isValid()).toBe(false);
            });
        });

        describe('Utility Methods', () => {
            test('should get all concepts including nested ones', () => {
                const codeSystem = new CodeSystem({
                    status: 'active',
                    content: 'complete',
                    concept: [new CodeSystemConcept({
                        code: 'parent',
                        display: 'Parent Concept',
                        concept: [new CodeSystemConcept({
                            code: 'child',
                            display: 'Child Concept'
                        })]
                    }), new CodeSystemConcept({
                        code: 'sibling',
                        display: 'Sibling Concept'
                    })]
                });

                const allConcepts = codeSystem.getAllConcepts();
                expect(allConcepts).toHaveLength(3);

                const codes = allConcepts.map(c => c.code);
                expect(codes).toContain('parent');
                expect(codes).toContain('child');
                expect(codes).toContain('sibling');
            });

            test('should find concept by code', () => {
                const codeSystem = new CodeSystem({
                    status: 'active',
                    content: 'complete',
                    concept: [new CodeSystemConcept({
                        code: 'find-me',
                        display: 'Find Me'
                    })]
                });

                const foundConcept = codeSystem.findConcept('find-me');
                expect(foundConcept).toBeDefined();
                expect(foundConcept?.display).toBe('Find Me');

                const notFound = codeSystem.findConcept('not-there');
                expect(notFound).toBeUndefined();
            });

            test('should get concept count', () => {
                const codeSystem = new CodeSystem({
                    status: 'active',
                    content: 'complete',
                    concept: [new CodeSystemConcept({
                        code: 'parent',
                        concept: [new CodeSystemConcept({
                            code: 'child1'
                        }), new CodeSystemConcept({
                            code: 'child2'
                        })]
                    })]
                });

                expect(codeSystem.getConceptCount()).toBe(3);
            });

            test('should return 0 for empty concept count', () => {
                const codeSystem = new CodeSystem({
                    status: 'active',
                    content: 'not-present'
                });

                expect(codeSystem.getConceptCount()).toBe(0);
            });
        });

        describe('Static Methods', () => {
            test('should create CodeSystem from JSON', () => {
                const json = {
                    resourceType: 'CodeSystem',
                    id: 'from-json',
                    status: 'active',
                    content: 'complete',
                    name: 'FromJsonCodeSystem'
                };

                const codeSystem = CodeSystem.fromJson(json);
                expect(codeSystem).toBeInstanceOf(CodeSystem);
                expect(codeSystem.name).toBe('FromJsonCodeSystem');
            });
        });

        describe('Complex Scenarios', () => {
            test('should handle complex CodeSystem with all nested objects', () => {
                const codeSystem = new CodeSystem({
                    id: 'complex-system' as any,
                    url: 'http://example.org/fhir/CodeSystem/complex',
                    version: '3.0.0',
                    name: 'ComplexSystem',
                    title: 'Complex Code System',
                    status: 'active',
                    content: 'complete',
                    caseSensitive: true,
                    hierarchyMeaning: 'is-a',
                    filter: [new CodeSystemFilter({
                        code: 'concept',
                        operator: ['=', 'is-a'],
                        value: 'code',
                        description: 'Filter by concept'
                    })],
                    property: [new CodeSystemProperty({
                        code: 'inactive',
                        type: 'boolean',
                        description: 'Indicates if concept is inactive'
                    })],
                    concept: [new CodeSystemConcept({
                        code: 'root',
                        display: 'Root Concept',
                        definition: 'The root concept',
                        designation: [new CodeSystemConceptDesignation({
                            language: 'en-US',
                            value: 'Root Display Name'
                        })],
                        property: [new CodeSystemConceptProperty({
                            code: 'inactive',
                            valueBoolean: false
                        })],
                        concept: [new CodeSystemConcept({
                            code: 'child',
                            display: 'Child Concept',
                            property: [new CodeSystemConceptProperty({
                                code: 'inactive',
                                valueBoolean: true
                            })]
                        })]
                    })]
                });

                expect(codeSystem.filter).toHaveLength(1);
                expect(codeSystem.property).toHaveLength(1);
                expect(codeSystem.concept).toHaveLength(1);
                expect(codeSystem.concept?.[0].concept).toHaveLength(1);
                expect(codeSystem.getAllConcepts()).toHaveLength(2);

                const json = codeSystem.toJson();
                expect(json.filter[0].code).toBe('concept');
                expect(json.property[0].type).toBe('boolean');
                expect(json.concept[0].designation[0].language).toBe('en-US');

                console.log('Complex CodeSystem JSON:', JSON.stringify(json, null, 2));
            });

            test('should handle version algorithm coding', () => {
                const codeSystem = new CodeSystem({
                    status: 'active',
                    content: 'complete',
                    versionAlgorithmCoding: new Coding({
                        system: 'http://hl7.org/fhir/version-algorithm' as any,
                        code: 'semver' as any
                    })
                });

                expect(codeSystem.versionAlgorithmCoding).toBeInstanceOf(Coding);
                expect(codeSystem.versionAlgorithmCoding?.code).toBe('semver');
            });
        });
    });
});