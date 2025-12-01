import { Claim } from '../../src/r4/claim';
import { FhirCode, FhirId, FhirString, FhirUri } from '../../src/r4/dataTypes';


test('Claim resource can be created', () => {
    const claim = new Claim({
        id: "example-claim" as FhirId,
        status: "active" as FhirCode,
        user: "patient" as FhirCode,
        type: {
            coding: [
                {
                    system: "http://terminology.hl7.org/CodeSystem/claim-type" as FhirUri,
                    code: "professional" as FhirCode,
                }
            ]
        },
        patient: {
            reference: "Patient/example" as FhirString
        },
        insurer: {
            reference: "Organization/insurer" as FhirString
        },
        provider: {
            reference: "Practitioner/provider" as FhirString
        }
    });

    // console.log('Claim JSON:', JSON.stringify(claim.toJson(), null, 2));

    expect(claim.resourceType).toBe("Claim");
    expect(claim.status).toBe("active");
    expect(claim.user).toBe("patient");
});