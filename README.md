# FHIR Resources TypeScript

A comprehensive TypeScript library for FHIR R4 resources with validation, serialization, and type safety. Inspired by the Python `fhir.resources` library.

## Features

- 🔒 **Strong Type Safety**: Full TypeScript support with proper FHIR types
- ✅ **Runtime Validation**: Zod-based validation following FHIR specifications  
- 📦 **Serialization**: JSON and XML export/import capabilities
- 🏭 **Factory Pattern**: Easy resource creation from JSON data
- 🛠 **Utility Functions**: Helper methods for common FHIR operations
- 📚 **Comprehensive**: Covers all major FHIR data types and resources
- 🧪 **Well Tested**: Full test suite with Jest

## Installation

```bash
npm install fhir-resources-ts
# or
yarn add fhir-resources-ts
```

## Quick Start

### Creating Resources

```typescript
import { Account, Reference, Identifier } from 'fhir-resources-ts';

// Simple resource creation
const account = new Account({
  status: 'active',
  name: 'Patient Medical Account'
});

// Complex resource with validation
const complexAccount = new Account({
  status: 'active',
  identifier: [
    Identifier.create('http://hospital.org/accounts', 'ACC-2024-001')
  ],
  subject: [
    Reference.create('Patient/12345', 'John Doe')
  ],
  name: 'John Doe - Medical Services 2024'
});

console.log(account.validate()); // true
console.log(account.getResourceType()); // 'Account'
```

### JSON Serialization (like fhir.resources)

```typescript
// Convert to JSON (like model_dump in Python)
const json = account.toJson();

// Convert to JSON string (like model_dump_json in Python)  
const jsonString = account.toJsonString(2); // with indentation

// Create from JSON (like model_validate in Python)
const parsedAccount = Account.fromJson(jsonData);

// Create from JSON string (like model_validate_json in Python)
const accountFromString = Account.fromJsonString(jsonString);
```

### Validation

```typescript
// Validate individual resources
if (account.validate()) {
  console.log('Account is valid!');
} else {
  console.log('Account validation failed');
}

// Automatic validation during creation
try {
  const invalidAccount = new Account({
    status: 'invalid-status' // This will be caught by validation
  });
} catch (error) {
  console.error('Invalid account data');
}
```

### Factory Pattern

```typescript
import { createFhirResource, constructFhirElement } from 'fhir-resources-ts';

// Auto-detect resource type from JSON
const resource = createFhirResource({
  resourceType: 'Account',
  status: 'active',
  name: 'Test Account'
});

// Explicit resource type creation
const account = constructFhirElement('Account', accountData);
```

## Key Differences from Python fhir.resources

| Feature | Python fhir.resources | This Library |
|---------|----------------------|--------------|
| **Type System** | Pydantic models | TypeScript interfaces + Zod |
| **Validation** | `model_validate()` | `validate()` method |
| **JSON Export** | `model_dump()` | `toJson()` |
| **JSON Import** | `model_validate_json()` | `fromJsonString()` |
| **Factory** | `construct_fhir_element()` | `constructFhirElement()` |
| **Runtime Safety** | Pydantic validation | Zod schemas |

## Supported FHIR Elements

### Data Types
- ✅ **Primitives**: All FHIR primitive types with validation
- ✅ **Period**: Time periods with overlap detection
- ✅ **Coding**: Terminology codes with system validation  
- ✅ **CodeableConcept**: Concepts with multiple codings
- ✅ **Identifier**: Business identifiers with validation
- ✅ **Reference**: Resource references with type checking
- ✅ **Meta**: Resource metadata

### Resources
- ✅ **Account**: Financial tracking resource
- 🔄 **Patient**: Coming soon
- 🔄 **Organization**: Coming soon  
- 🔄 **Observation**: Coming soon

## Examples

### Working with Periods
```typescript
import { Period } from 'fhir-resources-ts';

const period = new Period({
  start: '2024-01-01T00:00:00Z',
  end: '2024-12-31T23:59:59Z'
});

// Check if date is in period
console.log(period.contains(new Date())); // true/false

// Check overlap with another period
const otherPeriod = new Period({
  start: '2024-06-01T00:00:00Z',
  end: '2025-06-01T00:00:00Z'  
});
console.log(period.overlaps(otherPeriod)); // true
```

### Working with CodeableConcepts
```typescript
import { CodeableConcept, Coding } from 'fhir-resources-ts';

const concept = new CodeableConcept({
  coding: [
    new Coding({
      system: 'http://snomed.info/sct',
      code: '386661006',
      display: 'Fever'
    })
  ],
  text: 'Patient has fever'
});

// Check for specific coding
console.log(concept.hasCoding('http://snomed.info/sct', '386661006')); // true
console.log(concept.getDisplay()); // 'Fever'
```

### Utility Functions
```typescript
import { 
  extractReferences, 
  compareFhirResources, 
  cloneFhirResource 
} from 'fhir-resources-ts';

// Extract all references from a resource
const refs = extractReferences(account);
console.log(refs); // ['Patient/123', 'Organization/456']

// Compare resources (ignoring metadata)
const areEqual = compareFhirResources(account1, account2);

// Deep clone a resource
const accountCopy = cloneFhirResource(account);
```

## Development

```bash
# Install dependencies
npm install

# Build the project  
npm run build

# Run tests
npm test

# Run examples
npm run dev

# Lint code
npm run lint

# Format code  
npm run format
```

## Architecture

This library follows the same architectural patterns as Python's `fhir.resources`:

1. **Base Classes**: `FhirResource` and `DomainResource` provide common functionality
2. **Validation**: Zod schemas ensure data integrity at runtime
3. **Serialization**: Built-in JSON/XML export with proper FHIR formatting
4. **Factory Pattern**: Easy resource creation and type detection
5. **Type Safety**: Full TypeScript support with proper FHIR types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality  
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Inspired by the excellent Python [fhir.resources](https://github.com/nazrulworld/fhir.resources) library
- Built on top of [Zod](https://zod.dev/) for runtime validation
- Follows [FHIR R4](http://hl7.org/fhir/R4/) specifications
