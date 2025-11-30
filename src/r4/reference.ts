import { FhirUri } from "./dataTypes";
import { Extension } from "./extensions";
import { Identifier } from "./identifier";


export class Reference {
  extension?: Extension[];
  reference?: string;
  type?: FhirUri;
  identifier?: Identifier;
}