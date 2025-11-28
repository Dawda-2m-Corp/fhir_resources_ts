import { z } from 'zod';
import { FhirString } from '../../types/primitives';
import { fhirString } from '../../validation/schemas';
import { Coding } from './coding';

/**
 * FHIR CodeableConcept data type
 * A concept that may be defined by a formal reference to a terminology or ontology
 * or may be provided by text
 */
export class CodeableConcept {
  coding?: Coding[];
  text?: FhirString;

  constructor(data: { coding?: Coding[]; text?: FhirString } = {}) {
    this.coding = data.coding;
    this.text = data.text;
  }

  /**
   * Validation schema
   */
  static get schema() {
    return z.object({
      coding: z.array(z.any()).optional(), // Avoid circular reference with Coding
      text: fhirString.optional(),
    }).refine((data) => {
      // Must have at least coding or text
      return (data.coding && data.coding.length > 0) || data.text;
    }, {
      message: "CodeableConcept must have either coding or text",
    });
  }

  /**
   * Validate this CodeableConcept instance
   */
  validate(): boolean {
    try {
      CodeableConcept.schema.parse(this.toJson());
      return true;
    } catch (error) {
      console.error('CodeableConcept validation failed:', error);
      return false;
    }
  }

  /**
   * Convert to JSON
   */
  toJson(): Record<string, any> {
    const result: Record<string, any> = {};

    if (this.coding !== undefined && this.coding.length > 0) {
      result.coding = this.coding.map(c => c.toJson());
    }
    if (this.text !== undefined) result.text = this.text;

    return result;
  }

  /**
   * Create from JSON
   */
  static fromJson(json: Record<string, any>): CodeableConcept {
    return new CodeableConcept({
      coding: json.coding?.map((c: any) => Coding.fromJson(c)),
      text: json.text,
    });
  }

  /**
   * Create a simple CodeableConcept with just text
   */
  static fromText(text: FhirString): CodeableConcept {
    return new CodeableConcept({ text });
  }

  /**
   * Create a CodeableConcept from a single coding
   */
  static fromCoding(coding: Coding, text?: FhirString): CodeableConcept {
    return new CodeableConcept({
      coding: [coding],
      text,
    });
  }

  /**
   * Check if this concept has a coding with the given system and code
   */
  hasCoding(system: string, code: string): boolean {
    return this.coding?.some(c => c.system === system && c.code === code) || false;
  }

  /**
   * Get the first coding that matches the given system
   */
  getCodingBySystem(system: string): Coding | undefined {
    return this.coding?.find(c => c.system === system);
  }

  /**
   * Get display text - prefers coding display over text
   */
  getDisplay(): string | undefined {
    // Try to get display from the first coding
    if (this.coding && this.coding.length > 0 && this.coding[0].display) {
      return this.coding[0].display;
    }

    // Fall back to text
    return this.text;
  }
}
