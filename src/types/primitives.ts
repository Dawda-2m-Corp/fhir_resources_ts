/**
 * FHIR Primitive Data Types with proper TypeScript typing
 * Based on FHIR R4 specification
 */

export type FhirId = string;
export type FhirInstant = string; // ISO 8601 datetime
export type FhirUri = string;
export type FhirCanonical = string;
export type FhirCode = string;
export type FhirDateTime = string; // ISO 8601 datetime
export type FhirDate = string; // YYYY-MM-DD
export type FhirTime = string; // HH:MM:SS
export type FhirDecimal = number;
export type FhirInteger = number;
export type FhirPositiveInt = number;
export type FhirUnsignedInt = number;
export type FhirBase64Binary = string;
export type FhirBoolean = boolean;
export type FhirString = string;
export type FhirMarkdown = string;
export type FhirOid = string;
export type FhirUrl = string;
export type FhirUuid = string;

/**
 * Type for FHIR Extensions
 */
export interface Extension {
    id?: FhirString;
    extension?: Extension[];
    url: FhirUri;
    valueBoolean?: FhirBoolean;
    valueInteger?: FhirInteger;
    valueString?: FhirString;
    valueDecimal?: FhirDecimal;
    valueUri?: FhirUri;
    valueUrl?: FhirUrl;
    valueCanonical?: FhirCanonical;
    valueBase64Binary?: FhirBase64Binary;
    valueInstant?: FhirInstant;
    valueDate?: FhirDate;
    valueDateTime?: FhirDateTime;
    valueTime?: FhirTime;
    valueCode?: FhirCode;
    valueOid?: FhirOid;
    valueUuid?: FhirUuid;
    valueId?: FhirId;
    valueMarkdown?: FhirMarkdown;
}

/**
 * Common element properties
 */
export interface Element {
    id?: FhirString;
    extension?: Extension[];
}

/**
 * Resource types enum for type safety
 */
export type FhirResourceType =
    | 'Account'
    | 'ActivityDefinition'
    | 'Patient'
    | 'Organization'
    | 'Practitioner'
    | 'Observation'
    | 'Condition'
    | 'MedicationRequest'
    // Add more as needed
    ;