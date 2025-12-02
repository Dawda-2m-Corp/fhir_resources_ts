import { Invoice, InvoiceLineItem } from '../../src/r4/invoice';


test('Invoice serialization', () => {
    const invoice = new Invoice({
        id: 'inv001',
        status: 'issued',
        type: {
            coding: [{
                system: 'http://terminology.hl7.org/CodeSystem/invoice-type',
                code: 'professional'
            }]
        },
        subject: {
            reference: 'Patient/pat001'
        },
        issuer: {
            reference: 'Organization/org001'
        },
        lineItem: [
            {
                sequence: 1,
                serviceDate: '2024-06-01',
                chargeItemReference: {
                    reference: 'ChargeItem/ci001'
                }
            }
        ],
        totalGross: {
            value: 150.00,
            currency: 'USD'
        },
        paymentTerms: 'Payment due within 30 days'
    });

    const json = invoice.toJson();
    // console.log('Invoice JSON:', JSON.stringify(json, null, 2));
    expect(invoice.status).toBe('issued');
    expect(json.resourceType).toBe('Invoice');
    expect(json.id).toBe('inv001');
});