import * as t from 'io-ts';
import { fhirRegexValidator } from '../../utils';

export const fhirInterRegexPatternType = fhirRegexValidator(/[0]|[-+]?[1-9][0-9]*/, 'Invalid FHIR integer format');
export const fhirStringRegexPatternType = fhirRegexValidator(/[ \r\n\t\S]+/, 'Invalid FHIR string format');
export const fhirDecimalRegexPatternType = fhirRegexValidator(/-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?/, 'Invalid FHIR decimal format');
export const fhirUriRegexPatternType = fhirRegexValidator(/\S*/, 'Invalid FHIR uri format');
export const fhirBase64BinaryRegexPatternType = fhirRegexValidator(/(\s*([0-9a-zA-Z\+\=]){4}\s*)+/, 'Invalid FHIR base64Binary format');
export const fhirInstantRegexPatternType = fhirRegexValidator(
    /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/,
    'Invalid FHIR instant format');
export const fhirCodeRegexPatternType = fhirRegexValidator(/[^\s]+(\s[^\s]+)*/, 'Invalid FHIR code format');
export const fhirDateRegexPatternType = fhirRegexValidator(/([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/, 'Invalid FHIR date format');
export const fhirDateTimeRegexPatternType = fhirRegexValidator(
    /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/,
    'Invalid FHIR dateTime format');
export const fhirIdRegexPatternType = fhirRegexValidator(/urn:oid:[0-2](\.(0|[1-9][0-9]*))+/, 'Invalid FHIR id format');
export const fhirOidRegexPatternType = fhirRegexValidator(/urn:oid:[0-2](\.(0|[1-9][0-9]*))+/, 'Invalid FHIR oid format');
export const fhirMakeDownRegexPatternType = fhirRegexValidator(/[\s\S]*/, 'Invalid FHIR markdown format');
export const fhirPositiveIntRegexPatternType = fhirRegexValidator(/[+]?([1-9][0-9]*)/, 'Invalid FHIR positiveInt format');
export const fhirTimeRegexPatternType = fhirRegexValidator(/([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/, 'Invalid FHIR time format');
export const fhirUnsignedIntRegexPatternType = fhirRegexValidator(/0|[+]?[1-9][0-9]*/, 'Invalid FHIR unsignedInt format');

export type FhirNull = null;
export type FhirOid = t.TypeOf<typeof fhirOidRegexPatternType>;
export type FhirId = t.TypeOf<typeof fhirIdRegexPatternType>;
export type FhirBoolean = boolean;
export type FhirString = String;
export type FhirInteger = t.TypeOf<typeof fhirInterRegexPatternType>;
export type FhirUnsignedInt = t.TypeOf<typeof fhirUnsignedIntRegexPatternType>;
export type FhirPositiveInt = t.TypeOf<typeof fhirPositiveIntRegexPatternType>;
export type FhirDecimal = t.TypeOf<typeof fhirDecimalRegexPatternType>;
export type FhirUri = t.TypeOf<typeof fhirUriRegexPatternType>;
export type FhirBase64Binary = t.TypeOf<typeof fhirBase64BinaryRegexPatternType>;
export type FhirInstant = t.TypeOf<typeof fhirInstantRegexPatternType>;
export type FhirCode = t.TypeOf<typeof fhirCodeRegexPatternType>;
export type FhirDate = t.TypeOf<typeof fhirDateRegexPatternType>;
export type FhirDateTime = t.TypeOf<typeof fhirDateTimeRegexPatternType>;
export type FhirMakeDown = t.TypeOf<typeof fhirMakeDownRegexPatternType>;
export type FhirTime = t.TypeOf<typeof fhirTimeRegexPatternType>;
export type FhirUuid = string;

export type FhirUrl = string;
export type FhirCanonical = FhirUri;


export type FhirResourceTypes = 'Patient'
    | 'Observation'
    | 'Practitioner'
    | 'Encounter'
    | 'Organization'
    | 'Condition'
    | 'Procedure'
    | 'Claim'
    | 'ChargeItem'
    | 'Contract'
