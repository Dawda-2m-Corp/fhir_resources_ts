import {
    Medication,
    MedicationIngredient,
    MedicationBatch
} from '../../src/r4/medication';
import { Identifier } from '../../src/r4/identifier';
import { Reference } from '../../src/r4/reference';
import { CodeableConcept } from '../../src/r4/dataTypes/codeableConcept';
import { Coding } from '../../src/r4/dataTypes/coding';
import { Quantity } from '../../src/r4/dataTypes/quantity';
import { Ratio } from '../../src/r4/dataTypes/ratio'; describe('Medication Resource Tests', () => {
    describe('MedicationIngredient Tests', () => {
        test('should create MedicationIngredient with CodeableConcept item', () => {
            const ingredient = new MedicationIngredient({
                item: new CodeableConcept({
                    coding: [new Coding({
                        system: 'http://www.nlm.nih.gov/research/umls/rxnorm' as any,
                        code: '387207008' as any,
                        display: 'Acetaminophen'
                    })]
                }),
                isActive: true
            });

            expect(ingredient.item).toBeInstanceOf(CodeableConcept);
            expect(ingredient.isActive).toBe(true);
        });

        test('should create MedicationIngredient with Reference item', () => {
            const ingredient = new MedicationIngredient({
                item: new Reference({
                    reference: 'Medication/aspirin'
                }),
                isActive: false,
                strengthQuantity: new Quantity({
                    value: "325" as any,
                    unit: 'mg',
                    system: 'http://unitsofmeasure.org' as any,
                    code: 'mg' as any
                })
            });

            expect(ingredient.item).toBeInstanceOf(Reference);
            expect(ingredient.isActive).toBe(false);
            expect(ingredient.strengthQuantity).toBeInstanceOf(Quantity);
        });

        test('should throw error when item is missing', () => {
            expect(() => {
                new MedicationIngredient({} as any);
            }).toThrow('MedicationIngredient requires item');
        });

        test('should create item from object data', () => {
            const ingredient = new MedicationIngredient({
                item: {
                    reference: 'Substance/acetaminophen'
                } as any
            });

            expect(ingredient.item).toBeInstanceOf(Reference);
        });

        test('should serialize to JSON correctly', () => {
            const ingredient = new MedicationIngredient({
                item: new CodeableConcept({
                    text: 'Acetaminophen'
                }),
                isActive: true,
                strengthRatio: new Ratio({
                    numerator: new Quantity({ value: "500" as any, unit: 'mg' }),
                    denominator: new Quantity({ value: "1" as any, unit: 'tablet' })
                })
            });

            const json = ingredient.toJson();
            expect(json.isActive).toBe(true);
            expect(json.strengthRatio).toBeDefined();
            expect(json.item).toBeDefined();
        });
    });

    describe('MedicationBatch Tests', () => {
        test('should create MedicationBatch with all fields', () => {
            const batch = new MedicationBatch({
                lotNumber: 'LOT12345',
                expirationDate: '2025-12-31T23:59:59Z'
            });

            expect(batch.lotNumber).toBe('LOT12345');
            expect(batch.expirationDate).toBe('2025-12-31T23:59:59Z');
        });

        test('should create empty MedicationBatch', () => {
            const batch = new MedicationBatch({});

            expect(batch.lotNumber).toBeUndefined();
            expect(batch.expirationDate).toBeUndefined();
        });

        test('should serialize to JSON correctly', () => {
            const batch = new MedicationBatch({
                lotNumber: 'BATCH001',
                expirationDate: '2026-01-15T10:30:00Z'
            });

            const json = batch.toJson();
            expect(json.lotNumber).toBe('BATCH001');
            expect(json.expirationDate).toBe('2026-01-15T10:30:00Z');
        });
    });

    describe('Medication Resource Tests', () => {
        describe('Constructor and Basic Properties', () => {
            test('should create minimal Medication', () => {
                const medication = new Medication({});

                expect(medication.resourceType).toBe('Medication');
            });

            test('should create Medication with all properties', () => {
                const medication = new Medication({
                    id: 'medication-123' as any,
                    identifier: [new Identifier({
                        system: 'http://example.org/medications' as any,
                        value: 'MED-001'
                    })],
                    code: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://www.nlm.nih.gov/research/umls/rxnorm' as any,
                            code: '313782' as any,
                            display: 'Acetaminophen 325mg Tablet'
                        })],
                        text: 'Acetaminophen 325mg Tablet'
                    }),
                    status: 'active',
                    marketingAuthorizationHolder: new Reference({
                        reference: 'Organization/pharma-company'
                    }),
                    doseForm: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://snomed.info/sct' as any,
                            code: '385055001' as any,
                            display: 'Tablet'
                        })]
                    }),
                    totalVolume: new Quantity({
                        value: "100" as any,
                        unit: 'tablets'
                    })
                });

                expect(medication.status).toBe('active');
                expect(medication.identifier).toHaveLength(1);
                expect(medication.code).toBeInstanceOf(CodeableConcept);
                expect(medication.marketingAuthorizationHolder).toBeInstanceOf(Reference);
                expect(medication.doseForm).toBeInstanceOf(CodeableConcept);
                expect(medication.totalVolume).toBeInstanceOf(Quantity);
            });

            test('should handle array and single object inputs', () => {
                const medication = new Medication({
                    identifier: {
                        system: 'http://example.org' as any,
                        value: 'ID-001'
                    } as any,
                    ingredient: {
                        item: {
                            text: 'Active Ingredient'
                        },
                        isActive: true
                    } as any
                });

                expect(medication.identifier).toHaveLength(1);
                expect(medication.ingredient).toHaveLength(1);
            });
        });

        describe('JSON Serialization', () => {
            test('should serialize minimal Medication to JSON', () => {
                const medication = new Medication({});

                const json = medication.toJson();
                expect(json.resourceType).toBe('Medication');
            });

            test('should serialize complete Medication to JSON', () => {
                const medication = new Medication({
                    id: 'complex-medication' as any,
                    status: 'active',
                    code: new CodeableConcept({
                        text: 'Aspirin 81mg'
                    }),
                    ingredient: [new MedicationIngredient({
                        item: new CodeableConcept({
                            text: 'Aspirin'
                        }),
                        isActive: true,
                        strengthQuantity: new Quantity({
                            value: "81" as any,
                            unit: 'mg'
                        })
                    })],
                    batch: new MedicationBatch({
                        lotNumber: 'LOT2024',
                        expirationDate: '2025-06-30T23:59:59Z'
                    })
                });

                const json = medication.toJson();
                expect(json.resourceType).toBe('Medication');
                expect(json.status).toBe('active');
                expect(json.ingredient).toHaveLength(1);
                expect(json.ingredient[0].item.text).toBe('Aspirin');
                expect(json.batch.lotNumber).toBe('LOT2024');
            });
        });

        describe('XML Serialization', () => {
            test('should serialize minimal Medication to XML', () => {
                const medication = new Medication({});

                const xml = medication.toXml();
                expect(xml).toContain('<Medication>');
                expect(xml).toContain('<resourceType value="Medication"/>');
                expect(xml).toContain('</Medication>');
            });

            test('should serialize complete Medication to XML', () => {
                const medication = new Medication({
                    id: 'xml-test' as any,
                    status: 'active',
                    code: new CodeableConcept({
                        text: 'Test Medication'
                    })
                });

                const xml = medication.toXml();
                expect(xml).toContain('<id value="xml-test"/>');
                expect(xml).toContain('<status value="active"/>');
                expect(xml).toContain('<code>');
            });
        });

        describe('Validation', () => {
            test('should validate Medication with valid status', () => {
                const medication = new Medication({
                    status: 'active'
                });

                expect(medication.isValid()).toBe(true);
            });

            test('should invalidate Medication with invalid status', () => {
                const medication = new Medication({
                    status: 'invalid-status'
                });

                expect(medication.isValid()).toBe(false);
            });

            test('should validate Medication with valid batch expiration date', () => {
                const medication = new Medication({
                    batch: new MedicationBatch({
                        expirationDate: '2025-12-31T23:59:59Z'
                    })
                });

                expect(medication.isValid()).toBe(true);
            });

            test('should invalidate Medication with invalid batch expiration date', () => {
                const medication = new Medication({
                    batch: new MedicationBatch({
                        expirationDate: 'invalid-date'
                    })
                });

                expect(medication.isValid()).toBe(false);
            });

            test('should invalidate Medication with multiple strength types in ingredient', () => {
                const medication = new Medication({
                    ingredient: [new MedicationIngredient({
                        item: new CodeableConcept({ text: 'Test' }),
                        strengthQuantity: new Quantity({ value: "100" as any }),
                        strengthRatio: new Ratio({
                            numerator: new Quantity({ value: "1" as any }),
                            denominator: new Quantity({ value: "2" as any })
                        })
                    })]
                });

                expect(medication.isValid()).toBe(false);
            });
        });

        describe('Utility Methods', () => {
            test('should get active ingredients', () => {
                const medication = new Medication({
                    ingredient: [
                        new MedicationIngredient({
                            item: new CodeableConcept({ text: 'Active 1' }),
                            isActive: true
                        }),
                        new MedicationIngredient({
                            item: new CodeableConcept({ text: 'Inactive 1' }),
                            isActive: false
                        }),
                        new MedicationIngredient({
                            item: new CodeableConcept({ text: 'Active 2' }),
                            isActive: true
                        })
                    ]
                });

                const activeIngredients = medication.getActiveIngredients();
                expect(activeIngredients).toHaveLength(2);
            });

            test('should get inactive ingredients', () => {
                const medication = new Medication({
                    ingredient: [
                        new MedicationIngredient({
                            item: new CodeableConcept({ text: 'Active 1' }),
                            isActive: true
                        }),
                        new MedicationIngredient({
                            item: new CodeableConcept({ text: 'Inactive 1' }),
                            isActive: false
                        })
                    ]
                });

                const inactiveIngredients = medication.getInactiveIngredients();
                expect(inactiveIngredients).toHaveLength(1);
            });

            test('should check if medication is expired', () => {
                const expiredMedication = new Medication({
                    batch: new MedicationBatch({
                        expirationDate: '2020-01-01T00:00:00Z'
                    })
                });

                const validMedication = new Medication({
                    batch: new MedicationBatch({
                        expirationDate: '2030-01-01T00:00:00Z'
                    })
                });

                const noExpirationMedication = new Medication({});

                expect(expiredMedication.isExpired()).toBe(true);
                expect(validMedication.isExpired()).toBe(false);
                expect(noExpirationMedication.isExpired()).toBe(false);
            });

            test('should get medication name from code', () => {
                const medicationWithText = new Medication({
                    code: new CodeableConcept({
                        text: 'Aspirin 325mg'
                    })
                });

                const medicationWithCoding = new Medication({
                    code: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://example.org' as any,
                            code: 'ASA325' as any,
                            display: 'Aspirin 325mg Tablet'
                        })]
                    })
                });

                expect(medicationWithText.getMedicationName()).toBe('Aspirin 325mg');
                expect(medicationWithCoding.getMedicationName()).toBe('Aspirin 325mg Tablet');
            });

            test('should get dose form name', () => {
                const medication = new Medication({
                    doseForm: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://snomed.info/sct' as any,
                            code: '385055001' as any,
                            display: 'Tablet'
                        })],
                        text: 'Tablet dosage form'
                    })
                });

                expect(medication.getDoseFormName()).toBe('Tablet dosage form');
            });

            test('should check if medication is prescription medication', () => {
                const prescriptionMed = new Medication({
                    marketingAuthorizationHolder: new Reference({
                        reference: 'Organization/pharma'
                    })
                });

                const otcMed = new Medication({});

                expect(prescriptionMed.isPrescriptionMedication()).toBe(true);
                expect(otcMed.isPrescriptionMedication()).toBe(false);
            });

            test('should return empty arrays for ingredients when none exist', () => {
                const medication = new Medication({});

                expect(medication.getActiveIngredients()).toEqual([]);
                expect(medication.getInactiveIngredients()).toEqual([]);
            });
        });

        describe('Static Methods', () => {
            test('should create Medication from JSON', () => {
                const json = {
                    resourceType: 'Medication',
                    id: 'from-json',
                    status: 'active',
                    code: {
                        text: 'Test Medication'
                    }
                };

                const medication = Medication.fromJson(json);
                expect(medication).toBeInstanceOf(Medication);
                expect(medication.status).toBe('active');
            });
        });

        describe('Complex Scenarios', () => {
            test('should handle complex Medication with all components', () => {
                const medication = new Medication({
                    id: 'complex-med' as any,
                    identifier: [
                        new Identifier({
                            system: 'http://example.org/medications' as any,
                            value: 'MED-COMPLEX-001'
                        }),
                        new Identifier({
                            system: 'http://hl7.org/fhir/sid/ndc' as any,
                            value: '12345-678-90'
                        })
                    ],
                    code: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://www.nlm.nih.gov/research/umls/rxnorm' as any,
                            code: '313782' as any,
                            display: 'Acetaminophen 325mg Oral Tablet'
                        })],
                        text: 'Acetaminophen 325mg Tablet'
                    }),
                    status: 'active',
                    marketingAuthorizationHolder: new Reference({
                        reference: 'Organization/pharma-company',
                        display: 'Big Pharma Inc.'
                    }),
                    doseForm: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://snomed.info/sct' as any,
                            code: '385055001' as any,
                            display: 'Tablet dose form'
                        })]
                    }),
                    totalVolume: new Quantity({
                        value: "100" as any,
                        unit: 'tablets',
                        system: 'http://unitsofmeasure.org' as any
                    }),
                    ingredient: [
                        new MedicationIngredient({
                            item: new CodeableConcept({
                                coding: [new Coding({
                                    system: 'http://www.nlm.nih.gov/research/umls/rxnorm' as any,
                                    code: '161' as any,
                                    display: 'Acetaminophen'
                                })]
                            }),
                            isActive: true,
                            strengthQuantity: new Quantity({
                                value: "325" as any,
                                unit: 'mg',
                                system: 'http://unitsofmeasure.org' as any,
                                code: 'mg' as any
                            })
                        }),
                        new MedicationIngredient({
                            item: new CodeableConcept({
                                text: 'Microcrystalline Cellulose'
                            }),
                            isActive: false
                        })
                    ],
                    batch: new MedicationBatch({
                        lotNumber: 'LOT2024-Q4-001',
                        expirationDate: '2026-12-31T23:59:59Z'
                    }),
                    definition: new Reference({
                        reference: 'MedicationKnowledge/acetaminophen-knowledge'
                    })
                });

                expect(medication.identifier).toHaveLength(2);
                expect(medication.ingredient).toHaveLength(2);
                expect(medication.getActiveIngredients()).toHaveLength(1);
                expect(medication.getInactiveIngredients()).toHaveLength(1);
                expect(medication.isValid()).toBe(true);
                expect(medication.isPrescriptionMedication()).toBe(true);
                expect(medication.isExpired()).toBe(false);

                const json = medication.toJson();
                expect(json.identifier).toHaveLength(2);
                expect(json.ingredient[0].strengthQuantity.value).toBe("325");
                expect(json.batch.lotNumber).toBe('LOT2024-Q4-001');

                console.log('Complex Medication JSON:', JSON.stringify(json, null, 2));
            });

            test('should handle different strength types in ingredients', () => {
                const medication = new Medication({
                    ingredient: [
                        new MedicationIngredient({
                            item: new CodeableConcept({ text: 'Ingredient 1' }),
                            strengthQuantity: new Quantity({ value: "100" as any, unit: 'mg' })
                        }),
                        new MedicationIngredient({
                            item: new CodeableConcept({ text: 'Ingredient 2' }),
                            strengthRatio: new Ratio({
                                numerator: new Quantity({ value: "5" as any, unit: 'mg' }),
                                denominator: new Quantity({ value: "1" as any, unit: 'mL' })
                            })
                        }),
                        new MedicationIngredient({
                            item: new CodeableConcept({ text: 'Ingredient 3' }),
                            strengthCodeableConcept: new CodeableConcept({
                                text: 'Low strength'
                            })
                        })
                    ]
                });

                expect(medication.ingredient).toHaveLength(3);
                expect(medication.isValid()).toBe(true);

                const json = medication.toJson();
                expect(json.ingredient[0].strengthQuantity).toBeDefined();
                expect(json.ingredient[1].strengthRatio).toBeDefined();
                expect(json.ingredient[2].strengthCodeableConcept).toBeDefined();
            });
        });
    });
});