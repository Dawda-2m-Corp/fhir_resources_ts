import { z } from 'zod';
import { FhirUri, FhirCode, FhirString } from '../../types/primitives';
import { fhirUri, fhirCode, fhirString } from '../../validation/schemas';

/**
 * FHIR Coding data type
 * A reference to a code defined by a terminology system
 */
export class Coding {
  system?: FhirUri;
  version?: FhirString;
  code?: FhirCode;
  display?: FhirString;
  userSelected?: boolean;

  constructor(data: {
    system?: FhirUri;
    version?: FhirString;
    code?: FhirCode;
    display?: FhirString;
    userSelected?: boolean;
  } = {}) {
    this.system = data.system;
    this.version = data.version;
    this.code = data.code;
    this.display = data.display;
    this.userSelected = data.userSelected;
  }

  /**
   * Validation schema
   */
  static get schema() {
    return z.object({
      system: fhirUri.optional(),
      version: fhirString.optional(),
      code: fhirCode.optional(),
      display: fhirString.optional(),
      userSelected: z.boolean().optional(),
    });
  }

  /**
   * Validate this Coding instance
   */
  validate(): boolean {
    try {
      Coding.schema.parse(this.toJson());
      return true;
    } catch (error) {
      console.error('Coding validation failed:', error);
      return false;
    }
  }

  /**
   * Convert to JSON
   */
  toJson(): Record<string, any> {
    const result: Record<string, any> = {};

    if (this.system !== undefined) result.system = this.system;
    if (this.version !== undefined) result.version = this.version;
    if (this.code !== undefined) result.code = this.code;
    if (this.display !== undefined) result.display = this.display;
    if (this.userSelected !== undefined) result.userSelected = this.userSelected;

    return result;
  }

  /**
   * Create from JSON
   */
  static fromJson(json: Record<string, any>): Coding {
    return new Coding({
      system: json.system,
      version: json.version,
      code: json.code,
      display: json.display,
      userSelected: json.userSelected,
    });
  }

  /**
   * Create a simple Coding with system and code
   */
  static create(system: FhirUri, code: FhirCode, display?: FhirString): Coding {
    return new Coding({ system, code, display });
  }

  /**
   * Check if this coding matches another (same system and code)
   */
  matches(other: Coding): boolean {
    return this.system === other.system && this.code === other.code;
  }

  /**
   * Check if this coding is from the given system
   */
  isFromSystem(system: FhirUri): boolean {
    return this.system === system;
  }

  /**
   * Get a human-readable representation
   */
  toString(): string {
    const parts: string[] = [];

    if (this.system) parts.push(`system: ${this.system}`);
    if (this.code) parts.push(`code: ${this.code}`);
    if (this.display) parts.push(`display: ${this.display}`);

    return `Coding(${parts.join(', ')})`;
  }
}
