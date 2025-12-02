import {
    InsurancePlan,
    InsurancePlanCoverage,
    InsurancePlanCoverageBenefit,
    InsurancePlanCoverageBenefitLimit,
    InsurancePlanPlan,
    InsurancePlanPlanGeneralCost,
    InsurancePlanPlanSpecificCost,
    InsurancePlanPlanSpecificCostBenefit,
    InsurancePlanPlanSpecificCostBenefitCost
} from '../../src/r4/insurancePlan';
import { CodeableConcept } from '../../src/r4/dataTypes/codeableConcept';
import { Reference } from '../../src/r4/reference';
import { Identifier } from '../../src/r4/identifier';
import { Period } from '../../src/r4/dataTypes/period';
import { ExtendedContactDetail } from '../../src/r4/dataTypes/extendedContactDetail';
import { Money } from '../../src/r4/dataTypes/money';
import { Quantity } from '../../src/r4/dataTypes/quantity';

describe('InsurancePlan', () => {
    describe('Basic InsurancePlan Creation', () => {
        test('should create basic InsurancePlan', () => {
            const insurancePlan = new InsurancePlan({
                id: 'basic-plan',
                status: 'active',
                name: 'Basic Health Plan'
            });

            expect(insurancePlan.resourceType).toBe('InsurancePlan');
            expect(insurancePlan.id).toBe('basic-plan');
            expect(insurancePlan.status).toBe('active');
            expect(insurancePlan.name).toBe('Basic Health Plan');
        });

        test('should create InsurancePlan with identifiers', () => {
            const insurancePlan = new InsurancePlan({
                id: 'plan-with-identifiers',
                identifier: [
                    { system: 'http://example.org/plan-ids', value: 'PLAN001' },
                    { system: 'http://example.org/legacy-ids', value: 'OLD-PLAN-001' }
                ]
            });

            expect(insurancePlan.identifier).toHaveLength(2);
            expect(insurancePlan.identifier![0]).toBeInstanceOf(Identifier);
            expect(insurancePlan.identifier![0].system).toBe('http://example.org/plan-ids');
            expect(insurancePlan.identifier![0].value).toBe('PLAN001');
        });
    });

    describe('InsurancePlan with Complex Fields', () => {
        test('should create InsurancePlan with type and period', () => {
            const insurancePlan = new InsurancePlan({
                id: 'complex-plan',
                type: [
                    {
                        coding: [{
                            system: 'http://terminology.hl7.org/CodeSystem/insurance-plan-type',
                            code: 'medical',
                            display: 'Medical'
                        }]
                    }
                ],
                period: {
                    start: '2024-01-01',
                    end: '2024-12-31'
                }
            });

            expect(insurancePlan.type).toHaveLength(1);
            expect(insurancePlan.type![0]).toBeInstanceOf(CodeableConcept);
            expect(insurancePlan.period).toBeInstanceOf(Period);
            expect(insurancePlan.period!.start).toBe('2024-01-01');
        });

        test('should create InsurancePlan with organizations', () => {
            const insurancePlan = new InsurancePlan({
                id: 'org-plan',
                ownedBy: { reference: 'Organization/insurance-corp' },
                administeredBy: { reference: 'Organization/admin-corp' },
                network: [
                    { reference: 'Organization/network1' },
                    { reference: 'Organization/network2' }
                ]
            });

            expect(insurancePlan.ownedBy).toBeInstanceOf(Reference);
            expect(insurancePlan.administeredBy).toBeInstanceOf(Reference);
            expect(insurancePlan.network).toHaveLength(2);
            expect(insurancePlan.network![0]).toBeInstanceOf(Reference);
        });
    });

    describe('InsurancePlan Coverage', () => {
        test('should create InsurancePlan with coverage', () => {
            const insurancePlan = new InsurancePlan({
                id: 'coverage-plan',
                coverage: [{
                    type: {
                        coding: [{
                            system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                            code: 'EHCPOL',
                            display: 'Extended Healthcare Policy'
                        }]
                    },
                    benefit: [{
                        type: {
                            coding: [{
                                system: 'http://terminology.hl7.org/CodeSystem/insurance-plan-benefit-type',
                                code: 'medical',
                                display: 'Medical'
                            }]
                        },
                        requirement: 'Prior authorization required',
                        limit: [{
                            value: { value: 5000, unit: 'USD' },
                            code: {
                                coding: [{
                                    system: 'http://terminology.hl7.org/CodeSystem/benefit-limit',
                                    code: 'annual',
                                    display: 'Annual limit'
                                }]
                            }
                        }]
                    }]
                }]
            });

            expect(insurancePlan.coverage).toHaveLength(1);

            const coverage = insurancePlan.coverage![0];
            expect(coverage).toBeInstanceOf(InsurancePlanCoverage);
            expect(coverage.type).toBeInstanceOf(CodeableConcept);
            expect(coverage.benefit).toHaveLength(1);

            const benefit = coverage.benefit[0];
            expect(benefit).toBeInstanceOf(InsurancePlanCoverageBenefit);
            expect(benefit.requirement).toBe('Prior authorization required');
            expect(benefit.limit).toHaveLength(1);

            const limit = benefit.limit![0];
            expect(limit).toBeInstanceOf(InsurancePlanCoverageBenefitLimit);
            expect(limit.value).toBeInstanceOf(Quantity);
            expect(limit.value!.value).toBe(5000);
        });
    });

    describe('InsurancePlan Plans', () => {
        test('should create InsurancePlan with plan details', () => {
            const insurancePlan = new InsurancePlan({
                id: 'plan-details',
                plan: [{
                    identifier: [{ system: 'http://example.org/plan-ids', value: 'SUBPLAN001' }],
                    type: {
                        coding: [{
                            system: 'http://terminology.hl7.org/CodeSystem/insurance-plan-type',
                            code: 'gold',
                            display: 'Gold Plan'
                        }]
                    },
                    generalCost: [{
                        type: {
                            coding: [{
                                system: 'http://terminology.hl7.org/CodeSystem/insurance-cost-category',
                                code: 'premium',
                                display: 'Premium'
                            }]
                        },
                        groupSize: 1,
                        cost: { value: 500, currency: 'USD' },
                        comment: 'Monthly premium for individual coverage'
                    }],
                    specificCost: [{
                        category: {
                            coding: [{
                                system: 'http://terminology.hl7.org/CodeSystem/ex-benefitcategory',
                                code: 'medical',
                                display: 'Medical Care'
                            }]
                        },
                        benefit: [{
                            type: {
                                coding: [{
                                    system: 'http://terminology.hl7.org/CodeSystem/insurance-plan-benefit-type',
                                    code: 'copay',
                                    display: 'Copay'
                                }]
                            },
                            cost: [{
                                type: {
                                    coding: [{
                                        system: 'http://terminology.hl7.org/CodeSystem/benefit-cost-type',
                                        code: 'copay',
                                        display: 'Copay'
                                    }]
                                },
                                applicability: {
                                    coding: [{
                                        system: 'http://terminology.hl7.org/CodeSystem/applicability',
                                        code: 'in-network',
                                        display: 'In Network'
                                    }]
                                },
                                value: { value: 25, currency: 'USD' }
                            }]
                        }]
                    }]
                }]
            });

            expect(insurancePlan.plan).toHaveLength(1);

            const plan = insurancePlan.plan![0];
            expect(plan).toBeInstanceOf(InsurancePlanPlan);
            expect(plan.identifier).toHaveLength(1);
            expect(plan.type).toBeInstanceOf(CodeableConcept);
            expect(plan.generalCost).toHaveLength(1);
            expect(plan.specificCost).toHaveLength(1);

            const generalCost = plan.generalCost![0];
            expect(generalCost).toBeInstanceOf(InsurancePlanPlanGeneralCost);
            expect(generalCost.groupSize).toBe(1);
            expect(generalCost.cost).toBeInstanceOf(Money);
            expect(generalCost.cost!.value).toBe(500);

            const specificCost = plan.specificCost![0];
            expect(specificCost).toBeInstanceOf(InsurancePlanPlanSpecificCost);
            expect(specificCost.benefit).toHaveLength(1);

            const specificBenefit = specificCost.benefit![0];
            expect(specificBenefit).toBeInstanceOf(InsurancePlanPlanSpecificCostBenefit);
            expect(specificBenefit.cost).toHaveLength(1);

            const benefitCost = specificBenefit.cost![0];
            expect(benefitCost).toBeInstanceOf(InsurancePlanPlanSpecificCostBenefitCost);
            expect(benefitCost.value).toBeInstanceOf(Quantity);
            expect(benefitCost.value!.value).toBe(25);
        });
    });

    describe('JSON Serialization', () => {
        test('should serialize basic InsurancePlan to JSON', () => {
            const insurancePlan = new InsurancePlan({
                id: 'json-plan',
                status: 'active',
                name: 'JSON Test Plan'
            });

            const json = insurancePlan.toJson();

            expect(json.resourceType).toBe('InsurancePlan');
            expect(json.id).toBe('json-plan');
            expect(json.status).toBe('active');
            expect(json.name).toBe('JSON Test Plan');
        });

        test('should serialize complex InsurancePlan to JSON', () => {
            const insurancePlan = new InsurancePlan({
                id: 'complex-json-plan',
                identifier: [{ system: 'http://example.org/plan-ids', value: 'COMPLEX001' }],
                status: 'active',
                type: [{ coding: [{ system: 'http://example.org/types', code: 'medical' }] }],
                name: 'Complex JSON Plan',
                alias: ['Alternative Name', 'Another Name'],
                coverage: [{
                    type: { coding: [{ system: 'http://example.org/coverage', code: 'medical' }] },
                    benefit: [{
                        type: { coding: [{ system: 'http://example.org/benefits', code: 'inpatient' }] }
                    }]
                }]
            });

            const json = insurancePlan.toJson();

            expect(json.identifier).toHaveLength(1);
            expect(json.identifier[0].system).toBe('http://example.org/plan-ids');
            expect(json.type).toHaveLength(1);
            expect(json.alias).toEqual(['Alternative Name', 'Another Name']);
            expect(json.coverage).toHaveLength(1);
            expect(json.coverage[0].benefit).toHaveLength(1);
        });
    });

    describe('XML Serialization', () => {
        test('should serialize InsurancePlan to XML', () => {
            const insurancePlan = new InsurancePlan({
                id: 'xml-plan',
                status: 'active',
                name: 'XML Test Plan'
            });

            const xml = insurancePlan.toXml();

            expect(xml).toContain('<InsurancePlan xmlns="http://hl7.org/fhir">');
            expect(xml).toContain('<id value="xml-plan"/>');
            expect(xml).toContain('<status value="active"/>');
            expect(xml).toContain('<name value="XML Test Plan"/>');
            expect(xml).toContain('</InsurancePlan>');
        });
    });

    describe('Static Methods', () => {
        test('should create InsurancePlan from JSON', () => {
            const jsonData = {
                resourceType: 'InsurancePlan',
                id: 'from-json-plan',
                status: 'active',
                name: 'From JSON Plan'
            };

            const insurancePlan = InsurancePlan.fromJson(jsonData);

            expect(insurancePlan).toBeInstanceOf(InsurancePlan);
            expect(insurancePlan.id).toBe('from-json-plan');
            expect(insurancePlan.status).toBe('active');
            expect(insurancePlan.name).toBe('From JSON Plan');
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty InsurancePlan', () => {
            const insurancePlan = new InsurancePlan({});

            expect(insurancePlan.resourceType).toBe('InsurancePlan');
            expect(insurancePlan.id).toBeUndefined();
            expect(insurancePlan.status).toBeUndefined();
        });

        test('should handle single values converted to arrays', () => {
            const insurancePlan = new InsurancePlan({
                identifier: { system: 'http://example.org/plans', value: 'SINGLE001' },
                type: { coding: [{ system: 'http://example.org/types', code: 'medical' }] },
                alias: 'Single Alias'
            });

            expect(insurancePlan.identifier).toHaveLength(1);
            expect(insurancePlan.type).toHaveLength(1);
            expect(insurancePlan.alias).toEqual(['Single Alias']);
        });
    });
});