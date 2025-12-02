# FHIR Resources TypeScript

A comprehensive TypeScript library for FHIR R4 resources with validation, serialization, and type safety. Inspired by the Python `fhir.resources` library.

### Use Case

```js
import { Patient } from 'fhir_resources_ts/r5/patient';
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
```

The library is messing under construction. Contributions are welcome! but this is just for prototyping and experimenting.
