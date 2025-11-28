import { z } from 'zod';
import { FhirDateTime } from '../../types/primitives';
import { fhirDateTime } from '../../validation/schemas';

/**
 * FHIR Period data type
 * A time period defined by a start and end date/time
 */
export class Period {
  start?: FhirDateTime;
  end?: FhirDateTime;

  constructor(data: { start?: FhirDateTime; end?: FhirDateTime } = {}) {
    this.start = data.start;
    this.end = data.end;
  }

  /**
   * Validation schema
   */
  static get schema() {
    return z.object({
      start: fhirDateTime.optional(),
      end: fhirDateTime.optional(),
    }).refine((data) => {
      // If both start and end are provided, start should be before end
      if (data.start && data.end) {
        return new Date(data.start) <= new Date(data.end);
      }
      return true;
    }, {
      message: "Start date must be before or equal to end date",
    });
  }

  /**
   * Validate this Period instance
   */
  validate(): boolean {
    try {
      Period.schema.parse(this.toJson());
      return true;
    } catch (error) {
      console.error('Period validation failed:', error);
      return false;
    }
  }

  /**
   * Convert to JSON
   */
  toJson(): Record<string, any> {
    const result: Record<string, any> = {};

    if (this.start !== undefined) result.start = this.start;
    if (this.end !== undefined) result.end = this.end;

    return result;
  }

  /**
   * Create from JSON
   */
  static fromJson(json: Record<string, any>): Period {
    return new Period({
      start: json.start,
      end: json.end,
    });
  }

  /**
   * Check if this period contains a specific date
   */
  contains(date: Date | string): boolean {
    const checkDate = typeof date === 'string' ? new Date(date) : date;

    if (this.start && checkDate < new Date(this.start)) {
      return false;
    }

    if (this.end && checkDate > new Date(this.end)) {
      return false;
    }

    return true;
  }

  /**
   * Check if this period overlaps with another period
   */
  overlaps(other: Period): boolean {
    // If either period has no bounds, they overlap
    if ((!this.start && !this.end) || (!other.start && !other.end)) {
      return true;
    }

    const thisStart = this.start ? new Date(this.start) : new Date(-8640000000000000);
    const thisEnd = this.end ? new Date(this.end) : new Date(8640000000000000);
    const otherStart = other.start ? new Date(other.start) : new Date(-8640000000000000);
    const otherEnd = other.end ? new Date(other.end) : new Date(8640000000000000);

    return thisStart <= otherEnd && otherStart <= thisEnd;
  }
}
