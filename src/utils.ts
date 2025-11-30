import * as t from 'io-ts';
import { withMessage } from 'io-ts-types'


export const fhirRegexValidator = (pattern: RegExp, message: string) =>
    withMessage(
        t.brand(
            t.string,
            (s): s is t.Branded<string, { readonly Pattern: unique symbol }> => pattern.test(s),
            'Pattern'
        ),
        () => message
    )
