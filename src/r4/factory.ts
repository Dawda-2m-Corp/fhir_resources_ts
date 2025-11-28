/**
 * Base factory function for creating FHIR resources from JSON
 * Similar to fhir.resources.construct_fhir_element
 */

import { FhirResource } from './baseResource';
import { Account } from './account';
// Import other resources as they are implemented

type FhirResourceClass = typeof FhirResource & {
    fromJson: (json: Record<string, any>) => FhirResource;
};

/**
 * Registry of FHIR resource types to their classes
 */
const RESOURCE_REGISTRY: Record<string, FhirResourceClass> = {
    'Account': Account as any,
    // Add other resources here as they are implemented
};

/**
 * Create a FHIR resource from JSON data
 * @param resourceType The FHIR resource type
 * @param data The JSON data (object, string, or file path)
 * @returns The created FHIR resource instance
 */
export function constructFhirElement(
    resourceType: string,
    data: Record<string, any> | string
): FhirResource {
    const ResourceClass = RESOURCE_REGISTRY[resourceType];

    if (!ResourceClass) {
        throw new Error(`Unknown FHIR resource type: ${resourceType}`);
    }

    // Handle different input types
    let jsonData: Record<string, any>;

    if (typeof data === 'string') {
        try {
            jsonData = JSON.parse(data);
        } catch (error) {
            throw new Error(`Invalid JSON string: ${error}`);
        }
    } else {
        jsonData = data;
    }

    // Validate resourceType matches
    if (jsonData.resourceType && jsonData.resourceType !== resourceType) {
        throw new Error(
            `Resource type mismatch: expected ${resourceType}, got ${jsonData.resourceType}`
        );
    }

    return ResourceClass.fromJson(jsonData);
}

/**
 * Auto-detect resource type from JSON and create the resource
 * @param data The JSON data with resourceType field
 * @returns The created FHIR resource instance
 */
export function createFhirResource(
    data: Record<string, any> | string
): FhirResource {
    let jsonData: Record<string, any>;

    if (typeof data === 'string') {
        try {
            jsonData = JSON.parse(data);
        } catch (error) {
            throw new Error(`Invalid JSON string: ${error}`);
        }
    } else {
        jsonData = data;
    }

    if (!jsonData.resourceType) {
        throw new Error('JSON data must have a resourceType field');
    }

    return constructFhirElement(jsonData.resourceType, jsonData);
}

/**
 * Validate if a resource type is supported
 * @param resourceType The resource type to check
 * @returns True if supported, false otherwise
 */
export function isSupportedResourceType(resourceType: string): boolean {
    return resourceType in RESOURCE_REGISTRY;
}

/**
 * Get list of all supported resource types
 * @returns Array of supported resource type names
 */
export function getSupportedResourceTypes(): string[] {
    return Object.keys(RESOURCE_REGISTRY);
}