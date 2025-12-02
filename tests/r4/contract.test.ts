import { Contract } from '../../src/r4/contract';
import { FhirCode, FhirDateTime, FhirId, FhirString, FhirUri } from '../../src/r4/dataTypes';


test('Contract resource can be created', () => {
    const contract = new Contract({
        id: "example-contract" as FhirId,
        status: "active" as FhirCode,
        legalState: {
            coding: [
                {
                    system: "http://terminology.hl7.org/CodeSystem/contract-legal-state" as FhirUri,
                    code: "active" as FhirCode,
                } as any
            ]
        } as any,
        subject: [
            {
                reference: "Patient/example" as FhirString
            } as any
        ],
        issued: "2024-01-01T00:00:00Z" as FhirDateTime,
        term: [
            {
                offer: {
                    type: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/contract-term-type" as FhirUri,
                                code: "offer" as FhirCode,
                            } as any
                        ]
                    } as any,
                    text: "This is the offer text of the contract term." as FhirString
                } as any,
                identifier: {
                    system: "http://example.org/contract-terms" as FhirUri,
                    value: "term-1" as FhirString
                } as any,
                issued: "2024-01-01T00:00:00Z" as FhirDateTime,
                applies: {
                    reference: "Organization/example" as FhirString
                } as any,
                asset: [
                    {
                        type: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/contract-asset-type" as FhirUri,
                                    code: "resource" as FhirCode,
                                } as any
                            ]
                        } as any,
                        description: "Contracted resource description" as FhirString,
                        linkId: ["link-1" as FhirString]
                    } as any
                ]
            } as any
        ]
    });

    // console.log('Contract JSON:', JSON.stringify(contract.toJson(), null, 2));

    expect(contract.resourceType).toBe("Contract");
    expect(contract.id).toBe("example-contract");
    expect(contract.status).toBe("active");
});