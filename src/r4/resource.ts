import { FhirId, FhirResourceTypes, FhirString, FhirUri } from "./dataTypes";
import { Meta } from "./dataTypes/meta";


export class Resource {
  resourceType: FhirResourceTypes;
  id?: FhirId;
  meta?: Meta;
  implicitRules?: FhirUri;
  language?: FhirString;

  constructor(data: Resource) {
    this.resourceType = data.resourceType;
    if (data.id) this.id = data.id;
    if (data.meta) this.meta = data.meta;
    if (data.implicitRules) this.implicitRules = data.implicitRules;
    if (data.language) this.language = data.language;
  }

  toJson(): Record<string, any> {
    return {
      ...this,
    };
  }

  toXml(): String {
    return `<Resource>${JSON.stringify(this)}</Resource>`;
  }
}