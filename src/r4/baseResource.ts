import { FhirString } from "./dataTypes";
import { Extension } from "./extensions";
import { Resource } from "./resource";


export class BaseFhirResource extends Resource {
  extension?: Extension[];
  text?: FhirString;
  contained?: Resource[];
  modifierExtension?: Extension[];

  constructor(data: BaseFhirResource) {
    super(data);
    this.extension = data.extension;
    this.text = data.text;
    this.contained = data.contained;
    this.modifierExtension = data.modifierExtension;
  }


  toJson(): Record<string, any> {
    const result: Record<string, any> = {};

    if (this.resourceType !== undefined) result.resourceType = this.resourceType;
    if (this.id !== undefined) result.id = this.id;
    if (this.meta !== undefined) result.meta = this.meta;
    if (this.implicitRules !== undefined) result.implicitRules = this.implicitRules;
    if (this.language !== undefined) result.language = this.language;
    if (this.text !== undefined) result.text = this.text;
    if (this.extension !== undefined) result.extensions = this.extension;
    if (this.modifierExtension !== undefined) result.modifierExtension = this.modifierExtension;
    if (this.contained !== undefined) {
      result.contained = this.contained.map(resource => resource.toJson());
    }

    return result;
  }

  toXml(): String {

    for (const key in this) {
      const value = this[key];
      console.log(`Key: ${key}, Value: ${value}`);
    }

    return `<FhirResource>${JSON.stringify(this)}</FhirResource>`;
  }

}