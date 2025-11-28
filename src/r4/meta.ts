import { z } from 'zod';
import { fhirId, fhirInstant, fhirUri, fhirCanonical } from '../validation/schemas';
import { FhirId, FhirInstant, FhirUri, FhirCanonical } from '../types/primitives';

/**
 * FHIR Meta element
 * Contains metadata about the resource
 */
export class Meta {
  versionId?: FhirId;
  lastUpdated?: FhirInstant;
  source?: FhirUri;
  profile?: FhirCanonical[];
  security?: Array<{
    system?: FhirUri;
    version?: string;
    code?: string;
    display?: string;
    userSelected?: boolean;
  }>;
  tag?: Array<{
    system?: FhirUri;
    version?: string;
    code?: string;
    display?: string;
    userSelected?: boolean;
  }>;

  constructor(data: Partial<Meta> = {}) {
    if (data.versionId) this.versionId = data.versionId;
    if (data.lastUpdated) this.lastUpdated = data.lastUpdated;
    if (data.source) this.source = data.source;
    if (data.profile) this.profile = data.profile;
    if (data.security) this.security = data.security;
    if (data.tag) this.tag = data.tag;
  }

  /**
   * Validation schema
   */
  static get schema() {
    return z.object({
      versionId: fhirId.optional(),
      lastUpdated: fhirInstant.optional(),
      source: fhirUri.optional(),
      profile: z.array(fhirCanonical).optional(),
      security: z.array(z.object({
        system: fhirUri.optional(),
        version: z.string().optional(),
        code: z.string().optional(),
        display: z.string().optional(),
        userSelected: z.boolean().optional(),
      })).optional(),
      tag: z.array(z.object({
        system: fhirUri.optional(),
        version: z.string().optional(),
        code: z.string().optional(),
        display: z.string().optional(),
        userSelected: z.boolean().optional(),
      })).optional(),
    });
  }

  /**
   * Validate this Meta instance
   */
  validate(): boolean {
    try {
      Meta.schema.parse(this.toJson());
      return true;
    } catch (error) {
      console.error('Meta validation failed:', error);
      return false;
    }
  }

  /**
   * Convert to JSON
   */
  toJson(): Record<string, any> {
    const result: Record<string, any> = {};

    if (this.versionId !== undefined) result.versionId = this.versionId;
    if (this.lastUpdated !== undefined) result.lastUpdated = this.lastUpdated;
    if (this.source !== undefined) result.source = this.source;
    if (this.profile !== undefined) result.profile = this.profile;
    if (this.security !== undefined) result.security = this.security;
    if (this.tag !== undefined) result.tag = this.tag;

    return result;
  }

  /**
   * Create from JSON
   */
  static fromJson(json: Record<string, any>): Meta {
    return new Meta(json);
  }
}
