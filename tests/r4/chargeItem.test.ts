import { ChargeItem } from '../../src/r4/chargeItem';
import { FhirCode, FhirDateTime, FhirId, FhirString, FhirUri } from '../../src/r4/dataTypes';


test('ChargeItem resource can be created', () => {
    const chargeItem = new ChargeItem({
        id: "example-chargeitem" as FhirId,
        status: "billable" as FhirCode,
        code: {
            coding: [
                {
                    system: "http://example.org/fhir/CodeSystem/chargeitem-billingcodes" as FhirUri,
                    code: "12345" as FhirCode,
                }
            ]
        },
        subject: {
            reference: "Patient/example" as FhirString
        },
        occurrenceDateTime: "2024-01-01T10:00:00Z" as FhirDateTime,
        quantity: {
            value: "1" as any,
            unit: "service" as any
        },
        note: [
            {
                text: "This is a test charge item." as any
            }
        ]
    });

    // console.log('ChargeItem JSON:', JSON.stringify(chargeItem.toJson(), null, 2));

    expect(chargeItem.resourceType).toBe("ChargeItem");
    expect(chargeItem.id).toBe("example-chargeitem");
    expect(chargeItem.status).toBe("billable");
});