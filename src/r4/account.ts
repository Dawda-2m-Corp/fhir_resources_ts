import { z } from 'zod';
import { DomainResource } from './baseResource';
import { FhirCode, FhirString, FhirPositiveInt } from '../types/primitives';
import { fhirCode, fhirString, fhirPositiveInt } from '../validation/schemas';
import { CodeableConcept } from './data_types/codeableConcept';
import { Period } from './data_types/period';
import { Identifier } from './identifier';
import { Reference } from './reference';
import { Meta } from './meta';

/**
 * Account Coverage - tracks the party responsible for an account
 */
export class AccountCoverage {
  coverage: Reference;
  priority?: FhirPositiveInt;

  constructor(data: { coverage: Reference; priority?: FhirPositiveInt }) {
    this.coverage = data.coverage;
    this.priority = data.priority;
  }

  static get schema() {
    return z.object({
      coverage: Reference.schema,
      priority: fhirPositiveInt.optional(),
    });
  }

  toJson(): Record<string, any> {
    const result: Record<string, any> = {
      coverage: this.coverage.toJson(),
    };

    if (this.priority !== undefined) result.priority = this.priority;
    return result;
  }

  static fromJson(json: Record<string, any>): AccountCoverage {
    return new AccountCoverage({
      coverage: Reference.fromJson(json.coverage),
      priority: json.priority,
    });
  }
}

/**
 * Account Guarantor - parties responsible for balancing the account
 */
export class AccountGuarantor {
  party: Reference;
  onHold?: boolean;
  period?: Period;

  constructor(data: { party: Reference; onHold?: boolean; period?: Period }) {
    this.party = data.party;
    this.onHold = data.onHold;
    this.period = data.period;
  }

  static get schema() {
    return z.object({
      party: Reference.schema,
      onHold: z.boolean().optional(),
      period: Period.schema.optional(),
    });
  }

  toJson(): Record<string, any> {
    const result: Record<string, any> = {
      party: this.party.toJson(),
    };

    if (this.onHold !== undefined) result.onHold = this.onHold;
    if (this.period !== undefined) result.period = this.period.toJson();
    return result;
  }

  static fromJson(json: Record<string, any>): AccountGuarantor {
    return new AccountGuarantor({
      party: Reference.fromJson(json.party),
      onHold: json.onHold,
      period: json.period ? Period.fromJson(json.period) : undefined,
    });
  }
}

/**
 * FHIR Account Resource
 * A financial tool for tracking value accrued for a particular purpose
 */
export class Account extends DomainResource {
  resourceType: 'Account' = 'Account';
  identifier?: Identifier[];
  status: FhirCode; // Required: active | inactive | entered-in-error | on-hold | unknown
  type?: CodeableConcept;
  name?: FhirString;
  subject?: Reference[];
  servicePeriod?: Period;
  coverage?: AccountCoverage[];
  owner?: Reference;
  description?: FhirString;
  guarantor?: AccountGuarantor[];
  partOf?: Reference;

  constructor(data: {
    status: FhirCode;
    identifier?: Identifier[];
    type?: CodeableConcept;
    name?: FhirString;
    subject?: Reference[];
    servicePeriod?: Period;
    coverage?: AccountCoverage[];
    owner?: Reference;
    description?: FhirString;
    guarantor?: AccountGuarantor[];
    partOf?: Reference;
  } & Partial<DomainResource>) {
    super(data);

    // Required fields
    this.status = data.status;

    // Optional fields
    this.identifier = data.identifier;
    this.type = data.type;
    this.name = data.name;
    this.subject = data.subject;
    this.servicePeriod = data.servicePeriod;
    this.coverage = data.coverage;
    this.owner = data.owner;
    this.description = data.description;
    this.guarantor = data.guarantor;
    this.partOf = data.partOf;
  }

  /**
   * Validation schema for Account
   */
  static get schema() {
    return z.object({
      resourceType: z.literal('Account'),
      id: fhirString.optional(),
      identifier: z.array(Identifier.schema).optional(),
      status: z.enum(['active', 'inactive', 'entered-in-error', 'on-hold', 'unknown']),
      type: CodeableConcept.schema.optional(),
      name: fhirString.optional(),
      subject: z.array(Reference.schema).optional(),
      servicePeriod: Period.schema.optional(),
      coverage: z.array(AccountCoverage.schema).optional(),
      owner: Reference.schema.optional(),
      description: fhirString.optional(),
      guarantor: z.array(AccountGuarantor.schema).optional(),
      partOf: Reference.schema.optional(),
    });
  }

  /**
   * Validate this Account instance
   */
  validate(): boolean {
    return this.validateWithSchema(Account.schema);
  }

  /**
   * Convert to JSON
   */
  toJson(): Record<string, any> {
    const result = super.toJson();

    // Required fields
    result.status = this.status;

    // Optional fields
    if (this.identifier !== undefined) {
      result.identifier = this.identifier.map(i => i.toJson());
    }
    if (this.type !== undefined) result.type = this.type.toJson();
    if (this.name !== undefined) result.name = this.name;
    if (this.subject !== undefined) {
      result.subject = this.subject.map(s => s.toJson());
    }
    if (this.servicePeriod !== undefined) {
      result.servicePeriod = this.servicePeriod.toJson();
    }
    if (this.coverage !== undefined) {
      result.coverage = this.coverage.map(c => c.toJson());
    }
    if (this.owner !== undefined) result.owner = this.owner.toJson();
    if (this.description !== undefined) result.description = this.description;
    if (this.guarantor !== undefined) {
      result.guarantor = this.guarantor.map(g => g.toJson());
    }
    if (this.partOf !== undefined) result.partOf = this.partOf.toJson();

    return result;
  }

  /**
   * Create Account from JSON
   */
  static fromJson(json: Record<string, any>): Account {
    const account = new Account({
      status: json.status,
      identifier: json.identifier?.map((i: any) => Identifier.fromJson(i)),
      type: json.type ? CodeableConcept.fromJson(json.type) : undefined,
      name: json.name,
      subject: json.subject?.map((s: any) => Reference.fromJson(s)),
      servicePeriod: json.servicePeriod ? Period.fromJson(json.servicePeriod) : undefined,
      coverage: json.coverage?.map((c: any) => AccountCoverage.fromJson(c)),
      owner: json.owner ? Reference.fromJson(json.owner) : undefined,
      description: json.description,
      guarantor: json.guarantor?.map((g: any) => AccountGuarantor.fromJson(g)),
      partOf: json.partOf ? Reference.fromJson(json.partOf) : undefined,
    });

    // Copy base resource properties
    if (json.id) account.id = json.id;
    if (json.meta) account.meta = Meta.fromJson(json.meta);
    if (json.implicitRules) account.implicitRules = json.implicitRules;
    if (json.language) account.language = json.language;
    if (json.text) account.text = json.text;
    if (json.extension) account.extension = json.extension;
    if (json.modifierExtension) account.modifierExtension = json.modifierExtension;

    return account;
  }

  /**
   * Create Account from JSON string
   */
  static fromJsonString(jsonString: string): Account {
    const data = JSON.parse(jsonString);
    return Account.fromJson(data);
  }
}
