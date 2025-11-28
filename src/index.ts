/**
 * FHIR Resources TypeScript Library
 * 
 * A comprehensive TypeScript library for FHIR R4 resources with:
 * - Strong typing with TypeScript
 * - Runtime validation with Zod
 * - Serialization/deserialization support
 * - Utility functions for common operations
 * 
 * Inspired by the Python fhir.resources library
 */

// Core exports
export * from './types/primitives';
export * from './validation/schemas';

// Base classes
export { FhirResource, DomainResource } from './r4/baseResource';

// Data types
export { Meta } from './r4/meta';
export { Period } from './r4/data_types/period';
export { Coding } from './r4/data_types/coding';
export { CodeableConcept } from './r4/data_types/codeableConcept';
export { Identifier } from './r4/identifier';
export { Reference } from './r4/reference';

// Resources
export { Account, AccountCoverage, AccountGuarantor } from './r4/account';

// Factory functions
export {
    constructFhirElement,
    createFhirResource,
    isSupportedResourceType,
    getSupportedResourceTypes
} from './r4/factory';

// Utility functions
export {
    convertFhirResourceObjectToJson,
    validateFhirResource,
    cloneFhirResource,
    compareFhirResources,
    extractReferences,
    getResourceVersion,
    getLastUpdated
} from './utils';

// Version and library info
export const VERSION = '2.0.0';
export const FHIR_VERSION = 'R4';

/**
 * Library information
 */
export const LIBRARY_INFO = {
    name: 'fhir-resources-ts',
    version: VERSION,
    fhirVersion: FHIR_VERSION,
    description: 'TypeScript FHIR Resources library with validation and serialization',
    features: [
        'Strong TypeScript typing',
        'Runtime validation with Zod',
        'JSON serialization/deserialization',
        'XML export support',
        'Utility functions',
        'Factory pattern for resource creation'
    ]
} as const;