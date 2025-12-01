import { FhirString, FhirUri } from "./dataTypes";
import { Extension } from "./extensions";
import { Identifier } from "./identifier";


export class Reference {
  extension?: Extension[];
  reference?: FhirString;
  type?: FhirUri;
  identifier?: Identifier;

  constructor(data: Partial<Reference> = {}) {
    Object.assign(this, data);
  }

  toJson(): Record<string, any> {
    const result: Record<string, any> = {};

    if (this.extension !== undefined) result.extension = this.extension;
    if (this.reference !== undefined) result.reference = this.reference;
    if (this.type !== undefined) result.type = this.type;
    if (this.identifier !== undefined) {
      result.identifier = typeof this.identifier.toJson === 'function'
        ? this.identifier.toJson()
        : this.identifier;
    }

    return result;
  }

  toXml(): String {
    return `<Reference>${JSON.stringify(this)}</Reference>`;
  }
}