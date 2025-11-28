import { HumanName } from '../src/r4/humanName';
import { Patient } from '../src/r4/patient';


describe('FHIR Patient Resource', () => {
    test('should create a valid Patient', () => {
        const patient = new Patient({
            gender: 'male',
            name: [
                new HumanName({
                    family: 'Smith',
                    given: ['John'],
                }),
            ],
        });

        expect(patient.resourceType).toBe('Patient');
        expect(patient.gender).toBe('male');
        expect(patient.name?.[0].family).toBe('Smith');
        expect(patient.name?.[0].given).toEqual(['John']);
    });

    test('should serialize to JSON correctly', () => {
        const patient = new Patient({
            gender: 'male',
            name: [
                new HumanName({
                    family: 'Smith',
                    given: ['John'],
                }),
            ],
        });

        const json = patient.toJson();
        expect(json.resourceType).toBe('Patient');
        expect(json.gender).toBe('male');
        expect(json.name?.[0].family).toBe('Smith');
        expect(json.name?.[0].given).toEqual(['John']);
    });
    test('should deserialize from JSON correctly', () => {
        const jsonData = {
            resourceType: 'Patient',
            gender: 'male',
            name: [
                {
                    family: 'Smith',
                    given: ['John'],
                },
            ],
        };

        const patient = Patient.fromJson(jsonData);
        expect(patient.resourceType).toBe('Patient');
        expect(patient.gender).toBe('male');
        expect(patient.name?.[0].family).toBe('Smith');
        expect(patient.name?.[0].given).toEqual(['John']);
    });
});