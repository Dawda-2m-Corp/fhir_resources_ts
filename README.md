# FHIR Resources TypeScript

A comprehensive TypeScript library for FHIR R4 resources with validation, serialization, and type safety. Inspired by the Python `fhir.resources` library.

### Use Case

```js
import { Patient } from 'fhir_resources_ts/r4/patient';
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

 console.log('Patient JSON:', JSON.stringify(patient.toJson(), null, 2));
```
