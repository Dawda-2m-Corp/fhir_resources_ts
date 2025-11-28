import { z } from 'zod';
import { FhirResourceType, Extension } from '../types/primitives';
import { elementSchema, fhirId, fhirUri, fhirCode } from '../validation/schemas';
import { Meta } from './meta';

/**
 * Base FHIR Resource class following FHIR R4 specification
 * Equivalent to FHIRAbstractModel in fhir.resources
 */
export abstract class FhirResource {
  abstract resourceType: FhirResourceType;
  id?: string;
  meta?: Meta;
  implicitRules?: string;
  language?: string;

  constructor(data: Partial<FhirResource> = {}) {
    if (data.id) this.id = data.id;
    if (data.meta) this.meta = data.meta;
    if (data.implicitRules) this.implicitRules = data.implicitRules;
    if (data.language) this.language = data.language;
  }

  /**
   * Get the resource type
   */
  getResourceType(): FhirResourceType {
    return this.resourceType;
  }

  /**
   * Validate the resource using Zod schema
   */
  protected validateWithSchema(schema: z.ZodSchema): boolean {
    try {
      schema.parse(this.toJson());
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation errors:', error.errors);
      }
      return false;
    }
  }

  /**
   * Basic validation - override in subclasses
   */
  validate(): boolean {
    return true; // Override in subclasses
  }

  /**
   * Convert to JSON (like model_dump in Pydantic)
   */
  toJson(): Record<string, any> {
    const result: Record<string, any> = {
      resourceType: this.resourceType,
    };

    if (this.id !== undefined) result.id = this.id;
    if (this.meta !== undefined) result.meta = this.meta.toJson();
    if (this.implicitRules !== undefined) result.implicitRules = this.implicitRules;
    if (this.language !== undefined) result.language = this.language;

    return result;
  }

  /**
   * Convert to JSON string (like model_dump_json in Pydantic)
   */
  toJsonString(indent?: number): string {
    return JSON.stringify(this.toJson(), null, indent);
  }

  // Static methods moved to individual resource classes to avoid inheritance conflicts

  /**
   * Basic XML serialization (simplified)
   */
  toXml(): string {
    const json = this.toJson();
    return this.jsonToXml(json, this.resourceType);
  }

  private jsonToXml(obj: any, rootName?: string): string {
    let xml = '';

    if (rootName) {
      xml += `<${rootName} xmlns="http://hl7.org/fhir">`;
    }

    for (const [key, value] of Object.entries(obj)) {
      if (key === 'resourceType') continue;

      if (Array.isArray(value)) {
        value.forEach(item => {
          xml += this.jsonToXml(item, key);
        });
      } else if (typeof value === 'object' && value !== null) {
        xml += `<${key}>${this.jsonToXml(value)}</${key}>`;
      } else {
        xml += `<${key} value="${value}"/>`;
      }
    }

    if (rootName) {
      xml += `</${rootName}>`;
    }

    return xml;
  }
}

/**
 * Domain Resource base class for resources with text and extension support
 */
export abstract class DomainResource extends FhirResource {
  text?: {
    status: 'generated' | 'extensions' | 'additional' | 'empty';
    div: string;
  };
  contained?: FhirResource[];
  extension?: Extension[];
  modifierExtension?: Extension[];

  constructor(data: Partial<DomainResource> = {}) {
    super(data);
    if (data.text) this.text = data.text;
    if (data.contained) this.contained = data.contained;
    if (data.extension) this.extension = data.extension;
    if (data.modifierExtension) this.modifierExtension = data.modifierExtension;
  }

  toJson(): Record<string, any> {
    const result = super.toJson();

    if (this.text !== undefined) result.text = this.text;
    if (this.contained !== undefined) result.contained = this.contained.map(r => r.toJson());
    if (this.extension !== undefined) result.extension = this.extension;
    if (this.modifierExtension !== undefined) result.modifierExtension = this.modifierExtension;

    return result;
  }
}
