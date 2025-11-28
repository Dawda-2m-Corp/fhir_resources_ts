import { z } from 'zod';
import { FhirUri, FhirString } from '../types/primitives';
import { fhirUri, fhirString } from '../validation/schemas';
import { Identifier } from './identifier';

/**
 * FHIR Reference data type
 * A reference from one resource to another
 */
export class Reference {
  reference?: FhirString; // Literal reference, Relative, internal or absolute URL
  type?: FhirUri; // Type the reference refers to (e.g. "Patient")
  identifier?: Identifier; // Logical reference, when literal reference is not known
  display?: FhirString; // Text alternative for the resource

  constructor(data: {
    reference?: FhirString;
    type?: FhirUri;
    identifier?: Identifier;
    display?: FhirString;
  } = {}) {
    this.reference = data.reference;
    this.type = data.type;
    this.identifier = data.identifier;
    this.display = data.display;
  }

  /**
   * Validation schema
   */
  static get schema(): z.ZodSchema {
    return z.object({
      reference: fhirString.optional(),
      type: fhirUri.optional(),
      identifier: z.any().optional(), // Avoid circular reference
      display: fhirString.optional(),
    }).refine((data) => {
      // Must have either reference or identifier
      return data.reference || data.identifier;
    }, {
      message: "Reference must have either reference or identifier",
    });
  }

  /**
   * Validate this Reference instance
   */
  validate(): boolean {
    try {
      Reference.schema.parse(this.toJson());
      return true;
    } catch (error) {
      console.error('Reference validation failed:', error);
      return false;
    }
  }

  /**
   * Convert to JSON
   */
  toJson(): Record<string, any> {
    const result: Record<string, any> = {};

    if (this.reference !== undefined) result.reference = this.reference;
    if (this.type !== undefined) result.type = this.type;
    if (this.identifier !== undefined) result.identifier = this.identifier.toJson();
    if (this.display !== undefined) result.display = this.display;

    return result;
  }

  /**
   * Create from JSON
   */
  static fromJson(json: Record<string, any>): Reference {
    return new Reference({
      reference: json.reference,
      type: json.type,
      identifier: json.identifier ? Identifier.fromJson(json.identifier) : undefined,
      display: json.display,
    });
  }

  /**
   * Create a simple Reference with just a reference string
   */
  static create(reference: FhirString, display?: FhirString): Reference {
    return new Reference({ reference, display });
  }

  /**
   * Create a Reference using an identifier
   */
  static createByIdentifier(identifier: Identifier, type?: FhirUri, display?: FhirString): Reference {
    return new Reference({ identifier, type, display });
  }

  /**
   * Check if this is a relative reference (not an absolute URL)
   */
  isRelative(): boolean {
    if (!this.reference) return false;
    return !this.reference.startsWith('http://') && !this.reference.startsWith('https://');
  }

  /**
   * Get the referenced resource type from the reference string
   */
  getResourceType(): string | undefined {
    if (!this.reference) return this.type;

    // Handle relative references like "Patient/123"
    const match = this.reference.match(/^([A-Za-z][A-Za-z0-9]*)\//);
    return match ? match[1] : undefined;
  }

  /**
   * Get the referenced resource ID from the reference string
   */
  getResourceId(): string | undefined {
    if (!this.reference) return undefined;

    // Handle relative references like "Patient/123" or "Patient/123/_history/2"
    const match = this.reference.match(/^[A-Za-z][A-Za-z0-9]*\/([^\/]+)/);
    return match ? match[1] : undefined;
  }

  /**
   * Get a human-readable representation
   */
  toString(): string {
    if (this.display) return this.display;
    if (this.reference) return this.reference;
    if (this.identifier) return this.identifier.toString();
    return 'Reference()';
  }
}
