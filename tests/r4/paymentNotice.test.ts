import { PaymentNotice, PaymentNoticeConstructorData } from '../../src/r4/paymentNotice';
import { Identifier } from '../../src/r4/identifier';
import { Reference } from '../../src/r4/reference';
import { CodeableConcept } from '../../src/r4/dataTypes/codeableConcept';
import { Money } from '../../src/r4/dataTypes/money';

describe('PaymentNotice', () => {
    describe('Basic PaymentNotice Creation', () => {
        test('should create basic PaymentNotice with required fields', () => {
            const paymentNotice = new PaymentNotice({
                status: 'active',
                created: '2024-12-01T10:00:00Z',
                recipient: {
                    reference: 'Organization/example-insurance'
                },
                amount: {
                    value: 1500.00,
                    currency: 'USD'
                }
            });

            expect(paymentNotice.resourceType).toBe('PaymentNotice');
            expect(paymentNotice.status).toBe('active');
            expect(paymentNotice.created).toBe('2024-12-01T10:00:00Z');
            expect(paymentNotice.recipient).toBeInstanceOf(Reference);
            expect(paymentNotice.recipient.reference).toBe('Organization/example-insurance');
            expect(paymentNotice.amount).toBeInstanceOf(Money);
            expect(paymentNotice.amount.value).toBe(1500.00);
        });

        test('should create PaymentNotice with identifiers', () => {
            const paymentNotice = new PaymentNotice({
                identifier: [{
                    system: 'http://example.org/payment-notices',
                    value: 'PN-001'
                }],
                status: 'active',
                created: '2024-12-01T10:00:00Z',
                recipient: {
                    reference: 'Organization/example-org'
                },
                amount: {
                    value: 2000.50,
                    currency: 'USD'
                }
            });

            expect(paymentNotice.identifier).toHaveLength(1);
            expect(paymentNotice.identifier![0]).toBeInstanceOf(Identifier);
            expect(paymentNotice.identifier![0].value).toBe('PN-001');
        });
    });

    describe('PaymentNotice with Complex Properties', () => {
        test('should create PaymentNotice with all optional fields', () => {
            const paymentNotice = new PaymentNotice({
                identifier: [{
                    system: 'http://example.org/payment-notices',
                    value: 'PN-COMPLEX-001'
                }],
                status: 'active',
                request: {
                    reference: 'Claim/example-claim-123'
                },
                response: {
                    reference: 'ClaimResponse/example-response-456'
                },
                created: '2024-12-01T14:30:00Z',
                reporter: {
                    reference: 'Practitioner/dr-smith'
                },
                payment: {
                    reference: 'PaymentReconciliation/payment-recon-789'
                },
                paymentDate: '2024-12-01',
                payee: {
                    reference: 'Organization/provider-clinic'
                },
                recipient: {
                    reference: 'Organization/insurance-company'
                },
                amount: {
                    value: 5000.00,
                    currency: 'USD'
                },
                paymentStatus: {
                    coding: [{
                        system: 'http://terminology.hl7.org/CodeSystem/paymentstatus',
                        code: 'paid',
                        display: 'Paid'
                    }]
                }
            });

            expect(paymentNotice.request).toBeInstanceOf(Reference);
            expect(paymentNotice.request!.reference).toBe('Claim/example-claim-123');
            expect(paymentNotice.response).toBeInstanceOf(Reference);
            expect(paymentNotice.response!.reference).toBe('ClaimResponse/example-response-456');
            expect(paymentNotice.reporter).toBeInstanceOf(Reference);
            expect(paymentNotice.reporter!.reference).toBe('Practitioner/dr-smith');
            expect(paymentNotice.payment).toBeInstanceOf(Reference);
            expect(paymentNotice.payment!.reference).toBe('PaymentReconciliation/payment-recon-789');
            expect(paymentNotice.paymentDate).toBe('2024-12-01');
            expect(paymentNotice.payee).toBeInstanceOf(Reference);
            expect(paymentNotice.payee!.reference).toBe('Organization/provider-clinic');
            expect(paymentNotice.paymentStatus).toBeInstanceOf(CodeableConcept);
        });

        test('should create PaymentNotice with different status values', () => {
            const activeNotice = new PaymentNotice({
                status: 'active',
                created: '2024-12-01T10:00:00Z',
                recipient: { reference: 'Organization/test' },
                amount: { value: 100, currency: 'USD' }
            });

            const cancelledNotice = new PaymentNotice({
                status: 'cancelled',
                created: '2024-12-01T10:00:00Z',
                recipient: { reference: 'Organization/test' },
                amount: { value: 200, currency: 'USD' }
            });

            const draftNotice = new PaymentNotice({
                status: 'draft',
                created: '2024-12-01T10:00:00Z',
                recipient: { reference: 'Organization/test' },
                amount: { value: 300, currency: 'USD' }
            });

            const errorNotice = new PaymentNotice({
                status: 'entered-in-error',
                created: '2024-12-01T10:00:00Z',
                recipient: { reference: 'Organization/test' },
                amount: { value: 400, currency: 'USD' }
            });

            expect(activeNotice.status).toBe('active');
            expect(cancelledNotice.status).toBe('cancelled');
            expect(draftNotice.status).toBe('draft');
            expect(errorNotice.status).toBe('entered-in-error');
        });
    });

    describe('JSON Serialization', () => {
        test('should serialize basic PaymentNotice to JSON', () => {
            const paymentNotice = new PaymentNotice({
                id: 'example-payment-notice',
                status: 'active',
                created: '2024-12-01T15:00:00Z',
                recipient: {
                    reference: 'Organization/example-recipient'
                },
                amount: {
                    value: 750.00,
                    currency: 'USD'
                }
            });

            const json = paymentNotice.toJson();

            expect(json.resourceType).toBe('PaymentNotice');
            expect(json.id).toBe('example-payment-notice');
            expect(json.status).toBe('active');
            expect(json.created).toBe('2024-12-01T15:00:00Z');
            expect(json.recipient.reference).toBe('Organization/example-recipient');
            expect(json.amount.value).toBe(750.00);
            expect(json.amount.currency).toBe('USD');
        });

        test('should serialize complex PaymentNotice to JSON', () => {
            const paymentNotice = new PaymentNotice({
                id: 'complex-payment-notice',
                identifier: [
                    {
                        system: 'http://example.org/payment-notices',
                        value: 'PN-COMPLEX-123'
                    },
                    {
                        system: 'http://another.org/notices',
                        value: 'ALT-PN-456'
                    }
                ],
                status: 'active',
                request: {
                    reference: 'Claim/claim-789'
                },
                response: {
                    reference: 'ClaimResponse/response-101112'
                },
                created: '2024-12-01T16:45:00Z',
                reporter: {
                    reference: 'Practitioner/practitioner-567'
                },
                payment: {
                    reference: 'PaymentReconciliation/recon-131415'
                },
                paymentDate: '2024-11-30',
                payee: {
                    reference: 'Organization/payee-org'
                },
                recipient: {
                    reference: 'Organization/recipient-org'
                },
                amount: {
                    value: 12500.75,
                    currency: 'USD'
                },
                paymentStatus: {
                    coding: [{
                        system: 'http://terminology.hl7.org/CodeSystem/paymentstatus',
                        code: 'cleared',
                        display: 'Cleared'
                    }],
                    text: 'Payment cleared successfully'
                }
            });

            const json = paymentNotice.toJson();
            console.log('Complex PaymentNotice JSON:', JSON.stringify(json, null, 2));

            expect(json.resourceType).toBe('PaymentNotice');
            expect(json.identifier).toHaveLength(2);
            expect(json.identifier[0].value).toBe('PN-COMPLEX-123');
            expect(json.identifier[1].value).toBe('ALT-PN-456');
            expect(json.status).toBe('active');
            expect(json.request.reference).toBe('Claim/claim-789');
            expect(json.response.reference).toBe('ClaimResponse/response-101112');
            expect(json.created).toBe('2024-12-01T16:45:00Z');
            expect(json.reporter.reference).toBe('Practitioner/practitioner-567');
            expect(json.payment.reference).toBe('PaymentReconciliation/recon-131415');
            expect(json.paymentDate).toBe('2024-11-30');
            expect(json.payee.reference).toBe('Organization/payee-org');
            expect(json.recipient.reference).toBe('Organization/recipient-org');
            expect(json.amount.value).toBe(12500.75);
            expect(json.paymentStatus.text).toBe('Payment cleared successfully');
        });
    });

    describe('XML Serialization', () => {
        test('should serialize PaymentNotice to XML', () => {
            const paymentNotice = new PaymentNotice({
                id: 'xml-payment-notice',
                status: 'active',
                created: '2024-12-01T17:00:00Z',
                recipient: {
                    reference: 'Organization/xml-recipient'
                },
                amount: {
                    value: 999.99,
                    currency: 'USD'
                }
            });

            const xml = paymentNotice.toXml();

            expect(xml).toContain('<PaymentNotice');
            expect(xml).toContain('id="xml-payment-notice"');
            expect(xml).toContain('<status value="active"/>');
            expect(xml).toContain('<created value="2024-12-01T17:00:00Z"/>');
            expect(xml).toContain('<recipient>');
            expect(xml).toContain('<amount>');
            expect(xml).toContain('</PaymentNotice>');
        });

        test('should serialize complex PaymentNotice to XML', () => {
            const paymentNotice = new PaymentNotice({
                id: 'xml-complex',
                identifier: [{
                    value: 'XML-PN-001'
                }],
                status: 'active',
                request: {
                    reference: 'Claim/xml-claim'
                },
                created: '2024-12-01T18:00:00Z',
                paymentDate: '2024-11-29',
                recipient: {
                    reference: 'Organization/xml-org'
                },
                amount: {
                    value: 3333.33,
                    currency: 'USD'
                }
            });

            const xml = paymentNotice.toXml();

            expect(xml).toContain('<identifier>');
            expect(xml).toContain('<request>');
            expect(xml).toContain('<paymentDate value="2024-11-29"/>');
        });
    });

    describe('Static Methods', () => {
        test('should create PaymentNotice from JSON', () => {
            const json = {
                resourceType: 'PaymentNotice',
                id: 'from-json-notice',
                status: 'active',
                created: '2024-12-01T19:00:00Z',
                recipient: {
                    reference: 'Organization/json-recipient'
                },
                amount: {
                    value: 8888.88,
                    currency: 'USD'
                }
            };

            const paymentNotice = PaymentNotice.fromJson(json);

            expect(paymentNotice).toBeInstanceOf(PaymentNotice);
            expect(paymentNotice.resourceType).toBe('PaymentNotice');
            expect((paymentNotice as any).id).toBe('from-json-notice');
            expect(paymentNotice.status).toBe('active');
            expect(paymentNotice.created).toBe('2024-12-01T19:00:00Z');
            expect(paymentNotice.recipient).toBeInstanceOf(Reference);
            expect(paymentNotice.amount).toBeInstanceOf(Money);
        });
    });

    describe('Edge Cases and Validation', () => {
        test('should handle PaymentNotice with minimal required fields', () => {
            const paymentNotice = new PaymentNotice({
                status: 'draft',
                created: '2024-12-01T20:00:00Z',
                recipient: {
                    reference: 'Organization/minimal-org'
                },
                amount: {
                    value: 0.01,
                    currency: 'USD'
                }
            });

            expect(paymentNotice.resourceType).toBe('PaymentNotice');
            expect(paymentNotice.status).toBe('draft');
            expect(paymentNotice.identifier).toBeUndefined();
            expect(paymentNotice.request).toBeUndefined();
            expect(paymentNotice.response).toBeUndefined();
        });

        test('should handle single identifier converted to array', () => {
            const paymentNotice = new PaymentNotice({
                identifier: {
                    system: 'http://example.org/single',
                    value: 'SINGLE-ID'
                } as any,
                status: 'active',
                created: '2024-12-01T21:00:00Z',
                recipient: {
                    reference: 'Organization/single-org'
                },
                amount: {
                    value: 555.55,
                    currency: 'USD'
                }
            });

            expect(paymentNotice.identifier).toHaveLength(1);
            expect(paymentNotice.identifier![0]).toBeInstanceOf(Identifier);
            expect(paymentNotice.identifier![0].value).toBe('SINGLE-ID');
        });

        test('should handle different currency values', () => {
            const usdNotice = new PaymentNotice({
                status: 'active',
                created: '2024-12-01T22:00:00Z',
                recipient: { reference: 'Organization/usd-org' },
                amount: { value: 1000, currency: 'USD' }
            });

            const eurNotice = new PaymentNotice({
                status: 'active',
                created: '2024-12-01T22:00:00Z',
                recipient: { reference: 'Organization/eur-org' },
                amount: { value: 850, currency: 'EUR' }
            });

            expect(usdNotice.amount.currency).toBe('USD');
            expect(eurNotice.amount.currency).toBe('EUR');
        });

        test('should handle large payment amounts', () => {
            const paymentNotice = new PaymentNotice({
                status: 'active',
                created: '2024-12-01T23:00:00Z',
                recipient: {
                    reference: 'Organization/large-payment-org'
                },
                amount: {
                    value: 999999999.99,
                    currency: 'USD'
                }
            });

            expect(paymentNotice.amount.value).toBe(999999999.99);
        });
    });
});