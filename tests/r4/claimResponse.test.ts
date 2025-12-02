import { ClaimResponse } from '../../src/r4/claimResponse';


test('Claim Response resource can be created', () => {
    const claimResponse = new ClaimResponse({
        id: "example-claimresponse",
        status: "active",
        type: {
            coding: [
                {
                    system: "http://terminology.hl7.org/CodeSystem/claim-type",
                    code: "professional",
                }
            ]
        },
        use: "claim",
        patient: {
            reference: "Patient/example"
        },
        created: "2024-01-01T00:00:00Z",
        outcome: "complete",
    });

    const json = claimResponse.toJson();
    // console.log('ClaimResponse JSON:', JSON.stringify(json, null, 2));

    expect(claimResponse.resourceType).toBe("ClaimResponse");
    expect(claimResponse.id).toBe("example-claimresponse");
    expect(claimResponse.status).toBe("active");
    expect(json.resourceType).toBe("ClaimResponse");
    expect(json.id).toBe("example-claimresponse");
});

test('ClaimResponse with complex fields can be created', () => {
    const claimResponse = new ClaimResponse({
        id: "complex-claimresponse",
        status: "active",
        type: {
            coding: [{
                system: "http://terminology.hl7.org/CodeSystem/claim-type",
                code: "professional"
            }]
        },
        use: "claim",
        patient: {
            reference: "Patient/example"
        },
        created: "2024-01-01T00:00:00Z",
        outcome: "complete",
        // Test new complex fields
        payeeType: {
            coding: [{
                system: "http://terminology.hl7.org/CodeSystem/payeetype",
                code: "provider"
            }]
        },
        total: [{
            category: {
                coding: [{
                    system: "http://terminology.hl7.org/CodeSystem/adjudication",
                    code: "submitted"
                }]
            },
            amount: {
                value: 1000.00,
                currency: "USD"
            }
        }],
        payment: {
            type: {
                coding: [{
                    system: "http://terminology.hl7.org/CodeSystem/ex-paymenttype",
                    code: "complete"
                }]
            },
            amount: {
                value: 950.00,
                currency: "USD"
            },
            date: "2024-01-15"
        },
        item: [{
            itemSequence: 1,
            adjudication: [{
                category: {
                    coding: [{
                        system: "http://terminology.hl7.org/CodeSystem/adjudication",
                        code: "eligible"
                    }]
                },
                amount: {
                    value: 800.00,
                    currency: "USD"
                }
            }]
        }]
    });

    const json = claimResponse.toJson();
    // console.log('Complex ClaimResponse JSON:', JSON.stringify(json, null, 2));

    expect(claimResponse.resourceType).toBe("ClaimResponse");
    expect(json.payeeType).toBeDefined();
    expect(json.total).toHaveLength(1);
    expect(json.payment).toBeDefined();
    expect(json.payment.amount.value).toBe(950.00);
    expect(json.item).toHaveLength(1);
    expect(json.item[0].adjudication).toHaveLength(1);
});