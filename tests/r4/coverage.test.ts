import { Coverage } from '../../src/r4/coverage';


test('Coverage resource can be created', () => {
    const coverage = new Coverage({
        id: "example-coverage",
        status: "active",
        kind: "insurance",
        type: {
            coding: [{
                system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                code: "EHCPOL"
            }]
        },
        beneficiary: {
            reference: "Patient/example"
        },
        relationship: {
            coding: [{
                system: "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
                code: "self"
            }]
        },
        period: {
            start: "2024-01-01",
            end: "2024-12-31"
        },
        insurer: {
            reference: "Organization/example-insurance"
        },
        class: [{
            type: {
                coding: [{
                    system: "http://terminology.hl7.org/CodeSystem/coverage-class",
                    code: "group"
                }]
            },
            value: {
                system: "http://example.org/group-ids",
                value: "12345"
            },
            name: "Corporate Health Plan"
        }]
    });

    const json = coverage.toJson();
    // console.log('Coverage JSON:', JSON.stringify(json, null, 2));

    expect(coverage.resourceType).toBe("Coverage");
    expect(coverage.id).toBe("example-coverage");
    expect(coverage.status).toBe("active");
    expect(coverage.kind).toBe("insurance");
    expect(json.resourceType).toBe("Coverage");
    expect(json.beneficiary.reference).toBe("Patient/example");
});

test('Coverage with complex fields can be created', () => {
    const coverage = new Coverage({
        id: "complex-coverage",
        status: "active",
        kind: "insurance",
        paymentBy: [{
            party: {
                reference: "Organization/employer"
            },
            responsibility: "Primary payer"
        }],
        type: {
            coding: [{
                system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                code: "HIP"
            }]
        },
        subscriber: {
            reference: "Patient/subscriber"
        },
        beneficiary: {
            reference: "Patient/beneficiary"
        },
        dependent: "01",
        period: {
            start: "2024-01-01",
            end: "2024-12-31"
        },
        costToBeneficiary: [{
            type: {
                coding: [{
                    system: "http://terminology.hl7.org/CodeSystem/coverage-copay-type",
                    code: "copay"
                }]
            },
            valueMoney: {
                value: 25.00,
                currency: "USD"
            },
            exception: [{
                type: {
                    coding: [{
                        system: "http://terminology.hl7.org/CodeSystem/ex-coverage-financial-exception",
                        code: "retired"
                    }]
                },
                period: {
                    start: "2024-06-01",
                    end: "2024-12-31"
                }
            }]
        }],
        order: 1,
        network: "Blue Network",
        subrogation: false
    });

    const json = coverage.toJson();
    // console.log('Complex Coverage JSON:', JSON.stringify(json, null, 2));

    expect(coverage.resourceType).toBe("Coverage");
    expect(json.paymentBy).toHaveLength(1);
    expect(json.costToBeneficiary).toHaveLength(1);
    expect(json.costToBeneficiary[0].valueMoney.value).toBe(25.00);
    expect(json.costToBeneficiary[0].exception).toHaveLength(1);
    expect(json.order).toBe(1);
    expect(json.subrogation).toBe(false);
});