import { Extension } from "./extensions";
import { Resource } from "./resource";


export class BaseFhirResource extends Resource {
  extensions?: Extension[];

  constructor(data: BaseFhirResource) {
    super({ resourceType: data.resourceType });
    this.extensions = data.extensions;
  }


  toJson(): Record<string, any> {
    return {
      ...this,
    };
  }

  toXml(): String {

    for (const key in this) {
      const value = this[key];
      console.log(`Key: ${key}, Value: ${value}`);
    }

    return `<FhirResource>${JSON.stringify(this)}</FhirResource>`;
  }

}