import { z } from 'zod';

/**
 * Zod schemas for FHIR primitive types with validation
 */

// Basic string validation
export const fhirId = z.string().min(1).max(64).regex(/^[A-Za-z0-9\-\.]{1,64}$/);
export const fhirString = z.string();
export const fhirCode = z.string().min(1);
export const fhirUri = z.string().url();
export const fhirUrl = z.string().url();
export const fhirCanonical = z.string();
export const fhirMarkdown = z.string();
export const fhirOid = z.string().regex(/^urn:oid:[0-2](\\.(0|[1-9][0-9]*))*$/);
export const fhirUuid = z.string().uuid();

// Numeric validation
export const fhirInteger = z.number().int();
export const fhirPositiveInt = z.number().int().min(1);
export const fhirUnsignedInt = z.number().int().min(0);
export const fhirDecimal = z.number();

// Boolean
export const fhirBoolean = z.boolean();

// Date/time validation
export const fhirDate = z.string().regex(/^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$/);
export const fhirDateTime = z.string().regex(/^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\\.[0-9]+)?(Z|(\\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?$/);
export const fhirInstant = z.string().regex(/^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\\.[0-9]+)?(Z|(\\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))$/);
export const fhirTime = z.string().regex(/^([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\\.[0-9]+)?$/);

// Binary data
export const fhirBase64Binary = z.string().regex(/^(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)?$/);

/**
 * Extension schema
 */
export const extensionSchema: z.ZodSchema<any> = z.lazy(() => z.object({
    id: fhirString.optional(),
    extension: z.array(extensionSchema).optional(),
    url: fhirUri,
    valueBoolean: fhirBoolean.optional(),
    valueInteger: fhirInteger.optional(),
    valueString: fhirString.optional(),
    valueDecimal: fhirDecimal.optional(),
    valueUri: fhirUri.optional(),
    valueUrl: fhirUrl.optional(),
    valueCanonical: fhirCanonical.optional(),
    valueBase64Binary: fhirBase64Binary.optional(),
    valueInstant: fhirInstant.optional(),
    valueDate: fhirDate.optional(),
    valueDateTime: fhirDateTime.optional(),
    valueTime: fhirTime.optional(),
    valueCode: fhirCode.optional(),
    valueOid: fhirOid.optional(),
    valueUuid: fhirUuid.optional(),
    valueId: fhirId.optional(),
    valueMarkdown: fhirMarkdown.optional(),
}));

/**
 * Element schema (base for all FHIR elements)
 */
export const elementSchema = z.object({
    id: fhirString.optional(),
    extension: z.array(extensionSchema).optional(),
});