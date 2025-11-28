import { z } from 'zod';
import { FhirCode, FhirUri, FhirString } from '../types/primitives';
import { fhirCode, fhirUri, fhirString } from '../validation/schemas';
import { CodeableConcept } from './data_types/codeableConcept';
import { Period } from './data_types/period';
import { Reference } from './reference';

/**
 * FHIR Identifier data type
 * An identifier intended for computation
 */
export class Identifier {
  use?: FhirCode; // usual | official | temp | secondary | old
  type?: CodeableConcept;
  system?: FhirUri;
  value?: FhirString;
  period?: Period;
  assigner?: Reference;

  constructor(data: {
    use?: FhirCode;
    type?: CodeableConcept;
    system?: FhirUri;
    value?: FhirString;
    period?: Period;
    assigner?: Reference;
  } = {}) {
    this.use = data.use;
    this.type = data.type;
    this.system = data.system;
    this.value = data.value;
    this.period = data.period;
    this.assigner = data.assigner;
  }

  /**
   * Validation schema
   */
  static get schema(): z.ZodSchema {
    return z.object({
      use: z.enum(['usual', 'official', 'temp', 'secondary', 'old']).optional(),
      type: z.any().optional(), // Avoid circular reference
      system: fhirUri.optional(),
      value: fhirString.optional(),
      period: z.any().optional(), // Avoid circular reference
      assigner: z.any().optional(), // Avoid circular reference
    });
  }

  /**
   * Validate this Identifier instance
   */
  validate(): boolean {
    try {
      Identifier.schema.parse(this.toJson());
      return true;
    } catch (error) {
      console.error('Identifier validation failed:', error);
      return false;
    }
  }

  /**
   * Convert to JSON
   */
  toJson(): Record<string, any> {
    const result: Record<string, any> = {};

    if (this.use !== undefined) result.use = this.use;
    if (this.type !== undefined) result.type = this.type.toJson();
    if (this.system !== undefined) result.system = this.system;
    if (this.value !== undefined) result.value = this.value;
    if (this.period !== undefined) result.period = this.period.toJson();
    if (this.assigner !== undefined) result.assigner = this.assigner.toJson();

    return result;
  }

  /**
   * Create from JSON
   */
  static fromJson(json: Record<string, any>): Identifier {
    return new Identifier({
      use: json.use,
      type: json.type ? CodeableConcept.fromJson(json.type) : undefined,
      system: json.system,
      value: json.value,
      period: json.period ? Period.fromJson(json.period) : undefined,
      assigner: json.assigner ? Reference.fromJson(json.assigner) : undefined,
    });
  }

  /**
   * Create a simple Identifier with system and value
   */
  static create(system: FhirUri, value: FhirString, use?: FhirCode): Identifier {
    return new Identifier({ system, value, use });
  }

  /**
   * Check if this identifier matches another (same system and value)
   */
  matches(other: Identifier): boolean {
    return this.system === other.system && this.value === other.value;
  }

  /**
   * Check if this identifier is currently valid (period check)
   */
  isValid(date: Date = new Date()): boolean {
    if (!this.period) return true;
    return this.period.contains(date);
  }

  /**
   * Get a human-readable representation
   */
  toString(): string {
    const parts: string[] = [];

    if (this.system) parts.push(`system: ${this.system}`);
    if (this.value) parts.push(`value: ${this.value}`);
    if (this.use) parts.push(`use: ${this.use}`);

    return `Identifier(${parts.join(', ')})`;
  }
}
