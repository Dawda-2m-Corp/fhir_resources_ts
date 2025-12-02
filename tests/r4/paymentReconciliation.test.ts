import {
    PaymentReconciliation,
    PaymentReconciliationAllocation,
    PaymentReconciliationProcessNote,
    Money
} from '../../src/r4/paymentReconciliation';
import { Identifier } from '../../src/r4/identifier';
import { Reference } from '../../src/r4/reference';
import { CodeableConcept } from '../../src/r4/dataTypes/codeableConcept';
import { Coding } from '../../src/r4/dataTypes/coding';
import { Period } from '../../src/r4/dataTypes/period';

describe('PaymentReconciliation Resource Tests', () => {
    describe('Money Tests', () => {
        test('should create Money with value and currency', () => {
            const money = new Money({
                value: 1500.50,
                currency: 'USD'
            });

            expect(money.value).toBe(1500.50);
            expect(money.currency).toBe('USD');
        });

        test('should serialize Money to JSON correctly', () => {
            const money = new Money({
                value: 250.75,
                currency: 'EUR'
            });

            const json = money.toJson();
            expect(json.value).toBe(250.75);
            expect(json.currency).toBe('EUR');
        });

        test('should create empty Money', () => {
            const money = new Money({});

            expect(money.value).toBeUndefined();
            expect(money.currency).toBeUndefined();
        });
    });

    describe('PaymentReconciliationProcessNote Tests', () => {
        test('should create ProcessNote with type and text', () => {
            const note = new PaymentReconciliationProcessNote({
                type: 'display',
                text: 'Payment processed successfully'
            });

            expect(note.type).toBe('display');
            expect(note.text).toBe('Payment processed successfully');
        });

        test('should create ProcessNote with print type', () => {
            const note = new PaymentReconciliationProcessNote({
                type: 'print',
                text: 'Include in printed report'
            });

            expect(note.type).toBe('print');
            expect(note.text).toBe('Include in printed report');
        });

        test('should serialize ProcessNote to JSON', () => {
            const note = new PaymentReconciliationProcessNote({
                type: 'printoper',
                text: 'Operator instructions'
            });

            const json = note.toJson();
            expect(json.type).toBe('printoper');
            expect(json.text).toBe('Operator instructions');
        });
    });

    describe('PaymentReconciliationAllocation Tests', () => {
        test('should create Allocation with basic properties', () => {
            const allocation = new PaymentReconciliationAllocation({
                identifier: new Identifier({
                    system: 'http://example.org/payments' as any,
                    value: 'ALLOC-001'
                }),
                target: new Reference({
                    reference: 'Claim/claim-123'
                }),
                amount: new Money({
                    value: 500.00,
                    currency: 'USD'
                })
            });

            expect(allocation.identifier).toBeInstanceOf(Identifier);
            expect(allocation.target).toBeInstanceOf(Reference);
            expect(allocation.amount).toBeInstanceOf(Money);
        });

        test('should create Allocation from object data', () => {
            const allocation = new PaymentReconciliationAllocation({
                identifier: {
                    system: 'http://example.org' as any,
                    value: 'ALLOC-002'
                } as any,
                target: {
                    reference: 'Invoice/invoice-456'
                } as any,
                amount: {
                    value: 750.25,
                    currency: 'EUR'
                }
            });

            expect(allocation.identifier).toBeInstanceOf(Identifier);
            expect(allocation.target).toBeInstanceOf(Reference);
            expect(allocation.amount).toBeInstanceOf(Money);
        });

        test('should handle targetItem union types', () => {
            const allocation1 = new PaymentReconciliationAllocation({
                targetItemString: 'line-item-1'
            });

            const allocation2 = new PaymentReconciliationAllocation({
                targetItemIdentifier: new Identifier({
                    system: 'http://example.org/items' as any,
                    value: 'ITEM-001'
                })
            });

            const allocation3 = new PaymentReconciliationAllocation({
                targetItemPositiveInt: 5
            });

            expect(allocation1.targetItemString).toBe('line-item-1');
            expect(allocation2.targetItemIdentifier).toBeInstanceOf(Identifier);
            expect(allocation3.targetItemPositiveInt).toBe(5);
        });

        test('should validate targetItem exclusivity', () => {
            const validAllocation = new PaymentReconciliationAllocation({
                targetItemString: 'item-1'
            });

            const invalidAllocation = new PaymentReconciliationAllocation({
                targetItemString: 'item-1',
                targetItemPositiveInt: 2
            });

            expect(validAllocation.isValid()).toBe(true);
            expect(invalidAllocation.isValid()).toBe(false);
        });

        test('should get targetItem value regardless of type', () => {
            const allocation1 = new PaymentReconciliationAllocation({
                targetItemString: 'string-item'
            });

            const allocation2 = new PaymentReconciliationAllocation({
                targetItemPositiveInt: 42
            });

            const allocation3 = new PaymentReconciliationAllocation({});

            expect(allocation1.getTargetItem()).toBe('string-item');
            expect(allocation2.getTargetItem()).toBe(42);
            expect(allocation3.getTargetItem()).toBeUndefined();
        });

        test('should serialize Allocation to JSON correctly', () => {
            const allocation = new PaymentReconciliationAllocation({
                identifier: new Identifier({
                    system: 'http://example.org' as any,
                    value: 'ALLOC-TEST'
                }),
                target: new Reference({
                    reference: 'Claim/test-claim'
                }),
                targetItemString: 'test-item',
                amount: new Money({
                    value: 100.00,
                    currency: 'USD'
                })
            });

            const json = allocation.toJson();
            expect(json.identifier).toBeDefined();
            expect(json.target).toBeDefined();
            expect(json.targetItemString).toBe('test-item');
            expect(json.amount).toBeDefined();
        });
    });

    describe('PaymentReconciliation Resource Tests', () => {
        describe('Constructor and Basic Properties', () => {
            test('should create minimal PaymentReconciliation', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    type: new CodeableConcept({
                        text: 'Payment'
                    }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({
                        value: 1000.00,
                        currency: 'USD'
                    })
                });

                expect(paymentReconciliation.resourceType).toBe('PaymentReconciliation');
                expect(paymentReconciliation.status).toBe('active');
            });

            test('should create PaymentReconciliation with all properties', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    id: 'payment-recon-123' as any,
                    identifier: [new Identifier({
                        system: 'http://example.org/payments' as any,
                        value: 'PAY-RECON-001'
                    })],
                    type: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://terminology.hl7.org/CodeSystem/payment-type' as any,
                            code: 'payment' as any,
                            display: 'Payment'
                        })]
                    }),
                    status: 'active',
                    kind: new CodeableConcept({
                        text: 'Provider payment'
                    }),
                    period: new Period({
                        start: '2023-11-01',
                        end: '2023-11-30'
                    }),
                    created: '2023-12-01T10:30:00Z',
                    enterer: new Reference({
                        reference: 'Practitioner/practitioner-123'
                    }),
                    outcome: 'complete',
                    date: '2023-12-01',
                    amount: new Money({
                        value: 5000.00,
                        currency: 'USD'
                    })
                });

                expect(paymentReconciliation.identifier).toHaveLength(1);
                expect(paymentReconciliation.type).toBeInstanceOf(CodeableConcept);
                expect(paymentReconciliation.period).toBeInstanceOf(Period);
                expect(paymentReconciliation.enterer).toBeInstanceOf(Reference);
                expect(paymentReconciliation.outcome).toBe('complete');
            });

            test('should handle array and single object inputs', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    identifier: {
                        system: 'http://example.org' as any,
                        value: 'ID-001'
                    } as any,
                    allocation: {
                        target: {
                            reference: 'Claim/claim-1'
                        },
                        amount: {
                            value: 100.00,
                            currency: 'USD'
                        }
                    } as any,
                    processNote: {
                        type: 'display',
                        text: 'Test note'
                    } as any,
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 100.00, currency: 'USD' })
                });

                expect(paymentReconciliation.identifier).toHaveLength(1);
                expect(paymentReconciliation.allocation).toHaveLength(1);
                expect(paymentReconciliation.processNote).toHaveLength(1);
            });
        });

        describe('Validation', () => {
            test('should validate PaymentReconciliation with required fields', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                expect(paymentReconciliation.isValid()).toBe(true);
            });

            test('should invalidate PaymentReconciliation with missing required fields', () => {
                const paymentReconciliation1 = new PaymentReconciliation({
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                    // Missing type
                });

                expect(paymentReconciliation1.isValid()).toBe(false);
            });

            test('should validate status enum values', () => {
                const validPayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'cancelled',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                const invalidPayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'invalid-status' as any,
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                expect(validPayment.isValid()).toBe(true);
                expect(invalidPayment.isValid()).toBe(false);
            });

            test('should validate outcome enum values', () => {
                const validPayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    outcome: 'partial',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                const invalidPayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    outcome: 'invalid-outcome' as any,
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                expect(validPayment.isValid()).toBe(true);
                expect(invalidPayment.isValid()).toBe(false);
            });

            test('should validate date formats', () => {
                const validPayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    expirationDate: '2024-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                const invalidPayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: 'invalid-date',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                expect(validPayment.isValid()).toBe(true);
                expect(invalidPayment.isValid()).toBe(false);
            });

            test('should validate allocation constraints', () => {
                const validPayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' }),
                    allocation: [
                        new PaymentReconciliationAllocation({
                            targetItemString: 'item-1'
                        })
                    ]
                });

                const invalidPayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' }),
                    allocation: [
                        new PaymentReconciliationAllocation({
                            targetItemString: 'item-1',
                            targetItemPositiveInt: 2 // Invalid - multiple targetItems
                        })
                    ]
                });

                expect(validPayment.isValid()).toBe(true);
                expect(invalidPayment.isValid()).toBe(false);
            });
        });

        describe('Utility Methods', () => {
            test('should get allocation amounts', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' }),
                    allocation: [
                        new PaymentReconciliationAllocation({
                            amount: new Money({ value: 300.00, currency: 'USD' })
                        }),
                        new PaymentReconciliationAllocation({
                            amount: new Money({ value: 500.00, currency: 'USD' })
                        }),
                        new PaymentReconciliationAllocation({
                            // No amount
                        })
                    ]
                });

                const amounts = paymentReconciliation.getAllocationAmounts();
                expect(amounts).toHaveLength(2);
                expect(amounts[0].value).toBe(300.00);
                expect(amounts[1].value).toBe(500.00);
            });

            test('should calculate total allocated amount', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' }),
                    allocation: [
                        new PaymentReconciliationAllocation({
                            amount: new Money({ value: 250.75, currency: 'USD' })
                        }),
                        new PaymentReconciliationAllocation({
                            amount: new Money({ value: 749.25, currency: 'USD' })
                        })
                    ]
                });

                const total = paymentReconciliation.getTotalAllocatedAmount();
                expect(total).toBe(1000.00);
            });

            test('should check if payment is complete', () => {
                const completePayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    outcome: 'complete',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                const incompletePayment = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    outcome: 'partial',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                expect(completePayment.isPaymentComplete()).toBe(true);
                expect(incompletePayment.isPaymentComplete()).toBe(false);
            });

            test('should get allocations by type', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' }),
                    allocation: [
                        new PaymentReconciliationAllocation({
                            type: new CodeableConcept({
                                coding: [new Coding({
                                    system: 'http://example.org' as any,
                                    code: 'copay' as any
                                })]
                            })
                        }),
                        new PaymentReconciliationAllocation({
                            type: new CodeableConcept({
                                coding: [new Coding({
                                    system: 'http://example.org' as any,
                                    code: 'deductible' as any
                                })]
                            })
                        }),
                        new PaymentReconciliationAllocation({
                            type: new CodeableConcept({
                                coding: [new Coding({
                                    system: 'http://example.org' as any,
                                    code: 'copay' as any
                                })]
                            })
                        })
                    ]
                });

                const copayAllocations = paymentReconciliation.getAllocationsByType('copay');
                expect(copayAllocations).toHaveLength(2);

                const deductibleAllocations = paymentReconciliation.getAllocationsByType('deductible');
                expect(deductibleAllocations).toHaveLength(1);
            });

            test('should get payment method name', () => {
                const paymentWithText = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' }),
                    method: new CodeableConcept({
                        text: 'Credit Card'
                    })
                });

                const paymentWithCoding = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' }),
                    method: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://example.org' as any,
                            code: 'CC' as any,
                            display: 'Credit Card Payment'
                        })]
                    })
                });

                expect(paymentWithText.getPaymentMethodName()).toBe('Credit Card');
                expect(paymentWithCoding.getPaymentMethodName()).toBe('Credit Card Payment');
            });

            test('should check if payment has card details', () => {
                const paymentWithCard = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' }),
                    cardBrand: 'Visa',
                    accountNumber: '**** 1234',
                    expirationDate: '2025-12'
                });

                const paymentWithoutCard = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                expect(paymentWithCard.hasCardDetails()).toBe(true);
                expect(paymentWithoutCard.hasCardDetails()).toBe(false);
            });

            test('should get process notes by type', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' }),
                    processNote: [
                        new PaymentReconciliationProcessNote({
                            type: 'display',
                            text: 'Display note 1'
                        }),
                        new PaymentReconciliationProcessNote({
                            type: 'print',
                            text: 'Print note 1'
                        }),
                        new PaymentReconciliationProcessNote({
                            type: 'display',
                            text: 'Display note 2'
                        })
                    ]
                });

                const displayNotes = paymentReconciliation.getProcessNotesByType('display');
                const printNotes = paymentReconciliation.getProcessNotesByType('print');
                const operNotes = paymentReconciliation.getProcessNotesByType('printoper');

                expect(displayNotes).toHaveLength(2);
                expect(printNotes).toHaveLength(1);
                expect(operNotes).toHaveLength(0);
            });

            test('should return empty arrays when no allocations or notes exist', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                expect(paymentReconciliation.getAllocationAmounts()).toEqual([]);
                expect(paymentReconciliation.getTotalAllocatedAmount()).toBe(0);
                expect(paymentReconciliation.getAllocationsByType('any')).toEqual([]);
                expect(paymentReconciliation.getProcessNotesByType('display')).toEqual([]);
            });
        });

        describe('JSON Serialization', () => {
            test('should serialize minimal PaymentReconciliation to JSON', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    type: new CodeableConcept({ text: 'Payment' }),
                    status: 'active',
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                const json = paymentReconciliation.toJson();
                expect(json.resourceType).toBe('PaymentReconciliation');
                expect(json.status).toBe('active');
                expect(json.amount).toBeDefined();
            });

            test('should serialize complete PaymentReconciliation to JSON', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    id: 'complex-payment' as any,
                    status: 'active',
                    type: new CodeableConcept({ text: 'Payment' }),
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1500.00, currency: 'USD' }),
                    allocation: [new PaymentReconciliationAllocation({
                        amount: new Money({ value: 750.00, currency: 'USD' })
                    })],
                    processNote: [new PaymentReconciliationProcessNote({
                        type: 'display',
                        text: 'Test note'
                    })]
                });

                const json = paymentReconciliation.toJson();
                expect(json.resourceType).toBe('PaymentReconciliation');
                expect(json.allocation).toHaveLength(1);
                expect(json.processNote).toHaveLength(1);
            });
        });

        describe('XML Serialization', () => {
            test('should serialize PaymentReconciliation to XML', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    id: 'xml-test' as any,
                    status: 'active',
                    type: new CodeableConcept({ text: 'Payment' }),
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: new Money({ value: 1000.00, currency: 'USD' })
                });

                const xml = paymentReconciliation.toXml();
                expect(xml).toContain('<PaymentReconciliation>');
                expect(xml).toContain('<resourceType value="PaymentReconciliation"/>');
                expect(xml).toContain('<id value="xml-test"/>');
                expect(xml).toContain('<status value="active"/>');
                expect(xml).toContain('</PaymentReconciliation>');
            });
        });

        describe('Static Methods', () => {
            test('should create PaymentReconciliation from JSON', () => {
                const json = {
                    resourceType: 'PaymentReconciliation',
                    id: 'from-json',
                    status: 'active',
                    type: { text: 'Payment' },
                    created: '2023-12-01T10:00:00Z',
                    date: '2023-12-01',
                    amount: { value: 1000.00, currency: 'USD' }
                };

                const paymentReconciliation = PaymentReconciliation.fromJson(json);
                expect(paymentReconciliation).toBeInstanceOf(PaymentReconciliation);
                expect(paymentReconciliation.status).toBe('active');
            });
        });

        describe('Complex Scenarios', () => {
            test('should handle comprehensive PaymentReconciliation with all components', () => {
                const paymentReconciliation = new PaymentReconciliation({
                    id: 'comprehensive-payment' as any,
                    identifier: [
                        new Identifier({
                            system: 'http://example.org/payments' as any,
                            value: 'PAY-RECON-COMP-001'
                        })
                    ],
                    type: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://terminology.hl7.org/CodeSystem/payment-type' as any,
                            code: 'payment' as any,
                            display: 'Payment'
                        })],
                        text: 'Provider Payment'
                    }),
                    status: 'active',
                    kind: new CodeableConcept({
                        text: 'Insurance Payment'
                    }),
                    period: new Period({
                        start: '2023-11-01',
                        end: '2023-11-30'
                    }),
                    created: '2023-12-01T10:30:00Z',
                    enterer: new Reference({
                        reference: 'Practitioner/practitioner-123',
                        display: 'Dr. Smith'
                    }),
                    paymentIssuer: new Reference({
                        reference: 'Organization/insurance-company'
                    }),
                    outcome: 'complete',
                    disposition: 'Payment processed successfully',
                    date: '2023-12-01',
                    method: new CodeableConcept({
                        coding: [new Coding({
                            system: 'http://terminology.hl7.org/CodeSystem/payment-method' as any,
                            code: 'ACH' as any,
                            display: 'Automated Clearing House'
                        })]
                    }),
                    processor: 'Payment Processor Inc.',
                    referenceNumber: 'REF123456789',
                    authorization: 'AUTH987654321',
                    tenderedAmount: new Money({
                        value: 5500.00,
                        currency: 'USD'
                    }),
                    returnedAmount: new Money({
                        value: 500.00,
                        currency: 'USD'
                    }),
                    amount: new Money({
                        value: 5000.00,
                        currency: 'USD'
                    }),
                    paymentIdentifier: new Identifier({
                        system: 'http://example.org/payment-ids' as any,
                        value: 'PAY-ID-001'
                    }),
                    allocation: [
                        new PaymentReconciliationAllocation({
                            identifier: new Identifier({
                                system: 'http://example.org/allocations' as any,
                                value: 'ALLOC-001'
                            }),
                            target: new Reference({
                                reference: 'Claim/claim-123'
                            }),
                            targetItemString: 'line-item-1',
                            type: new CodeableConcept({
                                text: 'Primary payment'
                            }),
                            amount: new Money({
                                value: 3000.00,
                                currency: 'USD'
                            })
                        }),
                        new PaymentReconciliationAllocation({
                            target: new Reference({
                                reference: 'Claim/claim-456'
                            }),
                            targetItemPositiveInt: 2,
                            type: new CodeableConcept({
                                text: 'Secondary payment'
                            }),
                            amount: new Money({
                                value: 2000.00,
                                currency: 'USD'
                            })
                        })
                    ],
                    formCode: new CodeableConcept({
                        text: 'Standard payment form'
                    }),
                    processNote: [
                        new PaymentReconciliationProcessNote({
                            type: 'display',
                            text: 'Payment includes adjustments for prior period'
                        }),
                        new PaymentReconciliationProcessNote({
                            type: 'print',
                            text: 'Include in EOB report'
                        })
                    ]
                });

                expect(paymentReconciliation.identifier).toHaveLength(1);
                expect(paymentReconciliation.allocation).toHaveLength(2);
                expect(paymentReconciliation.processNote).toHaveLength(2);
                expect(paymentReconciliation.isValid()).toBe(true);
                expect(paymentReconciliation.isPaymentComplete()).toBe(true);
                expect(paymentReconciliation.hasCardDetails()).toBe(false);
                expect(paymentReconciliation.getTotalAllocatedAmount()).toBe(5000.00);

                const json = paymentReconciliation.toJson();
                expect(json.allocation).toHaveLength(2);
                expect(json.processNote).toHaveLength(2);
                expect(json.amount.value).toBe(5000.00);

                console.log('Comprehensive PaymentReconciliation JSON:', JSON.stringify(json, null, 2));
            });
        });
    });
});