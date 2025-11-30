import { FhirResourceTypes } from "./dataTypes";


export class Resource {
  resourceType: FhirResourceTypes;

  constructor(data: { resourceType: FhirResourceTypes }) {
    this.resourceType = data.resourceType;
  }
}