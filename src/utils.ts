import { FhirResource } from './r4/baseResource';

/**
 * Utility functions for FHIR resources
 */

/**
 * Convert FHIR resource to JSON with optional formatting
 * @param resource The FHIR resource to convert
 * @param indent Optional indentation for pretty-printing
 * @returns JSON string representation
 */
export function convertFhirResourceObjectToJson(
    resource: FhirResource,
    indent?: number
): string {
    return resource.toJsonString(indent);
}

/**
 * Validate a FHIR resource
 * @param resource The FHIR resource to validate
 * @returns True if valid, false otherwise
 */
export function validateFhirResource(resource: any): boolean {
    return typeof resource.validate === 'function' ? resource.validate() : false;
}/**
 * Deep clone a FHIR resource
 * @param resource The resource to clone
 * @returns A new instance with the same data
 */
export function cloneFhirResource<T extends FhirResource>(resource: T): T {
    const json = resource.toJson();
    return (resource.constructor as any).fromJson(json);
}

/**
 * Compare two FHIR resources for equality (ignoring metadata)
 * @param resource1 First resource
 * @param resource2 Second resource
 * @returns True if resources are equivalent
 */
export function compareFhirResources(
    resource1: FhirResource,
    resource2: FhirResource
): boolean {
    if (resource1.resourceType !== resource2.resourceType) {
        return false;
    }

    const json1 = { ...resource1.toJson() };
    const json2 = { ...resource2.toJson() };

    // Remove metadata that shouldn't affect equality
    delete json1.meta;
    delete json2.meta;
    delete json1.id;
    delete json2.id;

    return JSON.stringify(json1) === JSON.stringify(json2);
}

/**
 * Extract all references from a FHIR resource
 * @param resource The resource to analyze
 * @returns Array of reference strings found in the resource
 */
export function extractReferences(resource: FhirResource): string[] {
    const references: string[] = [];
    const json = resource.toJson();

    function findReferences(obj: any, path: string = ''): void {
        if (obj && typeof obj === 'object') {
            if (Array.isArray(obj)) {
                obj.forEach((item, index) => {
                    findReferences(item, `${path}[${index}]`);
                });
            } else {
                if (obj.reference && typeof obj.reference === 'string') {
                    references.push(obj.reference);
                }

                Object.keys(obj).forEach(key => {
                    findReferences(obj[key], path ? `${path}.${key}` : key);
                });
            }
        }
    }

    findReferences(json);
    return [...new Set(references)]; // Remove duplicates
}

/**
 * Get the version from resource metadata
 * @param resource The FHIR resource
 * @returns Version ID if available
 */
export function getResourceVersion(resource: FhirResource): string | undefined {
    return resource.meta?.versionId;
}

/**
 * Get the last updated timestamp from resource metadata
 * @param resource The FHIR resource
 * @returns Last updated timestamp if available
 */
export function getLastUpdated(resource: FhirResource): string | undefined {
    return resource.meta?.lastUpdated;
}
