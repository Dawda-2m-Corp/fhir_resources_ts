import { HumanName } from '../../src/r4/dataTypes/humanName';
import { FhirId } from '../../src/r4b';
import { Patient } from '../../src/r5/patient'

test('Patient resource can be created', () => {
    const patient = new Patient({
        resourceType: 'Patient',
        id: "example" as FhirId,
        active: true,
        name: [
            new HumanName({
                family: "Doe",
                given: ["John"]
            })
        ],
        toJson: () => ({}),
        toXml: () => ''
    } as Patient);

    // console.log('Patient JSON:', JSON.stringify(patient.toJson(), null, 2));

    expect(patient.resourceType).toBe("Patient");
    expect(patient.id).toBe("example");
    expect(patient.active).toBe(true);
});