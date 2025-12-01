import { FhirId } from '../../src/r4/dataTypes';
import { Patient } from '../../src/r4/patient';


test('Patient resource can be created', () => {
    const patient = new Patient({
        id: "example" as FhirId,
        active: true,
        name: [
            {
                family: "Doe",
                given: ["John"]
            }
        ]
    });

    // console.log('Patient JSON:', JSON.stringify(patient.toJson(), null, 2));

    expect(patient.resourceType).toBe("Patient");
    expect(patient.id).toBe("example");
    expect(patient.active).toBe(true);
});