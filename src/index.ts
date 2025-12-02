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


export * as r4 from './r4/index'
export * as r4b from './r4b/index'
export * as r5 from './r5/index'

export const VERSION = '2.0.0';
export const FHIR_VERSION = 'R4';


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